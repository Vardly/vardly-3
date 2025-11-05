import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get('lat');
  const lng = url.searchParams.get('lng');
  const radiusKm = url.searchParams.get('radiusKm');
  const serviceId = url.searchParams.get('serviceId');
  const minPrice = url.searchParams.get('minPrice');
  const maxPrice = url.searchParams.get('maxPrice');

  // Build a basic where filter; only verified providers
  const where: any = { verificationStatus: 'verified' };
  if (serviceId) {
    where.services = { some: { id: serviceId } };
  }
  // Additional filters could be added for price and geo radius; this is a placeholder
  try {
    const providers = await prisma.provider.findMany({
      where,
      include: {
        services: true,
      },
      take: 20,
    });
    return NextResponse.json({ providers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 });
  }
}
