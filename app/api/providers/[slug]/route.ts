import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  try {
    const provider = await prisma.provider.findUnique({
      where: { slug },
      include: {
        services: true,
        openingHours: true,
      },
    });
    if (!provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }
    return NextResponse.json({ provider });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch provider' }, { status: 500 });
  }
}
