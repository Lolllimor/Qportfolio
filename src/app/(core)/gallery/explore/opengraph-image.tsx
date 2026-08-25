import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'Explore my art — Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Explore my art',
    subtitle: 'Original digital pieces from the studio.',
  });
}
