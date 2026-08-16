import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'Product design case studies by Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Product Design',
    subtitle: 'UX case studies across fintech, community platforms, and mobile apps.',
  });
}
