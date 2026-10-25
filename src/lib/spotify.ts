const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL =
  'https://api.spotify.com/v1/me/player/currently-playing';

export const SPOTIFY_SCOPES = 'user-read-currently-playing';

type SpotifyToken = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: SpotifyToken | null = null;

export function spotifyConfigured() {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
      process.env.SPOTIFY_CLIENT_SECRET &&
      process.env.SPOTIFY_REFRESH_TOKEN
  );
}

function basicAuth() {
  const id = process.env.SPOTIFY_CLIENT_ID ?? '';
  const secret = process.env.SPOTIFY_CLIENT_SECRET ?? '';
  return Buffer.from(`${id}:${secret}`).toString('base64');
}

async function getAccessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 15_000) {
    return tokenCache.accessToken;
  }

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? '',
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    tokenCache = null;
    throw new Error('Spotify token refresh failed');
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

export type NowPlaying =
  | { configured: false; isPlaying: false }
  | { configured: true; isPlaying: false }
  | {
      configured: true;
      isPlaying: true;
      title: string;
      artist: string;
      url: string;
    };

export async function getNowPlaying(): Promise<NowPlaying> {
  if (!spotifyConfigured()) {
    return { configured: false, isPlaying: false };
  }

  const accessToken = await getAccessToken();
  const response = await fetch(NOW_PLAYING_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });

  if (response.status === 204 || response.status === 202) {
    return { configured: true, isPlaying: false };
  }

  if (!response.ok) {
    return { configured: true, isPlaying: false };
  }

  const data = (await response.json()) as {
    is_playing?: boolean;
    item?: {
      name?: string;
      external_urls?: { spotify?: string };
      artists?: { name: string }[];
      show?: { name?: string };
    } | null;
  };

  const item = data.item;
  if (!data.is_playing || !item?.name) {
    return { configured: true, isPlaying: false };
  }

  const artist =
    item.artists?.map((person) => person.name).join(', ') ||
    item.show?.name ||
    'Spotify';

  return {
    configured: true,
    isPlaying: true,
    title: item.name,
    artist,
    url: item.external_urls?.spotify ?? 'https://open.spotify.com',
  };
}
