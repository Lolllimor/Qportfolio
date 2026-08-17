'use client';

import { CaseStudy } from './CaseStudy';
import { navItems } from '../data';
import { Screen } from './Screen';
import { useState } from 'react';

export const ProductComponent = () => {
  const [activeTab, setActiveTab] = useState('case-studies');
  return (
    <main className="min-h-screen bg-white relative max-[700px]:max-w-[500px] w-full px-6 sm:px-0 max-w-[850px] xl:max-w-[1014px] pt-[60px]">
      <h1 className="font-campton font-medium md:text-[32px] text-2xl text-black mb-2">
        Product Design
      </h1>
      <p className="mb-2 max-w-[640px] font-campton text-sm leading-relaxed text-[#5C5C5C] sm:text-base">
        Case studies and interface work across fintech, education, and tools
        used at scale — from research through to shipping.
      </p>
      <div
        className="pl-4 pr-8 flex gap-[60px] border-b border-[#D8D8D8] md:w-fit w-full pt-6 lg:pt-16"
        role="tablist"
        aria-label="Product work"
      >
        {navItems.map((item: { label: string; value: string }) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === item.value}
            key={item.value}
            className="flex min-h-11 flex-col items-center justify-end gap-0 cursor-pointer bg-transparent border-0 p-0"
            onClick={() => setActiveTab(item.value)}
          >
            <span
              className={`text-center text-base font-normal leading-none font-campton pb-1.5 ${
                activeTab === item.value ? 'text-[#000000]' : 'text-[#5C5C5C]'
              }`}
            >
              {item.label}
            </span>
            <div
              className={`h-2 w-[45px] rounded-t-4xl ${
                activeTab === item.value ? 'bg-[#E66001]' : 'bg-transparent'
              }`}
            ></div>
          </button>
        ))}
      </div>

      {activeTab === 'case-studies' && <CaseStudy />}
      {activeTab === 'screens' && <Screen />}
    </main>
  );
};
