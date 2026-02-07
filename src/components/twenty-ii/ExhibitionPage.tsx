'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFetchArtworks } from '@/hooks/useFetchArtworks';
import { Artwork } from '@/types';

const ArtworkCard = ({ tags, Year, art, Title, Price, BoughtBy }: Artwork) => {

  return (
    <div className="relative xl:w-[588px] xl:h-[588px] md:w-[420px] w-[342px] md:h-[420px] h-fit gap-2 md:gap-4  bg-[#F2F2F2] flex flex-col items-center justify-between font-montserrat">
      <div className="flex  w-full items-center justify-between px-4  pt-4 ">
        <div className="flex items-center gap-2 font-montserrat ">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className=" px-2.5 py-2 text-[#000000] md:px-4 md:py-3 text-[8px] md:text-xs bg-white uppercase"
            >
              {tag}
            </div>
          ))}
        </div>
        <span className=" text-[#7D7A7A] text-center font-semibold text-xs md:text-sm uppercase ">
          {Year}
        </span>
      </div>
      <div className=" border border-[#000000] xl:w-[353px] xl:h-[373px] md:w-[250px] w-[309px] md:h-[270px] h-[335px] relative overflow-hidden">
        {art?.url ? (
          <Image
            src={art.url}
            alt={Title}
            width={353}
            height={373}
            unoptimized
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full" />
        )}
        {BoughtBy && (
          <div className="absolute top-0 right-0 w-60 h-60 overflow-hidden z-50 pointer-events-none">
            <div className="absolute top-6 -right-8 bg-[#E3591C] text-white text-[10px] md:text-xs font-bold uppercase px-12 py-1.5 transform rotate-45 shadow-xl">
              SOLD
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center w-full gap-2  mb-[34px] md:mb-5 ">
        <span className="  text-black font-semibold text-base md:text-lg uppercase ">
          {Title}
        </span>
        <span className="text-[#7D7A7A] font-semibold text-xs md:text-base">
          ₦{' '}
          {Number(Price).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
    </div>
  );
};

const ExhibitionPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;
  const { artworks, loading, error, pagination } = useFetchArtworks(
    currentPage,
    pageSize
  );

  const totalPages = pagination?.pageCount || 1;

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full xl:h-[708px] h-fit overflow-hidden bg-[url('/bg.png')] bg-cover bg-center lg:px-[75px] py-[40px] xl:px-[120px] xl:py-[57px] px-6">
        <a href="/twenty-ii"
          className="font-barbra text-[#57D791] text-[32px] mb-[28px]
        xl:text-5xl"
        >
          Twenty- <span className="text-[#EB5D1D]">II</span>
        </a>

        <div className="flex md:flex-row flex-col w-full justify-between items-center">
          <div className=""></div>
          <Image
            src="/restock.png"
            alt="Logo"
            width={403}
            height={256}
            className="xl:w-[403px] xl:h-[256px] w-[300px] h-[190px] "
          />

          <div className=" xl:w-[627px] xl:h-[476px] lg:w-[470px] w-[350px]  rounded-2xl bg-white h-fit  pb-[28px] xl:pb-0 mt-4 lg:mt-0">
            <div className="h-5 w-full bg-[#E3591C] rounded-t-2xl"></div>
            <div className="h-5 w-full bg-[#57D791]"></div>
            <div className="h-5 w-full bg-[#49B7D9]"></div>
            <div className="xl:w-[581px] w-full mt-[38px] px-[23px]">
              <p className="xl:text-xl lg:text-base text-sm xl:leading-8 leading-6 mb-[18px] xl:w-[581px] xl:h-[262px] lg:w-[400px] w-[300px] h-fit font-montserrat">
                <span className="text-[#7D7A7A]">This exhibition, </span>
                <span className="text-black font-bold italic">
                  Restacking the Odds,
                </span>
                <span className="text-[#7D7A7A]">
                  {' '}
                  presents a collection of artworks that explore the themes of
                  focus, courage, and transformation. Each piece reflects how
                  discipline, intentional action, and the drive for change can
                  realign one's life and identity. Through this curated body of
                  work,{' '}
                </span>
                <span className="text-black font-semibold italic">
                  TWENTY-II
                </span>
                <span className="text-[#7D7A7A]">
                  {' '}
                  invites viewers to reflect on how meaningful change begins
                  from within and unfolds through conscious, personal shifts.
                </span>
              </p>

              {/* Buttons */}
              <div className="flex flex-col lg:flex-row items-center gap-4 xl:w-[588px] lg:w-[470px] w-full lg:h-14 font-montserrat">
                <button className=" xl:h-14 h-10   bg-[#EB5D1D] flex justify-center items-center gap-2.5 xl:w-[286px] lg:w-[200px] w-full">
                  <span className="text-white text-center font-medium xl:text-xl text-base">
                 Register
                  </span>
                </button>
                <Link 
                  href="/twenty-ii/artist"
                  className="xl:h-14 h-10 py-2 border border-black flex justify-center items-center gap-2.5 xl:w-[286px] lg:w-[200px] w-full hover:bg-black transition-colors group"
                >
                  <span className="text-black group-hover:text-white text-center font-medium xl:text-xl text-base transition-colors">
                    About the Artist
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Artworks Section */}
      <div className="pt-[60px] pb-[110px]">
        <h2 className=" font-montserrat text-center text-black font-bold lg:text-[32px] text-2xl uppercase mb-[51px]">
          Explore artworks
        </h2>

        {/* Artworks Grid */}
        <div className="xl:px-[120px] md:px-[75px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center ">
          {loading ? (
            <div className="col-span-2 py-20 text-center text-gray-500">
              Loading artworks...
            </div>
          ) : error ? (
            <div className="col-span-2 py-20 text-center text-red-500">
              Error loading artworks. Please try again.
            </div>
          ) : artworks && artworks.length > 0 ? (
            artworks.map((artwork) => (
              <Link
                key={artwork.id}
                href={`/twenty-ii/artworks/${artwork.documentId || artwork.id
                  }`}
              >
                <div className="cursor-pointer hover:opacity-90 transition-opacity">
                  <ArtworkCard {...artwork} />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-2 py-20 text-center text-gray-500">
              No artworks found.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-[110px] font-montserrat">
          <div className="flex items-center justify-center gap-[18px] bg-black rounded-lg px-4 py-2">
            {/* Skip Backward Button */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="w-6 h-6 flex justify-center items-center disabled:opacity-50"
              aria-label="Skip to first page"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.2409 7.22006V16.7901C20.2409 18.7501 18.1109 19.9801 16.4109 19.0001L12.2609 16.6101L8.11094 14.2101C6.41094 13.2301 6.41094 10.7801 8.11094 9.80006L12.2609 7.40006L16.4109 5.01006C18.1109 4.03006 20.2409 5.25006 20.2409 7.22006Z"
                  fill="white"
                />
                <path
                  d="M3.76172 18.9298C3.35172 18.9298 3.01172 18.5898 3.01172 18.1798V5.81982C3.01172 5.40982 3.35172 5.06982 3.76172 5.06982C4.17172 5.06982 4.51172 5.40982 4.51172 5.81982V18.1798C4.51172 18.5898 4.17172 18.9298 3.76172 18.9298Z"
                  fill="white"
                />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-6 h-6 flex justify-center items-center bg-white rounded disabled:opacity-50"
              aria-label="Go to previous page"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.79 15C14.08 15.29 14.08 15.77 13.79 16.06C13.64 16.21 13.45 16.28 13.26 16.28C13.07 16.28 12.88 16.21 12.73 16.06L9.2 12.53C8.91 12.24 8.91 11.76 9.2 11.47L12.73 7.94C13.02 7.65 13.5 7.65 13.79 7.94C14.08 8.23 14.08 8.71 13.79 9L10.79 12L13.79 15Z"
                  fill="black"
                />
              </svg>
            </button>

            {/* Page Indicator */}
            <div className="flex items-center gap-0">
              <div className="flex flex-col justify-center items-center w-6 h-6 bg-white rounded">
                <span className="text-black text-center text-base">
                  {currentPage}
                </span>
              </div>
              <div className="flex flex-col justify-center w-[39px] h-6">
                <span className="text-white text-center text-base">
                  of {totalPages}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="w-6 h-6 flex justify-center items-center bg-white rounded disabled:opacity-50"
              aria-label="Go to next page"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM14.79 12.53L11.26 16.06C11.11 16.21 10.92 16.28 10.73 16.28C10.54 16.28 10.35 16.21 10.2 16.06C9.91 15.77 9.91 15.29 10.2 15L13.2 12L10.2 9C9.91 8.71 9.91 8.23 10.2 7.94C10.49 7.65 10.97 7.65 11.26 7.94L14.79 11.47C15.09 11.76 15.09 12.24 14.79 12.53Z"
                  fill="black"
                />
              </svg>
            </button>

            {/* Skip Forward Button */}
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="w-6 h-6 flex justify-center items-center disabled:opacity-50"
              aria-label="Skip to last page"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.76172 7.22006V16.7901C3.76172 18.7501 5.89172 19.9801 7.59172 19.0001L11.7417 16.6101L15.8917 14.2101C17.5917 13.2301 17.5917 10.7801 15.8917 9.80006L11.7417 7.40006L7.59172 5.01006C5.89172 4.03006 3.76172 5.25006 3.76172 7.22006Z"
                  fill="white"
                />
                <path
                  d="M20.2383 18.9298C19.8283 18.9298 19.4883 18.5898 19.4883 18.1798V5.81982C19.4883 5.40982 19.8283 5.06982 20.2383 5.06982C20.6483 5.06982 20.9883 5.40982 20.9883 5.81982V18.1798C20.9883 18.5898 20.6583 18.9298 20.2383 18.9298Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionPage;
