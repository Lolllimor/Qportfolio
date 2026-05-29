'use client';

import { GoToTwentyII } from '@/components/GoToTwentyII';
import { DotIcon } from '../icons/dot';
import { gallery } from '../data';

export const Gallery = () => {
  return (
    <div className="relative mb-20 min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-campton text-2xl font-medium leading-tight text-black md:text-[32px]">
          Gallery
        </h1>
        <div className="shrink-0">
          <GoToTwentyII />
        </div>
      </div>

      <div className="columns-1 gap-4 pt-6 md:columns-2 lg:columns-3 lg:pt-16">
        {gallery.map((item, idx) => (
          <div key={idx} className="relative mb-4 h-auto w-full group">
            <img
              src={item.src}
              alt={item.name}
              className="h-auto w-full select-none"
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
