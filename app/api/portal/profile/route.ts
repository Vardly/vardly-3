import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'provider') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Fetch provider by user id
  const provider = await prisma.provider.findUnique({
    where: { id: session.user.id },
    include: { services: true },
  });
  return NextResponse.json(provider);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'provider') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await req.json();
  // Update or create provider profile
  const updated = await prisma.provider.upsert({
    where: { id: session.user.id },
    update: {
      name: data.name,
      description: data.description,
      address: data.address,
      orgNumber: data.orgNumber,
    },
    create: {
      id: session.user.id,
      name: data.name,
      description: data.description,
      address: data.address,
      orgNumber: data.orgNumber,
      lat: 0,
      lng: 0,
      slug: '',
      city: '',
      zip: '',
      verificationStatus: 'pending',
      documents: [],
      timezone: 'Europe/Stockholm',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(updated);
}
