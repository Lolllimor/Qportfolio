import { NextResponse } from 'next/server';

import { getNowPlaying } from '@/lib/spotify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const nowPlaying = await getNowPlaying();
    return NextResponse.json(nowPlaying);
  } catch {
    return NextResponse.json({ configured: true, isPlaying: false });
  }
}
