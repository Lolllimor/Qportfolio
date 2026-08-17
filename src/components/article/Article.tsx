import Image from 'next/image';
import Link from 'next/link';

import { articles } from '@/lib/articles';
import { siteConfig } from '@/lib/site';

export default function Article() {
  return (
    <div className="relative mb-20 min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <div className="flex w-full min-w-0 flex-col max-w-[845px] xl:max-w-full">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-garamond text-2xl font-medium text-[#353F50] sm:text-3xl">
              Articles
            </h1>
            <p className="mt-1 font-campton text-sm leading-relaxed text-[#5C5C5C] sm:text-base">
              Thinking out loud on design, AI, and how we work.
            </p>
          </div>
          <a
            href={siteConfig.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 self-center rounded-lg border border-[#F0F0F0] bg-[#F5F5F5] px-5 py-3 font-campton text-sm font-normal leading-none text-[#353F50] no-underline transition-colors hover:bg-[#EFEFEF] hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
          >
            <span>Also on Medium</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mt-6 flex flex-col sm:mt-8" role="list">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              role="listitem"
              aria-label={`Read article: ${article.title}`}
              className="group flex min-h-11 items-center gap-4 rounded-xl py-4 no-underline transition-colors hover:bg-[#FAFAFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001] sm:gap-6 sm:px-3 sm:py-5 visited:[&_h2]:text-[#353F50]"
            >
              <span className="relative h-[80px] w-[112px] shrink-0 overflow-hidden rounded-xl sm:h-[112px] sm:w-[168px]">
                <Image
                  src={article.cover}
                  alt=""
                  width={168}
                  height={112}
                  sizes="(max-width: 640px) 120px, 168px"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-campton text-[10px] font-normal text-[#5C5C5C] sm:text-xs">
                  {article.displayDate}
                </p>
                <h2 className="mt-1 line-clamp-2 font-campton text-base font-medium leading-snug text-[#353F50] transition-colors group-hover:text-[#E66001] sm:text-lg">
                  {article.title}
                </h2>
                <p className="mt-1 line-clamp-2 font-campton text-xs font-normal leading-relaxed text-[#5C5C5C] sm:text-sm sm:leading-relaxed">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
