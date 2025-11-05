import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const services = await prisma.service.findMany({
      where: {
        enabled: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return NextResponse.json({ services });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
