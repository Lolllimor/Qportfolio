import type { ReactNode } from 'react';
import { Nunito } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons/arrow-right-o';
import { PhoneScreenImage } from './IphoneFrame';
import { PawaPrototypeViewer } from './PawaPrototypeViewer';
import { PawaScreenStrip } from './PawaScreenStrip';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const TENANT_URL = 'https://pawa-khaki.vercel.app';

const iteration3Screens = [
  {
    src: '/case-studies/pawa/live/home-disconnected.png',
    alt: 'Pawa home in the disconnected state: empty gauge with X marks and a black Top up now button.',
  },
  {
    src: '/case-studies/pawa/live/home-active.png',
    alt: 'Pawa home in the active state, with the gauge at 59 percent.',
  },
  {
    src: '/case-studies/pawa/live/usage-consumption.png',
    alt: 'Pawa usage screen on the Consumption tab.',
  },
  {
    src: '/case-studies/pawa/live/usage-payments.png',
    alt: 'Pawa usage screen on the Payments tab.',
  },
  {
    src: '/case-studies/pawa/live/account.png',
    alt: 'Pawa account screen with saved card and notification toggles.',
  },
] as const;

function ProcessIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 text-[#E66001]"
    >
      {children}
    </svg>
  );
}

function PencilIcon() {
  return (
    <ProcessIcon>
      <path
        d="M14 5.5 18.5 10M4 20l1.4-5.2L15 5.2a2.1 2.1 0 0 1 3 3L8.2 18.1 4 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ProcessIcon>
  );
}

function CodeIcon() {
  return (
    <ProcessIcon>
      <path
        d="M8 8 4 12l4 4M16 8l4 4-4 4M13.5 6.5l-3 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </ProcessIcon>
  );
}

function PaperIcon() {
  return (
    <ProcessIcon>
      <rect
        x="6"
        y="3.5"
        width="12"
        height="17"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 9h6M9 12.5h6M9 16h3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </ProcessIcon>
  );
}

function ReactIcon() {
  return (
    <ProcessIcon>
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.8"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(120 12 12)"
      />
    </ProcessIcon>
  );
}

function VercelIcon() {
  return (
    <ProcessIcon>
      <path
        d="M12 4.5 21 20.5H3L12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </ProcessIcon>
  );
}

const processSteps = [
  { label: 'Hand sketches', Icon: PencilIcon },
  { label: 'Claude Code + MCP', Icon: CodeIcon },
  { label: 'Paper designs', Icon: PaperIcon },
  { label: 'React build', Icon: ReactIcon },
  { label: 'Vercel deploy', Icon: VercelIcon },
] as const;

const decisions = [
  {
    title: 'Prepaid over postpaid',
    body: 'Charging tenants at the end of the month means the landlord chases debt from people he lives next to. Prepaid removes that tension entirely. The money moves before the power does. This is also how Nigerians already think about electricity. NEPA meters run on tokens. Tenants aren’t learning something new.',
  },
  {
    title: 'Auto-disconnect and auto-reconnect',
    body: 'When balance hits zero, power cuts automatically. When a tenant tops up, it reconnects automatically. No call, no WhatsApp, no waiting. The disconnected screen says one thing: “Top up to reconnect automatically. No action needed from your landlord.” A low-balance alert fires at 20%, so reaching zero is a choice, not a surprise.',
  },
  {
    title: 'A 200 kWh max balance',
    body: 'The cap exists for the same reason prepaid electricity meters always have one: a solar system has finite capacity, and without a ceiling, one tenant can hold more than the system can serve. It also keeps the gauge meaningful. Without a fixed maximum, the arc has no reference point.',
  },
  {
    title: 'Hours alongside kilowatt-hours',
    body: 'The gauge shows kWh as the primary reading, the technical truth. But beneath it sits “Approx. 2.4 hours remaining.” The kWh is accurate but abstract. Hours are what most tenants actually understand. Both are always visible: one gives the fact, the other gives the meaning. The arc shifts from indigo to amber to red as balance drops. Urgency is in the colour, not in a label.',
  },
  {
    title: 'The circuit breakdown',
    body: 'Tenants reported not knowing why their balance dropped faster than expected. The “What’s drawing power” panel shows consumption by circuit in real time: Air Conditioning, Lighting, Kitchen, Other, as a segmented bar with live kW values. It answers the question before it becomes a complaint.',
  },
  {
    title: 'A three-step top-up flow',
    body: 'Amount → Payment → Confirmation. A tenant running low at 11pm is not reading instructions. The amount screen converts as they type: ₦1,500 is 17.6 kWh. Payment is via stored card through Paystack Vault, with bank transfer as an alternative. The confirmation screen says “You’re back on,” not “Payment successful.”',
  },
] as const;

