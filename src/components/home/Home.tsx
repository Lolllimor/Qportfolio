import VibeCodedProjects from '@/components/home/VibeCodedProjects';
import InterswitchPhone from '@/components/home/InterswitchPhone';
import ChangersLaptop from '@/components/home/ChangersLaptop';
import { useActiveTab } from '@/contexts/ActiveTabContext';
import PouchiiPhone from '@/components/home/PouchiiPhone';
import ProfileStack from '@/components/home/ProfileStack';
import { GoToTwentyII } from '../GoToTwentyII';

export default function HomeComponent() {
  const { activeTab } = useActiveTab();
  return (
    <main className=" mt-[56px] sm:mt-[162px] min-h-screen bg-white  max-[700px]:max-w-[500px] md-w-full px-6 sm:px-0">
      <div className="flex flex-col">
        <div className="flex justify-between items-center w-full relative">
          {' '}
          <div className="flex flex-col sm:gap-14 gap-8 md:w-[648px] sm:mb-[78px] mb-8 -mt-[10px] relative">
            <div className="h-[64px] w-full flex items-center gap-4">
              <h1 className="text-[#353F50] sm:text-[60px] md:text-[80px] text-[40px] font-normal leading-normal">
                Quadri Morin
              </h1>
              <ProfileStack />
            </div>

            <div className="flex flex-col gap-4 sm:gap-2.5 font-campton sm:max-w-[500px] md:max-w-full max-w-full">
              <p className="text-base font-normal lg:leading-relaxed leading-6 text-[#848484]">
                Currently working at{' '}
                <span className="text-[#353F50]">Interswitch</span> as a{' '}
                <span className="text-[#353F50]">
                  Senior Product Designer & UX Researcher
                </span>
                .
              </p>
              <p className="text-base font-normal leading-6 text-[#848484]">
                I've spent the past{' '}
                <span className="text-[#353F50]">decade</span> {''}
                designing and shipping digital experiences across{' '}
                <span className="text-[#353F50]">
                  fintech, ed-tech, e-commerce, green energy, social impact, and
                  AI-powered tools
                </span>
                <span className="text-[#848484]">
                  , impacting millions of users globally.
                </span>
              </p>
            </div>
          </div>
          {activeTab === 'home' && (
            <div className=" lg:block hidden  right-0 top-0 z-9999 px-6 md:px-0 absolute">
              <GoToTwentyII />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-3xl font-[#353F50] font-garamond font-medium">
            {' '}
            Selected Projects
          </span>
          <div className="flex flex-col lg:flex-row items-center lg:gap-2 gap-6 font-campton">
            <ChangersLaptop />
            <PouchiiPhone />
            <InterswitchPhone />
          </div>
        </div>

        <div className="mt-[80px] mb-[111px]">
          <VibeCodedProjects />
        </div>
      </div>
    </main>
  );
}
