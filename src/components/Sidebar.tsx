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
    <aside className=" mt-[56px] sm:mt-[162px] flex lg:flex-col flex-row fixed lg:sticky bottom-0 lg:bottom-auto lg:top-[162px] items-center lg:items-start justify-center lg:gap-6 sm:gap-16 gap-8 z-9999 bg-white/80 py-5 lg:py-0 w-full mx-auto lg:mx-0 lg:w-[150px] lg:shrink-0 shadow-[0_-6px_16px_rgba(0,0,0,0.04)] lg:shadow-none h-fit lg:self-start">
      <button
        className="group flex flex-col gap-1 lg:flex-row-reverse lg:w-[150px] items-center justify-center lg:justify-between cursor-pointer transition-all lg:px-2 lg:py-1.5 lg:rounded-md hover:bg-[#F5F5F5] lg:hover:px-3 lg:hover:py-2.5"
        onMouseEnter={() => handleMouseEnter('home')}
        onMouseLeave={handleMouseLeave}
        onClick={() => setActiveTab('home')}
      >
        <div className="w-5 h-5 items-center justify-center flex">
          {isActive('home') ? (
            <HomeIcon />
          ) : isHover('home') ? (
            <HoverHomeIcon />
          ) : (
            <InactiveHomeIcon />
          )}
        </div>
        <p
          className={`flex text-[10px] lg:text-sm font-campton transition-colors ${
            isActive('home') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
          } ${isActive('home') ? '' : 'group-hover:text-[#E66001]'}`}
        >
          Home
        </p>
      </button>

      <button
        className="group flex flex-col gap-1 lg:flex-row-reverse lg:w-[150px] items-center justify-center lg:justify-between cursor-pointer transition-all lg:px-2 lg:py-1.5 lg:rounded-md hover:bg-[#F5F5F5] lg:hover:px-3 lg:hover:py-2.5"
        onMouseEnter={() => handleMouseEnter('product')}
        onMouseLeave={handleMouseLeave}
        onClick={() => setActiveTab('product')}
      >
        <div className="w-5 h-5 items-center justify-center flex">
          {isActive('product') ? (
            <ProductIcon />
          ) : isHover('product') ? (
            <HoverProductIcon />
          ) : (
            <InactiveProductIcon />
          )}
        </div>
        <p
          className={`flex text-[10px] lg:text-sm font-campton transition-colors ${
            isActive('product') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
          } ${isActive('product') ? '' : 'group-hover:text-[#E66001]'}`}
        >
          Products
        </p>
      </button>

      <button
        className="group flex flex-col gap-1 lg:flex-row-reverse lg:w-[150px] items-center justify-center lg:justify-between cursor-pointer transition-all lg:px-2 lg:py-1.5 lg:rounded-md hover:bg-[#F5F5F5] lg:hover:px-3 lg:hover:py-2.5"
        onMouseEnter={() => handleMouseEnter('graphics')}
        onMouseLeave={handleMouseLeave}
        onClick={() => setActiveTab('graphics')}
      >
        <div className="w-5 h-5 items-center justify-center flex">
          {isActive('graphics') ? (
            <GraphicIcon />
          ) : isHover('graphics') ? (
            <HoverGraphicIcon />
          ) : (
            <InactiveGraphicIcon />
          )}
        </div>
        <p
          className={`flex text-[10px] lg:text-sm font-campton transition-colors ${
            isActive('graphics') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
          } ${isActive('graphics') ? '' : 'group-hover:text-[#E66001]'}`}
        >
          Graphics
        </p>
      </button>

      <button
        className="group flex flex-col gap-1 lg:flex-row-reverse lg:w-[150px] items-center justify-center lg:justify-between cursor-pointer transition-all lg:px-2 lg:py-1.5 lg:rounded-md hover:bg-[#F5F5F5] lg:hover:px-3 lg:hover:py-2.5"
        onMouseEnter={() => handleMouseEnter('gallery')}
        onMouseLeave={handleMouseLeave}
        onClick={() => setActiveTab('gallery')}
      >
        <div className="w-5 h-5 items-center justify-center flex">
          {isActive('gallery') ? (
            <ArtIcon />
          ) : isHover('gallery') ? (
            <HoverArtIcon />
          ) : (
            <InactiveArtIcon />
          )}
        </div>
        <p
          className={`flex text-[10px] lg:text-sm font-campton transition-colors ${
            isActive('gallery') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
          } ${isActive('gallery') ? '' : 'group-hover:text-[#E66001]'}`}
        >
          Artworks
        </p>
      </button>

      <button
        className="group flex flex-col gap-1 lg:flex-row-reverse lg:w-[150px] items-center justify-center lg:justify-between cursor-pointer transition-all lg:px-2 lg:py-1.5 lg:rounded-md hover:bg-[#F5F5F5] lg:hover:px-3 lg:hover:py-2.5"
        onMouseEnter={() => handleMouseEnter('article')}
        onMouseLeave={handleMouseLeave}
        onClick={() => setActiveTab('article')}
      >
        <div className="w-5 h-5 items-center justify-center flex">
          {isActive('article') ? (
            <ArticleIcon />
          ) : isHover('article') ? (
            <HoverArticleIcon />
          ) : (
            <InactiveArticleIcon />
          )}
        </div>
        <p
          className={`flex text-[10px] lg:text-sm font-campton transition-colors ${
            isActive('article') ? 'text-[#E66001] font-semibold' : 'text-[#353F50]'
          } ${isActive('article') ? '' : 'group-hover:text-[#E66001]'}`}
        >
          Articles
        </p>
      </button>
    </aside>
  );
}
