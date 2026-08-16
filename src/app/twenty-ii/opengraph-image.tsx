import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'Twenty II — Restacking the Odds';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Twenty II',
    subtitle: 'Restacking the Odds — an art exhibition by Quadri Morin.',
  });
}
