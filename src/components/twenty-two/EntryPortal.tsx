'use client';

import { useStep } from '@/contexts/StepContext';

export const EntryPortal = ({
  handleEntryPortalClose,
}: {
  handleEntryPortalClose: () => void;
}) => {
  const { setStep } = useStep();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  bg-cover bg-center bg-no-repeat p-4">
      <div className="relative max-w-[618px] w-full rounded-4xl p-8 md:p-12 flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/entry-portal.png')] bg-cover bg-center bg-no-repeat" />

        <div className="absolute inset-0 bg-[#1C1B1B]/82" />

        <button
          onClick={handleEntryPortalClose}
          className="absolute top-7 right-8 z-20 w-8 h-8 bg-white rounded flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Close modal"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="#2C2C2C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Header */}
          <h1 className="font-long-shot text-white text-[32px] md:text-3xl uppercase tracking-wider text-center mb-8">
            ENTRY PORTAL
          </h1>

          {/* Main Message */}
          <p className="font-montserrat text-white text-3xl md:text-4xl  font-semibold lg:text-[40px] text-center leading-[44px] mb-6">
            Before you enter,
            <br />
            center yourself.
          </p>

          {/* Sub Message */}
          <p className="font-montserrat text-white font-medium text-base md:text-lg text-center mb-8">
            This journey begins with <em className="italic">honesty</em>.
          </p>

          <button
            onClick={() => {
              setStep(1);
              handleEntryPortalClose();
            }}
            className="w-full max-w-[473px] h-[56px] bg-white text-[#2C2C2C] font-long-shot uppercase text-xl md:text-2xl py-4 px-8 hover:opacity-90 transition-opacity"
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
};
