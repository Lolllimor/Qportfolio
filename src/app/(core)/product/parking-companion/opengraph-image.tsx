import { createOgImage, ogContentType, ogSize } from '@/lib/og';

export const alt =
  'Parking Management Companion App case study by Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return createOgImage({
    kicker: 'Parking companion',
    subtitle:
      'Usability research and redesign. Score moved from 7.3 to 9.4.',
  });
}
