import Image from 'next/image';
import Link from 'next/link';

const NOTION_URL =
  'https://www.notion.so/Usability-Report-Design-Iteration-Comprehensive-Case-Study-343a2f6201c880efa3cceb92ba658b6b';

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

export function ParkingCompanionStudy() {
  return (
    <article className="relative min-h-screen w-full max-w-[850px] bg-white px-6 pt-[60px] pb-24 max-[700px]:max-w-[500px] sm:px-0 xl:max-w-[1014px]">
      <Link
        href="/product"
        className="mb-8 inline-flex min-h-11 items-center font-campton text-sm text-[#5C5C5C] no-underline transition-colors hover:text-[#E66001] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E66001]"
      >
        ← Product Design
      </Link>

      <p className="font-campton text-xs leading-tight text-[#5C5C5C]">
        July 2025 · UX Researcher, UI/UX Designer · 7 weeks · 14 participants
      </p>
      <h1 className="mt-2 font-apple-garamond text-[32px] leading-snug font-normal text-[#353F50] md:text-[40px] md:leading-tight">
        Parking Management Companion App
      </h1>
      <p className="mt-4 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        Research that guided the design of a new and improved parking
        management companion app for Quickteller.
      </p>

      <div className="mt-12 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          The problem
        </h2>
        <p>
          Parking is often a pain point in busy cities and commercial hubs:
          long queues at entry, paper tickets that get lost, delays at payment
          points, and bottlenecks at exits. The parking management app is
          meant to make that process digital — from entry to exit — so people
          can skip the frustrations of a paper ticket.
        </p>
        <p>
          The goal was to understand how people interact with the product and
          improve the experience. We also researched global parking standards,
          mapping common flows and comparing them with ours.
        </p>

        <h2 className="pt-4 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Process
        </h2>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Receive brief and define objectives</li>
          <li>Initial research</li>
          <li>Ideation and wireframing</li>
          <li>Stakeholder review</li>
          <li>High-fidelity design</li>
          <li>Usability testing</li>
          <li>Iteration and refinement</li>
          <li>Final deliverables and results</li>
        </ol>

        <h2 className="pt-4 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Who we designed for
        </h2>
        <p>
          Urban commuters, mall and event attendees, and corporate employees
          all need convenience, speed, and reliability when parking in busy
          urban environments. They hit the same pain points: long queues, lost
          tickets, slow payments, and uncertainty about availability.
        </p>
        <p>
          That pointed to a few design priorities: pre-arrival ticketing,
          real-time availability, in-app payments, notifications and status
          updates, and tools for people managing more than one session. The
          app needed to stay simple for a one-off visit and still work for
          frequent or corporate users.
        </p>
      </div>

      <h2 className="mt-16 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
        From sketches to screens
      </h2>
      <p className="mt-4 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        Early sketches covered scanning a QR code, an active session, success
        states, and session history. Digital wireframes then locked the four
        hub actions: Start Parking, Parking History, Request Keytag, and
        Manage Keytags.
      </p>
      <StudyImage
        src="/case-studies/parking-companion/wireframe-sketches.webp"
        alt="Hand-drawn notebook sketches of parking app screens including a QR scanner, a numbered grid, an active session card, and session history."
        caption="Paper sketches for the core parking session screens."
        width={1800}
        height={1426}
      />
      <StudyImage
        src="/case-studies/parking-companion/wireframes.webp"
        alt="Four low-fidelity mobile wireframes for the parking hub, QR code, active session, and session details screens."
        caption="Low-fidelity wireframes for the hub, QR code, active session, and payment."
        width={1800}
        height={1142}
      />
      <p className="max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        After reviewing the wireframes, stakeholders asked for an onboarding
        flow so first-time users could understand the process, and to
        deactivate Start Parking once a session was already active.
      </p>
      <StudyImage
        src="/case-studies/parking-companion/high-fidelity.webp"
        alt="High-fidelity parking hub, QR code, active session, and session details screens in the Quickteller app."
        caption="High-fidelity screens for the hub, QR entry, active session, and pay."
        width={1800}
        height={1100}
      />

      <div className="mt-8 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          How we tested
        </h2>
        <p>
          We used a mixed approach: unmoderated sessions to see organic use,
          remote sessions to reach people who could not be there in person,
          and in-person testing to catch body language and ask follow-up
          questions.
        </p>
        <p>
          Breaking the test into flows helped us see friction inside each
          step and across the whole journey:
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Generate QR code</li>
          <li>Scan and activate session</li>
          <li>Complete payment and exit</li>
        </ol>

        <h2 className="pt-4 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Generate QR code
        </h2>
      </div>

      <dl className="mt-8 grid max-w-[640px] grid-cols-3 gap-4">
        <div>
          <dt className="font-campton text-xs text-[#5C5C5C]">Success rate</dt>
          <dd className="mt-1 font-campton text-2xl text-[#353F50]">89.9%</dd>
        </div>
        <div>
          <dt className="font-campton text-xs text-[#5C5C5C]">Misclicks</dt>
          <dd className="mt-1 font-campton text-2xl text-[#353F50]">46.2%</dd>
        </div>
        <div>
          <dt className="font-campton text-xs text-[#5C5C5C]">Drop-offs</dt>
          <dd className="mt-1 font-campton text-2xl text-[#353F50]">11.1%</dd>
        </div>
      </dl>

      <div className="mt-8 max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <p>
          Almost half of people clicked the wrong thing at least once. About
          one in ten abandoned the task — a problem because it is the first
          required step. Misclicks came from icon confusion and unclear
          button hierarchy. People needed short orientation copy.
        </p>
        <blockquote className="border-l-2 border-[#E66001] pl-4">
          I got a bit confused with the buttons. I probably was supposed to
          start parking, but I ended up going to Request Keytag, because I
          thought I needed to pay first.
        </blockquote>
        <p>
          On the walkthrough itself, people were not reading the text, the
          icons felt confusing, and the cards felt like the next steps in the
          flow rather than an explanation.
        </p>
      </div>
      <StudyImage
        src="/case-studies/parking-companion/qr-onboarding.webp"
        alt="Start Parking tile highlighted on the parking hub, next to a three-step onboarding walkthrough for generating a ticket, scanning at entry, and exiting."
        caption="The Start Parking action and the three-step onboarding walkthrough we tested."
        width={1800}
        height={1013}
      />
      <div className="max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <p>
          Global practice was clear: do not make the user generate anything
          at the gate. The system should already know them when they arrive.
          If they have not generated a QR beforehand, they fumble at the gate
          and a queue forms — which defeats the “faster than tickets” goal.
        </p>
        <p>
          The home screen offered Start Parking, history, and keytags all at
          once. That added cognitive load and pulled attention away from
          entering the lot. We recommended putting the entry QR on the home
          screen, showing the active session once they were inside, and
          moving history and keytags into a menu. We also recommended a web
          option for people without the app, and a notification such as
          “You’re close to X Mall. Your entry QR is ready.”
        </p>

        <h2 className="pt-4 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Activate session
        </h2>
        <p>
          We showed the QR page to see if the presentation was clear enough
          for people to know what to do with the code. Most understood they
          should scan, but not perfectly. Clarity sat at 7.6 out of 10.
          People understood the action, not the mechanics — where to scan,
          what the scanner looks like, how to position the phone. One person
          wanted the code emailed as a backup.
        </p>
        <blockquote className="border-l-2 border-[#E66001] pl-4">
          I know I’m supposed to scan the QR code but I don’t know how.
        </blockquote>
        <p>
          We recommended showing someone scanning at a gate, using copy like
          “Hold your phone screen against the scanner at the entrance gate,”
          and keeping the QR as the focus.
        </p>

        <h2 className="pt-4 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Exit and payment
        </h2>
        <p>
          We asked how people would use the app to leave the parking lot.
        </p>
      </div>

      <dl className="mt-8 grid max-w-[640px] grid-cols-3 gap-4">
        <div>
          <dt className="font-campton text-xs text-[#5C5C5C]">Misclicks</dt>
          <dd className="mt-1 font-campton text-2xl text-[#353F50]">86%</dd>
        </div>
        <div>
          <dt className="font-campton text-xs text-[#5C5C5C]">Avg. task time</dt>
          <dd className="mt-1 font-campton text-2xl text-[#353F50]">87.6s</dd>
        </div>
        <div>
          <dt className="font-campton text-xs text-[#5C5C5C]">Very easy</dt>
          <dd className="mt-1 font-campton text-2xl text-[#353F50]">0%</dd>
        </div>
      </dl>

      <p className="mt-8 max-w-[640px] font-campton text-base leading-relaxed text-[#5C5C5C]">
        Eighty-six percent misclicked. Average time was 87.58 seconds — too
        long for a payment action that should take under 30 seconds. Ease of
        use: 50% neutral, 25% easy, 25% hard, and nobody said very easy.
      </p>
      <StudyImage
        src="/case-studies/parking-companion/exit-heatmaps.webp"
        alt="Usability heatmaps on the parking hub and session details screens, with clicks clustered on Parking History, Register Tag, the back button, and Pay Now."
        caption="Exit-flow heatmaps. People looked for payment on History and Keytag instead of the session card."
        width={1800}
        height={1058}
      />
      <div className="max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <p>
          People did not know how to get to payment. The blue session card
          did not look clickable. There were several steps before Pay Now.
          Competing information pulled them off the main action. One person
          said they should not reach the exit only to realize they still need
          to pay — the flow should encourage paying before leaving.
        </p>
        <p>
          We recommended uncluttering the UI so pay is the focus, and adding
          an End session button so the next step is obvious.
        </p>
        <p>When we asked what they would change about entry to exit:</p>
        <blockquote className="border-l-2 border-[#E66001] pl-4">
          Make the entry process more streamlined and clearer. Also, define
          the process for exiting so it prevents unnecessary queues.
        </blockquote>
        <blockquote className="border-l-2 border-[#E66001] pl-4">
          There should have been a Pay for parking screen immediately after
          registering to park.
        </blockquote>
        <blockquote className="border-l-2 border-[#E66001] pl-4">
          Probably button rearrangement: parking, parking history.
        </blockquote>

        <h2 className="pt-4 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Iteration
        </h2>
        <p>
          We tested new onboarding visuals in two ways: matching an image to
          each step’s copy, and judging which three-step set flowed most
          naturally. That helped us pick visuals that support the action and
          hold together across generate, scan, and leave.
        </p>
      </div>
      <StudyImage
        src="/case-studies/parking-companion/onboarding-visual-test.webp"
        alt="Three rows of onboarding screens compared in a visual test, each with scores for how well the image matched the copy and how naturally the three steps flowed."
        caption="Visual test of three onboarding image sets. Set 1 scored 5/5 on overall flow."
        width={1800}
        height={3378}
      />
      <StudyImage
        src="/case-studies/parking-companion/new-screens.webp"
        alt="Updated onboarding, QR entrance, session details with Pay for Parking, and QR exit screens after the redesign."
        caption="Updated onboarding and session screens after the test."
        width={1800}
        height={2368}
      />

      <div className="max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
        <h2 className="font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]">
          Result
        </h2>
        <p>
          The usability test score was initially 7.3. After implementing the
          feedback and retesting, the score improved to 9.4.
        </p>
        <p>
          <a
            href={NOTION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#353F50] underline underline-offset-4 transition-colors hover:text-[#E66001]"
          >
            Also on Notion
          </a>
        </p>
      </div>
    </article>
  );
}
