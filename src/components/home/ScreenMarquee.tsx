'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import { screens } from '@/components/data';

/** Soft infinite strip of product screens, drifting to the right. */
export default function ScreenMarquee() {
  const strip = [...screens, ...screens];
  const measureRef = useRef<HTMLDivElement>(null);
  const [bleedLeft, setBleedLeft] = useState(0);

  useLayoutEffect(() => {
    const sync = () => {
      const el = measureRef.current;
      if (!el) return;
      // Align strip to the real viewport left (calc(50%-50vw) fails when the
      // content column is offset by the sidebar).
      setBleedLeft(-el.getBoundingClientRect().left);
    };

    sync();
    window.addEventListener('resize', sync);
    window.addEventListener('scroll', sync, { passive: true });
    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('scroll', sync);
    };
  }, []);

  return (
    <div ref={measureRef} className="mt-10 w-full min-w-0 sm:mt-14">
      <div
        className="overflow-hidden"
        style={{
          width: '100vw',
          marginLeft: bleedLeft,
        }}
        aria-label="Interface screens slideshow"
      >
        <div className="screen-marquee flex w-max gap-4 sm:gap-5">
          {strip.map((screen, index) => (
            <div
              key={`${screen.imageSrc}-${index}`}
              className="flex w-[320px] shrink-0 flex-col gap-2 sm:w-[420px] md:w-[480px]"
            >
              <div className="relative h-[200px] w-full overflow-hidden rounded-xl bg-[#E8E8E8]/80 sm:h-[260px] md:h-[300px]">
                <Image
                  src={screen.imageSrc}
                  alt={screen.imageAlt}
                  fill
                  sizes="480px"
                  className="object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="px-0.5">
                <p className="font-campton text-sm font-medium leading-tight text-[#353F50] sm:text-base">
                  {screen.imageAlt}
                </p>
                <p className="mt-0.5 font-campton text-[11px] tracking-wide text-[#5C5C5C] uppercase sm:text-xs">
                  {screen.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
