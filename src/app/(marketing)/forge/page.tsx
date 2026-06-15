import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Terminal,
  Settings,
  Zap,
  Check,
  X,
  Code,
  Globe,
  Lock,
} from "lucide-react";
import { BOOK_A_DEMO_URL, FORGE_LOGIN_URL } from "@/lib/brand";
import { buttonVariants } from "@/components/ui/button";
import { AppPreview } from "@/components/mock/app-preview";
import { cn } from "@/lib/utils";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import {
  BrassPanel,
  Cog,
  GearDivider,
  FiligreeCorner,
} from "@/components/marketing/steampunk";

export const metadata: Metadata = {
  title: "SaaSyToad Forge, the honest AI developer workspace",
  description:
    "Run secure microVM sandboxes, deploy edge websites with one-click, and connect webhook triggers directly to Zapier. One flat price, AI included, no surprise bill.",
  openGraph: {
    type: "website",
    siteName: "SaaSyToad",
    title: "SaaSyToad Forge, the honest AI developer workspace",
    description:
      "A complete developer workbench for novice creators and professionals alike. Flat rate, AI included, zero metering.",
    url: "https://saasytoad.com/forge",
  },
};

export default function ForgeLandingPage() {
  return (
    <>
      <Hero />
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
          <span className="engraved-label justify-center rounded-full border border-(--border-strong) bg-(--surface)/60 px-3.5 py-1.5 backdrop-blur text-(--sp-amber)">
            <span className="size-1.5 rounded-full bg-(--sp-amber) shadow-[0_0_8px_var(--sp-amber)] animate-pulse" />
            Coming soon / In Development
          </span>

          <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            The honest AI developer workspace. AI included.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-foreground-muted">
            SaaSyToad Forge gives novice and professional developers their own isolated workbench. A real coding agent, powered by Claude, reads your code, edits files, runs the tests, and asks before it ships. Ronald reviews every build before you deploy. One flat price, AI included, no surprise token bill.
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
              href="#pricing"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See pricing
            </Link>
          </div>

          <p className="mt-6 text-sm text-foreground-subtle">
            Get early access to the sandbox. Meet Ronald on a live call, or{" "}
            <a
              href={FORGE_LOGIN_URL}
              className="text-(--sp-amber) underline-offset-2 hover:underline"
            >
              sign in if you already have access
            </a>
            .
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <BrassPanel className="metal-grain overflow-hidden p-2">
            <div className="relative z-10">
              <AppPreview screen="forge_editor" />
            </div>
          </BrassPanel>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Honest pricing / the metered token problem                        */
/* ------------------------------------------------------------------ */

const COMPARE: { them: string; us: string }[] = [
  {
    them: "Meters raw input/output LLM tokens mid-session",
    us: "Flat rate, AI included on the Pro Builder tier",
  },
  {
    them: "Charges you for VM run hours and compiler compute",
    us: "Unlimited sandbox containers included",
  },
  {
    them: "Stops agent execution completely when you hit a monthly cap",
    us: "Interactive session safety caps ($5 limits) that you reset for free",
  },
  {
    them: "Low base tier price that balloons with usage",
    us: "One predictable number on your card every month",
  },
];

function HonestPricing() {
  return (
    <section id="honest-pricing" className="scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="engraved-label justify-center">Comparison</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            You shouldn&apos;t worry about token billing mid-code
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
            Most modern AI coding platforms lure you in with low starting rates, but meter your actual development. You end up billed for LLM tokens, execution sandboxes, and domain hosting. If your agent enters an infinite bug-fixing loop, you wake up to a surprise invoice. We design sandboxes for builder control, protecting margins with simple, resetable run limits.
          </p>
          <GearDivider className="mt-7" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <BrassPanel className="p-7">
            <p className="engraved-label text-(--sp-copper)">
              The metered competitors
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
            <p className="engraved-label">SaaSyToad Forge</p>
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
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: Bot,
    eyebrow: "AI coding agent",
    title: "A real agent that reads, edits, runs, and asks",
    body: "Describe what you want and Ronald, powered by Claude, works it for real: reads your files, searches the code, edits, runs the tests, and captures screenshots. By default it asks a few quick questions first so it builds the right thing. The same window doubles as a normal chat, and you can turn the interview off any time.",
    screen: "forge_editor",
  },
  {
    icon: Terminal,
    eyebrow: "Ship with confidence",
    title: "Ronald reviews every build before you deploy",
    body: "Before a deploy, Ronald checks the build inside an isolated microVM: runs your type check, lint, build, and tests, then flags missing tests or leftover secrets. He gives an honest verdict with what is missing and what to do. Not ready? He tells you why. Want to ship anyway? You still can.",
    screen: "forge_deploy",
  },
  {
    icon: Zap,
    eyebrow: "Automation panel",
    title: "Use the right connector for the job",
    body: "Forge knows which integrations are live in your workspace, from Supabase and Stripe to Resend and Zapier, and wires up the right one instead of rolling its own. Connect sandbox events to over 8,000 tools through Zapier webhook triggers.",
    screen: "forge_zapier",
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
          <p className="engraved-label justify-center">Features</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            A developer engine under the hood
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
            The workspace details we built to streamline our client creations, available in a single unified workbench.
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
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="engraved-label justify-center">Flat Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Predictable plans. No token counting.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
            Work with peace of mind. Check the flat plans we have tailored for SaaSyToad Forge.
          </p>
          <GearDivider className="mt-7" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Pro Builder Plan */}
          <BrassPanel rivets className="p-7 relative flex flex-col justify-between">
            <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground shadow-sm">
              Standard Plan
            </span>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Pro Builder Plan</h3>
              <p className="mt-1.5 text-sm text-foreground-muted leading-relaxed min-h-[40px]">
                Complete AI-powered visual development workbench.
              </p>
              
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-foreground">$29</span>
                <span className="text-sm text-foreground-muted">/mo</span>
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-toad-green/10 px-2.5 py-1 text-xs font-medium text-toad-ink">
                <Check className="size-3.5" aria-hidden />
                AI included, no token fees
              </div>

              <ul className="mt-6 space-y-2.5 text-sm text-foreground-muted">
                {[
                  "Unlimited VM workspace sandboxes",
                  "AI Coding & Verification Crew",
                  "One-click Edge Deployments",
                  "Zapier webhook panel",
                  "Support for external APIs",
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={BOOK_A_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-8 w-full")}
            >
              Book a demo
            </a>
          </BrassPanel>

          {/* Cap Expansion */}
          <BrassPanel className="p-7 relative flex flex-col justify-between bg-black/40">
            <div>
              <h3 className="text-xl font-semibold text-foreground-muted">Cap Extension</h3>
              <p className="mt-1.5 text-sm text-foreground-subtle leading-relaxed min-h-[40px]">
                Safety credit top-up to increase deep-reasoning limits.
              </p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-foreground-muted">$10</span>
                <span className="text-sm text-foreground-subtle">/one-time</span>
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400">
                <Lock className="size-3.5" aria-hidden />
                No expiration date
              </div>

              <ul className="mt-6 space-y-2.5 text-sm text-foreground-subtle">
                {[
                  "Adds $10.00 to session limit pool",
                  "Enables longer agent iterations",
                  "Supports deep-reasoning fusion models",
                  "No monthly overhead increase",
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <Check className="size-4 text-zinc-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={BOOK_A_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-8 w-full")}
            >
              Ask about top-ups
            </a>
          </BrassPanel>
        </div>

        <p className="mt-8 text-center text-xs text-foreground-subtle leading-relaxed">
          *Internal spend limits protect you from agent execution loops. Every task run has a $5 safety cap that you can reset for free. Buy top-ups only if you need deeper reasoning streams.
        </p>
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
          <p className="engraved-label justify-center">Build with Forge</p>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            See the sandbox run live
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
            Book a short demo. We will fire up the edge microVM containers, show you Ronald coding a full landing page from a prompt, and explain how the Zapier triggers connect.
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
