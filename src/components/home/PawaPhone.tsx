'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import { PhoneScreenImage } from '@/components/product/IphoneFrame';

const MotionDiv = motion.div;
const MotionLink = motion.create(Link);

const spring = {
  type: 'spring' as const,
  stiffness: 240,
  damping: 20,
  mass: 0.8,
};

export default function PawaPhone() {
  const isLargeScreen = useIsLargeScreen();

  return (
    <div className="flex w-full flex-col items-center gap-2 lg:w-auto">
      <MotionLink
        href="/product/pawa"
        whileHover={isLargeScreen ? 'hover' : undefined}
        initial="initial"
        className="group relative flex h-[320px] w-full cursor-pointer items-start justify-center overflow-hidden rounded-lg lg:h-[384px] lg:w-[284px] xl:h-[472px] xl:w-[333px]"
        style={{
          background:
            'linear-gradient(156deg, #F8EDE6 -1.47%, #F6F3F1 109.75%)',
        }}
      >
        <div className="relative mt-[56px] h-[260px] w-[168px] lg:absolute lg:top-[108px] lg:left-1/2 lg:mt-0 lg:-translate-x-1/2 xl:w-[184px]">
          <MotionDiv
            variants={{
              initial: { x: 10, y: 14, rotate: 8, scale: 0.94, opacity: 0.55 },
              hover: { x: 58, y: 36, rotate: 22, scale: 0.92, opacity: 1 },
            }}
            transition={spring}
            className="absolute inset-0 origin-bottom"
          >
            <PhoneScreenImage
              src="/case-studies/pawa/live/home-disconnected.png"
              alt=""
              sizes="184px"
            />
          </MotionDiv>
          <MotionDiv
            variants={{
              initial: { x: 0, y: 0, rotate: -2, scale: 1 },
              hover: { x: -28, y: -72, rotate: -10, scale: 1.06 },
            }}
            transition={spring}
            className="relative origin-bottom"
          >
            <PhoneScreenImage
              src="/case-studies/pawa/live/home-active.png"
              alt="Pawa home in the active state, with the gauge at 59 percent"
              sizes="184px"
            />
          </MotionDiv>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-[#F6F3F1] via-[#F6F3F1]/90 to-transparent px-6 pt-16 pb-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-center font-campton text-sm leading-5 font-medium text-[#353F50] md:text-base md:leading-6">
            Prepaid power-sharing for Nigerian apartments. Designed and built
            end to end, with a live prototype you can try.
          </p>
        </div>
      </MotionLink>
      <div className="flex w-[284px] flex-col items-center gap-1">
        <div className="flex h-6 items-center justify-center gap-1 self-stretch">
          <span className="text-center text-base leading-10 font-normal text-[#353F50]">
            Pawa
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
          <span className="text-center text-base leading-10 font-normal text-[#353F50]">
            Mobile App
          </span>
        </div>
        <div className="flex min-h-4 flex-col justify-center self-stretch text-center text-xs leading-4 font-normal text-[#5C5C5C]">
          Energy · Payments · Product
        </div>
      </div>
    </div>
  );
}
