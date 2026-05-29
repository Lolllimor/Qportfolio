import type { Metadata } from 'next';

import DetailsPage from './DetailsClient';
import { siteConfig } from '@/lib/site';
import { createPageMetadata } from '@/lib/seo';

type PageProps = {
  params: Promise<{ id: string }>;
};

async function fetchArtworkForMeta(id: string) {
  try {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
    const res = await fetch(`${base}/api/artworks/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.artwork as { Title: string; Price: string; art?: { url?: string }; Collection?: string } | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = await fetchArtworkForMeta(id);

  if (!artwork) {
    return { title: 'Artwork not found' };
  }

  return createPageMetadata({
    title: `${artwork.Title} — Twenty II`,
    description: `"${artwork.Title}" — a digital artwork from the Twenty II collection by Quadri Morin. ${artwork.Collection ? `Part of the ${artwork.Collection} collection.` : ''}`,
    path: `/twenty-ii/artworks/${id}`,
    image: artwork.art?.url,
  });
}

export default function ArtworkPage() {
  return <DetailsPage />;
}
