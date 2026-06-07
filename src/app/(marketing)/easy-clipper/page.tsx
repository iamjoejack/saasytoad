import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Film,
  Scissors,
  Captions,
  Crop,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { BOOK_A_DEMO_URL, EASY_CLIPPER_URL, EASY_CLIPPER_TAGLINE } from "@/lib/brand";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { EasyClipperPricing } from "@/components/marketing/easy-clipper-pricing";
import { ToadAvatar } from "@/components/brand/toad-avatar";
import { type ToadId } from "@/lib/characters";
import {
  BrassPanel,
  Cog,
  GearDivider,
  FiligreeCorner,
} from "@/components/marketing/steampunk";

export const metadata: Metadata = {
  title: "SaaSyToad Easy Clipper, the honest AI video clipper",
  description:
    "Turn long videos into short clips that keep the whole story, respect the pacing, and hold their framing. A multi-agent Claude brain does the work. By SaaSyToad.",
  openGraph: {
    type: "website",
    siteName: "SaaSyToad",
    title: "SaaSyToad Easy Clipper, the honest AI video clipper",
    description: EASY_CLIPPER_TAGLINE,
    url: "https://saasytoad.com/easy-clipper",
  },
};

export default function EasyClipperPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <TheCrew />
      <WhyHonest />
      <Pricing />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="engraved-label justify-center rounded-full border border-(--border-strong) bg-(--surface)/60 px-3.5 py-1.5 backdrop-blur">
            <Film className="size-3.5 text-(--sp-patina)" aria-hidden />
            SaaSyToad Easy Clipper
          </span>

          <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            Turn long videos into clips that keep the story.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground-muted">
            An honest AI video clipper. It does not cut the punchline, it does
            not strip every pause into a robotic staccato, and it does not jump
            the crop around. A team of AI agents reads your transcript, picks
            the moments that stand on their own, and hands back ready clips with
            captions, titles, and hashtags.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={EASY_CLIPPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              Try Easy Clipper
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="#how-it-works"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See how it works
            </Link>
          </div>

          <p className="mt-7 text-sm text-foreground-subtle">
            Try it with no key. Add your own key to run the full agent team.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works                                                      */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="engraved-label justify-center">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-lg text-foreground-muted">{blurb}</p>
      <GearDivider className="mt-7" />
    </div>
  );
}

const STEPS = [
  {
    icon: FileText,
    title: "Drop in a transcript",
    body: "Paste an SRT, a WebVTT, a JSON export, or plain text. No timestamps? It estimates them from reading speed. Upload a video and it transcribes for you.",
  },
  {
    icon: Scissors,
    title: "The agent team finds the clips",
    body: "An orchestrator runs the specialists in parallel over your transcript, picking moments with a real hook and a real ending, then tightening each one.",
  },
  {
    icon: Captions,
    title: "Get ready clips back",
    body: "Each clip comes with timed captions, an honest title, a description, and a small set of relevant hashtags. Render to a vertical mp4 with captions burned in.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The workshop"
          title="How it works"
          blurb="A transcript goes in. Clips that hold up come out."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <BrassPanel
              key={s.title}
              rivets
              className="group p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="relative inline-flex size-12 items-center justify-center">
                <Cog
                  size={48}
                  teeth={12}
                  tone="var(--sp-brass)"
                  className="absolute inset-0"
                />
                <s.icon className="relative size-5 text-(--sp-brass-bright)" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {s.body}
              </p>
            </BrassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  The crew (agent cast)                                             */
/* ------------------------------------------------------------------ */

const CREW: { id: ToadId; role: string; body: string }[] = [
  {
    id: "sammy",
    role: "Storytelling",
    body: "Reads the whole transcript and picks moments that stand on their own, each with a strong hook in the first three seconds and a real ending.",
  },
  {
    id: "dbug",
    role: "Pacing and audio",
    body: "Trims filler and dead air only where it tightens the clip, and flags the pauses that are worth keeping.",
  },
  {
    id: "camille",
    role: "Visual continuity",
    body: "Sets a steady crop on the speaker for the target aspect ratio and marks where b-roll would cover a cut.",
  },
  {
    id: "amanda",
    role: "Formatting and captions",
    body: "Writes timed captions, an honest title, a description, and a small set of relevant hashtags, and respects a caption blocklist.",
  },
  {
    id: "ronald",
    role: "Orchestrator and review",
    body: "Runs the specialists in parallel per clip, assembles the results, validates everything against a schema, and writes a short summary.",
  },
];

function TheCrew() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-neutral-950/20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The crew"
          title="A team of agents, not one black box"
          blurb="Each agent has one job and does it well. The same toad family that runs the CRM works the editing bench here."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CREW.map((c) => (
            <BrassPanel key={c.id} className="p-6">
              <div className="flex items-start gap-4">
                <ToadAvatar
                  toadId={c.id}
                  className="size-12 shrink-0"
                  iconClassName="size-5"
                />
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {c.role}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                    {c.body}
                  </p>
                </div>
              </div>
            </BrassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why it is honest                                                  */
/* ------------------------------------------------------------------ */

const PROMISES = [
  {
    icon: Film,
    title: "Keeps the whole story",
    body: "Clips have a real hook and a real ending. It will not chop off the punchline to hit a length target.",
  },
  {
    icon: Scissors,
    title: "Respects the pacing",
    body: "It trims dead air where that helps and keeps the pauses that carry weight. No robotic staccato.",
  },
  {
    icon: Crop,
    title: "Holds the framing",
    body: "A steady crop stays on the speaker instead of jumping around between cuts.",
  },
  {
    icon: ShieldCheck,
    title: "Honest about the AI",
    body: "Your key is read on the server and never sent to the browser. Try the full experience with no key at all, on a built-in sample brain.",
  },
];

function WhyHonest() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The honest part"
          title="The opposite of the usual clipper complaints"
          blurb="We built it because the other tools cut corners. This one does not."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PROMISES.map((p) => (
            <BrassPanel key={p.title} className="p-6">
              <div className="flex items-start gap-4">
                <span className="relative mt-0.5 inline-flex size-9 shrink-0 items-center justify-center">
                  <Cog
                    size={36}
                    teeth={10}
                    tone="var(--sp-patina)"
                    className="absolute inset-0"
                  />
                  <p.icon className="relative size-4 text-(--sp-patina)" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                    {p.body}
                  </p>
                </div>
              </div>
            </BrassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                           */
/* ------------------------------------------------------------------ */

function Pricing() {
  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Start free. Pay flat when you grow."
          blurb="A real free plan on your own key, then flat monthly plans with the AI included. No per-clip charges, ever."
        />
        <EasyClipperPricing className="mt-12" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                         */
/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-(--border-strong) bg-(--sp-iron-deep)">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 120%, oklch(0.78 0.14 72 / 0.28), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1/2 -translate-y-1/2 text-(--sp-brass)/10"
      >
        <Cog size={220} teeth={14} spin="ccw" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <FiligreeCorner corner="tl" />
        <FiligreeCorner corner="tr" />
        <p className="engraved-label justify-center">Start clipping</p>
        <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
          Give it a video and see for yourself
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
          Load the sample, find clips, and watch the agent team work. When you
          are ready, point it at your own footage.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={EASY_CLIPPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            Try Easy Clipper
            <ArrowRight className="size-4" />
          </a>
          <a
            href={BOOK_A_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}
