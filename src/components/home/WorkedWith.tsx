const partners = [
  { name: 'Cede', src: '/logos/cede.png', className: 'h-6 sm:h-7' },
  { name: 'Anambra State', src: '/logos/anambra.png', className: 'h-11 sm:h-12' },
  { name: 'Quickteller', src: '/logos/quickteller.png', className: 'h-6 sm:h-7' },
  { name: 'Pouchii', src: '/logos/pouchii.png', className: 'h-14 sm:h-16' },
  { name: 'FundACause', src: '/logos/fundacause.svg', className: 'h-10 sm:h-12' },
  { name: 'Remita', src: '/logos/remita.svg', className: 'h-6 sm:h-7' },
  { name: 'Verve', src: '/logos/verve.svg', className: 'h-7 sm:h-8' },
  { name: 'Lagos Tourism', src: '/logos/lagos-tourism.png', className: 'h-11 sm:h-12' },
  { name: 'Swaddle', src: '/logos/swaddle.png', className: 'h-6 sm:h-7' },
  { name: 'Interswitch', src: '/logos/interswitch.svg', className: 'h-6 sm:h-7' },
  { name: 'SystemSpecs', src: '/logos/systemspecs.png', className: 'h-6 sm:h-7' },
];

function LogoRow({
  copy,
}: {
  copy?: boolean;
}) {
  return (
    <ul
      aria-hidden={copy || undefined}
      className={`flex shrink-0 items-center gap-x-10 pr-10 sm:gap-x-14 sm:pr-14 ${copy ? 'logo-marquee-copy' : ''}`}
    >
      {partners.map((partner) => (
        <li key={`${partner.name}${copy ? '-copy' : ''}`} className="flex items-center">
          <img
            src={partner.src}
            alt={copy ? '' : partner.name}
            className={`${partner.className} w-auto shrink-0`}
          />
        </li>
      ))}
    </ul>
  );
}

export default function WorkedWith() {
  return (
    <section aria-label="Worked with" className="mb-12 sm:mb-[72px]">
      <p className="font-campton text-[13px] font-normal leading-none text-[#B0B0B0] sm:text-sm">
        Worked with
      </p>
      <div className="logo-marquee-window mt-5 sm:mt-6">
        <div className="logo-marquee flex w-max items-center">
          <LogoRow />
          <LogoRow copy />
        </div>
      </div>
    </section>
  );
}
