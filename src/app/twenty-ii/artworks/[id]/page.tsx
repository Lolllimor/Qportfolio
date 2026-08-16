import type { Metadata } from 'next';

import DetailsPage from './DetailsClient';
import { JsonLd } from '@/components/JsonLd';
import { getAllArtworkIds, getArtwork } from '@/lib/artworks';
import { artworkJsonLd, createPageMetadata, twentyIiBreadcrumbJsonLd } from '@/lib/seo';
import { getCanonicalUrl, siteConfig } from '@/lib/site';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const ids = await getAllArtworkIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = await getArtwork(id).catch(() => null);

  if (!artwork) {
    return {
      title: 'Artwork not found',
      alternates: {
        canonical: getCanonicalUrl(`/twenty-ii/artworks/${id}`),
      },
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: `${artwork.Title} — Twenty II`,
    description: `"${artwork.Title}" — a digital artwork from the Twenty II collection by Quadri Morin. ${artwork.Collection ? `Part of the ${artwork.Collection} collection.` : ''}`,
    path: `/twenty-ii/artworks/${id}`,
    image: artwork.art?.url,
  });
}

export default async function ArtworkPage({ params }: PageProps) {
  const { id } = await params;
  const artwork = await getArtwork(id).catch(() => null);

  return (
    <>
      <JsonLd
        data={twentyIiBreadcrumbJsonLd([
          { name: 'Artworks', path: '/twenty-ii/artworks' },
          {
            name: artwork?.Title || 'Artwork',
            path: `/twenty-ii/artworks/${id}`,
          },
        ])}
      />
      {artwork ? (
        <JsonLd
          data={artworkJsonLd({
            title: artwork.Title,
            url: getCanonicalUrl(`/twenty-ii/artworks/${id}`),
            image: artwork.art?.url,
            price: artwork.Price,
            collection: artwork.Collection,
            year: artwork.Year,
            artist: siteConfig.name,
          })}
        />
      ) : null}
      <DetailsPage artworkId={id} initialArtwork={artwork} />
    </>
  );
}
