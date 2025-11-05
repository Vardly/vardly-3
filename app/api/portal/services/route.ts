import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'provider') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const services = await prisma.service.findMany({
    where: { providerId: session.user.id },
  });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'provider') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json();
  const service = await prisma.service.create({
    data: {
      providerId: session.user.id,
      name: data.name,
      description: data.description,
      durationMin: data.durationMin,
      basePriceSEK: data.basePriceSEK,
      enabled: true,
    },
  });
  return NextResponse.json(service);
}
