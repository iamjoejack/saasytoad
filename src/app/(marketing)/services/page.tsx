import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Globe, Wrench, ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BOOK_A_DEMO_URL } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import {
  BrassPanel,
  Cog,
  GearDivider,
  FiligreeCorner,
} from "@/components/marketing/steampunk";

export const metadata: Metadata = {
  title: "Services",
  description:
    "What SaaSyToad builds: AI agentic applications, fast websites, and custom software and automations, done for you.",
};

const SERVICES = [
  {
    icon: Bot,
    eyebrow: "AI agentic applications",
    title: "Agents that do the work, not just chat",
    body: "Most AI demos talk. Ours act. We build agents that chase leads, answer customers, triage requests, move data between your tools, and handle the repetitive work your team would rather not touch. They run on their own and pull a human in when it actually matters.",
    bullets: [
      "Lead follow-up and qualification that never sleeps",
      "Support and inbox agents that draft, route, and resolve",
      "Back-office agents for data entry, syncing, and reporting",
      "Built on models we trust, with guardrails you control",
    ],
  },
  {
    icon: Globe,
    eyebrow: "Websites",
    title: "Sites that load fast and convert",
    body: "A website should earn its place. We build fast, modern sites that look sharp on every screen, rank well, and turn visitors into customers. And because we build them clean, they are easy to update later instead of a redesign every two years.",
    bullets: [
      "Marketing sites, landing pages, and booking flows",
      "Built for speed, accessibility, and search",
      "Easy to edit, so you are not stuck waiting on us",
      "Wired to your CRM and tools from day one",
    ],
  },
  {
    icon: Wrench,
    eyebrow: "Services and custom builds",
    title: "The thing you can't buy off the shelf",
    body: "Sometimes you need something specific. We design it, build it, and wire it into what you already use: integrations, automations, internal tools, dashboards, the parts nobody else wants to touch. You get working software, not a slide deck.",
    bullets: [
      "Custom integrations between the tools you already pay for",
      "Internal tools and dashboards for your team",
      "Automations that replace the copy-paste work",
      "Done-for-you setup, with a human to call after",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28">
          <p className="engraved-label justify-center">The workshop</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] text-foreground sm:text-6xl">
            What we build
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            AI agentic apps, fast websites, and the custom software in between.
            Same approach every time. Ship something that works, price it
            honestly, and stick around after launch.
          </p>
          <GearDivider className="mt-9" />
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-20 px-4 pb-12 sm:px-6">
        {SERVICES.map((s, i) => (
          <section
            key={s.title}
            className="grid items-start gap-10 md:grid-cols-2"
          >
            <div className={cn(i % 2 === 1 && "md:order-2")}>
              <span className="relative inline-flex size-14 items-center justify-center">
                <Cog
                  size={56}
                  teeth={12}
                  tone="var(--sp-brass)"
                  className="absolute inset-0"
                />
                <s.icon className="relative size-6 text-(--sp-brass-bright)" />
              </span>
              <p className="engraved-label mt-5">{s.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                {s.title}
              </h2>
              <p className="mt-3 leading-relaxed text-foreground-muted">
                {s.body}
              </p>
            </div>
            <BrassPanel className="p-7">
              <ul className="space-y-3.5">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-(--sp-patina)" />
                    {b}
                  </li>
                ))}
              </ul>
            </BrassPanel>
          </section>
        ))}
      </div>

      <section className="relative overflow-hidden border-t border-(--border-strong) bg-(--sp-iron-deep) py-20">
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
          className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 text-(--sp-brass)/10"
        >
          <Cog size={220} teeth={14} spin="cw" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <BrassPanel className="relative overflow-hidden px-8 py-12 sm:px-12">
            <FiligreeCorner corner="tl" />
            <FiligreeCorner corner="tr" />
            <FiligreeCorner corner="bl" />
            <FiligreeCorner corner="br" />
            <p className="engraved-label justify-center">Talk to us</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
              Have something in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground-muted">
              Book a call and tell us what you are trying to do. We will tell
              you straight whether we are the right fit, and what it would take.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={BOOK_A_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                Book a demo
              </a>
              <Link
                href="/crm"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                See our CRM
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </BrassPanel>
        </div>
      </section>
    </>
  );
}
