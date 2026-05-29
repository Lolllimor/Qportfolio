'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

import { InactiveProductIcon } from './icons/inactive/ProductIcon';
import { InactiveGraphicIcon } from './icons/inactive/GraphicIcon';
import { InactiveArticleIcon } from './icons/inactive/ArticleIcon';
import { InactiveHomeIcon } from './icons/inactive/HomeIcon';
import { HoverGraphicIcon } from './icons/hover/GraphicIcon';
import { HoverProductIcon } from './icons/hover/ProductIcon';
import { HoverArticleIcon } from './icons/hover/ArticleIcon';
import { InactiveArtIcon } from './icons/inactive/ArtIcon';
import { ProductIcon } from './icons/active/ProductIcon';
import { GraphicIcon } from './icons/active/GraphicIcon';
import { ArticleIcon } from './icons/active/ArticleIcon';
import { HoverHomeIcon } from './icons/hover/HomeIcon';
import { HoverArtIcon } from './icons/hover/ArtIcon';
import { HomeIcon } from './icons/active/HomeIcon';
import { ArtIcon } from './icons/active/ArtIcon';

const navItems = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/product', key: 'product', label: 'Products' },
  { href: '/graphics', key: 'graphics', label: 'Graphics' },
  { href: '/gallery', key: 'gallery', label: 'Artworks' },
  { href: '/articles', key: 'article', label: 'Articles' },
] as const;

function getIcon(key: (typeof navItems)[number]['key'], isActive: boolean, isHover: boolean) {
  if (isActive) {
    switch (key) {
      case 'home':
        return <HomeIcon />;
      case 'product':
        return <ProductIcon />;
      case 'graphics':
        return <GraphicIcon />;
      case 'gallery':
        return <ArtIcon />;
      case 'article':
        return <ArticleIcon />;
    }
  }

  if (isHover) {
    switch (key) {
      case 'home':
        return <HoverHomeIcon />;
      case 'product':
        return <HoverProductIcon />;
      case 'graphics':
        return <HoverGraphicIcon />;
      case 'gallery':
        return <HoverArtIcon />;
      case 'article':
        return <HoverArticleIcon />;
    }
  }

  switch (key) {
    case 'home':
      return <InactiveHomeIcon />;
    case 'product':
      return <InactiveProductIcon />;
    case 'graphics':
      return <InactiveGraphicIcon />;
    case 'gallery':
      return <InactiveArtIcon />;
    case 'article':
      return <InactiveArticleIcon />;
  }
}

export default function Sidebar() {
  const pathname = usePathname();
  const [hoverTab, setHoverTab] = useState('');
  const isLargeScreen = useIsLargeScreen();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const handleMouseEnter = (tab: string) => {
    if (isLargeScreen) {
      setHoverTab(tab);
    }
  };

  const handleMouseLeave = () => {
    if (isLargeScreen) {
      setHoverTab('');
    }
  };

  return (
    <aside className=" mt-[56px] sm:mt-[162px] flex lg:flex-col flex-row fixed lg:sticky bottom-0 lg:bottom-auto lg:top-[162px] items-center lg:items-start justify-center lg:gap-6 sm:gap-16 gap-8 z-9999 bg-white/80 py-5 lg:py-0 w-full mx-auto lg:mx-0 lg:w-[150px] lg:shrink-0 shadow-[0_-6px_16px_rgba(0,0,0,0.04)] lg:shadow-none h-fit lg:self-start">
      {navItems.map(({ href, key, label }) => {
        const active = isActive(href);
        const hover = hoverTab === key;

        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className="group flex flex-col gap-1 lg:flex-row-reverse lg:w-[150px] items-center justify-center lg:justify-between cursor-pointer transition-all lg:px-2 lg:py-1.5 lg:rounded-md hover:bg-[#F5F5F5] lg:hover:px-3 lg:hover:py-2.5"
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-5 h-5 items-center justify-center flex">
              {getIcon(key, active, hover)}
            </div>
            <p
              className={`flex text-[10px] lg:text-sm font-campton transition-colors ${
                active ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
              } ${active ? '' : 'group-hover:text-[#E66001]'}`}
            >
              {label}
            </p>
          </Link>
        );
      })}
    </aside>
  );
}
