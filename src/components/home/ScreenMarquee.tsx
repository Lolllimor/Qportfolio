'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import { screens } from '@/components/data';

const motionSlides = [
  {
    imageSrc: '/home/motion/pay-button.gif',
    imageAlt: 'Pay button',
    title: 'Interaction',
    media: 'gif' as const,
  },
  {
    imageSrc: '/home/motion/pay-roll.gif',
    imageAlt: 'Pay button rolling away',
    title: 'Interaction',
    media: 'gif' as const,
  },
  {
    imageSrc: '/home/motion/pay-melt.gif',
    imageAlt: 'Pay button melting',
    title: 'Interaction',
    media: 'gif' as const,
  },
  {
    imageSrc: '/home/motion/frost-grow.mp4',
    imageAlt: 'Frost growing on Pay',
    title: 'Interaction',
    media: 'video' as const,
  },
  {
    imageSrc: '/home/motion/upload.gif',
    imageAlt: 'Upload button',
    title: 'Interaction',
    media: 'gif' as const,
  },
];

const slideOrder = [
  '/home/motion/frost-grow.mp4',
  '/screens/frame-4627.png',
  '/screens/frame-4623.png',
  '/home/motion/pay-melt.gif',
  '/screens/pink-aura.png',
  '/screens/frame-4617.png',
  '/screens/frame-4620.png',
  '/home/motion/upload.gif',
  '/screens/frame-4615.png',
  '/screens/frame-4825543.png',
  '/home/motion/pay-button.gif',
  '/screens/frame-4614.png',
  '/screens/frame-2095586295.png',
  '/screens/screenshot-2026-05-10.png',
  '/home/motion/pay-roll.gif',
  '/screens/frame-4626.png',
  '/screens/frame-4619.png',
  '/screens/frame-4616.png',
  '/screens/frame-4621.png',
  '/screens/frame-4618.png',
  '/screens/cede.png',
];

const slidesBySrc = new Map(
  [...motionSlides, ...screens].map((slide) => [slide.imageSrc, slide])
);
const slides = slideOrder.map((src) => {
  const slide = slidesBySrc.get(src);
  if (!slide) throw new Error(`Missing slideshow card: ${src}`);
  return slide;
});

/** Soft infinite strip of product screens, drifting to the right. */
export default function ScreenMarquee() {
  const strip = [...slides, ...slides];
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

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      trackRef.current?.querySelectorAll('video').forEach((video) => {
        if (motionQuery.matches) video.pause();
        else void video.play().catch(() => {});
      });
    };

    sync();
    syncMotion();
    motionQuery.addEventListener('change', syncMotion);
    window.addEventListener('resize', sync);
    window.addEventListener('scroll', sync, { passive: true });

    const ro = new ResizeObserver(sync);
    if (trackRef.current) ro.observe(trackRef.current);

    return () => {
      motionQuery.removeEventListener('change', syncMotion);
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
              <div
                className={`relative h-[200px] w-full overflow-hidden rounded-xl sm:h-[260px] md:h-[300px] ${
                  'media' in screen ? 'bg-[#F6F5F1]' : 'bg-[#E8E8E8]/80'
                }`}
              >
                {'media' in screen && screen.media === 'video' ? (
                  <video
                    src={screen.imageSrc}
                    aria-label={screen.imageAlt}
                    muted
                    playsInline
                    loop
                    autoPlay
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                ) : 'media' in screen && screen.media === 'gif' ? (
                  <img
                    src={screen.imageSrc}
                    alt={screen.imageAlt}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Image
                    src={screen.imageSrc}
                    alt={screen.imageAlt}
                    fill
                    sizes="480px"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                )}
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
