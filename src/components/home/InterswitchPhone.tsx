'use client';
import { motion } from 'framer-motion';
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

export default function InterswitchPhone() {
  const isLargeScreen = useIsLargeScreen();

  return (
    <div className="flex flex-col items-center gap-2 lg:w-auto w-full">
      <motion.a
        href="https://www.notion.so/Usability-Report-Design-Iteration-Comprehensive-Case-Study-343a2f6201c880efa3cceb92ba658b6b"
        target="_blank"
        rel="noreferrer"
        whileHover={isLargeScreen ? 'hover' : undefined}
        initial="initial"
        className="group cursor-pointer xl:w-[333px] xl:h-[472px] lg:w-[284px] lg:h-[384px] w-full h-[320px] rounded-lg relative overflow-hidden flex justify-center"
        style={{
          background:
            'linear-gradient(318deg, #F3F6E1 3.14%, #FFF 52.22%, #F5EEDE 101.3%)',
        }}
      >
        <motion.img
          variants={{
            initial: {
              scale: 1,

              x: 0,
              y: 0,
            },
            hover: {
              scale: 1.5,
              x: -80,
              y: -200,
            },
          }}
          transition={{
            type: 'tween',
            stiffness: 300,
            damping: 20,
            duration: 0.3,
          }}
          src="https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0LYBqZlKofS2I805isUVR9oqgHn1AxXKTBwpOQ"
          alt="Interswitch Phone"
          width={400}
          height={500}
          className="w-[378px] h-[376px] lg:left-[55px] lg:top-[264px] left-[35px] mt-[10px] lg:absolute "
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#F3F6E1]/90 px-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="text-center font-lora text-sm font-normal leading-5 text-[#353F50] md:text-base md:leading-6">
            Redesign boosted usability from 7.3 to 9.4 and achieved an 89.9%
            success rate on QR code generation, reducing misclicks and drop-offs
            for first-time users.
          </p>
        </div>
      </motion.a>
      <div className="flex flex-col items-center gap-1 w-[284px]">
        <div className="flex h-6 items-center justify-center gap-1 self-stretch">
          <span className="text-[#353F50] text-center text-base font-normal leading-10">
            Interswitch
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
          Usability Research · Payment · A/B Testing
        </div>
      </div>
    </div>
  );
}
