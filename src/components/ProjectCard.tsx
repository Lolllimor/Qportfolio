'use client';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  type: string;
  year: string;
  tags: string;
  backgroundGradient: string;
  imageSrc: string;
  imageStyle?: string;
  transition?: string;
}

export default function ProjectCard({
  title,
  type,
  year,
  tags,
  backgroundGradient,
  imageSrc,
  imageStyle,
  transition,
}: ProjectCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={`cursor-pointer w-[333px] h-[472px] rounded-lg relative overflow-hidden`}
        style={{ background: backgroundGradient }}
        whileHover="hover"
        initial="initial"
      >
        <motion.img
          variants={{
            initial: {
              scale: 1,
              rotate: 0,
              x: 0,
            },
            hover: {
              scale: 1.15,
              rotate: -15,
              x: -25,
            },
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
          src={imageSrc}
          alt={title}
          width={400}
          height={500}
          className={imageStyle || ''}
          style={{ position: 'absolute' }}
        />
      </motion.div>
      <div className="flex flex-col items-center gap-1 w-[284px]">
        <div className="flex h-6 items-center justify-center gap-1 self-stretch">
          <span className="text-[#353F50] text-center text-base font-normal leading-10">
            {title}
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
            {type}
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
            {year}
          </span>
        </div>
        <div className="flex h-4 flex-col justify-center self-stretch text-[#848484] text-center text-xs font-normal leading-4">
          {tags}
        </div>
      </div>
    </div>
  );
}
