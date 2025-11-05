import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const provider = await prisma.provider.findUnique({ where: { slug }, select: { id: true } });
    if (!provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }
    const reviews = await prisma.review.findMany({
      where: { providerId: provider.id },
      select: { id: true, rating: true, comment: true, createdAt: true, byBookingId: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ reviews });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  try {
    const provider = await prisma.provider.findUnique({ where: { slug }, select: { id: true } });
    if (!provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
    }
    const body = await req.json();
    const { rating, comment, byBookingId } = body;
    if (!rating || !byBookingId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const review = await prisma.review.create({
      data: {
        providerId: provider.id,
        rating,
        comment,
        byBookingId,
      },
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
