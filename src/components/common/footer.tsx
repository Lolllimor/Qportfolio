'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { hoverArcDotStyle, useHoverArcDot } from '@/hooks/useHoverArcDot';

const footerLinks = [
  {
    key: 'cv',
    label: 'Download CV',
    href: 'https://docs.google.com/document/d/1RYYdLsKFfPM6eUOkGXyi4YDR9bKg5-LhG5oHIHXhGy0/edit?usp=sharing',
  },
  {
    key: 'behance',
    label: 'Behance',
    href: 'https://www.behance.net/quadrimorin',
  },
  {
    key: 'linkedin',
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/quadmor/',
  },
  {
    key: 'github',
    label: 'Github',
    href: 'https://github.com/Quadmor009',
  },
] as const;

const footerLinkClassName =
  'inline-block origin-center text-center font-apple-garamond-light text-base font-normal text-[#353F50] underline transition-[color,transform] duration-200 hover:scale-[1.125] hover:text-[#E66001]';

export const Footer = () => {
  const pathname = usePathname();
  const {
    groupRef,
    setItemRef,
    setHoveredIndex,
    clearHover,
    hoveredIndex,
    dotX,
    dotY,
    dotOpacity,
  } = useHoverArcDot(footerLinks.length);

  if (pathname === '/gallery/explore') {
    return null;
  }

  return (
    <div
      ref={groupRef}
      className="relative flex w-full items-center justify-center gap-6 overflow-visible pt-5 pb-[100px]"
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

      {footerLinks.map(({ key, label, href }, index) => (
        <a
          key={key}
          ref={(node) => setItemRef(index, node)}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredIndex(index)}
          className={footerLinkClassName}
          style={{
            color: hoveredIndex === index ? '#E66001' : undefined,
          }}
        >
          {label}
        </a>
      ))}
    </div>
  );
};
