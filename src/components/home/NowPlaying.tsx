'use client';

import { useEffect, useId, useState } from 'react';

import type { NowPlaying } from '@/lib/spotify';

const IDLE: NowPlaying = { configured: false, isPlaying: false };

function Badge({ phrase, spin }: { phrase: string; spin: boolean }) {
  const ringId = `now-playing-ring-${useId().replace(/:/g, '')}`;

  return (
    <div className="relative size-[156px] sm:size-[172px]">
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 h-full w-full ${spin ? 'now-playing-spin' : ''}`}
        aria-hidden
      >
        <circle cx="100" cy="100" r="100" fill="#111111" />
        <defs>
          <path
            id={ringId}
            d="M100 26a74 74 0 1 1 0 148 74 74 0 1 1 0-148"
          />
        </defs>
        <text
          fill="#ffffff"
          fontSize="15"
          letterSpacing="2.6"
          className="font-campton"
        >
          <textPath href={`#${ringId}`}>
            {`${phrase} · ${phrase} · ${phrase} ·`}
          </textPath>
        </text>
      </svg>
      <div className="absolute top-1/2 left-1/2 flex h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#6a6a6a] sm:h-[86px] sm:w-[86px]">
        <svg viewBox="0 0 64 64" className="h-11 w-11" aria-hidden>
          <path
            d="M14 26c11-5 26-5 36 2.5"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M16 36c9-3.8 22-3.8 31 2"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M19 46c7-2.6 16-2.6 22 1.4"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default function NowPlaying() {
  const [track, setTrack] = useState<NowPlaying>(IDLE);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (!response.ok) return;
        const data = (await response.json()) as NowPlaying;
        if (!ignore) setTrack(data);
      } catch {
        if (!ignore) setTrack(IDLE);
      }
    };

    load();
    const interval = window.setInterval(load, 30_000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') load();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      ignore = true;
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const playing = track.isPlaying;
  const label = playing
    ? `Now playing ${track.title} by ${track.artist}`
    : 'Not playing';

  const badge = (
    <Badge phrase={playing ? 'NOW PLAYING' : 'NOT PLAYING'} spin={playing} />
  );

  return (
    <section
      aria-label={label}
      className="fixed right-4 bottom-[4.75rem] z-40 sm:right-6 lg:bottom-6"
    >
      {playing ? (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-normal
          aria-label={label}
          className="block rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
        >
          {badge}
        </a>
      ) : (
        <div className="rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
          {badge}
        </div>
      )}
    </section>
  );
}
