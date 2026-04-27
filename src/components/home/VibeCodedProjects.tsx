'use client';

import type { ReactNode } from 'react';

import {
  DesignGymIcon,
  EmprinteIconMark,
  ExternalLinkMarkIcon,
  PopulatorIconMark,
} from '@/components/icons/design-gym';

function PopulatorTile() {
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
  href: string;
};

const projects: ProjectRow[] = [
  {
    title: 'Design Gym',
    rowIcon: <DesignGymTile />,
    hoverBg: 'hover:bg-[#FFF1EB]',
    date: 'Jan, 2026',
    titleColor: 'text-[#EB5D1D]',
    titleHoverColor: 'group-hover:text-[#EB5D1D]',
    description:
      'I built a web paltform that allows designers to play multiple comparison games with the aim to improve their visual skill',
    href: '#',
  },
  {
    title: 'Populator',
    rowIcon: <PopulatorTile />,
    hoverBg: 'hover:bg-[#DEEEFE]',
    date: 'Feb, 2026',
    titleColor: 'text-[#6C8497]',
    titleHoverColor: 'group-hover:text-[#6C8497]',
    description:
      'The design gym is a web paltform that allows designers to play multiple comparison games with the aim to improve their visual skill',
    href: '#',
  },
  {
    title: 'Reference Overlay',
    rowIcon: <EmprinteTile />,
    hoverBg: 'hover:bg-[#F1F6F5]',
    date: 'Feb, 2026',
    titleColor: 'text-[#11221F]',
    titleHoverColor: 'group-hover:text-[#11221F]',
    description:
      'The design gym is a web paltform that allows designers to play multiple comparison games with the aim to improve their visual skill',
    href: '#',
  },
];

export default function VibeCodedProjects() {
  return (
    <div className="flex w-full min-w-0 flex-col max-w-[845px] xl:max-w-full">
      <h2 className="font-garamond text-2xl font-medium text-[#353F50] sm:text-3xl">
        Vibe Coded Projects
      </h2>

      <div className="mt-3 flex flex-col sm:mt-6" role="list">
        {projects.map((project) => (
          <div key={project.title}>
            <a
              key={project.title}
              href={project.href}
              role="listitem"
              className={`group grid grid-cols-[auto_1fr] grid-rows-[auto_auto_auto] gap-x-3 gap-y-2 my-3 last:border-b-0 sm:grid-cols-[auto_minmax(0,11rem)_minmax(0,1fr)_auto] sm:grid-rows-1 sm:items-start sm:gap-x-5 sm:gap-y-0 sm:my-4 md:gap-x-8 lg:gap-x-14 lg:py-3.5 ${project.hoverBg} pt-4 rounded-lg  `}
            >
              <div className="col-start-1 row-start-1 self-start pt-0.5 sm:pt-0">
                {project.rowIcon}
              </div>

              <div className="col-start-2 row-start-1 min-w-0">
                <h3
                  className={`font-campton text-base font-medium md:text-base lg:text-lg  ${project.titleColor}`}
                >
                  {project.title}
                </h3>
                <span className="mt-0.5 block font-campton text-xs text-[#848484] sm:text-sm">
                  {project.date}
                </span>
              </div>

              <p className="col-span-2 col-start-1 row-start-2 min-w-0 font-campton text-xs leading-relaxed text-[#848484] sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:max-w-[475px] sm:text-sm sm:leading-relaxed">
                {project.description}
              </p>

              <span className="col-span-2 col-start-1 row-start-3 flex shrink-0 items-center gap-1.5 self-start font-campton text-xs text-[#848484] opacity-80 transition-opacity group-hover:opacity-100 sm:col-span-1 sm:col-start-4 sm:row-start-1 sm:items-center sm:gap-1.5 sm:pt-0.5">
                <span
                  className={`whitespace-nowrap ${project.titleHoverColor}`}
                >
                  Check it out
                </span>
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
