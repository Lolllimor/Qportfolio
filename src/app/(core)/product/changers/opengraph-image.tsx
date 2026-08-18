import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'Changers Website Design case study by Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Changers',
    subtitle:
      'Campaign discovery, donations, and impact tracking across Africa.',
  });
}
