import type { Artwork } from '@/types';
import { gallery } from '@/components/data';

const MONTHS: Record<string, string> = {
  jan: '01',
  feb: '02',
  mar: '03',
  apr: '04',
  may: '05',
  jun: '06',
  jul: '07',
  aug: '08',
  sep: '09',
  oct: '10',
  nov: '11',
  dec: '12',
};

/** Stable date from gallery copy such as "Feb, 2025". */
function galleryPublishedAt(value: string | undefined, year: number): Date {
  const match = value?.match(/([A-Za-z]+)[,\s]+(\d{4})/);
  const month = match ? MONTHS[match[1].slice(0, 3).toLowerCase()] : undefined;
  if (match && month) {
    return new Date(`${match[2]}-${month}-01T00:00:00.000Z`);
  }
  return new Date(`${year}-01-01T00:00:00.000Z`);
}

/** Local preview fallback when Strapi is unavailable. */
export function getFallbackArtworks(): Artwork[] {
  return gallery.map((piece, index) => {
    const yearMatch = piece.date?.match(/\d{4}/);
    const year = yearMatch ? Number(yearMatch[0]) : 2024;
    const publishedAt = galleryPublishedAt(piece.date, year);

    return {
      id: index + 1,
      documentId: `preview-${index + 1}`,
      Title: piece.name.trim(),
      Year: year,
      Collection: 'Restacking the Odds',
      BoughtBy: null,
      Date: piece.date || String(year),
      Price: String(150000 + index * 25000),
      createdAt: publishedAt,
      updatedAt: publishedAt,
      publishedAt,
      tags: ['Digital', 'Painting'],
      art: {
        id: index + 1,
        documentId: `preview-art-${index + 1}`,
        name: piece.name.trim(),
        alternativeText: null,
        caption: null,
        width: 1200,
        height: 1600,
        formats: {} as Artwork['art']['formats'],
        hash: '',
        ext: '.jpg',
        mime: 'image/jpeg',
        size: 0,
        url: piece.src,
        previewUrl: null,
        provider: 'uploadthing',
        provider_metadata: null,
        createdAt: publishedAt,
        updatedAt: publishedAt,
        publishedAt,
      },
    };
  });
}
