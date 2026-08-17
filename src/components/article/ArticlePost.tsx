import Image from 'next/image';
import Link from 'next/link';

import { MarkdownBody } from '@/components/article/MarkdownBody';
import {
  getAdjacentArticles,
  getArticleContent,
  type ArticleMeta,
} from '@/lib/articles';

export function ArticlePost({ article }: { article: ArticleMeta }) {
  const content = getArticleContent(article.slug);
  const { previous, next } = getAdjacentArticles(article.slug);

  return (
    <article className="relative min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] pb-24 max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <Link
        href="/articles"
        className="mb-8 inline-flex min-h-11 items-center font-campton text-sm text-[#5C5C5C] no-underline transition-colors hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
      >
        ← Articles
      </Link>

      <p className="font-campton text-xs leading-tight text-[#5C5C5C]">
        {article.displayDate}
      </p>
      <h1 className="mt-2 max-w-[720px] font-apple-garamond text-[32px] leading-snug font-normal text-[#353F50] md:text-[40px] md:leading-tight">
        {article.title}
      </h1>
      <p className="mt-4 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        {article.description}
      </p>

      <figure className="my-10">
        <Image
          src={article.cover}
          alt={article.coverAlt}
          width={1200}
          height={630}
          priority
          sizes="(max-width: 1024px) 100vw, 1014px"
          className="h-auto w-full rounded-2xl"
        />
        {article.coverCaption ? (
          <figcaption className="mt-3 font-campton text-sm leading-relaxed text-[#5C5C5C]">
            {article.coverCaption}
          </figcaption>
        ) : null}
      </figure>

      <MarkdownBody content={content} />

      <p className="mt-16 max-w-[640px] font-campton text-sm leading-relaxed text-[#5C5C5C]">
        First published on{' '}
        <a
          href={article.mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#353F50] underline decoration-[#E66001]/40 underline-offset-4 transition-colors hover:text-[#E66001] hover:decoration-[#E66001]"
        >
          Medium
        </a>
        .
      </p>

      <nav
        className="mt-12 flex max-w-[640px] flex-col gap-4 border-t border-[#F0F0F0] pt-8 sm:flex-row sm:justify-between"
        aria-label="More articles"
      >
        {previous ? (
          <Link
            href={`/articles/${previous.slug}`}
            className="group max-w-[280px] no-underline"
          >
            <span className="font-campton text-xs text-[#5C5C5C]">
              Older
            </span>
            <span className="mt-1 block font-campton text-sm text-[#353F50] transition-colors group-hover:text-[#E66001]">
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/articles/${next.slug}`}
            className="group max-w-[280px] no-underline sm:text-right"
          >
            <span className="font-campton text-xs text-[#5C5C5C]">
              Newer
            </span>
            <span className="mt-1 block font-campton text-sm text-[#353F50] transition-colors group-hover:text-[#E66001]">
              {next.title}
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
