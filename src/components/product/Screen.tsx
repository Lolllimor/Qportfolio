import { screens } from '../data';
import { ScreenItem } from '@/types';

export const Screen = () => {
  return (
    <div className="flex flex-col gap-14 w-full max-w-[850px] xl:max-w-[1014px] mx-auto mb-20 pt-12 lg:pt-[67px] xl:pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {screens.map((screen: ScreenItem, index: number) => (
          <div
            key={index}
            className=" flex flex-col items-center gap-3"
          >
            <div className="w-full rounded-lg overflow-hidden">
              <img
                src={screen.imageSrc}
                alt={screen.imageAlt}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <h3 className="font-campton text-[#1C1C28] text-center font-causten text-base font-normal leading-normal">
                {screen.title}
              </h3>
              <p className="font-campton text-[#353F50] text-center text-xs font-normal leading-normal">
                {screen.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
