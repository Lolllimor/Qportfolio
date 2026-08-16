'use client';

import Image from 'next/image';

import { GoToTwentyII } from '@/components/GoToTwentyII';
import { DotIcon } from '../icons/dot';
import { gallery } from '../data';

export const Gallery = () => {
  return (
    <div className="relative mb-20 min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-campton text-2xl font-medium leading-tight text-black md:text-[32px]">
            Artworks
          </h1>
          <p className="mt-1 max-w-[540px] font-campton text-sm leading-relaxed text-[#5C5C5C] sm:text-base">
            Original digital pieces made outside client work — colour, form, and
            character studies that sit beside the product practice. Some of
            these were made as independent experiments; others belong to the
            Twenty II exhibition, Restacking the Odds, shown at OneArt Gallery
            in Lagos. This page is a quiet index of that studio work: portraits,
            figures, and studies in mood. For the full exhibition story, dates,
            and the collection for sale, open Twenty II from the badge on the
            right of this page.
          </p>
        </div>
        <div className="shrink-0">
          <GoToTwentyII />
        </div>
      </div>

      <div className="columns-1 gap-4 pt-6 md:columns-2 lg:columns-3 lg:pt-16">
        {gallery.map((item, idx) => (
          <div key={idx} className="relative mb-4 h-auto w-full group">
            <Image
              src={item.src}
              alt={item.name}
              width={800}
              height={1000}
              loading={idx === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full select-none"
              style={{ width: '100%', height: 'auto' }}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <div className="absolute bottom-4 left-4 flex h-fit w-fit items-center gap-1 rounded-md bg-white/80 px-2.5 py-1.5 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
              <p className="font-campton text-xs leading-tight text-black">
                {item.name}
              </p>
              <DotIcon />
              <p className="font-campton text-xs leading-tight text-black">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
