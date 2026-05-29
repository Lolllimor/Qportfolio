import { ImageResponse } from 'next/og';

import { siteConfig } from '@/lib/site';

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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

export default async function OpenGraphImage() {
  const sansText =
    'Product & UX Designer Fintech, ed-tech, AI tools, and social impact products. quadmor.design';

  const [serifFont, sansFont] = await Promise.all([
    loadGoogleFont('EB Garamond', 400, siteConfig.name),
    loadGoogleFont('Inter', 400, sansText),
  ]);

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
            fontFamily: 'EB Garamond',
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
            fontFamily: 'Inter',
            color: '#848484',
            lineHeight: 1.3,
          }}
        >
          Product &amp; UX Designer
        </div>
        <div
          style={{
            marginTop: '48px',
            fontSize: 24,
            fontFamily: 'Inter',
            color: '#353F50',
            lineHeight: 1.5,
            maxWidth: '720px',
          }}
        >
          Fintech, ed-tech, AI tools, and social impact products.
        </div>
        <div
          style={{
            marginTop: 'auto',
            fontSize: 22,
            fontFamily: 'Inter',
            color: '#E66001',
            letterSpacing: '0.04em',
          }}
        >
          quadmor.design
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'EB Garamond',
          data: serifFont,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: sansFont,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
