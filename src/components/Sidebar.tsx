'use client';
import { InactiveProductIcon } from './icons/inactive/ProductIcon';
import { InactiveGraphicIcon } from './icons/inactive/GraphicIcon';
import { InactiveArticleIcon } from './icons/inactive/ArticleIcon';
import { InactiveHomeIcon } from './icons/inactive/HomeIcon';
import { HoverGraphicIcon } from './icons/hover/GraphicIcon';
import { HoverProductIcon } from './icons/hover/ProductIcon';
import { HoverArticleIcon } from './icons/hover/ArticleIcon';
import { InactiveArtIcon } from './icons/inactive/ArtIcon';
import { useActiveTab } from '@/contexts/ActiveTabContext';
import { ProductIcon } from './icons/active/ProductIcon';
import { GraphicIcon } from './icons/active/GraphicIcon';
import { ArticleIcon } from './icons/active/ArticleIcon';
import { HoverHomeIcon } from './icons/hover/HomeIcon';
import { HoverArtIcon } from './icons/hover/ArtIcon';
import { HomeIcon } from './icons/active/HomeIcon';
import { ArtIcon } from './icons/active/ArtIcon';
import { Tooltip } from './common/Tooltip';
import { useState } from 'react';

export default function Sidebar() {
  const { activeTab, setActiveTab } = useActiveTab();
  const [hoverTab, setHoverTab] = useState('');
  const isActive = (tab: string) => activeTab === tab;
  const isHover = (tab: string) => hoverTab === tab;
  return (
    <aside className=" mt-[56px] sm:mt-[162px] flex lg:flex-col flex-row fixed lg:relative bottom-0 items-center justify-center lg:gap-8 sm:gap-16 gap-8 z-10  bg-white/80 py-5 lg:py-0 w-full mx-auto lg:mx-0 lg:w-auto shadow-[0_-6px_16px_rgba(0,0,0,0.04)] lg:shadow-none h-fit">
      <Tooltip description="Home">
        <button
          className="w-6 h-6 flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setHoverTab('home')}
          onMouseLeave={() => setHoverTab('')}
          onClick={() => setActiveTab('home')}
        >
          <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
            {isActive('home') ? (
              <HomeIcon />
            ) : isHover('home') ? (
              <HoverHomeIcon />
            ) : (
              <InactiveHomeIcon />
            )}
          </div>
        </button>
      </Tooltip>

      <Tooltip description="Product Design">
        <button
          className="w-6 h-6 flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setHoverTab('product')}
          onMouseLeave={() => setHoverTab('')}
          onClick={() => setActiveTab('product')}
        >
          {isActive('product') ? (
            <ProductIcon />
          ) : isHover('product') ? (
            <HoverProductIcon />
          ) : (
            <InactiveProductIcon />
          )}
        </button>
      </Tooltip>

      <Tooltip description="Graphic Design">
        <button
          className="w-6 h-6 flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setHoverTab('graphics')}
          onMouseLeave={() => setHoverTab('')}
          onClick={() => setActiveTab('graphics')}
        >
          {isActive('graphics') ? (
            <GraphicIcon />
          ) : isHover('graphics') ? (
            <HoverGraphicIcon />
          ) : (
            <InactiveGraphicIcon />
          )}
        </button>
      </Tooltip>
      <Tooltip description="Art Works">
        <button
          className="w-6 h-6 flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setHoverTab('gallery')}
          onMouseLeave={() => setHoverTab('')}
          onClick={() => setActiveTab('gallery')}
        >
          {isActive('gallery') ? (
            <ArtIcon />
          ) : isHover('gallery') ? (
            <HoverArtIcon />
          ) : (
            <InactiveArtIcon />
          )}
        </button>
      </Tooltip>
      <Tooltip description="Article">
        <button
          className="w-6 h-6 flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setHoverTab('article')}
          onMouseLeave={() => setHoverTab('')}
          onClick={() => setActiveTab('article')}
        >
          {isActive('article') ? (
            <ArticleIcon />
          ) : isHover('article') ? (
            <HoverArticleIcon />
          ) : (
            <InactiveArticleIcon />
          )}
        </button>
      </Tooltip>
    </aside>
  );
}
