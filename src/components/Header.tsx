'use client';

import { useState } from 'react';
import { EmailIcon } from './icons/inactive/header/EmailIcon';
import { LinkedInIcon } from './icons/inactive/header/LinkedInIcon';
import { BehanceIcon } from './icons/inactive/header/BehanceIcon';
import { GitHubIcon } from './icons/inactive/header/GitHubIcon';

const links = [
  {
    key: 'email',
    label: 'Email',
    href: 'mailto:quadrimorin@gmail.com',
    Icon: EmailIcon,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/quadmor/',
    Icon: LinkedInIcon,
  },
  {
    key: 'behance',
    label: 'Behance',
    href: 'https://www.behance.net/quadrimorin',
    Icon: BehanceIcon,
  },
  {
    key: 'github',
    label: 'GitHub',
    href: 'https://github.com/Quadmor009',
    Icon: GitHubIcon,
  },
] as const;

export default function Header() {
  const [isHovered, setIsHovered] = useState('');

  const iconCircleClass = (key: string) =>
    `flex items-center justify-center rounded-full border transition-all duration-200 ${
      isHovered === key
        ? 'h-8 w-8 border-[#E66001] bg-transparent'
        : 'h-7 w-7 border-[#414752] bg-transparent'
    }`;

  return (
    <header className="relative z-30 mx-auto mt-[51px] flex w-full max-w-[500px] items-end justify-end gap-4 px-6 pb-6 sm:mt-[62px] sm:flex-row sm:px-0 md:max-w-[868px] xl:max-w-[1074px]">
      <div className="flex items-center gap-3">
        {links.map(({ key, label, href, Icon }) => {
          const active = isHovered === key;

          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onMouseEnter={() => setIsHovered(key)}
              onMouseLeave={() => setIsHovered('')}
              className="relative flex min-h-11 min-w-11 items-center justify-center"
            >
              <span className={iconCircleClass(key)}>
                <Icon color={active ? '#E66001' : '#414752'} />
              </span>
              <span
                className={`pointer-events-none absolute top-full left-1/2 z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap font-campton text-xs font-normal text-[#E66001] transition-opacity duration-200 ${
                  active ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </header>
  );
}