const lessons = [
  {
    title: 'AI tools lower the barrier to building but raise the bar on authorship.',
    body: 'When a tool can generate a working interface in minutes, the question becomes: where is your judgment visible in the output? If the answer is only in the case study write-up and not in the product itself, that’s a problem. The craft has to show through the thing, not around it.',
  },
  {
    title: 'Interaction is where design judgment becomes legible.',
    body: 'A gauge that loads at its value and one that fills from zero hold the same data and say different things. Static screens can hide the absence of a decision. Motion cannot.',
  },
  {
    title: 'Copy carries more of the trust work than the interface does.',
    body: '“You’re back on” does more for a tenant at 11pm than any layout choice on those screens.',
  },
] as const;

function FramedScreen({
  src,
  alt,
  caption,
  sizes,
  className = '',
  captionSide = false,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  sizes: string;
  className?: string;
  captionSide?: boolean;
}) {
  return (
    <figure
      className={
        captionSide
          ? `flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10 ${className}`
          : className
      }
    >
      <div className={captionSide ? 'w-full max-w-[280px] shrink-0 sm:max-w-[320px]' : undefined}>
        <PhoneScreenImage src={src} alt={alt} sizes={sizes} />
      </div>
      {caption ? (
        <figcaption
          className={
            captionSide
              ? 'max-w-[320px] font-campton text-sm leading-relaxed text-[#5C5C5C]'
              : 'mt-3 font-campton text-sm leading-relaxed text-[#5C5C5C]'
          }
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

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
        loading={priority ? undefined : 'lazy'}
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

function StudyLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const className =
    'text-[#353F50] underline underline-offset-4 transition-colors hover:text-[#E66001]';

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function PawaStudy() {
  return (
    <article className="relative min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] pb-24 max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <Link
        href="/product"
        className="mb-8 inline-flex min-h-11 items-center font-campton text-sm text-[#5C5C5C] no-underline transition-colors hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
      >
        ← Product Design
      </Link>

      <p className="font-campton text-xs leading-tight text-[#5C5C5C]">
        2026 · Lead Designer & Developer
      </p>
      <h1 className="mt-2 font-apple-garamond text-[32px] leading-snug font-normal text-[#353F50] md:text-[40px] md:leading-tight">
        Pawa
      </h1>
      <a
        href="#prototype"
        className="mt-3 inline-flex items-center gap-1.5 font-campton text-xs leading-tight text-[#5C5C5C] no-underline transition-colors hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
      >
        Live prototype. Try it
        <ArrowRight />
      </a>
      <p className="mt-4 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        A prepaid power-sharing app for Nigerian apartment buildings, for
        landlords generating their own electricity and the tenants who buy it
        from them.
      </p>

      <StudyImage
        src="/case-studies/pawa/pawa-cover.png"
        alt="Pawa case study cover with a sun graphic and the line solar power-sharing app for Nigerian apartment buildings."
        width={1672}
        height={941}
        priority
      />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          The brief
        </h2>
        <blockquote className="border-l-2 border-[#E66001] pl-4 font-apple-garamond text-2xl leading-snug text-[#353F50] italic md:text-[28px]">
          Design an app for a power generator.
        </blockquote>
        <p>
          That was the entire brief: eight words from a leading African
          fintech.
        </p>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Reading the brief
        </h2>
        <p>
          For me, when I read “a power generator,” my mind didn’t drift to the
          mechanical generators commonly used in Nigeria. It drifted toward a
          solar power generator.
        </p>
        <p>
          A power generator could be a mechanical generator, a solar
          generator, which is becoming common in Nigeria, or a hydroelectric
          generator.
        </p>
        <p>
          I went for solar because it is a growing industry in Nigeria, and
          where nobody has built the management layer yet. Diesel has decades
          of informal practice around it. Solar doesn’t.
        </p>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Finding the real problem
        </h2>
        <p>
          I spoke to a friend, a solar engineer who built his own system at
          home and started supplying excess power to his tenants. I asked him
          how he was managing it, and where he was facing the highest
          friction.
        </p>
        <p>
          His answers started with his tenants. Power would cut off at the
          worst possible moment: in the night, while cooking or working,
          during a work call, with no warning. They’d have to call him to
          reconnect, sometimes after already making payment. Many also felt
          their balance was draining faster than expected with no way to
          verify it. On his end, managing multiple apartments, sometimes
          remotely while monitoring the solar system, had become exhausting.
        </p>
        <p>The infrastructure existed. The management layer didn’t.</p>
        <blockquote className="border-l-2 border-[#E66001] pl-4">
          This wasn’t a generator management problem. It was a trust and
          anxiety problem: tenants living with the constant low-level stress
          of not knowing where they stood with something as basic as power in
          their own home.
        </blockquote>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          From sketch to shipped
        </h2>
        <ol className="md:hidden">
          {processSteps.map(({ label, Icon }, index) => (
            <li key={label} className="relative flex gap-3 pb-5 last:pb-0">
              <div className="flex w-6 shrink-0 flex-col items-center">
                <Icon />
                {index < processSteps.length - 1 ? (
                  <span className="mt-1 w-px flex-1 bg-[#E66001]/30" />
                ) : null}
              </div>
              <p className="pt-0.5">{label}</p>
            </li>
          ))}
        </ol>
        <div className="relative hidden md:block">
          <div
            aria-hidden="true"
            className="absolute top-[41px] right-[10%] left-[10%] h-px bg-[#E66001]/30"
          />
          <ol className="grid grid-cols-5 gap-2">
            {processSteps.map(({ label, Icon }) => (
              <li
                key={label}
                className="relative flex flex-col items-center text-center"
              >
                <Icon />
                <span className="z-10 mt-3 h-2.5 w-2.5 rounded-full bg-[#E66001] ring-4 ring-white" />
                <p className="mt-3 text-sm leading-snug">{label}</p>
              </li>
            ))}
          </ol>
        </div>
        <p>
          The product was designed and built end to end with AI, from the
          first sketch to a live interactive prototype. Designs were created
          in Paper via MCP, converting hand-drawn sketches into structured UI,
          then built in React and deployed.
        </p>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          The decisions that shaped it
        </h2>
        {decisions.map((decision) => (
          <div key={decision.title} className="space-y-3">
            <h3 className="font-apple-garamond text-xl font-normal text-[#353F50]">
              {decision.title}
            </h3>
            <p>{decision.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          A simple style guide
        </h2>
        <p>
          I wrote a short guide, not a design system. Enough rules that every
          screen had to pick a side. Terracotta is for power. Primary buttons
          are black pills.
        </p>
        <p>
          Nunito carries the interface. It is round enough to feel human at
          11pm, and heavy enough to hold a kWh figure. The number is bold.
          Everything else is regular.
        </p>
      </div>

      <figure className="my-10 max-w-[640px]">
        <div
          className={`${nunito.className} rounded-2xl bg-[#F6F3F1] px-6 py-8 sm:px-8`}
        >
          <p className="text-[11px] tracking-wide text-[#5C5C5C] uppercase">
            Nunito · Regular 400 · Bold 700
          </p>
          <p className="mt-4 text-[56px] leading-none font-normal text-[#1C1816] sm:text-[72px]">
            Nunito
          </p>
          <p className="mt-6 text-[56px] leading-none font-bold text-[#1C1816] sm:text-[72px]">
            27%
          </p>
          <p className="mt-2 text-base font-normal text-[#5C5C5C]">
            2.4 kWh remaining
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#1C1816]/10 pt-6">
            <div>
              <p className="text-[11px] text-[#5C5C5C]">Regular</p>
              <p className="mt-1 text-xl font-normal text-[#1C1816]">
                You’re back on
              </p>
              <p className="mt-1 text-sm font-normal text-[#5C5C5C]">
                UI, labels, body
              </p>
            </div>
            <div>
              <p className="text-[11px] text-[#5C5C5C]">Bold</p>
              <p className="mt-1 text-xl font-bold text-[#1C1816]">36.4 kWh</p>
              <p className="mt-1 text-sm font-normal text-[#5C5C5C]">
                Balance, percent, hours
              </p>
            </div>
          </div>
        </div>
        <figcaption className="mt-3 font-campton text-sm leading-relaxed text-[#5C5C5C]">
          The figure carries the weight. The sentence around it stays regular.
        </figcaption>
      </figure>

      <figure className="my-10 max-w-[640px]">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
          {[
            { name: 'Ink', hex: '#1C1816', role: 'Text and primary actions', tint: true },
            { name: 'Terracotta', hex: '#D37153', role: 'Power, logo, live', tint: true },
            { name: 'Alert red', hex: '#B50027', role: 'Disconnected only', tint: true },
            { name: 'Stone', hex: '#F6F3F1', role: 'Surfaces', tint: false },
            { name: 'Paper', hex: '#FFFFFF', role: 'Background', tint: false },
          ].map((swatch) => (
            <div key={swatch.hex}>
              <p
                className="mb-2 font-campton text-sm"
                style={{ color: swatch.tint ? swatch.hex : '#353F50' }}
              >
                {swatch.name}
              </p>
              <div
                className="aspect-[2/3] w-full rounded-lg border border-[#E6E6E6]"
                style={{ background: swatch.hex }}
              />
              <p className="mt-2 font-campton text-xs text-[#5C5C5C]">{swatch.hex}</p>
              <p className="mt-1 font-campton text-xs leading-snug text-[#5C5C5C]">
                {swatch.role}
              </p>
            </div>
          ))}
        </div>
        <figcaption className="mt-3 font-campton text-sm leading-relaxed text-[#5C5C5C]">
          <span style={{ color: '#1C1816' }}>Ink</span> for actions.{' '}
          <span style={{ color: '#D37153' }}>Terracotta</span> for power.{' '}
          <span style={{ color: '#B50027' }}>Red</span> only when it is gone.
        </figcaption>
      </figure>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Two iterations
        </h2>

        <h3 className="font-apple-garamond text-xl font-normal text-[#353F50]">
          01 · First build
        </h3>
        <p>
          The first React build was functional but generic. Balance displayed
          as flat text, no visual weight, no urgency. The layout was clean but
          the AI tooling showed: everything was competent, nothing was
          distinctive. Individual craft wasn’t visible in the output.
        </p>
      </div>
      <figure className="my-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              src: '/case-studies/pawa/home-active.png',
              alt: 'First-build Pawa home with balance as flat text and no gauge.',
            },
            {
              src: '/case-studies/pawa/home-disconnected.png',
              alt: 'First-build Pawa home in the disconnected state, with zero balance as red text.',
            },
            {
              src: '/case-studies/pawa/usage.png',
              alt: 'First-build Pawa usage screen with a weekly consumption chart.',
            },
            {
              src: '/case-studies/pawa/account.png',
              alt: 'First-build Pawa account screen with payment methods and notification toggles.',
            },
          ].map((screen) => (
            <PhoneScreenImage
              key={screen.src}
              src={screen.src}
              alt={screen.alt}
              sizes="(max-width: 768px) 45vw, 220px"
              safeArea={false}
            />
          ))}
        </div>
        <figcaption className="mt-3 font-campton text-sm leading-relaxed text-[#5C5C5C]">
          The first build. No gauge, flat layout, AI defaults.
        </figcaption>
      </figure>

      <div className="mt-8 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <div className="space-y-3">
          <p className="font-campton text-xs tracking-wide text-[#353F50] uppercase">
            Feedback
          </p>
          <p>
            The prototype leaned on AI-generated defaults, making it harder to
            see individual visual craft and interaction design judgment in the
            work.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h3 className="font-apple-garamond text-xl font-normal text-[#353F50]">
          02 · The rebuild
        </h3>
        <p>
          So I went back. The disconnected state became a concept. No power
          means the app feels dead. The gauge shows X marks (dead eyes), the button
          turns black, the stat cards grey out. The goal was for the app to
          communicate absence through its entire visual state.
        </p>
        <p>
          The top-up flow moved to a bottom sheet. The confirmation screen
          builds sequentially: payment confirmed → kWh added → power
          reconnected.
        </p>
        <p>
          Every button has a 95% scale micro-interaction on press.
        </p>
      </div>
      <PawaScreenStrip
        screens={iteration3Screens}
        caption="Iteration 3. The final design. Every decision visible in the product, not just the write-up."
      />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          The gauge
        </h2>
        <p>
          The home screen is the gauge. When there is power, the arc fills
          from empty to the current balance, with an ease-out so it settles
          like a physical meter. 59% is not a label. It is a remaining amount
          you can feel.
        </p>
        <p>
          When there is no power, the same object does the opposite. The arc
          goes grey. Two X marks sit where the percentage was. The button
          turns black. The stat cards lose colour. The goal is for the page to
          feel dead the moment someone opens it, the same as the apartment.
        </p>
        <p>
          A zero can still look like a reading. An X cannot. It says the meter
          is not running. While there is power, the arc carries the urgency:
          red at 20% or below, amber from 21 to 40, green above that.
        </p>
      </div>
      <figure className="my-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            {
              src: '/case-studies/pawa/live/gauge-empty.png',
              alt: 'Pawa gauge disconnected: grey arc, two red X marks, and No power.',
              caption: 'Empty. X marks replace the reading.',
            },
            {
              src: '/case-studies/pawa/live/gauge-low.png',
              alt: 'Pawa gauge at 18 percent, red arc, low balance.',
              caption: 'Low. Red at 20% or below.',
            },
            {
              src: '/case-studies/pawa/live/gauge-mid.png',
              alt: 'Pawa gauge at 32 percent, amber arc, active.',
              caption: 'Mid. Amber from 21 to 40%.',
            },
            {
              src: '/case-studies/pawa/live/gauge-healthy.png',
              alt: 'Pawa gauge at 59 percent, green arc, active.',
              caption: 'Healthy. Green above 40%.',
            },
          ].map((gauge) => (
            <div key={gauge.src}>
              <Image
                src={gauge.src}
                alt={gauge.alt}
                width={780}
                height={408}
                sizes="(max-width: 768px) 45vw, 220px"
                className="h-auto w-full"
              />
              <p className="mt-3 text-center whitespace-nowrap font-campton text-sm text-[#5C5C5C]">
                {gauge.caption}
              </p>
            </div>
          ))}
        </div>
      </figure>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Directional top-up
        </h2>
        <p>
          Amount → Payment → Confirmation was already the right sequence. What
          was missing was direction. The flow now lives in a bottom sheet, so
          going forward and going back feel different. A tenant topping up at
          11pm should feel like they are walking a short path, not swapping
          static slides.
        </p>
      </div>
      <figure className="my-10">
        <div className="grid grid-cols-2 items-end gap-4 rounded-2xl bg-[#F6F3F1] px-4 py-8 md:grid-cols-4">
          {[
            {
              src: '/case-studies/pawa/live/sheet-topup-empty.png',
              alt: 'Pawa top-up sheet with no amount selected and Continue disabled.',
              caption: 'Nothing selected',
              height: 1246,
            },
            {
              src: '/case-studies/pawa/live/sheet-topup-amount.png',
              alt: 'Pawa top-up sheet with ₦10,000 selected and Continue enabled.',
              caption: 'Amount',
              height: 1298,
            },
            {
              src: '/case-studies/pawa/live/sheet-topup-payment.png',
              alt: 'Pawa payment sheet with order summary and Pay ₦10,000.',
              caption: 'Payment',
              height: 1376,
            },
            {
              src: '/case-studies/pawa/live/sheet-topup-confirmation.png',
              alt: 'Pawa confirmation sheet with the heading You’re back on.',
              caption: 'Confirmation',
              height: 1132,
            },
          ].map((sheet) => (
            <div key={sheet.src}>
              <div className="overflow-hidden rounded-t-2xl bg-white pt-3">
                <Image
                  src={sheet.src}
                  alt={sheet.alt}
                  width={780}
                  height={sheet.height}
                  sizes="(max-width: 768px) 45vw, 220px"
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-3 text-center font-campton text-sm leading-relaxed text-[#5C5C5C]">
                {sheet.caption}
              </p>
            </div>
          ))}
        </div>
      </figure>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Confirmation, in order
        </h2>
        <p>
          The confirmation screen does not appear all at once. Checkmark first,
          heading second, balance card last. “You’re back on” lands before the
          kWh figure, because the feeling comes before the receipt.
        </p>
      </div>

      <div
        id="prototype"
        className="mt-16 max-w-[640px] scroll-mt-24 space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]"
      >
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Interactive prototype
        </h2>
        <p>
          The tenant app is live in the frame. Switch to the landlord
          dashboard for generation, battery, how load is spread across units,
          and what needs attention. The view he needed when he was fielding
          calls at night.
        </p>
        <p>
          On a phone, both open full screen.
        </p>
      </div>

      <PawaPrototypeViewer />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          What I took from this
        </h2>
        <ol className="list-decimal space-y-6 pl-5">
          {lessons.map((lesson) => (
            <li key={lesson.title}>
              <p className="text-[#353F50]">{lesson.title}</p>
              <p className="mt-2">{lesson.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          What comes next
        </h2>
        <p>
          Pawa assumes a smart relay per apartment receiving disconnect and
          reconnect signals from the server, with a current transformer per
          circuit feeding live consumption data. The solar inverter exposes
          metrics via Modbus or API. Building or certifying that relay module
          alongside existing solar installers in Nigeria is the path from
          prototype to infrastructure.
        </p>
        <p>
          Before that, three things need live validation: whether tenants
          actually hold back from calling after top-up; whether the gauge and
          banner prompt action early enough; and whether the “Needs attention”
          section stays useful once real alerts come in. Those answers shape
          what gets built next.
        </p>
        <p>
          The prototype was shared with the landlord and two tenants. Both
          tenants grasped the app’s purpose without guidance, and the landlord
          confirmed the product reflected how he currently manages the system.
        </p>
        <p>
          <StudyLink href="/product">View more work</StudyLink>
          {' · '}
          <StudyLink href={TENANT_URL}>See the live prototype</StudyLink>
        </p>
      </div>
    </article>
  );
}
