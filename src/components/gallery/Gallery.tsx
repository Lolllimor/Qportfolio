'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import { ProjectHoverZone } from '@/components/common/ProjectCursor';
import { ArrowRight } from '../icons/arrow-right-o';
import { gallery } from '../data';

const previewPieces = [gallery[0], gallery[11], gallery[1]];

export const Gallery = () => {
  return (
    <div className="relative mb-20 min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <h1 className="font-campton text-2xl font-medium leading-tight text-black md:text-[32px]">
        Artworks
      </h1>
      <p className="mt-1 max-w-[540px] font-campton text-sm leading-relaxed text-[#5C5C5C] sm:text-base">
        Studio pieces, and the Twenty II exhibition.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-16 lg:gap-10">
        <ProjectHoverZone label="Open project">
          <Link
            href="/gallery/explore"
            className="group flex flex-col gap-4 no-underline text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#D8D8D8] bg-[#FAFAFA]">
              {previewPieces.map((piece, index) => (
                <div
                  key={piece.name}
                  className="absolute"
                  style={{
                    width: index === 1 ? '42%' : '38%',
                    left: index === 0 ? '8%' : index === 1 ? '46%' : '28%',
                    top: index === 0 ? '18%' : index === 1 ? '12%' : '48%',
                    zIndex: index + 1,
                    rotate: `${index === 0 ? -8 : index === 1 ? 7 : -3}deg`,
                  }}
                >
                  <div
                    className="gallery-float overflow-hidden rounded-md shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
                    style={
                      {
                        '--float-duration': `${4.6 + index * 0.7}s`,
                        '--float-delay': `${-index * 0.9}s`,
                        '--float-y': index === 1 ? '-10px' : '-16px',
                        '--float-x': index === 2 ? '6px' : '0px',
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={piece.src}
                      alt=""
                      width={400}
                      height={500}
                      sizes="(max-width: 768px) 45vw, 220px"
                      className="h-auto w-full select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 right-4 rounded-full bg-[#E66001] p-3 opacity-100 transition-opacity duration-300 lg:hidden">
                <ArrowRight color="#fff" />
              </div>
            </div>
            <div className="flex flex-col lg:gap-2">
              <h2 className="font-campton text-base font-medium leading-tight text-black lg:text-[32px]">
                Explore my art
              </h2>
              <p className="font-campton text-xs font-normal leading-tight text-[#5C5C5C] lg:text-base">
                Portraits, figures, and studies from the studio.
              </p>
            </div>
          </Link>
        </ProjectHoverZone>

        <ProjectHoverZone label="Open project">
          <Link
            href="/twenty-ii"
            className="group flex flex-col gap-4 no-underline text-inherit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#121212] bg-[#121212] bg-[url('/bg.png')] bg-cover bg-center">
              <div className="absolute inset-x-0 top-0 flex h-2">
                <span className="h-full flex-1 bg-[#EB5D1D]" />
                <span className="h-full flex-1 bg-[#57D791]" />
                <span className="h-full flex-1 bg-[#49B7D9]" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 pt-2">
                <p className="font-barbra text-3xl leading-none tracking-tight sm:text-4xl">
                  <span className="text-[#99FFCC]">Twenty</span>
                  <span className="text-[#FF6633]">-II</span>
                </p>
                <Image
                  src="/restock.png"
                  alt=""
                  width={280}
                  height={178}
                  className="h-auto w-[70%] max-w-[260px] select-none"
                  draggable={false}
                />
              </div>
              <div className="absolute bottom-4 right-4 rounded-full bg-[#E66001] p-3 opacity-100 transition-opacity duration-300 lg:hidden">
                <ArrowRight color="#fff" />
              </div>
            </div>
            <div className="flex flex-col lg:gap-2">
              <h2 className="font-campton text-base font-medium leading-tight text-black lg:text-[32px]">
                Twenty-II Exhibition
              </h2>
              <p className="font-campton text-xs font-normal leading-tight text-[#5C5C5C] lg:text-base">
                Restacking the Odds, shown at OneArt Gallery in Lagos.
              </p>
            </div>
          </Link>
        </ProjectHoverZone>
      </div>
    </div>
  );
};
