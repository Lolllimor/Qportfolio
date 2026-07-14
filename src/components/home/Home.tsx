import VibeCodedProjects from '@/components/home/VibeCodedProjects';
import InterswitchPhone from '@/components/home/InterswitchPhone';
import ChangersLaptop from '@/components/home/ChangersLaptop';
import PouchiiPhone from '@/components/home/PouchiiPhone';
import ProfileStack from '@/components/home/ProfileStack';

export default function HomeComponent() {
  return (
    <main className=" mt-[56px] sm:mt-[162px] min-h-screen bg-white  max-[700px]:max-w-[500px] md-w-full px-6 sm:px-0">
      <div className="flex flex-col">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col sm:gap-14 gap-8 md:w-[656px] sm:mb-[78px] mb-8 -mt-[10px]">
            <div className="h-[64px] w-full flex items-center gap-4">
              <h1 className="text-[#353F50] sm:text-[60px] md:text-[80px] text-[40px] font-normal leading-normal">
                Quadri Morin
              </h1>
              <ProfileStack />
            </div>

            <div className="flex flex-col gap-4 sm:gap-2.5 font-campton sm:max-w-[500px] md:max-w-full max-w-full">
              <p className="text-base font-normal leading-6 text-[#848484] lg:leading-relaxed">
                I design digital experiences that move people, across{' '}
                <span className="text-[#353F50]">
                  fintech, ed-tech, AI-powered tools, and social impact products
                </span>{' '}
                that have reached{' '}
                <span className="text-[#353F50]">millions of users globally</span>
                . My focus is on the full arc: from understanding what users
                need to shipping things that actually change behaviour.
              </p>
              <p className="text-base font-normal leading-6 text-[#848484]">
                Currently at{' '}
                <span className="text-[#353F50]">Interswitch</span>, designing
                for one of{' '}
                <span className="text-[#353F50]">
                  Africa&apos;s largest financial infrastructures
                </span>
                .
              </p>
              <a
                href="https://docs.google.com/document/d/1RYYdLsKFfPM6eUOkGXyi4YDR9bKg5-LhG5oHIHXhGy0/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center justify-center rounded-lg border border-[#F0F0F0] bg-[#F5F5F5] px-5 py-3 font-campton text-sm font-normal leading-none text-[#353F50] no-underline transition-[color,background-color,transform] duration-200 hover:scale-105 hover:bg-[#EFEFEF] hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
              >
                Download resume
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-3xl font-[#353F50] font-garamond font-medium">
            {' '}
            Selected Projects
          </span>
          <div className="flex flex-col lg:flex-row items-center lg:gap-2 gap-6 font-campton">
            <InterswitchPhone />
            <PouchiiPhone />
            <ChangersLaptop />
          </div>
        </div>

        <div className="mt-[80px] mb-[111px]">
          <VibeCodedProjects />
        </div>
      </div>
    </main>
  );
}
