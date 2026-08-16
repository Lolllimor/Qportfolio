import { ImageResponse } from 'next/og';

import { createOgImage, ogContentType, ogSize } from '@/lib/og';
import { siteConfig } from '@/lib/site';

export const alt = siteConfig.title;
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage(): Promise<ImageResponse> {
  return createOgImage({
    kicker: 'Product & UX Designer',
    subtitle: 'Fintech, ed-tech, AI tools, and social impact products.',
  });
}
