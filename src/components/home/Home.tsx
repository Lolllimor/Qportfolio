import InterswitchPhone from '@/components/home/InterswitchPhone';
import ChangersLaptop from '@/components/home/ChangersLaptop';
import PouchiiPhone from '@/components/home/PouchiiPhone';

export default function HomeComponent() {
  return (
    <main className=" mt-[56px] sm:mt-[162px] min-h-screen bg-white relative max-[700px]:max-w-[500px] md-w-full px-6 sm:px-0">
      <div className="flex flex-col ">
        <div className="flex flex-col sm:gap-14 gap-8 md:w-[648px] sm:mb-[78px] mb-8 -mt-[10px]">
          <div className="sm:w-[458px] h-[88px] w-full  flex  items-center gap-2 justify-start">
            <img
              src="https://6k5tmago9w.ufs.sh/f/HFzCBJpycq0LDGGXtGE9wORVMloSC65udj4AkUINXZQEiWDt"
              alt=""
              width={38}
              height={69}
              className="rounded-b-[400px] "
            />
            <h1 className="text-[#353F50] sm:text-[80px] text-[40px] font-normal leading-normal  left-[46px] top-0">
              Quadri Morin
            </h1>
          </div>

          <div className="flex flex-col gap-4 sm:gap-2.5 font-campton sm:max-w-[500px] md:max-w-full max-w-full">
            <p className="text-base font-normal lg:leading-10 leading-6">
              <span className="text-[#848484]">Currently working at </span>
              <span className="text-[#353F50]">Interswitch</span>
              <span className="text-[#848484]"> as a </span>
              <span className="text-[#353F50]">
                Senior Product Designer & UX Researcher.
              </span>
            </p>
            <p className="text-base font-normal leading-6">
              <span className="text-[#848484]">I've spent the past </span>
              <span className="text-[#353F50]">decade</span>
              <span className="text-[#848484]">
                {' '}
                designing and shipping digital experiences across{' '}
              </span>
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

        <div className="flex flex-col lg:flex-row items-center lg:gap-2 gap-6 mb-[111px] font-campton">
          <ChangersLaptop />
          <PouchiiPhone />
          <InterswitchPhone />
        </div>
      </div>
    </main>
  );
}
