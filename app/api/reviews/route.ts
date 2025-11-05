import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clinicId = Number(searchParams.get("clinicId"));
  if (!clinicId) {
    return NextResponse.json({ reviews: [] });
  }
  const reviews = await prisma.review.findMany({
    where: { clinicId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  const { clinicId, rating, comment } = await req.json();
  if (!clinicId || !rating) {
    return NextResponse.json({ error: "clinicId och rating krävs" }, { status: 400 });
  }
  const review = await prisma.review.create({
    data: { clinicId: Number(clinicId), rating: Number(rating), comment },
  });
  return NextResponse.json(review);
}
