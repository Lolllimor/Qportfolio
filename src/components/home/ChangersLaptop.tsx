'use client';
import { motion } from 'framer-motion';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

export default function ChangersLaptop() {
  const isLargeScreen = useIsLargeScreen();

  return (
    <div className="flex flex-col items-center gap-2 lg:w-auto w-full">
      <motion.a
        href="https://www.behance.net/gallery/235856111/Changers-UX-Case-Study"
        target="_blank"
        rel="noreferrer"
        whileHover={isLargeScreen ? 'hover' : undefined}
        initial="initial"
        className="group cursor-pointer xl:w-[333px] xl:h-[472px] lg:w-[284px] lg:h-[384px] w-full h-[320px] rounded-lg relative overflow-hidden flex justify-center"
        style={{
          background:
            'linear-gradient(210deg, #F8FFED -0.16%, #E9F0FF 107.17%)',
        }}
      >
        <motion.img
          variants={{
            initial: {
              scale: 1,
              rotate: 0,
              x: 0,
              y: 0,
            },
            hover: {
              scale: 1.15,
              rotate: 14.482,
              x: 10,
              y: -100,
            },
          }}
          transition={{
            type: 'tween',
            stiffness: 300,
            damping: 20,
            duration: 0.3,
          }}
          src="https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0LIND1ga7vi0SXWVrujJ6LzK4mMPUbdcYf95Qh"
          alt="Changers Laptop"
          width={400}
          height={500}
          className="w-[360px] h-[507px] rounded-xl lg:rotate-[-14.482deg] lg:-right-25 lg:top-[200px] mt-[100px] left-[12px] lg:absolute "
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#F8FFED]/90 px-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-center font-lora text-sm font-normal leading-5 text-[#353F50] md:text-base md:leading-6">
            Increased completion of donation actions due to a more intuitive and
            streamlined UX.
          </p>
        </div>
      </motion.a>
      <div className="flex flex-col items-center gap-1 w-[284px]">
        <div className="flex h-6 items-center justify-center gap-1 self-stretch">
          <span className="text-[#353F50] text-center text-base font-normal leading-10">
            Changers
          </span>
          <svg
            width="2"
            height="2"
            viewBox="0 0 2 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1" cy="1" r="1" fill="#353F50" />
          </svg>
          <span className="text-[#353F50] text-center text-base font-normal leading-10">
            Website Design
          </span>
        </div>
        <div className="flex min-h-4 flex-col justify-center self-stretch text-[#848484] text-center text-xs font-normal leading-4">
          Onboarding · Growth · Web
        </div>
      </div>
    </div>
  );
}
