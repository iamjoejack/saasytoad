import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  Inbox,
  PhoneCall,
  Workflow,
  X,
} from "lucide-react";
import { BOOK_A_DEMO_URL } from "@/lib/brand";
import { buttonVariants } from "@/components/ui/button";
import { AppPreview } from "@/components/mock/app-preview";
import { PricingTiers } from "@/components/marketing/pricing-tiers";
import { cn } from "@/lib/utils";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import {
  BrassPanel,
  Cog,
  GearDivider,
  FiligreeCorner,
} from "@/components/marketing/steampunk";

export const metadata: Metadata = {
  title: "The honest all-in-one CRM",
  description:
    "Calls, texts, email, booking, pipelines, and AI that does the busywork, all in one login. One flat price a month, AI included, no surprise bill. Built to replace the metered all-in-one.",
  openGraph: {
    type: "website",
    siteName: "SaaSyToad",
    title: "SaaSyToadCRM, the honest all-in-one CRM",
    description:
      "Run your whole shop from one login. AI included on every plan, never metered, never a surprise bill.",
    url: "https://saasytoad.com/crm",
  },
};

export default function CrmLandingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HonestPricing />
      <Features />
      <PricingSection />
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
            <Check className="size-3.5 text-(--sp-patina)" aria-hidden />
            Built to replace the metered all-in-one
          </span>

          <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            The honest all-in-one CRM. AI included. No surprise bill.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground-muted">
            Run your whole shop from one login. Calls, texts, email, booking,
            pipelines, and AI that actually does the busywork. One flat price a
            month. The AI is in that price, not bolted on as a $97 add-on.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={BOOK_A_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              Book a demo
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              href="/pricing"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See pricing
            </Link>
          </div>

          <p className="mt-6 text-sm text-foreground-subtle">
            No card to look around. You will talk to a real person, probably
            Joe.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <BrassPanel className="metal-grain overflow-hidden p-2">
            <div className="relative z-10">
              <AppPreview screen="dashboard" />
            </div>
          </BrassPanel>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Social proof (logo slots intentionally commented out)             */
/* ------------------------------------------------------------------ */

function SocialProof() {
  return (
    <section className="border-y border-(--border-strong) bg-(--sp-iron-deep)/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="engraved-label justify-center text-center">
          Built with agencies, not for a pitch deck
        </p>
        {/*
          TODO(owner): drop real client logos in here once you have permission
          to show them. Keep them grayscale and evenly sized. Leaving the slots
          commented out rather than faking logos.

          <div className="mt-6 grid grid-cols-2 items-center gap-8 opacity-60 sm:grid-cols-4 lg:grid-cols-5">
            <img src="/brand/logos/client-1.svg" alt="Client name" className="mx-auto h-7" />
            <img src="/brand/logos/client-2.svg" alt="Client name" className="mx-auto h-7" />
            <img src="/brand/logos/client-3.svg" alt="Client name" className="mx-auto h-7" />
            <img src="/brand/logos/client-4.svg" alt="Client name" className="mx-auto h-7" />
            <img src="/brand/logos/client-5.svg" alt="Client name" className="mx-auto h-7" />
          </div>
        */}
        {/*
          TODO(owner): add 2-3 real testimonials here when you have them. Use the
          person's name and shop, no stock quotes. Format: "quote." Name, Shop.
        */}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Honest pricing / the metered all-in-one problem                   */
/* ------------------------------------------------------------------ */

const COMPARE: { them: string; us: string }[] = [
  {
    them: "Low base price, then meters everything that matters",
    us: "One flat price for the whole tier",
  },
  {
    them: "Texts, emails, and voice minutes billed per use",
    us: "Included, with fair-use limits sized for real shops",
  },
  {
    them: "AI is a separate add-on, often around $97/mo per sub-account",
    us: "AI included on every plan",
  },
  {
    them: "The bill swings with usage and is hard to predict",
    us: "The price you saw is the price you pay",
  },
  {
    them: "Overage charges you only find at month-end",
    us: "No surprise overage, ever",
  },
];

function HonestPricing() {
  return (
    <section id="honest-pricing" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="engraved-label justify-center">Side by side</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Your CRM bill shouldn&apos;t need a spreadsheet
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
            Most all-in-one tools reel you in with a cheap base plan, then meter
            the parts you actually use. The AI usually lands as its own add-on,
            often around $97 a month for every sub-account you run. Agencies
            tell us their real bill ends up somewhere between $200 and $600 a
            month once the usage piles up. We went the other way. Pick a tier,
            and that&apos;s the number on your card. The AI is already in it.
          </p>
          <GearDivider className="mt-7" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <BrassPanel className="p-7">
            <p className="engraved-label text-(--sp-copper)">
              The metered all-in-one
            </p>
            <ul className="mt-4 space-y-3.5">
              {COMPARE.map((row) => (
                <li key={row.them} className="flex items-start gap-3 text-sm">
                  <X
                    className="mt-0.5 size-4 shrink-0 text-(--sp-copper)"
                    aria-hidden
                  />
                  <span className="leading-relaxed text-foreground-muted">
                    {row.them}
                  </span>
                </li>
              ))}
            </ul>
          </BrassPanel>

          <BrassPanel
            rivets
            className="p-7"
            style={{
              boxShadow:
                "inset 0 1px 0 0 oklch(0.85 0.1 82 / 0.32), inset 0 0 0 1px oklch(0.78 0.13 78 / 0.25), 0 18px 40px -8px oklch(0 0 0 / 0.7)",
            }}
          >
            <p className="engraved-label">SaaSyToadCRM</p>
            <ul className="mt-4 space-y-3.5">
              {COMPARE.map((row) => (
                <li key={row.us} className="flex items-start gap-3 text-sm">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-(--sp-patina)"
                    aria-hidden
                  />
                  <span className="leading-relaxed text-foreground">
                    {row.us}
                  </span>
                </li>
              ))}
            </ul>
          </BrassPanel>
        </div>

        <p className="mt-5 text-center text-xs text-foreground-subtle">
          Comparison reflects add-on and usage charges people commonly report,
          not a specific quote. Always check current plans before you switch.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: Inbox,
    eyebrow: "Unified inbox",
    title: "Every conversation in one thread",
    body: "Calls, texts, email, and Instagram and Facebook DMs all land in one inbox, tied to the right contact. Reply from the same place. Nobody on your team has to go hunting across five apps to find what a customer said.",
    screen: "inbox",
  },
  {
    icon: PhoneCall,
    eyebrow: "AI voice receptionist & booking",
    title: "It answers the phone so you don't have to",
    body: "The AI receptionist picks up, answers the common questions, and books the appointment straight into your calendar. Miss a call anyway? It texts the caller back automatically before they ring the next shop.",
    screen: "receptionist",
  },
  {
    icon: Bot,
    eyebrow: "AI agents",
    title: "Put the busywork on autopilot",
    body: "Agents enrich new leads, follow up while they're hot, win back cold contacts, triage form fills, and coach your pipeline. They run on every plan because the AI is the point, not a line item we upsell you later.",
    screen: "agents",
  },
  {
    icon: Building2,
    eyebrow: "Multi-tenant workspaces",
    title: "Run every client from one login",
    body: "Each client gets their own workspace with your branding and your domain. Switch between them in a click. Starting a new client? Clone a snapshot and the pipelines, automations, and settings come with it. White-label, top to bottom.",
    screen: "workspaces",
  },
  {
    icon: Workflow,
    eyebrow: "Marketing automation",
    title: "Workflows that close, not just send",
    body: "Build visual workflows, drip sequences, smart lists, and email or SMS blasts. Trigger a follow-up the moment a deal stalls, ask for the review right after the job, re-engage a list that went quiet. Set it once and let it run.",
    screen: "workflow",
  },
] as const;

function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-20 border-y border-(--border-strong) bg-(--sp-iron-deep)/40"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="engraved-label justify-center">The workshop</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            One tool for the whole job
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
            The stuff you&apos;d otherwise stitch together from five
            subscriptions, in one place and one price.
          </p>
          <GearDivider className="mt-7" />
        </div>

        <div className="mt-16 space-y-24">
          {FEATURES.map((feat, i) => {
            const FeatureIcon = feat.icon;
            const flip = i % 2 === 1;
            return (
              <div
                key={feat.title}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-12"
              >
                <div className={cn(flip && "md:order-2")}>
                  <span className="relative inline-flex size-14 items-center justify-center">
                    <Cog
                      size={56}
                      teeth={12}
                      tone="var(--sp-brass)"
                      className="absolute inset-0"
                    />
                    <FeatureIcon
                      className="relative size-6 text-(--sp-brass-bright)"
                      aria-hidden
                    />
                  </span>
                  <p className="engraved-label mt-5">{feat.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                    {feat.title}
                  </h3>
                  <p className="mt-3 text-pretty leading-relaxed text-foreground-muted">
                    {feat.body}
                  </p>
                </div>
                <div className={cn(flip && "md:order-1")}>
                  <BrassPanel className="metal-grain overflow-hidden p-2">
                    <div className="relative z-10">
                      <AppPreview screen={feat.screen} />
                    </div>
                  </BrassPanel>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing teaser (shares <PricingTiers/> with /pricing)             */
/* ------------------------------------------------------------------ */

function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="engraved-label justify-center">Flat pricing</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Simple pricing. AI in every plan.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
            Three tiers, flat monthly price, no metered add-ons. Pick the one
            that fits and book a demo so we can get you set up.
          </p>
          <GearDivider className="mt-7" />
        </div>

        <PricingTiers className="mt-10" />

        <div className="mt-9 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-1 text-sm font-medium text-(--sp-brass-bright) hover:underline"
          >
            See what&apos;s in each plan
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
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
        <BrassPanel className="relative overflow-hidden px-8 py-12 sm:px-12">
          <FiligreeCorner corner="tl" />
          <FiligreeCorner corner="tr" />
          <FiligreeCorner corner="bl" />
          <FiligreeCorner corner="br" />
          <p className="engraved-label justify-center">Try it on your numbers</p>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            See it on your own numbers
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
            Book a 20-minute demo. We&apos;ll show you the whole thing running,
            answer the awkward pricing questions, and tell you straight if
            it&apos;s not a fit.
          </p>
          <div className="mt-7 flex justify-center">
            <a
              href={BOOK_A_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              Book a demo
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </BrassPanel>
      </div>
    </section>
  );
}
