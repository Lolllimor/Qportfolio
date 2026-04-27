'use client';

import { useRouter } from 'next/navigation';

import { ArrowRightIcon } from '@/components/icons/arrow-right';

export const GoToTwentyII = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Visit Twenty-II"
      className="group relative block sm:h-[52px] h-9 w-[150px] sm:w-[206px] shrink-0 cursor-pointer overflow-hidden sm:rounded-xl rounded-md border-0 shadow-md outline-none ring-0 transition-[height,box-shadow] duration-300 ease-out lg:hover:h-[104px] lg:hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#57D791] focus-visible:ring-offset-2 p-6"
      onClick={() => router.push('/twenty-ii')}
    >
      <div className="absolute bottom-0 left-0 h-9 sm:h-[52px] w-[150px] sm:w-[206px] overflow-hidden sm:rounded-xl rounded-md  bg-[#121212] bg-[url('/bg.png')] bg-cover bg-center text-left lg:group-hover:h-[104px]">
        <div className="relative lg:group-hover:py-6 py-0 flex sm:px-6 px-2 lg:group-hover:items-start items-center h-full justify-center  flex-col">
          <p className="z-10   hidden lg:group-hover:block transition-all duration-300 font-campton text-xs font-normal tracking-wide text-white ">
            Visit
          </p>

          <div className=" z-10 flex items-center justify-between gap-3 w-full">
            <span className="min-w-0 font-barbra text-base sm:text-2xl leading-none tracking-tight">
              <span className="text-[#99FFCC]">Twenty</span>
              <span className="text-[#FF6633]">-II</span>
            </span>

            <span
              className="relative grid h-9 w-9 shrink-0 place-items-center"
              aria-hidden
            >
              <ArrowRightIcon className="col-start-1 row-start-1 h-5 w-5 text-white transition-opacity duration-300 lg:group-hover:opacity-0" />
              <span className="col-start-1 row-start-1 flex h-9 w-9 items-center justify-center rounded-lg bg-[#2a2a2a] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10 transition-opacity duration-300 lg:group-hover:opacity-100">
                <ArrowRightIcon className="h-4 w-4 text-white" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};
