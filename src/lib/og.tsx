import { ImageResponse } from 'next/og';

import { siteConfig } from './site';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(?:opentype|truetype)'\)/
  );

  if (!resource?.[1]) {
    throw new Error(`Failed to load font: ${font}`);
  }

  const response = await fetch(resource[1]);

  if (!response.ok) {
    throw new Error(`Failed to fetch font file: ${font}`);
  }

  return response.arrayBuffer();
}

export async function createOgImage({
  kicker,
  subtitle,
}: {
  kicker: string;
  subtitle: string;
}) {
  const sansText = `${kicker} ${subtitle} quadmor.design`;

  let fonts: { name: string; data: ArrayBuffer; style: 'normal'; weight: 400 }[] = [];

  try {
    const [serifFont, sansFont] = await Promise.all([
      loadGoogleFont('EB Garamond', 400, siteConfig.name),
      loadGoogleFont('Inter', 400, sansText),
    ]);
    fonts = [
      { name: 'EB Garamond', data: serifFont, style: 'normal', weight: 400 },
      { name: 'Inter', data: sansFont, style: 'normal', weight: 400 },
    ];
  } catch (error) {
    console.warn('OG fonts unavailable, using system fallback', error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#FFFFFF',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '64px',
            height: '6px',
            background: '#E66001',
            marginBottom: '40px',
          }}
        />
        <div
          style={{
            fontSize: 88,
            fontFamily: fonts.length ? 'EB Garamond' : 'serif',
            color: '#353F50',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: '20px',
            fontSize: 36,
            fontFamily: fonts.length ? 'Inter' : 'sans-serif',
            color: '#5C5C5C',
            lineHeight: 1.3,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            marginTop: '48px',
            fontSize: 24,
            fontFamily: fonts.length ? 'Inter' : 'sans-serif',
            color: '#353F50',
            lineHeight: 1.5,
            maxWidth: '720px',
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            marginTop: 'auto',
            fontSize: 22,
            fontFamily: fonts.length ? 'Inter' : 'sans-serif',
            color: '#E66001',
            letterSpacing: '0.04em',
          }}
        >
          quadmor.design
        </div>
      </div>
    ),
    {
      ...ogSize,
      ...(fonts.length ? { fonts } : {}),
    }
  );
}
