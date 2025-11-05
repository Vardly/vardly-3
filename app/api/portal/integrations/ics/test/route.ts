import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { icsUrl } = body;
    if (!icsUrl) {
      return NextResponse.json({ error: 'Missing icsUrl' }, { status: 400 });
    }
    // Simulate validating the iCal feed
    return NextResponse.json({ success: true, message: 'ICS feed validated' });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
