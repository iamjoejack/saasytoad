import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Globe, Wrench, ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BOOK_A_DEMO_URL, COMPANY_TAGLINE, FOUNDERS } from "@/lib/brand";
import { CrewExplorer } from "@/components/marketing/crew-explorer";
import { ShowTeaser } from "@/components/marketing/show-teaser";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { TourConsole } from "@/components/marketing/tour-console";
import {
  BrassPanel,
  Cog,
  GearDivider,
  FiligreeCorner,
} from "@/components/marketing/steampunk";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "SaaSyToad, AI agents, apps, and websites",
  description:
    "SaaSyToad builds AI agentic apps, fast websites, and the software in between. Honest pricing, AI included, no jargon. SaaSyToadCRM is one of our products.",
  openGraph: {
    type: "website",
    siteName: "SaaSyToad",
    title: "SaaSyToad, AI agents, apps, and websites",
    description: COMPANY_TAGLINE,
    url: "https://saasytoad.com",
  },
};

export default function CompanyHomePage() {
  return (
    <>
      <Hero />
      <TourConsole />
      <WhatWeDo />
      <Products />
      <CrewExplorer />
      <ShowTeaser />
      <Principles />
      <FoundersTeaser />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />
      <div className="mx-auto max-w-4xl px-4 py-28 text-center sm:px-6 sm:py-36">
        <span className="engraved-label justify-center rounded-full border border-(--border-strong) bg-(--surface)/60 px-3.5 py-1.5 backdrop-blur">
          <span className="size-1.5 rounded-full bg-(--sp-amber) shadow-[0_0_8px_var(--sp-amber)]" />
          AI agents, apps, and websites
        </span>
        <h1 className="mx-auto mt-7 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
          We build AI that earns its keep.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
          SaaSyToad is a small studio that ships AI agentic apps, fast websites,
          and the software that ties them together. No jargon, no surprise
          bills, no fluff. Just tools that do the work.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOK_A_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            Book a demo
          </a>
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            See what we build
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <p className="mt-7 text-sm text-foreground-subtle">
          Flat pricing. AI included on every plan. No metered surprises.
        </p>
      </div>
    </section>
  );
}

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

const SERVICES = [
  {
    icon: Bot,
    title: "AI agentic applications",
    body: "Agents that actually do the job: chasing leads, answering customers, moving data, handling the busywork your team hates. Built to run on their own and hand off when it matters.",
  },
  {
    icon: Globe,
    title: "Websites",
    body: "Fast, modern sites that load quickly and turn visitors into customers. Designed to look sharp and built to be easy to change later.",
  },
  {
    icon: Wrench,
    title: "Services and custom builds",
    body: "Need something specific? We design, build, and wire it up: integrations, automations, internal tools, the whole thing, done for you.",
  },
];

function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The workshop"
          title="What we do"
          blurb="Three things, done well, with AI baked in from the start."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {SERVICES.map((s) => (
            <BrassPanel
              key={s.title}
              rivets
              className="group p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <GearIcon icon={s.icon} />
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {s.body}
              </p>
            </BrassPanel>
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: "subtle", size: "md" }))}
          >
            More about what we build
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** A lucide icon seated in a brass gear, the workshop motif for feature tiles. */
function GearIcon({ icon: Icon }: { icon: typeof Bot }) {
  return (
    <span className="relative inline-flex size-12 items-center justify-center">
      <Cog
        size={48}
        teeth={12}
        tone="var(--sp-brass)"
        className="absolute inset-0"
      />
      <Icon className="relative size-5 text-(--sp-brass-bright)" />
    </span>
  );
}

