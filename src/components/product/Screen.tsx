'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { screens } from '../data';
import { ScreenItem } from '@/types';

/** Product → Screens tab: mock card from design spec (#F9F9F9, #EDEDED, 24px radius, corner rivets, inset media 377×215). */
const rivetClass =
  'pointer-events-none absolute size-2 shrink-0 rounded-full bg-[#EAE8E8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]';

function ScreenCardShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#EDEDED] bg-[#F9F9F9] shadow-[inset_0_4px_1px_rgba(255,255,255,0.45),inset_0_-4px_2px_rgba(0,0,0,0.05)] sm:rounded-[24px]">
      <span
        className={`${rivetClass} left-4 top-5 sm:left-7 sm:top-6`}
        aria-hidden
      />
      <span
        className={`${rivetClass} right-4 top-5 sm:right-7 sm:top-6`}
        aria-hidden
      />
      <span
        className={`${rivetClass} bottom-5 left-4 sm:bottom-6 sm:left-7`}
        aria-hidden
      />
      <span
        className={`${rivetClass} bottom-5 right-4 sm:bottom-6 sm:right-7`}
        aria-hidden
      />
      <div className="relative z-10 px-4 pb-6 pt-5 sm:px-[38px] sm:pb-8 sm:pt-8">
        {children}
      </div>
    </div>
  );
}

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
      <div className="mx-auto mb-12 flex w-full max-w-[850px] flex-col pt-8 sm:mb-20 sm:pt-12 lg:pt-[67px] xl:max-w-[1014px] xl:pt-6">
        <ul className="grid list-none grid-cols-1 gap-3.5 p-0 lg:grid-cols-2 sm:gap-6 md:gap-7">
          {screens.map((screen: ScreenItem) => (
            <li key={screen.title} className="min-w-0">
              <button
                type="button"
                onClick={() => handleScreenClick(screen)}
                className="block w-full min-h-[44px] cursor-pointer text-left [-webkit-tap-highlight-color:transparent] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#E66001] active:opacity-90"
              >
                <ScreenCardShell>
                  <div className="aspect-377/215 w-full overflow-hidden rounded-md bg-[#E8E8E8]/80 mt-1 sm:rounded-lg">
                    <img
                      src={screen.imageSrc}
                      alt={screen.imageAlt}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 507px"
                    />
                  </div>
                  <div className="mt-3 flex min-w-0 flex-col gap-1 sm:mt-4 items-center">
                    <h3 className="text-pretty font-campton text-[15px] font-medium leading-snug text-[#1C1C28] sm:text-lg">
                      {screen.title}
                    </h3>
                    <p className="font-campton text-[11px] font-normal leading-normal text-[#353F50] sm:text-sm">
                      {screen.date}
                    </p>
                  </div>
                </ScreenCardShell>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedScreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:p-4"
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
            <img
              src={selectedScreen.imageSrc}
              alt={selectedScreen.imageAlt}
              className="max-h-[min(85dvh,calc(100dvh-7rem))] max-w-full rounded-md object-contain sm:max-h-[min(88vh,calc(100vh-5rem))] sm:rounded-lg"
            />
            <div className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-md bg-black/55 px-3 py-2 text-center text-white sm:bottom-4 sm:px-4">
              <h3 className="font-campton text-sm font-normal leading-snug sm:text-base">
                {selectedScreen.title}
              </h3>
              <p className="mt-0.5 font-campton text-[11px] font-normal text-gray-300 sm:text-xs">
                {selectedScreen.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
