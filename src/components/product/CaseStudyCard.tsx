import Image from 'next/image';
import Link from 'next/link';

import { CaseStudyCardProps } from '@/types';
import { DotIcon } from '../icons/dot';
import { ArrowRight } from '../icons/arrow-right-o';

export const CaseStudyCard = ({
  caseStudy,
  priority = false,
}: CaseStudyCardProps) => {
  const {
    url,
    year,
    role,
    title,
    imageSrc,
    imageAlt,
    linkText,
    description,
    reverseLayout = false,
    imageContainerClass = '',
    imageClass = 'w-full h-auto rounded-2xl',
    specialImageRender = false,
  } = caseStudy;

  const layoutClass = reverseLayout
    ? 'flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-[38px]'
    : 'flex flex-col lg:flex-row items-center gap-6 lg:gap-[38px]';

  return (
    <div className={layoutClass}>
      <div className="flex flex-col  md:gap-[21px] gap-4 w-full lg:w-[400px] xl:w-[479px]">
        <div className="flex flex-col gap-0">
          <div className="flex items-center gap-1">
            <span className="text-[#5C5C5C] text-xs font-normal font-campton leading-tight">
              {year}
            </span>
            <DotIcon />
            <span className="text-[#5C5C5C] text-xs font-normal font-campton leading-tight">
              {role}
            </span>
          </div>
          <h2 className="text-[#353F50] text-[32px] font-normal md:leading-normal leading-snug font-apple-garamond">
            {title}
          </h2>
        </div>
        <p className="text-[#5C5C5C] text-xs md:text-base font-normal font-campton  md:leading-[24px] leading-snug">
          {description}
        </p>
        <div className="flex items-center">
          {url ? (
            url.startsWith('/') ? (
              <Link
                href={url}
                className="group flex min-h-11 items-center gap-2 font-campton text-base font-normal leading-tight text-[#353F50] uppercase hover:text-[#E66001]"
              >
                {linkText}
                <span className="-mt-1 opacity-0 group-hover:opacity-100">
                  <ArrowRight />
                </span>
              </Link>
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-11 items-center gap-2 font-campton text-base font-normal leading-tight text-[#353F50] uppercase hover:text-[#E66001]"
              >
                {linkText}
                <span className="-mt-1 opacity-0 group-hover:opacity-100">
                  <ArrowRight />
                </span>
              </a>
            )
          ) : (
            <span className="font-campton text-base font-normal leading-tight text-[#5C5C5C] uppercase">
              {linkText}
            </span>
          )}
        </div>
      </div>
      <div
        className={`w-full lg:w-[400px] xl:w-[497px] ${imageContainerClass} ${
          specialImageRender ? 'relative rounded-2xl' : ''
        }`}
      >
        {specialImageRender ? (
          <div className="w-full h-auto aspect-497/357 bg-white rounded-2xl overflow-hidden relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={440}
              height={320}
              loading={priority ? 'eager' : 'lazy'}
              sizes="(max-width: 1024px) 100vw, 497px"
              className="absolute left-[30px] top-[43px] w-[88%] h-auto rounded-lg shadow-[0_24px_48px_0_rgba(41,48,124,0.24)]"
            />
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={497}
            height={357}
            loading={priority ? 'eager' : 'lazy'}
            sizes="(max-width: 1024px) 100vw, 497px"
            className={imageClass}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </div>
  );
};
