import { useId } from 'react';
import Link from 'next/link';

import { articles } from '@/lib/articles';

function fullDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function Pushpin() {
  const id = useId().replace(/:/g, '');

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-[15px]"
    >
      <span className="pin-set block">
        <svg width="28" height="40" viewBox="0 0 28 40" fill="none">
          <defs>
            <radialGradient id={id} cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#FFC49A" />
              <stop offset="42%" stopColor="#E66001" />
              <stop offset="100%" stopColor="#B8430A" />
            </radialGradient>
          </defs>
          <path
            d="M14 18.5v17"
            stroke="#8E949C"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <ellipse cx="14" cy="18.2" rx="4.2" ry="1.7" fill="#D5D8DE" />
          <ellipse cx="14" cy="17.4" rx="3.2" ry="1.1" fill="#F4F5F7" />
          <circle cx="14" cy="11" r="9" fill={`url(#${id})`} />
          <ellipse cx="10.2" cy="7.6" rx="3.1" ry="1.7" fill="white" opacity="0.55" />
        </svg>
      </span>
    </span>
  );
}

export function LatestArticleBanner() {
  const article = articles[0];
  if (!article) return null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      data-cursor-normal
      className="mb-8 flex w-full flex-col gap-1 rounded-xl border border-[#F0F0F0] bg-[#FFFCF7] px-4 py-3.5 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
    >
      <span className="flex items-center justify-between gap-3">
        <span className="font-campton text-[11px] leading-none text-[#E66001]">
          Latest Article
        </span>
        <span className="font-campton text-[11px] leading-none text-[#8A8F98]">
          {fullDate(article.date)}
        </span>
      </span>
      <span className="font-garamond text-lg leading-snug text-[#353F50]">
        {article.title}
      </span>
    </Link>
  );
}

export default function LatestArticleClip() {
  const article = articles[0];
  if (!article) return null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      data-cursor-normal
      aria-label={`Latest article: ${article.title}`}
      className="clip-in group relative block w-[164px] origin-[50%_-6px] rotate-[7deg] outline-none transition-[rotate,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rotate-[2deg] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E66001] active:scale-[0.98] motion-reduce:animate-none motion-reduce:transition-none motion-reduce:hover:rotate-[7deg] motion-reduce:active:scale-100 sm:w-[188px]"
    >
      <Pushpin />
      <span className="flex min-h-[176px] flex-col rounded-[2px] border border-transparent bg-[#FFFCF7] px-3.5 pt-5 pb-4 shadow-[0_1px_1px_rgba(53,63,80,0.05),0_12px_24px_rgba(53,63,80,0.1)] sm:min-h-[196px]">
        <span className="font-campton text-[11px] leading-none text-[#E66001]">
          Latest Article
        </span>
        <span className="mt-2 font-campton text-[11px] leading-none text-[#8A8F98]">
          {fullDate(article.date)}
        </span>
        <span className="mt-2.5 line-clamp-5 font-garamond text-[17px] leading-snug text-[#353F50] sm:text-lg">
          {article.title}
        </span>
      </span>
    </Link>
  );
}
