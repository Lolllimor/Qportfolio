
import { DotIcon } from '../icons/dot';
import { gallery } from '../data';

export const Gallery = () => {
  return (
    <div className="min-h-screen bg-white relative max-[700px]:max-w-[500px] w-full px-6 sm:px-0 max-w-[850px] xl:max-w-[1014px] pt-[60px] mb-20">
      {' '}
      <h2 className="font-campton font-medium md:text-[32px] text-2xl text-black mb-2 leading-tight">
        Gallery
      </h2>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 pt-6 lg:pt-16 ">
        {gallery.map((item,idx) => (
          <div key={idx} className="w-full h-auto mb-4 relative group">
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-auto select-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <div className="absolute bottom-4 left-4 w-fit h-fit bg-white/80 rounded-md opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 px-2.5 py-1.5 flex items-center gap-1">
              <p className="text-black text-xs font-campton  leading-tight">
                {item.name}
              </p>
              <DotIcon />
              <p className="text-black text-xs font-campton  leading-tight">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
