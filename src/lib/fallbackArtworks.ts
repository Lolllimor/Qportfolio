import type { Artwork } from '@/types';
import { gallery } from '@/components/data';

/** Local preview fallback when Strapi is unavailable. */
export function getFallbackArtworks(): Artwork[] {
  const now = new Date();

  return gallery.map((piece, index) => {
    const yearMatch = piece.date?.match(/\d{4}/);
    const year = yearMatch ? Number(yearMatch[0]) : 2024;

    return {
      id: index + 1,
      documentId: `preview-${index + 1}`,
      Title: piece.name.trim(),
      Year: year,
      Collection: 'Restacking the Odds',
      BoughtBy: null,
      Date: piece.date || String(year),
      Price: String(150000 + index * 25000),
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
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
        createdAt: now,
        updatedAt: now,
        publishedAt: now,
      },
    };
  });
}
