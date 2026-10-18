'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
  { href: '/', key: 'home', label: 'Quadmor' },
  { href: '/product', key: 'product', label: 'Products' },
  { href: '/graphics', key: 'graphics', label: 'Graphics' },
  { href: '/gallery', key: 'gallery', label: 'Artworks' },
  { href: '/articles', key: 'article', label: 'Articles' },
] as const;

type NavKey = (typeof navItems)[number]['key'];

const SCROLL_HIDE_AT = 48;
const SCROLL_SHOW_AT = 16;

function ActiveIcon({ iconKey }: { iconKey: NavKey }) {
  switch (iconKey) {
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

function HoverIcon({ iconKey }: { iconKey: NavKey }) {
  switch (iconKey) {
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

function InactiveIcon({ iconKey }: { iconKey: NavKey }) {
  switch (iconKey) {
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

function useLabelsCollapsed() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const syncDesktop = () => setIsDesktop(mq.matches);
    syncDesktop();
    mq.addEventListener('change', syncDesktop);
    return () => mq.removeEventListener('change', syncDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setCollapsed(false);
      return;
    }

    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      // Stay collapsed until the user is back at the top
      setCollapsed((prev) => {
        if (y <= SCROLL_SHOW_AT) return false;
        if (y >= SCROLL_HIDE_AT) return true;
        return prev;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDesktop]);

  return collapsed;
}

const TAG_GAP = 12;
const TAG_EDGE_PAD = 8;

function CollapsedLabelTag({
  label,
  side,
}: {
  label: string;
  side: 'left' | 'right';
}) {
  return (
    <span
      data-collapsed-tag
      className={`pointer-events-none absolute top-1/2 z-30 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#353F50] px-2.5 py-1.5 font-campton text-xs font-medium text-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 ${
        side === 'left' ? 'right-full mr-3' : 'left-full ml-3'
      }`}
      role="tooltip"
    >
      {label}
      <span
        aria-hidden
        className={`absolute top-1/2 h-0 w-0 -translate-y-1/2 border-y-[5px] border-y-transparent ${
          side === 'left'
            ? 'left-full border-l-[6px] border-l-[#353F50]'
            : 'right-full border-r-[6px] border-r-[#353F50]'
        }`}
      />
    </span>
  );
}

function pickTagSide(host: HTMLElement, label: string): 'left' | 'right' {
  const hostBox = host.getBoundingClientRect();
  // Approximate tag width from label length; real tags are short nav words
  const approxWidth = Math.max(56, label.length * 7.5 + 20);
  const needed = approxWidth + TAG_GAP + TAG_EDGE_PAD;
  return hostBox.left >= needed ? 'left' : 'right';
}

export default function Sidebar() {
  const pathname = usePathname();
  const isExplore = pathname === '/gallery/explore';
  const labelsCollapsed = useLabelsCollapsed();
  const [tagSides, setTagSides] = useState<Record<string, 'left' | 'right'>>(
    {}
  );

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside
      className={
        isExplore
          ? 'fixed bottom-4 left-0 right-0 z-50 flex h-fit w-full flex-row items-center justify-center gap-7 bg-transparent px-4 lg:bottom-auto lg:left-6 lg:right-auto lg:top-1/2 lg:w-auto lg:-translate-y-1/2 lg:flex-col lg:gap-7 lg:px-0'
          : `mt-[56px] sm:mt-[162px] flex lg:flex-col flex-row fixed lg:sticky bottom-0 lg:bottom-auto lg:top-[162px] items-center justify-center lg:gap-6 sm:gap-16 gap-8 z-9999 overflow-visible bg-white/80 pt-2.5 pb-1.5 lg:py-0 w-full mx-auto lg:mx-0 lg:shrink-0 shadow-[0_-6px_16px_rgba(0,0,0,0.04)] lg:shadow-none h-fit lg:self-start transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              labelsCollapsed
                ? 'lg:w-11 lg:items-center'
                : 'lg:w-[150px] lg:items-start'
            }`
      }
    >
      {navItems.map(({ href, key, label }, index) => {
        const active = isActive(href);
        const tagSide = tagSides[key] ?? 'left';

        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            data-cursor-normal
            onMouseEnter={(event) => {
              if (!labelsCollapsed) return;
              const side = pickTagSide(event.currentTarget, label);
              setTagSides((prev) =>
                prev[key] === side ? prev : { ...prev, [key]: side }
              );
            }}
            className={
              isExplore
                ? 'group flex min-h-11 min-w-11 items-center justify-center'
                : `group relative flex flex-col gap-1 lg:flex-row-reverse items-center justify-center cursor-pointer transition-all lg:px-2 lg:py-1.5 lg:rounded-md ${
                    labelsCollapsed
                      ? 'lg:w-auto lg:justify-center lg:gap-0 lg:hover:bg-transparent'
                      : 'lg:w-full lg:justify-between lg:gap-1 lg:hover:bg-[#F5F5F5] lg:hover:px-3 lg:hover:py-2.5'
                  }`
            }
          >
            <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
              {active ? (
                <ActiveIcon iconKey={key} />
              ) : (
                <>
                  <span className="absolute inset-0 flex items-center justify-center group-hover:opacity-0">
                    <InactiveIcon iconKey={key} />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <HoverIcon iconKey={key} />
                  </span>
                </>
              )}
            </div>
            {isExplore ? null : (
              <>
                <motion.span
                  className="overflow-hidden"
                  initial={false}
                  animate={
                    labelsCollapsed
                      ? { maxWidth: 0, opacity: 0, x: 28 }
                      : { maxWidth: 120, opacity: 1, x: 0 }
                  }
                  transition={{
                    duration: 0.45,
                    ease: [0.4, 0, 0.2, 1],
                    delay: labelsCollapsed
                      ? index * 0.04
                      : (navItems.length - 1 - index) * 0.04,
                  }}
                >
                  <p
                    className={`flex whitespace-nowrap leading-none text-[10px] lg:text-sm font-campton transition-colors ${
                      active ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
                    } ${active ? '' : 'group-hover:text-[#E66001]'}`}
                  >
                    {label}
                  </p>
                </motion.span>
                {labelsCollapsed ? (
                  <CollapsedLabelTag label={label} side={tagSide} />
                ) : null}
              </>
            )}
          </Link>
        );
      })}
    </aside>
  );
}
