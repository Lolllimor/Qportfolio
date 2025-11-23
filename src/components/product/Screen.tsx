'use client';

import { screens } from '../data';
import { ScreenItem } from '@/types';
import { useState } from 'react';

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
      <div className="flex flex-col gap-14 w-full max-w-[850px] xl:max-w-[1014px] mx-auto mb-20 pt-12 lg:pt-[67px] xl:pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {screens.map((screen: ScreenItem, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 cursor-pointer"
              onClick={() => handleScreenClick(screen)}
            >
              <div className="w-full rounded-lg overflow-hidden">
                <img
                  src={screen.imageSrc}
                  alt={screen.imageAlt}
                  className="w-full h-auto object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="flex flex-col items-center w-full">
                <h3 className="font-campton text-[#1C1C28] text-center font-causten text-base font-normal leading-normal">
                  {screen.title}
                </h3>
                <p className="font-campton text-[#353F50] text-center text-xs font-normal leading-normal">
                  {screen.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedScreen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-md px-4 py-2 text-white text-center">
              <h3 className="font-campton text-base font-normal">
                {selectedScreen.title}
              </h3>
              <p className="font-campton text-xs font-normal text-gray-300">
                {selectedScreen.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
