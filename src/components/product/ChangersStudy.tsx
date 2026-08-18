import Image from 'next/image';
import Link from 'next/link';

const BEHANCE_URL =
  'https://www.behance.net/gallery/235856111/Changers-UX-Case-Study';

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

export function ChangersStudy() {
  return (
    <article className="relative min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] pb-24 max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <Link
        href="/product"
        className="mb-8 inline-flex min-h-11 items-center font-campton text-sm text-[#5C5C5C] no-underline transition-colors hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
      >
        ← Product Design
      </Link>

      <p className="font-campton text-xs leading-tight text-[#5C5C5C]">
        2025 · Lead UX Designer · Website · Mobile-first
      </p>
      <h1 className="mt-2 font-apple-garamond text-[32px] leading-snug font-normal text-[#353F50] md:text-[40px] md:leading-tight">
        Changers Website Design
      </h1>
      <p className="mt-4 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        CHANGERS connects social-initiative advocates with development
        opportunities across Africa. I led the end-to-end design: a scalable
        system, dual user journeys, and an accessible mobile-first experience
        for campaign discovery, donations, and impact tracking.
      </p>

      <div className="mt-12 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          The problem
        </h2>
        <p>
          People want to support campaigns, but they often cannot tell how
          their money is used. Online donations feel risky without
          transparency. Corporate CSR teams struggle to find causes that
          match their values and to track the impact of what they give.
          Others are simply overwhelmed by options.
        </p>
        <p>
          That pointed to a platform that could serve individuals,
          corporations, and community leaders at once: easy discovery, a
          clear donation path, and real-time reporting so giving feels
          connected rather than opaque.
        </p>
      </div>

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Research and discovery
        </h2>
        <p>
          Discovery covered stakeholder interviews, user surveys, competitive
          analysis, and data analysis. The core persona was a Community
          Advocate: 25–50, based in urban and suburban Nigeria (Lagos, Abuja,
          Port Harcourt), with disposable income or a CSR budget.
        </p>
        <p>
          Four voices kept coming back. A social advocate needed updates to
          feel connected to the campaigns she backed. A creative would not
          donate without knowing exactly how funds were used. A CSR manager
          needed campaigns that aligned with company values and a way to
          monitor contributions. A young professional wanted to find causes
          quickly and engage beyond a one-off payment.
        </p>
        <p>
          How CHANGERS helps followed from that: campaign discovery,
          transparent impact tracking, streamlined donations, and community
          engagement. The information architecture stayed simple — landing,
          discovery, donation, impact tracking, profile — with a focus on
          reducing steps, not adding features.
        </p>
      </div>
      <StudyImage
        src="/case-studies/changers/research.webp"
        alt="Changers research board: discovery activities, community advocate persona, four user quotes, and a simple user-architecture flow."
        caption="Discovery, personas, and a flow built around simplicity."
        width={1800}
        height={4597}
        priority
      />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Ideation and visual language
        </h2>
        <p>
          The hero line is “Be Someone’s Hero.” Early wireframes compared a
          split layout against a centered one before locking a full-bleed
          image of hands coming together, with the campaigns sitting directly
          underneath.
        </p>
        <p>
          Type is Optima for titles and Gothic A1 for interface copy. The
          palette runs teal into blue so the product feels civic and calm
          rather than like a checkout. Accessibility was a design constraint:
          contrast, readable type, screen-reader compatibility, and keyboard
          navigation. Emotional design sat beside that — real stories and
          photography so each campaign feels like people, not a form.
        </p>
      </div>
      <StudyImage
        src="/case-studies/changers/ideation.webp"
        alt="Changers ideation board: hero wireframes, laptop mockup of Be Someone's Hero, Optima and Gothic A1 type, teal and blue palette, accessibility and emotional design notes."
        caption="Hero exploration, type, palette, and the principles behind the look."
        width={1800}
        height={5384}
      />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Product experience
        </h2>
        <p>
          Campaign cards lead with the cause, then category, progress, amount
          raised, and a single Donate action. The campaign page for Providing
          School Supplies for 200 Students in Abeokuta puts the story and
          photo first, with progress, Donate Now, and an itemised basket
          beside it on desktop. On mobile those modules stack under the
          image.
        </p>
        <p>
          Creating a campaign is three steps: title, category, and location;
          items and budget; then preview and publish. The dual journeys —
          people giving and people running campaigns — share one system so
          neither side has to learn a different product.
        </p>
      </div>
      <StudyImage
        src="/case-studies/changers/product.webp"
        alt="Changers product board: campaign card anatomy, campaign detail page, desktop versus mobile, and a three-step create-campaign flow."
        caption="Cards, the campaign page, responsive layout, and create-campaign."
        width={1800}
        height={5946}
      />

      <div className="mt-16 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Usability test and what to watch
        </h2>
        <p>
          Five participants, ages 25–45, ran core tasks: registration,
          finding a cause, donating, creating a campaign, and reading impact
          information. Time on task was recorded so drop-offs and slow steps
          were visible, not guessed.
        </p>
        <p>
          After launch, the metrics that matter are task success and
          abandonment, time to complete registration and donation, where
          people leave the donate flow, and whether the same tasks stay
          usable on phone, tablet, and desktop.
        </p>
      </div>
      <StudyImage
        src="/case-studies/changers/usability.webp"
        alt="Changers usability board: task-time table, participant notes, recommendations, and four post-launch metric cards."
        caption="Test tasks, recommendations, and the metrics to keep watching."
        width={1800}
        height={7072}
      />

      <p className="mt-8 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
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
