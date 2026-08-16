import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'About the artist — Quadri Morin, Twenty II';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'About the Artist',
    subtitle: 'Quadri Morin — self-empowerment, identity, and inner transformation.',
  });
}
