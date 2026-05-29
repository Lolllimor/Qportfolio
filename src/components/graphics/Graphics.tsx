import { graphics } from '../data';
import { ArrowRight } from '../icons/arrow-right-o';

export const Graphics = () => {
  return (
    <div className="min-h-screen bg-white relative max-[700px]:max-w-[500px] w-full px-6 sm:px-0 max-w-[850px] xl:max-w-[1014px] pt-[60px] mb-20">
      <h1 className="font-campton font-medium md:text-[32px] text-2xl text-black mb-2 leading-tight">
        Graphics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-[64px] md:pt-12 pt-6 lg:pt-16">
        {graphics.map((item, index) => {
          const isComingSoon = item.comingSoon === true;
          const cardClassName = `flex flex-col gap-4 group no-underline text-inherit ${
            isComingSoon ? 'cursor-default' : 'cursor-pointer'
          }`;

          const cardContent = (
            <>
              <div className="relative w-full aspect-497/357 overflow-hidden rounded-2xl border border-[#D8D8D8]">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                {isComingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#121212]/85">
                    <span className="font-campton text-white text-sm md:text-base font-medium tracking-wide uppercase">
                      Coming soon
                    </span>
                  </div>
                )}
                <div className="absolute left-[13px] top-px inline-flex h-9 px-4 py-2 justify-center items-center lg:bg-[#D9D9D9] rounded-b-3xl lg:group-hover:bg-[#E66001] bg-[#E66001]">
                  <span className="text-white text-xs font-normal leading-normal font-campton">
                    {item.category}
                  </span>
                </div>
                {!isComingSoon && (
                  <div className="absolute bottom-4 right-4 w-fit h-fit bg-[#E66001] p-3 rounded-full lg:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight color="#fff" />
                  </div>
                )}
              </div>
              <div className="flex flex-col lg:gap-2">
                <div className="text-[#666] lg:text-base text-xs font-normal leading-tight font-campton">
                  {item.company}
                </div>
                <div className="text-black lg:text-[32px] text-basefont-medium leading-tight font-campton">
                  {item.title}
                </div>
              </div>
            </>
          );

          if (item.url && !isComingSoon) {
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
              >
                {cardContent}
              </a>
            );
          }

          return (
            <div key={index} className={cardClassName}>
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};
