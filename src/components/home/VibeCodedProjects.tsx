'use client';

import type { ReactNode } from 'react';

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
    href: 'https://design-quiz-rho.vercel.app',
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
  },
];

export default function VibeCodedProjects() {
  return (
    <div className="flex w-full min-w-0 flex-col max-w-[845px] xl:max-w-full">
      <h2 className="font-garamond text-2xl font-medium text-[#353F50] sm:text-3xl">
        Top Vibe coded projects
      </h2>
      <p className="mt-1 font-campton text-sm leading-relaxed text-[#848484] sm:text-base">
        Things I got tired of waiting for someone else to build.
      </p>

      <div className="mt-3 flex flex-col sm:mt-6" role="list">
        {projects.map((project) => (
          <div key={project.title}>
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              className={`group -mx-3 grid grid-cols-[auto_1fr] grid-rows-[auto_auto_auto] gap-x-3 gap-y-2 rounded-lg px-5 py-4 my-3 items-center last:border-b-0 sm:-mx-5 sm:grid-cols-[auto_minmax(0,11rem)_minmax(0,1fr)_auto] sm:grid-rows-1 sm:gap-x-5 sm:gap-y-0 sm:px-8 sm:my-4 md:gap-x-8 lg:-mx-6 lg:gap-x-14 lg:px-10 lg:py-3.5 ${project.hoverBg}`}
            >
              <div className="col-start-1 row-start-1 self-center">
                {project.rowIcon}
              </div>

              <div className="col-start-2 row-start-1 min-w-0 self-center">
                <h3
                  className={`font-campton text-base font-medium md:text-base lg:text-lg  ${project.titleColor}`}
                >
                  {project.title}
                </h3>
                <span className="mt-0.5 block font-campton text-[10px] text-[#848484] sm:text-[12px]">
                  {project.date}
                  <span className="text-[#A8A8A8]"> · {project.platform}</span>
                </span>
              </div>

              <p className="col-span-2 col-start-1 row-start-2 min-w-0 self-center font-campton text-xs leading-relaxed text-[#848484] sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:max-w-[475px] sm:text-sm sm:leading-relaxed">
                {project.description}
              </p>

              <span
                className={`col-span-2 col-start-1 row-start-3 flex shrink-0 items-center gap-0.5 self-center font-campton text-xs text-[#848484] opacity-80 transition-opacity group-hover:opacity-100 sm:col-span-1 sm:col-start-4 sm:row-start-1 ${project.titleHoverColor}`}
              >
                <span className="whitespace-nowrap">Check it out</span>
                <ExternalLinkMarkIcon className="size-[18px] shrink-0 sm:size-[23px]" />
              </span>
            </a>
            <div className="h-1 border-b border-[#D4D4D4] last:border-b-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
