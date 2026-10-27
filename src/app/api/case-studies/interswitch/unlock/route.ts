import { NextResponse } from 'next/server';

import {
  INTERSWITCH_STUDY_COOKIE,
  passwordMatches,
  studyAccessToken,
} from '@/lib/caseStudyGate';

export async function POST(request: Request) {
  let password = '';
  try {
    const body = await request.json();
    password = typeof body?.password === 'string' ? body.password : '';
  } catch {
    password = '';
  }

  if (!passwordMatches(password)) {
    return NextResponse.json(
      { error: 'That password isn’t right.' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(INTERSWITCH_STUDY_COOKIE, studyAccessToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
