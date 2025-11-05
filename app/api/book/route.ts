import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { sendBookingConfirmation } from '@/lib/notifications';

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
        externalRef: bookingRef,
      },
    });
    // Fetch provider and service names for notification
    const [provider, service] = await Promise.all([
      prisma.provider.findUnique({ where: { id: providerId } }),
      serviceId ? prisma.service.findUnique({ where: { id: serviceId } }) : Promise.resolve(null),
    ]);
    // Send booking confirmation via email/SMS (stub implementation)
    await sendBookingConfirmation({
      email: customer.email,
      phone: customer.phone,
      providerName: provider?.name || '',
      serviceName: service?.name || '',
      bookingRef,
    });
    return NextResponse.json({ success: true, reference: bookingRef });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
