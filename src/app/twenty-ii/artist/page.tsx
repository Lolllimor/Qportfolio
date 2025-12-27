'use client';


import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { InstagramIcon } from '@/components/icons/instagram';

const Artist = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
     
      <header className="flex justify-between items-center px-6 md:px-[75px] xl:px-[120px] pt-[40px] xl:pt-[57px]">
        <div className="flex flex-col gap-4">
          <h1 className="font-barbra text-[#57D791] text-[32px] xl:text-5xl">
            Twenty- <span className="text-[#EB5D1D]">II</span>
          </h1>
        </div>
        <button
          onClick={() => router.back()}
          className="text-[#EB5D1D] text-sm xl:text-base font-semibold"
        >
          Back to Main Website
        </button>
      </header>{' '}
      <button
        onClick={() => router.back()}
        className="w-6 h-6 bg-white flex items-center justify-center md:mx-[75px] mx-[22px] xl:mx-[120px] mt-8 mb-4.5"
        aria-label="Go back"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <main className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 md:px-[75px] xl:px-[120px] pb-10 xl:pb-16 md:items-center items-start relative">

        <div className="w-full lg:w-1/2 aspect-square bg-[#F2F2F2] relative overflow-hidden xl:py-24 md:py-16 xl:px-16 md:px-12 flex items-center justify-center py-8 px-[38px]">
    
          <div className=" bg-[#D9D9D9] border border-black xl:w-[460px] lg:w-[300px] xl:h-[405px] lg:h-[270px] w-full h-full" />
        </div>


        <div className="w-full lg:w-1/2 flex flex-col justify-between font-montserrat">
          <div className="text-white text-base xl:text-lg leading-relaxed">
            <p>
              <span className="font-semibold">Quadri Morin</span> is an artist
              whose work explores self-empowerment; inner transformation; and
              the quiet shifts that redefine personal identity. Blending{' '}
              <span className="font-semibold">digital expression</span> with
              conceptual <span className="font-semibold">storytelling</span>, he
              creates visual experiences that invite viewers to pause; reflect;
              and reconnect with their own internal journey. His practice is
              rooted in observation and intentionality, weaving everyday{' '}
              <span className="font-semibold">human emotions</span> into layered
              compositions that feel both intimate and expansive. Quadri's work
              continues to evolve as he experiments with new forms, mediums, and
              narratives that challenge how we see ourselves and the world
              around us.
            </p>
          </div>

          {/* Footer Icons */}
          <div className="flex gap-4 mt-8 lg:mt-0 justify-end lg:absolute bottom-10 lg:bottom-0 xl:bottom-16 xl:right-[120px] md:right-[75px] right-[22px]  ">
            {/* Instagram Icon */}
            <a
              href=""
              className="w-8 h-8  flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-colors"
              aria-label="Instagram"
            >
              <div className="scale-75">
                <InstagramIcon />
              </div>
            </a>

            <a
              href="mailto:quadmor@hotmail.com"
              className="w-8 h-8  flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-colors"
              aria-label="Email"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.332 13.6668H4.66536C2.66536 13.6668 1.33203 12.6668 1.33203 10.3335V5.66683C1.33203 3.3335 2.66536 2.3335 4.66536 2.3335H11.332C13.332 2.3335 14.6654 3.3335 14.6654 5.66683V10.3335C14.6654 12.6668 13.332 13.6668 11.332 13.6668Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.3346 6L9.24797 7.66667C8.5613 8.21333 7.43463 8.21333 6.74797 7.66667L4.66797 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Artist;
