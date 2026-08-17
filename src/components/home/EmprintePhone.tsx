'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

const MotionImage = motion.create(Image);
const MotionLink = motion.create(Link);

export default function EmprintePhone() {
  const isLargeScreen = useIsLargeScreen();

  return (
    <div className="flex flex-col items-center gap-2 lg:w-auto w-full">
      <MotionLink
        href="/product/emprinte"
        whileHover={isLargeScreen ? 'hover' : undefined}
        initial="initial"
        className="group relative flex h-[320px] w-full cursor-pointer justify-center overflow-hidden rounded-lg lg:h-[384px] lg:w-[284px] xl:h-[472px] xl:w-[333px]"
        style={{
          background:
            'linear-gradient(156deg, #E8F3F0 -1.47%, #F1F6F5 109.75%)',
        }}
      >
        <MotionImage
          variants={{
            initial: {
              scale: 1,
              rotate: 0,
              x: 0,
              y: 0,
            },
            hover: {
              scale: 1.3,
              rotate: -15,
              x: -25,
              y: 30,
            },
          }}
          transition={{
            type: 'tween',
            stiffness: 300,
            damping: 20,
            duration: 0.3,
          }}
          src="/home/emprinte-dashboard.webp"
          alt="Emprinte app home — reading streak, continue reading, growth tracker, and reading schedule"
          width={729}
          height={1531}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          className="mt-[50px] h-auto w-[234px] rounded-[24px] left-[75px] lg:absolute lg:left-[144px] lg:top-[92px]"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#F1F6F5]/90 px-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-center font-campton text-sm font-medium leading-5 text-[#353F50] md:text-base md:leading-6">
            Solo-led brand and product through App Store launch. Live with 40+
            members ahead of the September 2026 public launch.
          </p>
        </div>
      </MotionLink>
      <div className="flex w-[284px] flex-col items-center gap-1">
        <div className="flex h-6 items-center justify-center gap-1 self-stretch">
          <span className="text-center font-normal text-base leading-10 text-[#353F50]">
            Emprinte
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
          <span className="text-center font-normal text-base leading-10 text-[#353F50]">
            Mobile App
          </span>
        </div>
        <div className="flex min-h-4 flex-col justify-center self-stretch text-center text-xs font-normal leading-4 text-[#5C5C5C]">
          Brand · Community · Accountability
        </div>
      </div>
    </div>
  );
}
