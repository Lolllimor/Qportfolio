'use client';
import { motion } from 'framer-motion';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

export default function PouchiiPhone() {
  const isLargeScreen = useIsLargeScreen();

  return (
    <div className="flex flex-col items-center gap-2 lg:w-auto w-full">
      <motion.a
        href="https://www.behance.net/gallery/188111073/Pouchii-Redesign"
        target="_blank"
        rel="noreferrer"
        whileHover={isLargeScreen ? 'hover' : undefined}
        initial="initial"
        className="group cursor-pointer xl:w-[333px] xl:h-[472px] lg:w-[284px] lg:h-[384px] w-full h-[320px] rounded-lg relative overflow-hidden flex justify-center"
        style={{
          background:
            'linear-gradient(156deg, #FFECE8 -1.47%, #F1EFFF 109.75%)',
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
          src="https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0LMK0kwouYBft3HAjvzbU9WcRXPJSTnlapMxhK"
          alt="Pouchii Phone"
          width={400}
          height={500}
          className="w-[234px] h-[485px] lg:left-[144px] lg:top-[92px] left-[75px] mt-[50px] lg:absolute "
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#FFECE8]/90 px-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-center font-lora text-sm font-normal leading-5 text-[#353F50] md:text-base md:leading-6">
            Pouchii redesign cut onboarding from 120s to 30s (75% faster) and
            accelerated white-label deployment for new customers.
          </p>
        </div>
      </motion.a>
      <div className="flex flex-col items-center gap-1 w-[284px]">
        <div className="flex h-6 items-center justify-center gap-1 self-stretch">
          <span className="text-[#353F50] text-center text-base font-normal leading-10">
            Pouchii
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
            Mobile App
          </span>
        </div>
        <div className="flex min-h-4 flex-col justify-center self-stretch text-[#848484] text-center text-xs font-normal leading-4">
          Activation · Retention · Onboarding flows
        </div>
      </div>
    </div>
  );
}
