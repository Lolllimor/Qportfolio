'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const profileImages = [
  {
    src: 'https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0LYPLKCpofS2I805isUVR9oqgHn1AxXKTBwpOQ',
    alt: 'Quadri Morin, product designer — portrait',
  },
  {
    src: 'https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0L9BUQtWRV0IcDOVBPZeanA1YxTq5zwSf6bmHC',
    alt: 'Quadri Morin — close-up portrait',
  },
  {
    src: 'https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0LeEwdXoEiS0sOMNfCv9l5IEQRXhinyBV8dptT',
    alt: 'Quadri Morin — profile photo',
  },
];

const FOLDED_GAP = 4;
const OPEN_GAP = 24;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type StackState = 'hidden' | 'open' | 'folded';

export default function ProfileStack() {
  const [stackState, setStackState] = useState<StackState>('hidden');
  const [introDone, setIntroDone] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const showOpen = window.setTimeout(() => setStackState('open'), 500);
    const foldClosed = window.setTimeout(() => setStackState('folded'), 1400);
    const unlockHover = window.setTimeout(() => setIntroDone(true), 1900);

    return () => {
      window.clearTimeout(showOpen);
      window.clearTimeout(foldClosed);
      window.clearTimeout(unlockHover);
    };
  }, []);

  const activeState: StackState =
    introDone && hovered ? 'open' : stackState === 'hidden' ? 'folded' : stackState;

  return (
    <motion.div
      className="relative h-[64px] w-[136px] cursor-pointer"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      onMouseEnter={() => introDone && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => introDone && setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label="Profile photos"
    >
      {profileImages.map(({ src, alt }, index) => (
        <motion.div
          key={`profile-img-${index}`}
          className="absolute top-0 h-[64px] w-[40px] overflow-hidden rounded-lg"
          style={{
            zIndex: index,
            backfaceVisibility: 'hidden',
          }}
          initial={{ opacity: 0, x: 0 }}
          animate={{
            opacity: 1,
            x: activeState === 'open' ? index * OPEN_GAP : index * FOLDED_GAP,
          }}
          transition={{
            duration: 0.4,
            delay: !introDone
              ? stackState === 'open'
                ? index * 0.08
                : (profileImages.length - 1 - index) * 0.06
              : index * 0.04,
            ease: EASE,
          }}
        >
          <img
            src={src}
            alt={alt}
            width={40}
            height={64}
            className="h-full w-full object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
