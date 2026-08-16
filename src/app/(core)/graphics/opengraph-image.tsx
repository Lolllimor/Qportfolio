import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt = 'Graphic design by Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Graphics',
    subtitle: 'Branding, posters, and visual identity work.',
  });
}
