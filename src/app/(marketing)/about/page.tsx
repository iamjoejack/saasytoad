import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BOOK_A_DEMO_URL, COMPANY_NAME, FOUNDERS } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import {
  BrassPanel,
  Cog,
  GearDivider,
  FiligreeCorner,
} from "@/components/marketing/steampunk";

export const metadata: Metadata = {
  title: "About",
  description:
    "SaaSyToad is a small studio building AI agentic apps, websites, and software. Meet the founders.",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28">
          <p className="engraved-label justify-center">The story</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] text-foreground sm:text-6xl">
            About {COMPANY_NAME}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            We are a small studio that builds AI agentic apps, fast websites,
            and the software in between. We started because small businesses
            were stuck paying too much for tools that did too little. So we
            built better ones, and now we build them for other people too.
          </p>
          <GearDivider className="mt-9" />
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="engraved-label justify-center">The crew, in human form</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              The founders
            </h2>
            <p className="mt-4 leading-relaxed text-foreground-muted">
              Three people who would rather ship something useful than talk
              about it.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {FOUNDERS.map((f) => (
              <BrassPanel
                key={f.name}
                rivets
                className="p-7 text-center transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="mx-auto flex size-20 items-center justify-center">
                  <span className="relative inline-flex items-center justify-center">
                    <Cog
                      size={84}
                      teeth={14}
                      tone="var(--sp-brass)"
                      className="absolute inset-0"
                    />
                    <span className="relative text-lg font-semibold text-(--sp-brass-bright)">
                      {initials(f.name)}
                    </span>
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {f.name}
                </h3>
                <p className="engraved-label mt-1.5 justify-center text-(--sp-brass)">
                  {f.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {f.bio}
                </p>
              </BrassPanel>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-foreground-subtle">
            Full founder bios are on the way.
          </p>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="engraved-label justify-center">House rules</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              What we believe
            </h2>
            <GearDivider className="mt-6" />
          </div>
          <div className="mt-10 space-y-4">
            <Belief title="Price it like you'd want to be charged">
              One clear number. The AI is included, not a surprise line item.
              Nobody likes opening a bill that grew while they were not looking.
            </Belief>
            <Belief title="Software should do work, not create it">
              If a tool adds more steps than it removes, it failed. We build
              things that take work off your plate, starting with the parts
              everyone dreads.
            </Belief>
            <Belief title="Ship, then improve">
              We would rather put something working in your hands this month and
              make it better, than hand you a roadmap and a waitlist.
            </Belief>
            <Belief title="Stay reachable">
              You can talk to a real person who knows your account. That is the
              whole point of being small.
            </Belief>
          </div>
        </div>
      </section>

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
          className="pointer-events-none absolute -left-16 top-1/2 -translate-y-1/2 text-(--sp-brass)/10"
        >
          <Cog size={220} teeth={14} spin="ccw" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="engraved-label justify-center">Get in touch</p>
          <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            Want to work with us?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground-muted">
            Whether you need our CRM, a website, or a custom build, the first
            step is the same.
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
              href="/services"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See what we build
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Belief({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <BrassPanel className="p-6">
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
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
            {children}
          </p>
        </div>
      </div>
    </BrassPanel>
  );
}
