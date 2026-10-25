import { NextRequest, NextResponse } from 'next/server';

import { SPOTIFY_SCOPES } from '@/lib/spotify';

export function GET(request: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId || !process.env.SPOTIFY_CLIENT_SECRET) {
    return NextResponse.json(
      {
        error:
          'Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env.local, then restart the dev server.',
      },
      { status: 500 }
    );
  }

  const redirectUri = new URL('/api/spotify/callback', request.nextUrl.origin);
  const authorize = new URL('https://accounts.spotify.com/authorize');
  authorize.searchParams.set('response_type', 'code');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('scope', SPOTIFY_SCOPES);
  authorize.searchParams.set('redirect_uri', redirectUri.toString());

  return NextResponse.redirect(authorize);
}
