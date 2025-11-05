import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'provider') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const slots = await prisma.slot.findMany({
    where: { providerId: session.user.id },
    include: { service: true },
  });
  return NextResponse.json(slots);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'provider') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json();
  const slot = await prisma.slot.create({
    data: {
      providerId: session.user.id,
      serviceId: data.serviceId,
      start: new Date(data.start),
      end: new Date(data.end),
      source: 'manual',
      fetchedAt: new Date(),
      isBookable: true,
    },
  });
  return NextResponse.json(slot);
}
