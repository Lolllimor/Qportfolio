import type { ReactNode } from 'react';
import { Nunito } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons/arrow-right-o';
import { PhoneScreenImage } from './IphoneFrame';
import { PawaPrototypeViewer } from './PawaPrototypeViewer';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const TENANT_URL = 'https://pawa-khaki.vercel.app';

const paperPreview = [
  {
    src: '/case-studies/pawa/home-active.png',
    alt: 'Pawa home screen in the active state, showing available balance and a Top up button.',
  },
  {
    src: '/case-studies/pawa/home-disconnected.png',
    alt: 'Pawa home screen in the disconnected state, with zero balance and a Top up now button.',
  },
  {
    src: '/case-studies/pawa/usage.png',
    alt: 'Pawa usage screen with a weekly consumption chart and live current-draw reading.',
  },
  {
    src: '/case-studies/pawa/account.png',
    alt: 'Pawa account screen with notification settings and a low-balance alert at 20 percent.',
  },
] as const;

const decisions = [
  {
    title: 'Prepaid over postpaid',
    body: 'Charging tenants at the end of the month means the landlord chases debt from people he lives next to. Prepaid removes that tension entirely — the money moves before the power does. This is also how Nigerians already think about electricity. NEPA meters run on tokens. Tenants aren’t learning something new.',
  },
  {
    title: 'Auto-disconnect and auto-reconnect',
    body: 'When balance hits zero, power cuts automatically. When a tenant tops up, it reconnects automatically — no call, no WhatsApp, no waiting. The disconnected screen says one thing: “Top up to reconnect automatically. No action needed from your landlord.” A low-balance alert fires at 20%, so reaching zero is a choice, not a surprise.',
  },
  {
    title: 'A 200 kWh max balance',
    body: 'The cap exists for the same reason prepaid electricity meters always have one: a solar system has finite capacity, and without a ceiling, one tenant can hold more than the system can serve. It also keeps the gauge meaningful — without a fixed maximum, the arc has no reference point.',
  },
  {
    title: 'Hours alongside kilowatt-hours',
    body: 'The gauge shows kWh as the primary reading — the technical truth. But beneath it sits “Approx. 2.4 hours remaining.” The kWh is accurate but abstract. Hours are what most tenants actually understand. Both are always visible: one gives the fact, the other gives the meaning. The arc shifts from indigo to amber to red as balance drops. Urgency is in the colour, not in a label.',
  },
  {
    title: 'The circuit breakdown',
    body: 'Tenants reported not knowing why their balance dropped faster than expected. The “What’s drawing power” panel shows consumption by circuit in real time — Air Conditioning, Lighting, Kitchen, Other — as a segmented bar with live kW values. It answers the question before it becomes a complaint.',
  },
  {
    title: 'A three-step top-up flow',
    body: 'Amount → Payment → Confirmation. A tenant running low at 11pm is not reading instructions. The amount screen converts as they type: ₦1,500 is 17.6 kWh. Payment is via stored card through Paystack Vault, with bank transfer as an alternative. The confirmation screen says “You’re back on” — not “Payment successful.”',
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
    body: '“You’re back on” and “No action needed from your landlord” do more for a tenant at 11pm than any layout choice on those screens.',
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
        Live prototype — try it
        <ArrowRight />
      </a>
      <p className="mt-4 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        A prepaid power-sharing app for Nigerian apartment buildings — for
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
          In a Nigerian apartment building, the “power generator” is usually a
          person, not a machine. Someone with capacity — a genset, or
          increasingly a solar system — selling electricity to the flats
          around them.
        </p>
        <p>
          The job is the same either way. Track what each flat uses. Take
          payment. Cut off. Reconnect. The fuel doesn’t change the problem.
        </p>
        <p>
          I went to solar because that’s where it’s growing, and where nobody
          has built the management layer yet. Diesel has decades of informal
          practice around it. Solar doesn’t.
        </p>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Finding the real problem
        </h2>
        <p>
          I called a friend, a solar engineer who built his own system at home
          and started supplying excess power to his tenants. I asked him how he
          was managing it, and where it was breaking down.
        </p>
        <p>
          His answer started with his tenants. Power would cut off at the worst
          possible moment: night, mid-cooking, during a work call, with no
          warning. They’d call him to reconnect, sometimes after already making
          payment. Many felt their balance was draining faster than expected
          with no way to verify it. On his end, managing multiple apartments
          remotely while monitoring the solar hardware had become exhausting.
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
        <ol className="list-decimal space-y-1 pl-5">
          <li>Hand sketches</li>
          <li>Claude Code + MCP</li>
          <li>Paper designs</li>
          <li>React build</li>
          <li>Vercel deploy</li>
        </ol>
        <p>
          The product was designed and built end to end with AI, from the
          first sketch to a live interactive prototype. Designs were created
          in Paper via MCP, converting hand-drawn sketches into structured UI,
          then built in React and deployed.
        </p>
      </div>

      <div className="my-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {paperPreview.map((screen) => (
          <PhoneScreenImage
            key={screen.src}
            src={screen.src}
            alt={screen.alt}
            sizes="(max-width: 768px) 45vw, 240px"
          />
        ))}
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
          What the first build was missing
        </h2>
        <p>
          Reviewing the shipped prototype, the screens worked. The
          interactions were design defaults: states that appear, buttons that
          sit, a gauge already at its value. Nothing was wrong. Nothing had
          been decided.
        </p>
        <p>
          The judgment lived in the write-up rather than in the product. A
          short style guide forced every screen to pick a side. The
          interactions were rebuilt so those choices could be felt.
        </p>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          A simple style guide
        </h2>
        <p>
          The first pass looked like a lot of AI output: a coloured primary
          button on every screen, drop shadows on cards, a default sans for
          everything. None of that was wrong. None of it was a decision.
        </p>
        <p>
          I wrote a short guide — not a design system. Enough rules that every
          screen had to pick a side. Terracotta is for power, not for every
          call to action. Primary buttons are black pills. Cards sit on a
          warmer surface; they don’t float. Status is a colour and a word.
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

      <div className="max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            Primary actions are black pills. If every button is terracotta,
            nothing is urgent.
          </li>
          <li>
            No drop shadows. Depth comes from the stone surface behind the
            card, not from a floating layer.
          </li>
          <li>
            Active nav is a filled circle. The rest are outlines. One filled
            state at a time.
          </li>
          <li>
            Disconnected is red. Active is calm. The gauge does the urgency,
            not the chrome.
          </li>
        </ol>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          The gauge
        </h2>
        <p>
          On first load the needle sat at the current value. That is accurate
          and lifeless — the same as a number in a card. The rebuild animates
          the arc from empty to the current balance, with an ease-out so it
          settles like a physical meter. 27% stops being a label and becomes a
          remaining amount you can feel.
        </p>
      </div>
      <FramedScreen
        src="/case-studies/pawa/home-active-2.png"
        alt="Pawa home screen with a semi-circular gauge showing 27 percent remaining and 2.4 kWh out of 11.8 kWh."
        caption="The gauge now fills from zero on load. The ease-out is the judgment — it should feel like a meter, not a progress bar."
        sizes="(max-width: 768px) 50vw, 320px"
        className="my-10"
        captionSide
      />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Directional top-up
        </h2>
        <p>
          Amount → Payment → Confirmation was already the right sequence. What
          was missing was direction. Each step now moves with the flow, so
          going forward and going back feel different. A tenant topping up at
          11pm should feel like they are walking a short path, not swapping
          static slides.
        </p>
      </div>
      <div className="my-10 grid grid-cols-3 gap-4">
        <FramedScreen
          src="/case-studies/pawa/topup-amount.png"
          alt="Pawa top-up amount screen with preset naira amounts and a live kilowatt-hour conversion."
          caption="Amount"
          sizes="(max-width: 768px) 30vw, 240px"
        />
        <FramedScreen
          src="/case-studies/pawa/topup-payment.png"
          alt="Pawa payment screen with order summary, saved Mastercard, and Paystack security note."
          caption="Payment"
          sizes="(max-width: 768px) 30vw, 240px"
        />
        <FramedScreen
          src="/case-studies/pawa/topup-confirmation.png"
          alt="Pawa confirmation screen with the heading You’re back on and the new balance."
          caption="Confirmation"
          sizes="(max-width: 768px) 30vw, 240px"
        />
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Confirmation, in order
        </h2>
        <p>
          The confirmation screen does not appear all at once. Checkmark first,
          heading second, balance card last. That is the order someone
          processes relief: the signal that it worked, then the words, then
          the new number. “You’re back on” lands before the kWh figure,
          because the feeling comes before the receipt.
        </p>
      </div>

      <div
        id="prototype"
        className="mt-16 max-w-[640px] scroll-mt-24 space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]"
      >
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          The upgraded prototype
        </h2>
        <p>
          Try it yourself. The prototype is live in the frame on desktop, and
          full screen on a phone.
        </p>
      </div>

      <PawaPrototypeViewer />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          The landlord dashboard
        </h2>
        <p>
          The trust problem starts with him. He was fielding calls at night
          and managing multiple apartments remotely. The dashboard shows
          generation, battery, how load is distributed across units, and what
          needs attention.
        </p>
      </div>

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
          The prototype was shared with the landlord and two tenants — both
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
