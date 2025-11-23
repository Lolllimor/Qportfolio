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
import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';

export default function Sidebar() {
  const { activeTab, setActiveTab } = useActiveTab();
  const [hoverTab, setHoverTab] = useState('');
  const isLargeScreen = useIsLargeScreen();
  const isActive = (tab: string) => activeTab === tab;
  const isHover = (tab: string) => hoverTab === tab;

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
    <aside className=" mt-[56px] sm:mt-[162px] flex lg:flex-col flex-row fixed lg:relative bottom-0 items-center justify-center lg:gap-8 sm:gap-16 gap-8 z-10  bg-white/80 py-5 lg:py-0 w-full mx-auto lg:mx-0 lg:w-auto shadow-[0_-6px_16px_rgba(0,0,0,0.04)] lg:shadow-none h-fit">
      <Tooltip description="Home">
        <button
          className="flex flex-col gap-1 items-center justify-center cursor-pointer"
          onMouseEnter={() => handleMouseEnter('home')}
          onMouseLeave={handleMouseLeave}
          onClick={() => setActiveTab('home')}
        >
          <div className="w-6 h-6 items-center justify-center cursor-pointer">
            {isActive('home') ? (
              <HomeIcon />
            ) : isHover('home') ? (
              <HoverHomeIcon />
            ) : (
              <InactiveHomeIcon />
            )}
          </div>
          <p
            className={` flex lg:hidden text-[10px] font-campton  ${
              isActive('home') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
            }`}
          >
            Home
          </p>
        </button>
      </Tooltip>

      <Tooltip description="Product Design">
        <button
          className="flex flex-col gap-1 items-center justify-center cursor-pointer"
          onMouseEnter={() => handleMouseEnter('product')}
          onMouseLeave={handleMouseLeave}
          onClick={() => setActiveTab('product')}
        >
          {isActive('product') ? (
            <ProductIcon />
          ) : isHover('product') ? (
            <HoverProductIcon />
          ) : (
            <InactiveProductIcon />
          )}
          <p
            className={` flex lg:hidden text-[10px] font-campton  ${
              isActive('product') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
            }`}
          >
            Product 
          </p>
        </button>
      </Tooltip>

      <Tooltip description="Graphic Design">
        <button
          className="flex flex-col gap-1 items-center justify-center cursor-pointer"
          onMouseEnter={() => handleMouseEnter('graphics')}
          onMouseLeave={handleMouseLeave}
          onClick={() => setActiveTab('graphics')}
        >
          {isActive('graphics') ? (
            <GraphicIcon />
          ) : isHover('graphics') ? (
            <HoverGraphicIcon />
          ) : (
            <InactiveGraphicIcon />
          )}
          <p
            className={` flex lg:hidden text-[10px] font-campton  ${
              isActive('graphics') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
            }`}
          >
            Graphic 
          </p>
        </button>
      </Tooltip>
      <Tooltip description="Art Works">
        <button
          className="flex flex-col gap-1 items-center justify-center cursor-pointer"
          onMouseEnter={() => handleMouseEnter('gallery')}
          onMouseLeave={handleMouseLeave}
          onClick={() => setActiveTab('gallery')}
        >
          {isActive('gallery') ? (
            <ArtIcon />
          ) : isHover('gallery') ? (
            <HoverArtIcon />
          ) : (
            <InactiveArtIcon />
          )}
          <p
            className={` flex lg:hidden text-[10px] font-campton  ${
              isActive('gallery') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
            }`}
          >
            Art 
          </p>
          </button>
      </Tooltip>
      <Tooltip description="Article">
        <a
          className="flex flex-col gap-1 items-center justify-center cursor-pointer"
          onMouseEnter={() => handleMouseEnter('article')}
          onMouseLeave={handleMouseLeave}
          href="https://medium.com/@quadmor009"
          target="_blank"
          rel="noopener noreferrer"
        >
          {isActive('article') ? (
            <ArticleIcon />
          ) : isHover('article') ? (
            <HoverArticleIcon />
          ) : (
            <InactiveArticleIcon />
          )}
          <p
            className={` flex lg:hidden text-[10px] font-campton  ${
              isActive('article') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
            }`}
          >
            Article
          </p>
        </a>
      </Tooltip>
    </aside>
  );
}
