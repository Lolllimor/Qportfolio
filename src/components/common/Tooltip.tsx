export const Tooltip = ({
  description,
  children,
}: {
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative group ">
      <div className="hidden lg:block max-w-[80px] absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-[#E66001] text-white text-xs px-[7px] py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity  font-campton leading-tight">
        {description}
      </div>
      {children}
    </div>
  );
};
