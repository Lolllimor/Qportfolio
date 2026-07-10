"use client";
import { useState } from 'react';
import { EmailIcon } from './icons/inactive/header/EmailIcon';
import { LinkedInIcon } from './icons/inactive/header/LinkedInIcon';
import { BehanceIcon } from './icons/inactive/header/BehanceIcon';
import { GitHubIcon } from './icons/inactive/header/GitHubIcon';

export default function Header() {
  const [isHovered, setIsHovered] = useState('');

  const iconCircleClass = (key: string) =>
    `flex items-center justify-center rounded-full border transition-all duration-200 ${
      isHovered === key
        ? 'h-8 w-8 border-[#E66001] bg-transparent'
        : 'h-7 w-7 border-[#414752] bg-transparent'
    }`;

  return (
    <header className="flex w-full max-w-[500px] items-end justify-end gap-4 px-6 mx-auto mt-[51px] sm:mt-[62px] sm:flex-row sm:px-0 md:max-w-[868px] xl:max-w-[1074px]">
      <div className="flex items-center gap-3">
        <a
          href="mailto:quadrimorin@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered('email')}
          onMouseLeave={() => setIsHovered('')}
          className="flex h-8 w-8 items-center justify-center"
        >
          <span className={iconCircleClass('email')}>
            <EmailIcon color={isHovered === 'email' ? '#E66001' : '#414752'} />
          </span>
        </a>

        <a
          href="https://www.linkedin.com/in/quadmor/"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered('linkedin')}
          onMouseLeave={() => setIsHovered('')}
          className="flex h-8 w-8 items-center justify-center"
        >
          <span className={iconCircleClass('linkedin')}>
            <LinkedInIcon
              color={isHovered === 'linkedin' ? '#E66001' : '#414752'}
            />
          </span>
        </a>

        <a
          href="https://www.behance.net/quadrimorin"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered('behance')}
          onMouseLeave={() => setIsHovered('')}
          className="flex h-8 w-8 items-center justify-center"
        >
          <span className={iconCircleClass('behance')}>
            <BehanceIcon color={isHovered === 'behance' ? '#E66001' : '#414752'} />
          </span>
        </a>

        <a
          href="https://github.com/Quadmor009"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered('github')}
          onMouseLeave={() => setIsHovered('')}
          className="flex h-8 w-8 items-center justify-center"
          aria-label="GitHub"
        >
          <span className={iconCircleClass('github')}>
            <GitHubIcon color={isHovered === 'github' ? '#E66001' : '#414752'} />
          </span>
        </a>
      </div>
    </header>
  );
}
