import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'Articles by Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Articles',
    subtitle: 'Writing on design, AI, UX research, and craft.',
  });
}
