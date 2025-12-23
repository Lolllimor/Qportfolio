'use client';
import { useState, useEffect } from 'react';

import { CurtainTransition } from './CurtainTransition';
import { useStep } from '@/contexts/StepContext';
import { StrengthIcon } from '../icons/strength';

export const RecognizePage = () => {
  const { setStep } = useStep();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldOpenCurtain, setShouldOpenCurtain] = useState(false);


  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setShouldOpenCurtain(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setShouldOpenCurtain(false);
    setStep(3);
  };

  const handleTransitionComplete = () => {
    setStep(3);
    setIsTransitioning(false);
  };

  return (
    <>
      <div className="flex font-montserrat flex-col min-h-screen  bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat md:px-[75px] py-[40px] xl:px-[120px] xl:py-[57px] px-6 items-center">
        {' '}
        <div className="absolute top-0 left-0 w-full h-full bg-[#57D791]/30"></div>
        <header className='z-10'>
          {' '}
          <h2 className="font-barbra text-white text-3xl lg:text-2xl">
            Twenty- <span className="text-white">II</span>
          </h2>
        </header>
        <main className="mt-14 flex flex-col gap-14 items-center max-w-[610px] z-10">
          <h2 className="font-long-shot text-white text-[40px] lg:text-[72px]">
            Recognise Your Strength
          </h2>
          <StrengthIcon />
          <div className="flex flex-col gap-4 items-center">
            <p className="font-montserrat text-white text-base font-medium max-w-[264px] md:max-w-full w-full text-center lg:text-2xl">
              What strength have you underestimated?
            </p>
            <input
              type="text"
              className="w-full h-[97px] bg-white text-[#2C2C2C] font-barbra uppercase text-xl md:text-2xl py-4 px-8 hover:opacity-90 transition-opacity rounded-lg"
            />
            <button
              onClick={handleNext}
              className="mt-3 w-full max-w-[403px] bg-[#111112] font-long-shot uppercase text-2xl py-4 px-8 hover:opacity-90 transition-opacity cursor-pointer text-white"
            >
              NEXT
            </button>
          </div>
        </main>
      </div>
      <CurtainTransition
        isActive={isTransitioning}
        onTransitionComplete={handleTransitionComplete}
        onOpen={shouldOpenCurtain}
        color="#111112"
      />
    </>
  );
};
