import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'Twenty II artworks by Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Twenty II Artworks',
    subtitle: 'The Restacking the Odds collection — digital works on identity and change.',
  });
}
