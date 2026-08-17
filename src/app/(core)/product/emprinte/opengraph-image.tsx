import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'Emprinte Readers Hub case study by Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Emprinte Readers Hub',
    subtitle:
      'Brand and product ecosystem. Solo-led from strategy to App Store launch.',
  });
}
