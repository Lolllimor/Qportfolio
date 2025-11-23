'use client';

import { CaseStudy } from './CaseStudy';
import { navItems } from '../data';
import { Screen } from './Screen';
import { useState } from 'react';

export const ProductComponent = () => {
  const [activeTab, setActiveTab] = useState('case-studies');
  return (
    <main className="min-h-screen bg-white relative max-[700px]:max-w-[500px] w-full px-6 sm:px-0 max-w-[850px] xl:max-w-[1014px] pt-[60px]">
      <h2 className="font-campton font-medium md:text-[32px] text-2xl text-black mb-2">
        Product Design
      </h2>
      <div className="pl-4 pr-8 flex gap-[60px] border-b border-[#D8D8D8] md:w-fit w-full pt-6 lg:pt-16">
        {navItems.map((item: { label: string; value: string }) => (
          <div
            key={item.value}
            className="flex flex-col items-center gap-1"
            onClick={() => setActiveTab(item.value)}
          >
            <span
              className={` text-center text-base font-normal leading-snug font-campton ${
                activeTab === item.value ? 'text-[#000000]' : 'text-[#8A8A8A]'
              }`}
            >
              {item.label}
            </span>
            <div
              className={`h-2 w-[45px] rounded-t-4xl ${
                activeTab === item.value ? 'bg-[#E66001]' : 'bg-transparent'
              }`}
            ></div>
          </div>
        ))}
      </div>

      {activeTab === 'case-studies' && <CaseStudy />}
      {activeTab === 'screens' && <Screen />}
    </main>
  );
};
