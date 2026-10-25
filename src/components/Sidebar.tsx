'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
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
  }, []);

  return collapsed;
}

export default function Sidebar() {
  const pathname = usePathname();
  const collapsed = useLabelsCollapsed();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="dock-frame pointer-events-auto">
        <nav
          aria-label="Primary"
          className="dock"
          data-collapsed={collapsed ? '' : undefined}
        >
          {navItems.map(({ href, key, label }) => {
            const active = isActive(href);

            return (
              <div key={href} className="dock-item">
                <Link
                  href={href}
                  aria-label={label}
                  aria-current={active ? 'page' : undefined}
                  data-cursor-normal
                  data-active={active ? '' : undefined}
                  className="dock-seg"
                >
                  <span className="dock-inner">
                    <span className="dock-glyph">
                      {active ? (
                        <ActiveIcon iconKey={key} />
                      ) : (
                        <>
                          <span className="dock-glyph-idle">
                            <InactiveIcon iconKey={key} />
                          </span>
                          <span className="dock-glyph-hover">
                            <HoverIcon iconKey={key} />
                          </span>
                        </>
                      )}
                    </span>
                    <span className="dock-label" aria-hidden>
                      <span>{label}</span>
                    </span>
                  </span>
                </Link>
                <span className="dock-tip" aria-hidden>
                  {label}
                </span>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
