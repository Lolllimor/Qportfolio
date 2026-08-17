import type { Metadata } from 'next';

import { getCanonicalUrl, siteConfig } from './site';

export function createPageMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
}: {
  title: string | { absolute: string };
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = getCanonicalUrl(path);
  const titleText = typeof title === 'string' ? title : title.absolute;
  const imageUrl = image;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: titleText,
      description,
      url,
      siteName: siteConfig.name,
      type,
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: titleText,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(getCanonicalUrl('/')),
  alternates: {
    canonical: getCanonicalUrl('/'),
  },
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: getCanonicalUrl('/'),
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
  const id = `${siteConfig.url}/#person`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': id,
    name: siteConfig.name,
    jobTitle: 'Product & UX Designer',
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}/logo.png`,
    sameAs: Object.values(siteConfig.links),
  };
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: getCanonicalUrl('/'),
    publisher: {
      '@id': `${siteConfig.url}/#person`,
    },
  };
}

export function pageBreadcrumbJsonLd(name: string, path: string) {
  return breadcrumbJsonLd([
    { name: 'Home', url: getCanonicalUrl('/') },
    { name, url: getCanonicalUrl(path) },
  ]);
}

export function twentyIiBreadcrumbJsonLd(
  crumbs: { name: string; path: string }[]
) {
  return breadcrumbJsonLd([
    { name: 'Home', url: getCanonicalUrl('/') },
    { name: 'Twenty II', url: getCanonicalUrl('/twenty-ii') },
    ...crumbs.map((crumb) => ({
      name: crumb.name,
      url: getCanonicalUrl(crumb.path),
    })),
  ]);
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

export function articleJsonLd(article: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: getCanonicalUrl(article.path),
    datePublished: article.datePublished,
    author: {
      '@id': `${siteConfig.url}/#person`,
    },
    publisher: {
      '@id': `${siteConfig.url}/#person`,
    },
    ...(article.image ? { image: article.image } : {}),
  };
}

export function caseStudyJsonLd(study: {
  name: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: study.name,
    description: study.description,
    url: getCanonicalUrl(study.path),
    datePublished: study.datePublished,
    author: {
      '@id': `${siteConfig.url}/#person`,
    },
    creator: {
      '@id': `${siteConfig.url}/#person`,
    },
    ...(study.image ? { image: study.image } : {}),
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
