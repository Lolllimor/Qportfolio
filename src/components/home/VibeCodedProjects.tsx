'use client';

import type { ReactNode } from 'react';

import { ProjectHoverZone } from '@/components/common/ProjectCursor';
import {
  DesignGymIcon,
  EmprinteIconMark,
  ExternalLinkMarkIcon,
  PopulatorIconMark,
} from '@/components/icons/design-gym';

function ReferenceOverlayTile() {
  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#DEEEFE]">
      <div className="origin-center">
        <PopulatorIconMark />
      </div>
    </div>
  );
}

function EmprinteTile() {
  return (
    <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F1F6F5]">
      <div className="origin-center">
        <EmprinteIconMark />
      </div>
    </div>
  );
}

function DesignGymTile() {
  return (
    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#FFF1EB]">
      <div className="origin-center">
        <DesignGymIcon />
      </div>
    </div>
  );
}

type ProjectRow = {
  titleHoverColor: string;
  description: string;
  titleColor: string;
  rowIcon: ReactNode;
  hoverBg: string;
  title: string;
  date: string;
  platform: string;
  href: string;
  cta: string;
  hero: string;
};

const projects: ProjectRow[] = [
  {
    title: 'Design Gym',
    rowIcon: <DesignGymTile />,
    hoverBg: 'hover:bg-[#FFF1EB]',
    date: 'Dec, 2025',
    platform: 'Web',
    titleColor: 'text-[#EB5D1D]',
    titleHoverColor: 'group-hover:text-[#EB5D1D]',
    description:
      'I saw an opportunity to help Designers actively train their visual eye, so I built it. Design Gym helps designers sharpens their visual judgment through quick, side-by-side comparison rounds focused on the basic foundation of a good designs.',
    href: 'https://designgym.xyz',
    cta: 'Open',
    hero: '/home/design-gym-live.jpg',
  },
  {
    title: 'Reference Overlay',
    rowIcon: <ReferenceOverlayTile />,
    hoverBg: 'hover:bg-[#DEEEFE]',
    date: 'Feb, 2026',
    platform: 'Figma Plugin',
    titleColor: 'text-[#6C8497]',
    titleHoverColor: 'group-hover:text-[#6C8497]',
    description:
      'Context-switching mid-design was often frustrating and killing my flow, so I built a solution. Reference Overlay keeps your reference images and PRD docs in a floating panel inside Figma, always visible, never blocking your canvas.',
    href: 'https://www.figma.com/community/plugin/1608990953292975108',
    cta: 'Open',
    hero: '/articles/design-faster-smarter-with-reference-overlay-figma-plugin/cover.jpg',
  },
  {
    title: 'Emprinte',
    rowIcon: <EmprinteTile />,
    hoverBg: 'hover:bg-[#F1F6F5]',
    date: 'Feb, 2026',
    platform: 'iOS',
    titleColor: 'text-[#11221F]',
    titleHoverColor: 'group-hover:text-[#11221F]',
    description:
      'As a founding member of Emprinte Readers Hub, I led the design of the full product experience from concept to a live App Store launch, onboarding, core flows, and visual identity. Emprinte is building the largest reading community in Africa.',
    href: 'https://apps.apple.com/ng/app/emprinte/id6762211251',
    cta: 'View',
    hero: '/home/emprinte-live.jpg',
  },
];

export default function VibeCodedProjects() {
  return (
    <div className="flex w-full min-w-0 flex-col max-w-[845px] xl:max-w-full">
      <h2 className="font-garamond text-2xl font-medium text-[#353F50] sm:text-3xl">
        Things I built
      </h2>
      <p className="mt-1 font-campton text-sm leading-relaxed text-[#5C5C5C] sm:text-base">
        Things I got tired of waiting for someone else to build.
      </p>

      <div className="relative z-10 mt-3 flex flex-col sm:mt-6" role="list">
        {projects.map((project) => (
          <div key={project.title}>
            <ProjectHoverZone label="Open project">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                className={`group relative z-0 -mx-3 my-3 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 rounded-lg px-5 py-4 hover:z-20 focus-within:z-20 sm:-mx-5 sm:gap-x-5 sm:px-8 lg:-mx-6 lg:px-10 lg:py-3.5 ${project.hoverBg}`}
              >
                <div className="self-center">{project.rowIcon}</div>

                <div className="min-w-0 self-center">
                  <h3
                    className={`font-campton text-base font-medium whitespace-nowrap lg:text-lg ${project.titleColor}`}
                  >
                    {project.title}
                  </h3>
                  <span className="mt-0.5 block font-campton text-[10px] whitespace-nowrap text-[#5C5C5C] sm:text-[12px]">
                    {project.date}
                    <span className="text-[#5C5C5C]"> · {project.platform}</span>
                  </span>
                  <p className="sr-only">{project.description}</p>
                </div>

                <span
                  className={`flex shrink-0 items-center gap-0.5 self-center font-campton text-xs text-[#5C5C5C] opacity-80 transition-opacity group-hover:opacity-100 ${project.titleHoverColor}`}
                >
                  <span className="whitespace-nowrap">{project.cta}</span>
                  <ExternalLinkMarkIcon className="size-[18px] shrink-0 origin-center transition-transform duration-300 group-hover:rotate-45 sm:size-[23px]" />
                </span>

                <div className="pointer-events-none absolute top-1/2 right-3 z-20 w-[min(520px,68%)] -translate-y-1/2">
                  <div
                    aria-hidden
                    className="vibe-preview overflow-hidden rounded-2xl border border-[#F0F0F0] bg-white shadow-[0_18px_50px_rgba(17,17,17,0.12)]"
                  >
                    <div className="flex w-[48%] shrink-0 items-center self-center">
                      <img
                        src={project.hero}
                        alt=""
                        className="h-auto w-full object-contain"
                      />
                    </div>
                    <p className="flex items-center px-4 py-3.5 font-campton text-[13px] leading-5 text-[#5C5C5C]">
                      {project.description}
                    </p>
                  </div>
                </div>
              </a>
            </ProjectHoverZone>
            <div className="h-1 border-b border-[#D4D4D4] last:border-b-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
