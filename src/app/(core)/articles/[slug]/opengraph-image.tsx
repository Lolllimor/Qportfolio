import { createOgImage, ogContentType, ogSize } from '@/lib/og';
import { getArticle } from '@/lib/articles';

export const alt = 'Article by Quadri Morin';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  return createOgImage({
    kicker: article?.title ?? 'Article',
    subtitle: article?.description ?? 'Writing on design, AI, and craft.',
  });
}
