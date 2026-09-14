'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { EmailIcon } from './icons/inactive/header/EmailIcon';
import { LinkedInIcon } from './icons/inactive/header/LinkedInIcon';
import { BehanceIcon } from './icons/inactive/header/BehanceIcon';
import { GitHubIcon } from './icons/inactive/header/GitHubIcon';
import { hoverArcDotStyle, useHoverArcDot } from '@/hooks/useHoverArcDot';

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
  const pathname = usePathname();
  const isExplore = pathname === '/gallery/explore';
  const {
    groupRef,
    setItemRef,
    setHoveredIndex,
    clearHover,
    hoveredIndex,
    dotX,
    dotY,
    dotOpacity,
  } = useHoverArcDot(links.length);

  const iconCircleClass = (active: boolean) =>
    `flex items-center justify-center rounded-full border transition-all duration-200 ${
      active
        ? 'h-8 w-8 border-[#E66001] bg-transparent'
        : 'h-7 w-7 border-[#414752] bg-transparent'
    }`;

  return (
    <header
      className={
        isExplore
          ? 'fixed top-4 right-4 z-50 m-0 flex w-auto max-w-none items-end justify-end p-0 sm:top-6 sm:right-8'
          : 'relative z-30 mx-auto mt-[51px] flex w-full max-w-[500px] items-end justify-end gap-4 px-6 pb-6 sm:mt-[62px] sm:flex-row sm:px-0 md:max-w-[868px] xl:max-w-[1074px]'
      }
    >
      <div
        ref={groupRef}
        className="relative flex items-center gap-1 overflow-visible pt-4"
        onMouseLeave={clearHover}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-20 block rounded-full bg-[#E66001]"
          style={{
            width: hoverArcDotStyle.size,
            height: hoverArcDotStyle.size,
            x: dotX,
            y: dotY,
            opacity: dotOpacity,
          }}
        />

        {links.map(({ key, label, href, Icon }, index) => {
          const active = hoveredIndex === index;

          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onMouseEnter={() => setHoveredIndex(index)}
              className="relative flex min-h-11 min-w-11 items-center justify-center"
            >
              <span
                ref={(node) => setItemRef(index, node)}
                className={iconCircleClass(active)}
              >
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
