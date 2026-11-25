'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import { screens } from '@/components/data';

const gifSlides = [
  {
    imageSrc: '/home/motion/coin.gif',
    imageAlt: 'Instant Payouts',
    title: 'Fintech',
    fit: 'contain' as const,
    background: '#EFE2CF',
  },
  {
    imageSrc: '/home/motion/status.gif',
    imageAlt: 'Status states',
    title: 'Interaction',
    fit: 'contain' as const,
    background: '#FFFFFF',
  },
];

const motionSlides = [
  {
    imageSrc: '/home/motion/pay-button.mp4',
    imageAlt: 'Pay button',
    title: 'Interaction',
    fit: 'contain' as const,
  },
  {
    imageSrc: '/home/motion/pay-roll.mp4',
    imageAlt: 'Pay button rolling away',
    title: 'Interaction',
    fit: 'contain' as const,
  },
  {
    imageSrc: '/home/motion/pay-melt.mp4',
    imageAlt: 'Pay button melting',
    title: 'Interaction',
    fit: 'contain' as const,
  },
  {
    imageSrc: '/home/motion/frost-grow.mp4',
    imageAlt: 'Frost growing on Pay',
    title: 'Interaction',
    fit: 'cover' as const,
  },
  {
    imageSrc: '/home/motion/upload.mp4',
    imageAlt: 'Upload button',
    title: 'Interaction',
    fit: 'contain' as const,
  },
];

const slideOrder = [
  '/home/motion/coin.gif',
  '/screens/frame-4617.png',
  '/home/motion/status.gif',
  '/screens/frame-4620.png',
  '/home/motion/pay-melt.mp4',
  '/screens/pink-aura.png',
  '/screens/frame-2095586295.png',
  '/home/motion/upload.mp4',
  '/screens/frame-4615.png',
  '/screens/frame-4627.png',
  '/screens/screenshot-2026-05-10.png',
  '/home/motion/frost-grow.mp4',
  '/screens/frame-4626.png',
  '/screens/frame-4619.png',
  '/home/motion/pay-button.mp4',
  '/screens/frame-4616.png',
  '/screens/frame-4623.png',
  '/home/motion/pay-roll.mp4',
  '/screens/cede.png',
  '/screens/frame-4621.png',
  '/screens/frame-4618.png',
];

const slidesBySrc = new Map(
  [...gifSlides, ...motionSlides, ...screens].map((slide) => [
    slide.imageSrc,
    slide,
  ])
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
  const [playMotion, setPlayMotion] = useState(false);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setPlayMotion(true);
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

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
          {strip.map((screen, index) => {
            const background =
              'background' in screen && typeof screen.background === 'string'
                ? screen.background
                : undefined;
            const fit =
              'fit' in screen && screen.fit === 'contain' ? 'contain' : 'cover';

            return (
            <div
              key={`${screen.imageSrc}-${index}`}
              className="flex w-[320px] shrink-0 flex-col gap-2 sm:w-[420px] md:w-[480px]"
            >
              <div
                className={`relative h-[200px] w-full overflow-hidden rounded-xl sm:h-[260px] md:h-[300px] ${
                  background
                    ? ''
                    : screen.imageSrc.endsWith('.mp4') ||
                        screen.imageSrc.endsWith('.gif')
                      ? 'bg-[#F6F5F1]'
                      : 'bg-[#E8E8E8]/80'
                }`}
                style={background ? { backgroundColor: background } : undefined}
              >
                {screen.imageSrc.endsWith('.gif') ? (
                  // Plain img so the browser plays the GIF. next/image flattens it.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={playMotion ? screen.imageSrc : undefined}
                    alt={screen.imageAlt}
                    className={`h-full w-full ${
                      fit === 'cover' ? 'object-cover' : 'object-contain'
                    }`}
                  />
                ) : screen.imageSrc.endsWith('.mp4') ? (
                  <video
                    src={playMotion ? screen.imageSrc : undefined}
                    aria-label={screen.imageAlt}
                    muted
                    playsInline
                    loop
                    autoPlay={playMotion}
                    preload={playMotion ? 'metadata' : 'none'}
                    onPlay={(event) => {
                      if (
                        window.matchMedia('(prefers-reduced-motion: reduce)')
                          .matches
                      ) {
                        event.currentTarget.pause();
                      }
                    }}
                    className={`h-full w-full ${
                      fit === 'cover' ? 'object-cover' : 'object-contain'
                    }`}
                  />
                ) : (
                  <Image
                    src={screen.imageSrc}
                    alt={screen.imageAlt}
                    fill
                    sizes="480px"
                    className={
                      fit === 'contain'
                        ? 'object-contain'
                        : 'object-cover object-top'
                    }
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
