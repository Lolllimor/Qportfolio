import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return new NextResponse('Spotify did not return a code.', { status: 400 });
  }

  const redirectUri = new URL('/api/spotify/callback', request.nextUrl.origin);
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri.toString(),
    }),
  });

  if (!tokenResponse.ok) {
    return new NextResponse('Spotify could not finish connecting.', {
      status: 500,
    });
  }

  const data = (await tokenResponse.json()) as { refresh_token?: string };
  const refreshToken = data.refresh_token;

  if (!refreshToken) {
    return new NextResponse('Spotify did not return a refresh token.', {
      status: 500,
    });
  }

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Spotify connected</title>
    <style>
      body { font-family: ui-sans-serif, system-ui, sans-serif; background: #111; color: #fff; margin: 0; padding: 48px 24px; }
      main { max-width: 560px; }
      p { color: #bdbdbd; line-height: 1.5; }
      code { display: block; margin-top: 16px; padding: 16px; background: #1c1c1c; border-radius: 12px; word-break: break-all; color: #fff; }
    </style>
  </head>
  <body>
    <main>
      <h1>Spotify is connected</h1>
      <p>Add this to <code style="display:inline;padding:0;background:none;">.env.local</code>, then restart the dev server. Keep it private.</p>
      <code>SPOTIFY_REFRESH_TOKEN=${refreshToken}</code>
    </main>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
