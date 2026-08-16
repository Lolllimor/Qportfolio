import type { Art, Artwork } from '@/types';

import { getStrapiClient, getStrapiMediaBase } from './strapiServer';

export type ArtworksResult = {
  artworks: Artwork[];
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

function absoluteMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${getStrapiMediaBase()}${url}`;
}

function parseTags(raw: unknown): string[] {
  if (!raw) return [];
  const data = raw as { data?: unknown[] } | unknown[];

  if (typeof raw === 'string') return [raw];

  if (Array.isArray(data)) {
    return data
      .map((tag: unknown) => {
        const tagData = (tag as { attributes?: Record<string, string> })
          ?.attributes || (tag as Record<string, string>);
        return tagData.tag || tagData.name || tagData.title || String(tag);
      })
      .filter(Boolean);
  }

  if (typeof data === 'object' && data && 'data' in data && Array.isArray(data.data)) {
    return data.data
      .map((tag: unknown) => {
        const tagData = (tag as { attributes?: Record<string, string> })
          ?.attributes || (tag as Record<string, string>);
        return tagData.tag || tagData.name || tagData.title || '';
      })
      .filter(Boolean);
  }

  return [];
}

function parseArt(raw: unknown): Art {
  if (!raw) return {} as Art;
  const artData = (raw as { data?: unknown }).data || raw;
  const artAttributes =
    (artData as { attributes?: Record<string, unknown> }).attributes ||
    (artData as Record<string, unknown>);
  const formats = artAttributes.formats as
    | {
        thumbnail?: { url?: string };
        small?: { url?: string };
      }
    | undefined;

  return {
    ...(artAttributes as unknown as Art),
    url: absoluteMediaUrl(artAttributes.url as string | undefined),
    formats: formats
      ? {
          thumbnail: {
            ...(formats.thumbnail as Art['formats']['thumbnail']),
            url: absoluteMediaUrl(formats.thumbnail?.url),
          },
          small: {
            ...(formats.small as Art['formats']['small']),
            url: absoluteMediaUrl(formats.small?.url),
          },
        }
      : ({} as Art['formats']),
  };
}

function transformArtwork(item: unknown): Artwork {
  const raw = (item ?? {}) as Record<string, unknown>;
  const nested = raw.attributes;
  const data = (
    nested && typeof nested === 'object' ? nested : raw
  ) as Record<string, unknown>;

  return {
    id: (raw.id as number) || (data.id as number) || 0,
    documentId: (raw.documentId as string) || (data.documentId as string) || '',
    Title: (data.Title as string) || '',
    Date: (data.Date as string) || '',
    createdAt: (raw.createdAt as Date) || (data.createdAt as Date) || new Date(),
    updatedAt: (raw.updatedAt as Date) || (data.updatedAt as Date) || new Date(),
    publishedAt:
      (raw.publishedAt as Date) || (data.publishedAt as Date) || new Date(),
    art: parseArt(data.art),
    tags: parseTags(data.tags),
    Price:
      typeof data.Price === 'string' ? data.Price : String(data.Price || '0'),
    Year: typeof data.Year === 'number' ? data.Year : Number(data.Year) || 0,
    Collection: (data.Collection as string) || '',
    BoughtBy: (data.BoughtBy as Artwork['BoughtBy']) || null,
  };
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, 400 * (i + 1)));
      }
    }
  }
  throw lastError;
}

export async function getArtworks(
  page = 1,
  pageSize = 25
): Promise<ArtworksResult> {
  const client = getStrapiClient();
  if (!client) {
    throw new Error('Strapi is not configured');
  }

  const response = await withRetry(() =>
    client.collection('artworks').find({
      populate: '*',
      pagination: { page, pageSize },
    })
  );

  return {
    artworks: response.data.map((item) => transformArtwork(item)),
    pagination: response.meta?.pagination
      ? {
          page: response.meta.pagination.page,
          pageSize: response.meta.pagination.pageSize,
          pageCount: response.meta.pagination.pageCount,
          total: response.meta.pagination.total,
        }
      : undefined,
  };
}

export async function getArtwork(id: string): Promise<Artwork | null> {
  const client = getStrapiClient();
  if (!client) {
    throw new Error('Strapi is not configured');
  }

  const tryFind = async (filters: Record<string, unknown>) =>
    client.collection('artworks').find({
      filters,
      populate: '*',
    });

  let response = await withRetry(() =>
    tryFind({ documentId: { $eq: String(id) } })
  );

  if (!response.data?.length) {
    response = await withRetry(() =>
      tryFind({ id: { $eq: Number(id) || id } })
    );
  }

  if (!response.data?.length) return null;

  return transformArtwork(response.data[0]);
}

export async function getAllArtworkIds(): Promise<string[]> {
  try {
    const { artworks, pagination } = await getArtworks(1, 100);
    const ids = artworks
      .map((artwork) => artwork.documentId || String(artwork.id))
      .filter(Boolean);
    if (pagination && pagination.pageCount > 1) {
      for (let page = 2; page <= pagination.pageCount; page += 1) {
        const next = await getArtworks(page, 100);
        ids.push(
          ...next.artworks
            .map((artwork) => artwork.documentId || String(artwork.id))
            .filter(Boolean)
        );
      }
    }
    return ids;
  } catch {
    return [];
  }
}
