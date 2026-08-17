import Image from 'next/image';
import Link from 'next/link';

const BEHANCE_URL =
  'https://www.behance.net/gallery/250175837/BRAND-PRODUCT-ECOSYSTEM-CASE-STUDY';
const APP_STORE_URL = 'https://apps.apple.com/ng/app/emprinte/id6762211251';
const WEBSITE_URL = 'https://emprintereaders.com/';

function StudyImage({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  className = 'my-10',
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 1014px"
        className="h-auto w-full rounded-2xl"
      />
      {caption ? (
        <figcaption className="mt-3 font-campton text-sm leading-relaxed text-[#5C5C5C]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function EmprinteReadersStudy() {
  return (
    <article className="relative min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] pb-24 max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <Link
        href="/product"
        className="mb-8 inline-flex min-h-11 items-center font-campton text-sm text-[#5C5C5C] no-underline transition-colors hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
      >
        ← Product Design
      </Link>

      <p className="font-campton text-xs leading-tight text-[#5C5C5C]">
        2026 · Lead Product Designer & Brand Strategist · Logo, website, and
        app · Solo-led through App Store launch
      </p>
      <h1 className="mt-2 font-apple-garamond text-[32px] leading-snug font-normal text-[#353F50] md:text-[40px] md:leading-tight">
        Emprinte Readers Hub
      </h1>
      <p className="mt-4 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        A reading and accountability ecosystem designed to help ambitious
        Africans build better habits, think deeper, and grow together.
      </p>

      <div className="mt-12 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          The problem
        </h2>
        <p>
          Reading culture often feels isolated, academic, and difficult to
          sustain. Many young Africans start self-development journeys but
          struggle with consistency, accountability, and community support.
        </p>
        <p>
          That meant building an identity and product experience that could
          carry both the weight of a movement and the warmth of a community —
          across brand, digital product, and physical touchpoints.
        </p>
        <p>
          Emprinte Readers Hub was created to transform reading from a solo
          activity into a shared growth experience powered by structure,
          community, and intentional habits.
        </p>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Brand positioning
        </h2>
        <p>Emprinte is not just a reading platform.</p>
        <p>
          It is a growth movement designed to help people build better habits,
          think deeper, and evolve together through shared learning
          experiences. The brand positions reading as an active lifestyle
          rather than a passive hobby.
        </p>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Goal and audience
        </h2>
        <p>The goal was a brand system that felt:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>intentional but approachable</li>
          <li>disciplined without feeling rigid</li>
          <li>modern while still emotionally warm</li>
          <li>community-driven rather than institutional</li>
        </ul>
        <p>
          The identity needed to support both digital product experiences and
          offline community culture.
        </p>
        <p>
          Emprinte is designed for ambitious young Africans focused on
          personal growth, accountability, leadership, and lifelong learning:
          young professionals, founders and creatives, students and
          early-career talent, and growth-focused communities. They are
          people seeking structure, transformation, and meaningful connection
          through learning.
        </p>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Building a brand worthy of the movement
        </h2>
        <p>
          As the brand sought to establish itself as a transformative force
          for African leadership, it needed an identity cohesive enough to
          hold across every touchpoint. The earlier mark could not carry that
          weight.
        </p>
        <p>
          The new logo combines a footprint and an upward leaf. The footprint
          stands for progress, journey, and personal growth. The upward form
          stands for elevation, transformation, and intentional development.
          Rounded forms keep it human, welcoming, and community-oriented
          rather than academic or rigid.
        </p>
      </div>

      <StudyImage
        src="/case-studies/emprinte/logo-rationale.webp"
        alt="Logo rationale for Emprinte: a footprint plus a leaf, shown as an equation and as a construction grid of the leaf-footprint mark."
        caption="The mark is a footprint and a leaf: progress plus elevation."
        width={1800}
        height={1123}
      />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <p>
          The palette balances depth, warmth, and energy. Deep green
          communicates growth, knowledge, and stability. Burnt orange
          introduces energy, momentum, and optimism. Together they feel
          mature enough for leadership conversations while remaining youthful
          and expressive.
        </p>
        <p>
          Lora carries the editorial, reading-first tone. Campton keeps
          digital interfaces clear. Warmth and structure, side by side.
        </p>
      </div>
      <StudyImage
        src="/case-studies/emprinte/color-system.webp"
        alt="Emprinte color system with four swatches: deep green, burnt orange, dark charcoal, and sage teal, each with RGB and hex values."
        caption="Deep green, burnt orange, charcoal, and sage."
        width={1800}
        height={1191}
      />

      <h2 className="mt-16 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
        Community touchpoints
      </h2>
      <p className="mt-4 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        The identity system was extended across digital and physical
        touchpoints so the brand stays recognizable in the room and on the
        phone.
      </p>
      <StudyImage
        src="/case-studies/emprinte/lifestyle.webp"
        alt="Person carrying a dark teal Emprinte tote with a repeating leaf-footprint print, beside a close-up of the wordmark on a matching sweatshirt."
        caption="Tote and sweatshirt applications of the mark."
        width={1800}
        height={1103}
      />
      <StudyImage
        src="/case-studies/emprinte/touchpoints.webp"
        alt="Emprinte brand mockups including interior signage, stickers, a notebook and mug, outdoor signage, and a tote bag."
        caption="Signage, stickers, stationery, and tote."
        width={1800}
        height={889}
      />
      <StudyImage
        src="/case-studies/emprinte/cards.webp"
        alt="Emprinte business cards, iOS app icon on a home screen, and a social profile layout with the handle @EmprinteReaders."
        caption="Cards, app icon, and social profile."
        width={1800}
        height={1125}
      />

      <h2 className="mt-16 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
        Website
      </h2>
      <p className="mt-4 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        The site carries the same line as the movement: transforming Africa,
        one book at a time. It introduces the hub, the Build a Reader
        initiative for Nigerian secondary school students, and the virtual
        bootcamps — from financial tracking and the 5AM Club to the Emprinte
        Reading Room.
      </p>
      <StudyImage
        src="/case-studies/emprinte/website.webp"
        alt="Emprinte website sections including the hero, member stats, mission, Build a Reader initiative, bootcamp cards, and newsletter."
        caption="Website: hero, stats, initiatives, and bootcamps."
        width={1800}
        height={1126}
        priority
      />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Product experience
        </h2>
        <p>
          The product is designed to encourage consistency and accountability
          through structured growth systems: reading schedules, bootcamps,
          reading streaks, a community forum, growth tracking, and quarterly
          goals.
        </p>
        <p>
          Onboarding is meant to reduce friction and shift the mindset from
          setting up an app to joining a movement.
        </p>
        <p>
          Self-development communities often leave a gap between motivation
          and actual accountability. Emprinte bridges that by combining
          reading culture with structure and community participation.
        </p>
      </div>
      <StudyImage
        src="/case-studies/emprinte/app-flow.webp"
        alt="Emprinte app case study board showing onboarding illustrations, home dashboard, community forum, bootcamp registration, and growth tracker screens."
        caption="Onboarding, home, community, bootcamps, and growth tracker."
        width={1800}
        height={3954}
      />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Results so far
        </h2>
        <p>
          Emprinte is in structured community testing with 40+ active members
          ahead of a public launch in September 2026, with high onboarding
          completion. The brand system has stayed consistent across digital
          and offline touchpoints without a redesign, and has supported
          organic discovery through monthly campaigns.
        </p>
        <p>Emprinte was designed to make growth visible, communal, and sustainable.</p>
      </div>
      <StudyImage
        src="/case-studies/emprinte/results.webp"
        alt="Grid of Emprinte community graphics including Book of the Month posters, Read With Us, World Book Day, and a financial independence event flyer."
        caption="Monthly campaigns running on the same identity system."
        width={1800}
        height={1238}
      />

      <p className="max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        More than a reading platform, it is a system for helping people
        become better together.
      </p>
      <p className="mt-8 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        <a
          href={WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#353F50] underline underline-offset-4 transition-colors hover:text-[#E66001]"
        >
          Visit website
        </a>
        {' · '}
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#353F50] underline underline-offset-4 transition-colors hover:text-[#E66001]"
        >
          Download on App Store
        </a>
        {' · '}
        <a
          href={BEHANCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#353F50] underline underline-offset-4 transition-colors hover:text-[#E66001]"
        >
          Also on Behance
        </a>
      </p>
    </article>
  );
}
