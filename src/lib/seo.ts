import type { Metadata } from 'next';

import { getCanonicalUrl, siteConfig } from './site';

export function createPageMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = getCanonicalUrl(path);
  const imageUrl = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'QqmQrYR7z3DvuC3KRT82Le4jaWKLL5RZ7qfbbx8MhXQ',
  },
};

export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Product & UX Designer',
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}/logo.png`,
    sameAs: Object.values(siteConfig.links),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function artworkJsonLd(artwork: {
  title: string;
  url: string;
  image?: string;
  price: string;
  collection?: string;
  year?: number;
  artist: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: artwork.title,
    url: artwork.url,
    image: artwork.image,
    artform: 'Digital Art',
    creator: {
      '@type': 'Person',
      name: artwork.artist,
    },
    offers: {
      '@type': 'Offer',
      price: artwork.price,
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
    },
    ...(artwork.collection ? { isPartOf: { '@type': 'Collection', name: artwork.collection } } : {}),
    ...(artwork.year ? { dateCreated: String(artwork.year) } : {}),
  };
}