const PRODUCTS = [
  {
    name: "SaaSyToadCRM",
    blurb:
      "The honest all-in-one CRM. Calls, texts, email, and DMs in one inbox, AI agents that follow up for you, and one flat price. AI included. No surprise bill.",
    features: [
      "Unified inbox",
      "AI lead follow-up",
      "Booking and reviews",
      "Workflows and drips",
      "White-label for agencies",
    ],
    primary: { href: "/crm", label: "Explore the CRM" },
    secondary: { href: "/pricing", label: "See pricing" },
  },
  {
    name: "SaaSyToad Easy Clipper",
    blurb:
      "The honest AI video clipper. A team of AI agents turns long videos into short clips that keep the whole story, respect the pacing, and hold their framing.",
    features: [
      "Multi-agent clip finder",
      "Timed captions and titles",
      "Vertical mp4 export",
      "Honest hooks, no chopped punchlines",
      "Try it with no key",
    ],
    primary: { href: "/easy-clipper", label: "Explore Easy Clipper" },
    secondary: { href: "/easy-clipper#how-it-works", label: "How it works" },
  },
];

function Products() {
  return (
    <section id="products" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="From our bench"
          title="Our products"
          blurb="The tools we built for ourselves, then opened up to everyone else."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {PRODUCTS.map((p) => (
            <BrassPanel
              key={p.name}
              rivets
              className="metal-grain flex flex-col overflow-hidden p-8"
            >
              <span className="engraved-label text-(--sp-patina)">
                <span className="size-1.5 rounded-full bg-(--sp-patina)" />
                Live now
              </span>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">
                {p.name}
              </h3>
              <p className="mt-2 leading-relaxed text-foreground-muted">
                {p.blurb}
              </p>
              <ul className="mt-6 grid gap-2.5 text-sm text-foreground-muted sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className="size-4 shrink-0 text-(--sp-patina)" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3 pt-7">
                <Link
                  href={p.primary.href}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "md" }),
                  )}
                >
                  {p.primary.label}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={p.secondary.href}
                  className={cn(buttonVariants({ variant: "ghost", size: "md" }))}
                >
                  {p.secondary.label}
                </Link>
              </div>
            </BrassPanel>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-foreground-subtle">
          More products on the way. Want one built for your business? That is
          what our services are for.
        </p>
      </div>
    </section>
  );
}

const PRINCIPLES = [
  {
    title: "Honest pricing",
    body: "One number on your card. No metered add-ons waiting at the end of the month.",
  },
  {
    title: "AI included",
    body: "The AI is part of the product, not a surcharge. You should not pay extra to use the best part.",
  },
  {
    title: "Real humans",
    body: "You can reach an actual person who knows your account. No ticket maze.",
  },
  {
    title: "We ship",
    body: "We would rather hand you something working this month than a roadmap for next year.",
  },
];

function Principles() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="House rules"
          title="How we work"
          blurb="The same rules for our products and the work we do for you."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <BrassPanel key={p.title} className="p-6">
              <div className="flex items-start gap-4">
                <span className="relative mt-0.5 inline-flex size-9 shrink-0 items-center justify-center">
                  <Cog
                    size={36}
                    teeth={10}
                    tone="var(--sp-patina)"
                    className="absolute inset-0"
                  />
                  <Check className="relative size-4 text-(--sp-patina)" />
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

function FoundersTeaser() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <BrassPanel className="relative overflow-hidden px-8 py-14 text-center sm:px-12">
          <FiligreeCorner corner="tl" />
          <FiligreeCorner corner="tr" />
          <FiligreeCorner corner="bl" />
          <FiligreeCorner corner="br" />
          <p className="engraved-label justify-center">The founders</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold text-foreground sm:text-4xl">
            Built by three people who got tired of overpriced software
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
            SaaSyToad started because clunky, metered tools were holding small
            businesses back. So we built better ones, and then started building
            them for other people too.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-medium text-foreground">
            {FOUNDERS.map((f, i) => (
              <span key={f.name} className="inline-flex items-center gap-3">
                {f.name}
                {i < FOUNDERS.length - 1 && (
                  <span aria-hidden className="text-(--sp-brass)/60">
                    &bull;
                  </span>
                )}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Meet the founders
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </BrassPanel>
      </div>
    </section>
  );
}

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
        <p className="engraved-label justify-center">Let&apos;s build</p>
        <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
          Let&apos;s build something
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
          Tell us what you are trying to do. We will tell you straight whether
          we can help, and what it would take.
        </p>
        <div className="mt-7 flex justify-center">
          <a
            href={BOOK_A_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}
