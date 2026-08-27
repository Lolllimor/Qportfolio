'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

import { screens } from '../data';
import { ScreenItem } from '@/types';

export const Screen = () => {
  const [selectedScreen, setSelectedScreen] = useState<ScreenItem | null>(null);

  const handleScreenClick = (screen: ScreenItem) => {
    setSelectedScreen(screen);
  };

  const handleCloseModal = () => {
    setSelectedScreen(null);
  };

  return (
    <>
      <div className="mx-auto mb-16 flex w-full max-w-[850px] flex-col pt-8 sm:mb-24 sm:pt-12 lg:pt-[67px] xl:max-w-[1014px] xl:pt-6">
        <h2 className="sr-only">Interface screens</h2>
        <ul className="flex list-none flex-col gap-10 p-0 sm:gap-12 md:gap-16">
          {screens.map((screen: ScreenItem) => (
            <li key={screen.imageSrc} className="ml-auto w-8/9 min-w-0">
              <button
                type="button"
                onClick={() => handleScreenClick(screen)}
                className="block w-full min-h-11 cursor-pointer text-left [-webkit-tap-highlight-color:transparent] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#E66001] active:opacity-90"
              >
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-[#E8E8E8]/80">
                  <Image
                    src={screen.imageSrc}
                    alt={screen.imageAlt}
                    width={screen.width}
                    height={screen.height}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                    sizes="(max-width: 850px) 89vw, 901px"
                  />
                </div>
                <p className="mt-3 font-campton text-sm font-medium uppercase tracking-[0.06em] text-[#1C1C28] sm:mt-4 sm:text-base">
                  {screen.title}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedScreen &&
        createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative flex h-full max-h-[min(92vh,100dvh)] w-full max-w-7xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute right-1 top-[max(0.5rem,env(safe-area-inset-top))] z-10 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-black/60 p-2 text-white touch-manipulation transition-colors hover:bg-black/70 sm:right-4 sm:top-4"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={selectedScreen.imageSrc}
              alt={selectedScreen.imageAlt}
              width={selectedScreen.width}
              height={selectedScreen.height}
              className="h-auto max-h-[min(90dvh,90vw)] w-auto max-w-[min(90vw,90dvh)] rounded-xl object-contain"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
