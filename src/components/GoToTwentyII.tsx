'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { ArrowRightIcon } from './icons/arrow-right';

export const GoToTwentyII = () => {
  const router = useRouter();
  return (
    <button
      className="relative  lg:h-[193px] lg:w-[204px] bg-[url('/bg.png')] bg-cover bg-center px-2 py-2 lg:py-4  w-[181px] lg:px-6 overflow-hidden flex lg:flex-col lg:rounded-2xl rounded-lg items-center lg:items-start lg:gap-0 gap-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:brightness-110"
      onClick={() => router.push('/twenty-ii')}
    >
      <div className="relative z-10 flex lg:justify-between lg:gap-0 gap-1 items-center  lg:mb-2 w-full">
        <span className="text-[#F76C00] font-montserrat font-medium text-xs ">
          Return to:
        </span>
        <div className="text-white ">
          <ArrowRightIcon className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>

      {/* Main title section */}
      <div className="relative z-10  flex-col grow justify-center lg:flex hidden">
        <Image
          src="/restock.png"
          alt="Logo"
          width={154}
          height={97}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Twenty-II subtitle - positioned at bottom right */}
      <div className="relative z-10 lg:pt-4 flex lg:justify-end w-full">
        <span className="font-barbra text-base">
          <span className="text-[#57D791]">Twenty-</span>
          <span className="text-[#EB5D1D]">II</span>
        </span>
      </div>
    </button>
  );
};
