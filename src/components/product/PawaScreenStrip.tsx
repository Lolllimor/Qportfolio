'use client';

import { useRef, useState } from 'react';
import { PhoneScreenImage } from './IphoneFrame';

type Screen = {
  src: string;
  alt: string;
};

export function PawaScreenStrip({
  screens,
  caption,
}: {
  screens: readonly Screen[];
  caption: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const total = screens.length;

  function updatePage() {
    const scroller = scrollerRef.current;
    const first = scroller?.firstElementChild as HTMLElement | undefined;
    if (!scroller || !first) {
      return;
    }

    const step = first.offsetWidth + 16;
    const next = Math.round(scroller.scrollLeft / step) + 1;
    setPage(Math.min(total, Math.max(1, next)));
  }

  return (
    <figure className="my-10">
      <div
        ref={scrollerRef}
        onScroll={updatePage}
        className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0 md:pr-8"
      >
        {screens.map((screen) => (
          <div
            key={screen.src}
            className="w-[calc(50%-0.5rem)] shrink-0 md:w-[calc(25%-0.75rem)]"
          >
            <PhoneScreenImage
              src={screen.src}
              alt={screen.alt}
              sizes="(max-width: 768px) 45vw, 220px"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <figcaption className="font-campton text-sm leading-relaxed text-[#5C5C5C]">
          {caption}
        </figcaption>
        <p className="shrink-0 font-campton text-sm tabular-nums text-[#5C5C5C]">
          {page}/{total}
        </p>
      </div>
    </figure>
  );
}
