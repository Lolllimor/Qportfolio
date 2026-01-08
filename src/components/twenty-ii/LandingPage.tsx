'use client';
import { useState } from 'react';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HamburgerMenu } from '../icons/hamburger-menu';
import { ArrowRightIcon } from '../icons/arrow-right';
import { InstagramIcon } from '../icons/instagram';
import { LocationIcon } from '../icons/location';
import { EntryPortal } from './EntryPortal';
import { EmailIcon } from '../icons/email';
import { CallIcon } from '../icons/call';
import { XIcon } from '../icons/x';

//

const LandingPage = () => {
  const [isEntryPortalOpen, setIsEntryPortalOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const handleEntryPortalOpen = () => {
    setIsEntryPortalOpen(true);
  };

  const handleEntryPortalClose = () => {
    setIsEntryPortalOpen(false);
  };
  const handleHamburgerMenuOpen = () => {
    setIsHamburgerMenuOpen(true);
  };
  const handleHamburgerMenuClose = () => {
    setIsHamburgerMenuOpen(false);
  };
  const handleCopyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText('08198475894');
      toast.success('Phone number copied to clipboard', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      console.error('Failed to copy phone number:', err);
    }
  };
  return (
    <div className="flex font-montserrat flex-col min-h-screen  bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat md:px-[75px] py-[40px] xl:px-[120px] xl:py-[57px] px-6 text-white">
      <header className=" flex justify-between items-center w-full max-w-[1440px] mx-auto">
        <h2 className="font-barbra text-[#57D791] text-3xl xl:text-5xl">
          Twenty- <span className="text-[#EB5D1D]">II</span>
        </h2>
        <button onClick={handleHamburgerMenuOpen} className="md:hidden block">
          <HamburgerMenu />
        </button>
        {isHamburgerMenuOpen && (
          <div className="absolute top-20 right-0 w-[249px] h-[132px] bg-black ">
            <button
              onClick={handleHamburgerMenuClose}
              className="absolute flex flex-col items-start  p-[14px] gap-4"
            >
              <a href="/" className="font-semibold">
                Back to Main Website
              </a>
              <span
                onClick={() => setOpenContact(true)}
                className="font-semibold"
              >
                Contact
              </span>
              <a
                href="https://www.instagram.com/twentyiiart/"
                target="_blank"
                rel="noopener noreferrerz"
              >
                <InstagramIcon />
              </a>
            </button>
          </div>
        )}
        {openContact && (
          <div className=" absolute flex justify-center items-center h-full w-full inset-0 bg-black/50 z-99999">
            <div className=" bg-black flex flex-col items-start py-[40px] px-[20px] md:px-[48px] gap-4 relative w-[276px] md:w-[374px]">
              <button
                onClick={() => setOpenContact(false)}
                className="absolute md:top-4 md:right-4 top-[14px] right-[14px]"
              >
                <div className="md:w-8 md:h-8 h-6 w-6">
                  <XIcon />
                </div>
              </button>
              <button
                onClick={handleCopyPhoneNumber}
                className="flex gap-2 items-center"
              >
                <div className="md:hidden block">
                  <CallIcon size={16} />
                </div>
                <div className="hidden md:block">
                  <CallIcon size={24} />
                </div>
                <span className="md:text-xl text-base">Call - 08198475894</span>
              </button>
              <button
                onClick={() =>
                  window.open('mailto:Hello.twentyii@gmail.com', '_blank')
                }
                className="flex gap-2 items-center"
              >
                <div className="md:hidden block">
                  <EmailIcon size={16} />
                </div>
                <div className="hidden md:block">
                  <EmailIcon size={24} />
                </div>

                <span className="md:text-xl text-base">
                  Hello.twentyii@gmail.com
                </span>
              </button>
            </div>
          </div>
        )}
        <nav className="hidden md:flex items-center gap-4 font-semibold text-sm xl:text-base">
          <a href="/">Back to Main Website</a>
          <button onClick={() => setOpenContact(true)}>Contact</button>
          <a
            href="https://www.instagram.com/twentyiiart/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </a>
        </nav>
      </header>
      <main className="flex flex-col lg:flex-row lg:items-center justify-between w-full mt-10 md:mt-[113px] max-w-[1440px] mx-auto">
        <div className="flex justify-center lg:justify-start w-full lg:w-auto lg:items-end">
          <div className="flex flex-col gap-4 items-end">
            <Image
              src="/restock.png"
              alt="image"
              width={650}
              height={410}
              loading="eager"
              className="md:w-[502px] md:h-[321px] w-full h-[200px] xl:w-[650px] xl:h-[410px]"
            />
            <p className="md:text-lg xl:text-2xl text-base">
              A Solo Exhibition by{' '}
              <span className="font-semibold text-[#EB5D1D]">Quadri Morin</span>
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-10 lg:max-w-[225px]">
          <div className=" flex flex-col gap-6 xl:gap-8 text-sm xl:text-base w-full lg:w-auto">
            <div className="flex flex-col gap-2">
              <span>Location</span>
              <div className="w-full flex ">
                <p className="underline font-semibold max-w-[189px]">
                  OneArt Gallery, Anthony Village, Lagos
                </p>
                <LocationIcon className="animate-breathing" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>Time</span>
              <p className=" font-semibold ">1PM - 6PM</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-12 md:gap-0">
              <div className="flex flex-col gap-2">
                <span>Date</span>
                <p className=" font-semibold ">February 14, 2026</p>
              </div>
              <div className="lg:hidden flex flex-col md:flex-row gap-4  md:h-12">
                <button
                  onClick={handleEntryPortalOpen}
                  className="border border-[#ffffff] py-3 xl:py-4 cursor-not-allowed text-white w-full md:w-[180px] xl:w-[269px] text-base xl:text-xl group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="group-hover:scale-75 transition-transform duration-300 inline-block font-medium text-sm">
                    Experience the Art
                  </span>
                </button>
                <button
                  onClick={() =>
                    window.open('https://pv.rsvp/twenty-ii', '_blank')
                  }
                  className="bg-[#EB5D1D] group py-3 px-7 xl:py-4 xl:px-10 text-white font-medium w-full md:w-[180px] xl:w-[269px] text-base xl:text-xl cursor-pointer relative"
                >
                  <span className="group-hover:scale-75 transition-transform duration-300 inline-block font-medium text-sm">
                    Register
                    <ArrowRightIcon className="absolute  top-1/2 -translate-y-1/2 inline-block opacity-0 -translate-x-4 ml-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="hidden lg:flex w-full  justify-end gap-4 mt-16 max-w-[1440px] mx-auto">
        <button
          onClick={() => setIsEntryPortalOpen(true)}
          className="border border-[#ffffff] py-3 xl:py-4 cursor-pointer text-white w-[191px] xl:w-[269px] text-base xl:text-xl group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className=" group-hover:scale-75 transition-transform duration-300 inline-block font-medium">
            Experience the Art
          </span>
        </button>
        <button
          onClick={() => window.open('https://pv.rsvp/twenty-ii', '_blank')}
          className="bg-[#EB5D1D] group py-3 px-7 xl:py-4 xl:px-10 text-white font-medium w-[191px] xl:w-[269px] text-base xl:text-xl cursor-pointer relative"
        >
          <span className="group-hover:scale-75 transition-transform duration-300 inline-block font-medium">
            Register
            <ArrowRightIcon className="absolute  top-1/2 -translate-y-1/2 inline-block opacity-0 -translate-x-4 ml-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </span>
        </button>
      </div>
      {isEntryPortalOpen && (
        <EntryPortal handleEntryPortalClose={handleEntryPortalClose} />
      )}
      <ToastContainer />
    </div>
  );
};

export default LandingPage;
