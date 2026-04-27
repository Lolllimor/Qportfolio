'use client';

import { motion } from 'framer-motion';

const profileImages = [
  'https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0LYPLKCpofS2I805isUVR9oqgHn1AxXKTBwpOQ',
  'https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0L9BUQtWRV0IcDOVBPZeanA1YxTq5zwSf6bmHC',
  'https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0LeEwdXoEiS0sOMNfCv9l5IEQRXhinyBV8dptT',
];

const MOVE_DURATION = 0.5;
const PICTURE_STAGGER = 0.2;
const PICTURE_DELAY = MOVE_DURATION;

export default function ProfileStack() {
  return (
    <motion.div
      className="relative w-[136px] h-[64px] "
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: MOVE_DURATION, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {profileImages.map((src, index) => (
        <motion.div
          key={`profile-img-${index}`}
          className="absolute top-0 w-[40px] h-[64px] rounded-lg overflow-hidden shadow-sm"
          style={{
            zIndex: index,
            left: index * 24,
            backfaceVisibility: 'hidden',
          }}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: PICTURE_DELAY + index * PICTURE_STAGGER,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <img
            src={src}
            alt=""
            width={40}
            height={64}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
