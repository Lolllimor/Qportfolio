type ArticleItem = {
  title: string;
  date: string;
  description: string;
  href: string;
  imageSrc: string;
};

const articles: ArticleItem[] = [
  {
    title: 'The Real Skill That Separates Designers Who Thrive With AI',
    date: 'Apr 2026',
    description:
      'What separates the designers AI makes better from the ones it makes lazy.',
    href: 'https://medium.com/@quadmor009/the-real-skill-that-separates-designers-who-thrive-with-ai-db6d232fa8c5',
    imageSrc:
      'https://miro.medium.com/v2/resize:fill:400:160/1*Sddc1Qx2g-8PORu6Tr9bMQ.png',
  },
  {
    title: 'Copywriting for Designers: How It Improves Design Results',
    date: 'Jan 2026',
    description: 'How learning to write copy changed the way I design.',
    href: 'https://medium.com/@quadmor009/copywriting-for-designers-how-it-improves-design-results-c9b3c6ef4fb1',
    imageSrc:
      'https://miro.medium.com/v2/resize:fill:400:160/1*NL0-3VCHh2bz54OvO77VDQ.png',
  },
  {
    title: 'Design System Onboarding — Turning Tools into Team Culture',
    date: 'Sep 2025',
    description: 'Why adoption is the hardest design problem nobody talks about.',
    href: 'https://medium.com/design-systems-collective/design-system-onboarding-turning-tools-into-team-culture-dec64b22a2c3',
    imageSrc:
      'https://miro.medium.com/v2/resize:fill:400:160/1*BX74AMcPWuJwAsDL7-DgWQ.png',
  },
  {
    title: 'Design Faster & Smarter with Reference Overlay Figma Plugin',
    date: 'Mar 2026',
    description:
      'Upload, compare, and take notes without leaving your Figma canvas.',
    href: 'https://medium.com/@quadmor009/design-faster-smarter-with-reference-overlay-figma-plugin-6e712842fefc',
    imageSrc:
      'https://miro.medium.com/v2/resize:fill:400:160/1*jwYRZWFi37q3t7dOIrPMXQ.jpeg',
  },
  {
    title: 'Building a Mind-Reading Plugin; and Where I Went Wrong',
    date: 'Mar 2026',
    description:
      'How overengineering nearly derailed a simple idea — and why simplicity won.',
    href: 'https://medium.com/@quadmor009/building-a-mind-reading-plugin-and-where-i-went-wrong-8d61000f2bd9',
    imageSrc:
      'https://miro.medium.com/v2/resize:fill:400:160/1*ZFqTh5HussEFZFLUu4stDg.jpeg',
  },
  {
    title: '8 Common UX Research Biases (and How to Avoid Them)',
    date: 'Nov 2025',
    description:
      'Eight biases that can distort your research — and how to keep them out of your process.',
    href: 'https://medium.com/@quadmor009/8-common-ux-research-biases-and-how-to-avoid-them-d86664ceb2ef',
    imageSrc:
      'https://miro.medium.com/v2/resize:fill:400:160/1*ZWkhnQ1CInv21DS1h0uSGA.png',
  },
];

export default function Article() {
  return (
    <div className="relative mb-20 min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <div className="flex w-full min-w-0 flex-col max-w-[845px] xl:max-w-full">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-garamond text-2xl font-medium text-[#353F50] sm:text-3xl">
              Articles
            </h1>
            <p className="mt-1 font-campton text-sm leading-relaxed text-[#848484] sm:text-base">
              Thinking out loud on design, AI, and how we work.
            </p>
          </div>
          <a
            href="https://medium.com/@quadmor009"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 self-center rounded-lg border border-[#F0F0F0] bg-[#F5F5F5] px-5 py-3 font-campton text-sm font-normal leading-none text-[#353F50] no-underline transition-colors hover:bg-[#EFEFEF] hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
          >
            <span>Read all articles</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div
          className="mt-3 grid grid-cols-1 items-stretch gap-x-3 gap-y-4 sm:mt-6 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {articles.map((article) => (
            <a
              key={article.href}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              aria-label={`Read article: ${article.title}`}
              className="group flex h-full min-h-[360px] flex-col overflow-hidden rounded-[10px] border border-[#F0F0F0] bg-[#FAFAFA] no-underline transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001] visited:[&_h3]:text-[#353F50]"
            >
              <img
                src={article.imageSrc}
                alt={article.title}
                width={400}
                height={160}
                className="h-40 w-full shrink-0 object-cover"
              />

              <div className="flex flex-1 flex-col items-start p-4">
                <div className="flex w-full flex-col gap-1">
                  <h3 className="line-clamp-2 font-campton text-base font-medium leading-snug text-[#353F50] transition-colors group-hover:text-[#E66001]">
                    {article.title}
                  </h3>
                  <span className="font-campton text-[10px] font-normal text-[#848484] sm:text-[12px]">
                    {article.date}
                  </span>
                </div>
                <p className="mt-2 font-campton text-xs font-normal leading-[16px] text-[#848484] sm:text-sm sm:leading-[20px]">
                  {article.description}
                </p>
                <span className="mt-auto font-campton text-xs font-normal text-[#353F50] transition-colors group-hover:text-[#E66001] sm:text-sm">
                  Read more →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
