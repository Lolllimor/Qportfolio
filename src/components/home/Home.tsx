import Link from 'next/link';

import { ArrowRight } from '@/components/icons/arrow-right-o';
import VibeCodedProjects from '@/components/home/VibeCodedProjects';
import WorkedWith from '@/components/home/WorkedWith';
import ScreenMarquee from '@/components/home/ScreenMarquee';
import InterswitchPhone from '@/components/home/InterswitchPhone';
import EmprintePhone from '@/components/home/EmprintePhone';
import PawaPhone from '@/components/home/PawaPhone';
import LatestArticleClip, {
  LatestArticleBanner,
} from '@/components/home/LatestArticleClip';
import ProfileStack from '@/components/home/ProfileStack';
export default function HomeComponent() {
  return (
    <main className=" mt-[56px] sm:mt-[162px] min-h-screen bg-white  max-[700px]:max-w-[500px] md-w-full px-6 sm:px-0">
      <div className="flex flex-col">
        <div className="relative mb-10 w-full sm:mb-16">
            <div className="-mt-[10px] flex w-full min-w-0 max-w-full flex-col gap-8 sm:gap-14 md:w-[656px]">
            <div className="flex min-h-[64px] w-full min-w-0 flex-nowrap items-center gap-3 sm:gap-4">
              <h1 className="min-w-0 whitespace-nowrap text-[34px] font-normal leading-[1.2] text-[#353F50] min-[360px]:text-[40px] sm:text-[60px] sm:leading-normal md:text-[80px]">
                Quadri Morin
                <span className="sr-only">, Product & UX Designer</span>
              </h1>
              <ProfileStack />
            </div>

            <div className="group flex max-w-full flex-col gap-4 font-campton sm:max-w-[500px] sm:gap-2.5 md:max-w-full">
              <p className="text-base font-normal leading-6 text-[#5C5C5C] lg:leading-relaxed">
                I design digital experiences that move people, across{' '}
                <span className="text-[#353F50] transition-colors duration-200 group-hover:text-[#E66001]">
                  fintech, ed-tech, AI-powered tools, and social impact products
                </span>{' '}
                that have reached{' '}
                <span className="text-[#353F50] transition-colors duration-200 group-hover:text-[#E66001]">
                  millions of users globally
                </span>
                . My focus is on the full arc: from understanding what users
                need to shipping things that actually change behaviour.
              </p>
              <p className="text-base font-normal leading-6 text-[#5C5C5C]">
                Currently at{' '}
                <span className="text-[#353F50] transition-colors duration-200 group-hover:text-[#E66001]">
                  Interswitch
                </span>
                , designing for one of{' '}
                <span className="text-[#353F50] transition-colors duration-200 group-hover:text-[#E66001]">
                  Africa&apos;s largest financial infrastructures
                </span>
                .
              </p>
              <a
                href="https://docs.google.com/document/d/1RYYdLsKFfPM6eUOkGXyi4YDR9bKg5-LhG5oHIHXhGy0/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-normal
                className="mt-2 inline-flex w-fit items-center justify-center rounded-lg border border-[#F0F0F0] bg-[#F5F5F5] px-5 py-3 font-campton text-sm font-normal leading-none text-[#353F50] no-underline transition-[color,background-color,transform] duration-200 hover:scale-105 hover:bg-[#EFEFEF] hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
              >
                Open Resume
              </a>
            </div>
            </div>
            <div className="absolute top-1 right-1 hidden lg:block">
              <LatestArticleClip />
            </div>
        </div>

        <div className="lg:hidden">
          <LatestArticleBanner />
        </div>

        <WorkedWith />

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-3xl text-[#353F50] font-garamond font-medium">
              Selected Projects
            </h2>
            <Link
              href="/product"
              data-cursor-normal
              className="group inline-flex shrink-0 items-center gap-0.5 font-campton text-sm font-normal text-[#353F50] underline underline-offset-4 transition-colors duration-200 hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
            >
              View All Projects
              <span className="inline-flex overflow-hidden">
                <span className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowRight />
                </span>
              </span>
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row items-center lg:gap-2 gap-6 font-campton">
            <InterswitchPhone />
            <EmprintePhone />
            <PawaPhone />
          </div>
        </div>

        <div className="mt-[80px] mb-[111px]">
          <VibeCodedProjects />
          <ScreenMarquee />
        </div>
      </div>
    </main>
  );
}
