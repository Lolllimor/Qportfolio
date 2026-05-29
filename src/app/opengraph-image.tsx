import { ImageResponse } from 'next/og';

import { siteConfig } from '@/lib/site';

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
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
            fontFamily: 'Georgia, serif',
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
            fontFamily: 'system-ui, sans-serif',
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
            fontFamily: 'system-ui, sans-serif',
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
            fontFamily: 'system-ui, sans-serif',
            color: '#E66001',
            letterSpacing: '0.04em',
          }}
        >
          quadmor.design
        </div>
      </div>
    ),
    { ...size }
  );
}
