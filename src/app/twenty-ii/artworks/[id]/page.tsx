'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useFetchArtwork } from '@/hooks/useFetchArtwork';
import { useFetchArtworks } from '@/hooks/useFetchArtworks';
import { Artwork } from '@/types';
import { div } from 'framer-motion/client';

const ArtworkCard = ({
  tags,
  Year,
  art,
  Title,
  Price,
  id,
}: Artwork & { id: number }) => {
  return (
    <Link href={`/twenty-ii/artworks/${id}`}>
      <div className="xl:w-[588px] xl:h-[588px] md:w-[420px] w-[342px] md:h-[420px] h-fit gap-2 md:gap-4 bg-[#F2F2F2] flex flex-col items-center justify-between font-montserrat cursor-pointer hover:opacity-90 transition-opacity">
        <div className="flex w-full items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-2 font-montserrat">
            {tags.map((tag, idx) => (
              <div
                key={idx}
                className="px-2.5 py-2 text-[#000000] text-[8px] bg-white uppercase"
              >
                {tag}
              </div>
            ))}
          </div>
          <span className="text-[#7D7A7A] text-center font-semibold text-xs uppercase">
            {Year}
          </span>
        </div>
        <div className="border border-[#000000] xl:w-[353px] xl:h-[373px] md:w-[250px] w-[309px] md:h-[270px] h-[335px] relative overflow-hidden">
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
            <div className="w-full h-full bg-[#D9D9D9]" />
          )}
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-2 mb-[34px] md:mb-5">
          <span className="text-black font-semibold text-base uppercase">
            {Title}
          </span>
          <span className="text-[#7D7A7A] font-semibold text-xs">
            ₦{' '}
            {Number(Price).toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

const DetailsPage = () => {
  const params = useParams();
  const artworkId = params?.id as string;
  const { artwork, loading, error } = useFetchArtwork(artworkId);

  // Fetch related artworks (excluding current one)
  const { artworks: allArtworks } = useFetchArtworks(1, 25);
  const relatedArtworks =
    allArtworks?.filter((art) => art.id !== artwork?.id).slice(0, 2) || [];

  return (
    <div className="w-full min-h-screen bg-white font-montserrat">
      {/* Hero Section */}
      <div className="relative w-full h-fit overflow-hidden lg:px-[75px] py-[40px] xl:px-[120px] xl:py-[57px] px-6">
        <div className="flex items-center justify-between md:mb-[69px] mb-3">
          <a href="/twenty-ii"
            className="font-barbra text-[#57D791] text-[32px] 
        lg:text-5xl"
          >
            Twenty- <span className="text-[#EB5D1D]">II</span>
          </a>
          <Link
            href="/twenty-ii/artworks"
            className="text-[#E3591C] font-semibold text-base hidden md:block"
          >
            Back to Artworks
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">Loading artwork...</div>
          </div>
        ) : error || !artwork ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500">
              Error loading artwork. Please try again.
            </div>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col w-full justify-center items-center bg-[#454545] xl:py-[140px] xl:px-[205px] md:py-16 md:px-24 py-0 px-0">
            <div className="py-10 xl:px-[69px] md:px-10 px-6 bg-[#F6F6F6] xl:w-[788px] md:w-[588px] w-full flex flex-col items-center">
              <div className="flex flex-col gap-14 w-full">
                <div className="flex gap-5 justify-center">
                  {artwork.tags.map((tag, idx) => (
                    <div
                      key={idx}
                      className={`px-2.5 py-2 text-[#000000] text-[8px] bg-white uppercase ${idx === 0 ? 'hidden md:block' : ''
                        }`}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <h2 className="uppercase text-black font-semibold text-center md:text-[40px] text-[32px]">
                  {artwork.Title}
                </h2>
                <div className="flex flex-col gap-[23px] text-[#7D7A7A] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="uppercase">Date:</span>
                    <span className="text-[#000000] uppercase font-medium">
                      {artwork.Date || 'N/A'}
                    </span>
                  </div>
                  <hr className="text-[#D8D8D8]" />
                  <div className="flex justify-between items-center">
                    <span className="uppercase">Collection:</span>
                    <span className="text-[#000000] uppercase font-medium">
                      {artwork.Collection || 'N/A'}
                    </span>
                  </div>
                  <hr className="text-[#D8D8D8]" />
                  <div className="flex justify-between items-center">
                    <span className="uppercase">BOUGHT BY:</span>
                    <span className="text-[#000000] uppercase font-medium">
                      {artwork.BoughtBy || 'Not purchased'}
                    </span>
                  </div>
                  <hr className="text-[#D8D8D8]" />
                </div>
              </div>
              <div className='bg-[url("/details.png")] bg-cover bg-center w-[588px] h-[588px] mt-2 flex items-center justify-center'>
                {artwork.art?.url ? (
                  <Image
                    src={artwork.art.url}
                    alt={artwork.Title}
                    width={353}
                    height={373}
                    unoptimized
                    className=" max-w-[353px] max-h-[373px] object-contain w-full h-full border-[#000000]"
                  />
                ) : (
                  <div className="bg-[#D9D9D9] border-2 border-[#000000] h-[373px] w-[353px]" />
                )}
              </div>

              <div className="mt-2 flex flex-col justify-center items-center gap-4 w-full font-montserrat">
                <span className="text-black font-bold md:text-[32px] text-2xl">
                  ₦{' '}
                  {Number(artwork.Price).toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
                {artwork.BoughtBy ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-[60px] md:h-2.5 h-1 bg-[#E3591C]" />
                    <span className="text-5xl uppercase font-long-shot text-[#E3591C]">
                      SOLD
                    </span>
                    <div className="w-[60px] md:h-2.5 h-1 bg-[#E3591C]" />
                  </div>
                ) : (
                  <button className="bg-[#E3591C] text-white font-medium text-xl font-montserrat px-4 w-full h-[56px]">
                    Buy Artwork
                  </button>
                )}

                <a
                  href=""
                  className="font-semibold text-base text-black mt-2 underline"
                >
                  About the Artist
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {relatedArtworks.length > 0 && (
        <div className="pt-[60px] pb-[110px]">
          <h2 className="font-montserrat text-center text-black font-bold lg:text-[32px] text-2xl uppercase mb-[51px]">
            Related Artworks
          </h2>
          <div className="xl:px-[120px] md:px-[75px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
            {relatedArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} {...artwork} id={artwork.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
