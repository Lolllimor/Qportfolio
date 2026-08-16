import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'Artworks by Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Artworks',
    subtitle: 'Original digital pieces exploring identity and transformation.',
  });
}
