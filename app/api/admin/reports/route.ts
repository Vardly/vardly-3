import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const providerCount = await prisma.provider.count();
    const bookingCount = await prisma.booking.count();
    const userCount = await prisma.user.count();
    return NextResponse.json({ providerCount, bookingCount, userCount });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
