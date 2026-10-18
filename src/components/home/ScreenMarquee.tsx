'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import { screens } from '@/components/data';

/** Soft infinite strip of product screens, drifting to the right. */
export default function ScreenMarquee() {
  const strip = [...screens, ...screens];
  const shellRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [bleed, setBleed] = useState<{ left: number; width: number } | null>(
    null
  );
  const [trackHeight, setTrackHeight] = useState(0);

  useLayoutEffect(() => {
    const sync = () => {
      const shell = shellRef.current;
      const track = trackRef.current;
      if (!shell) return;

      // clientWidth excludes scrollbar — unlike 100vw, so no page-wide X scroll
      const width = document.documentElement.clientWidth;
      const left = shell.getBoundingClientRect().left;
      setBleed({ left, width });

      if (track) {
        setTrackHeight(track.offsetHeight);
      }
    };

    sync();
    window.addEventListener('resize', sync);
    window.addEventListener('scroll', sync, { passive: true });

    const ro = new ResizeObserver(sync);
    if (trackRef.current) ro.observe(trackRef.current);

    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('scroll', sync);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={shellRef}
      className="relative mt-10 w-full min-w-0 sm:mt-14"
      style={{ height: trackHeight || undefined }}
      aria-label="Interface screens slideshow"
    >
      <div
        ref={trackRef}
        className="overflow-hidden"
        style={
          bleed
            ? {
                position: 'absolute',
                top: 0,
                left: -bleed.left,
                width: bleed.width,
              }
            : {
                position: 'relative',
                width: '100%',
              }
        }
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
