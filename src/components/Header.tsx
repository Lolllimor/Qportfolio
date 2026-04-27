"use client";
import { useState } from 'react';
import { EmailIcon } from './icons/inactive/header/EmailIcon';
import { LinkedInIcon } from './icons/inactive/header/LinkedInIcon';
import { BehanceIcon } from './icons/inactive/header/BehanceIcon';
import { GoToTwentyII } from './GoToTwentyII';
export default function Header() {
  const [isHovered, setIsHovered] = useState("");
  return (
    <header className=" flex flex-col-reverse sm:flex-row items-end gap-4 w-full justify-end mt-[51px] sm:mt-[62px] xl:max-w-[1074px] md:max-w-[868px] max-w-[500px] mx-auto px-6 sm:px-0">
      <div className="  left-0 top-0 z-9999  sm:absolute lg:hidden">
        <GoToTwentyII />
      </div>
      <div className='flex items-center gap-4'>
      <a
        href="mailto:quadrimorin@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered('email')}
        onMouseLeave={() => setIsHovered('')}
        className={`w-7 h-7 flex items-center justify-center rounded-full border ${isHovered === 'email' ? 'border-[#E66001]' : 'border-[#414752]'}`}
      >
        <EmailIcon color={isHovered === 'email' ? '#E66001' : '#414752'} />
      </a>

      <a
        href="https://www.linkedin.com/in/quadmor/"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered('linkedin')}
        onMouseLeave={() => setIsHovered('')}
        className={`w-7 h-7 flex items-center justify-center rounded-full border ${isHovered === 'linkedin' ? 'border-[#E66001]' : 'border-[#414752]'}`}
      >
        <LinkedInIcon
          color={isHovered === 'linkedin' ? '#E66001' : '#414752'}
        />
      </a>

      <a
        href="https://www.behance.net/quadrimorin"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered('behance')}
        onMouseLeave={() => setIsHovered('')}
        className={`w-7 h-7 flex items-center justify-center rounded-full border ${isHovered === 'behance' ? 'border-[#E66001]' : 'border-[#414752]'}`}
      >
        <BehanceIcon color={isHovered === 'behance' ? '#E66001' : '#414752'} />
        </a>
        </div>
    </header>
  );
}
