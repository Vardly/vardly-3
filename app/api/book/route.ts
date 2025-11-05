import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { sendBookingConfirmation } from '../../../lib/notifications';

export async function POST(request: Request) {
  const data = await request.json();
  const { providerId, serviceId, slotId, customer } = data;
  try {
    const bookingRef = uuidv4();
    const booking = await prisma.booking.create({
      data: {
        providerId,
        serviceId,
        slotId,
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone,
        status: 'reserved',
        externalReference: bookingRef,
      },
    });

    // Fetch provider and service names for notification
    const [provider, service] = await Promise.all([
      prisma.provider.findUnique({
        where: { id: providerId },
        select: { name: true },
      }),
      prisma.service.findUnique({
        where: { id: serviceId },
        select: { name: true },
      }),
    ]);

    await sendBookingConfirmation({
      email: customer.email,
      providerName: provider?.name ?? '',
      serviceName: service?.name ?? '',
      bookingRef,
    });

    return NextResponse.json({ bookingRef });
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while booking the appointment.' },
      { status: 500 },
    );
  }
}
