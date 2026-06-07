import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ToadAvatar } from "@/components/brand/toad-avatar";
import { BOOK_A_DEMO_URL } from "@/lib/brand";
import { SAASYTOADS, agentsForToad } from "@/lib/characters";
import { cn } from "@/lib/utils";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import {
  BrassPanel,
  Cog,
  GearDivider,
  FiligreeCorner,
} from "@/components/marketing/steampunk";

export const metadata: Metadata = {
  title: "Meet the crew",
  description:
    "The five SaaSyToads, each running a part of your business inside saasytoad.com: strategy, marketing, automation, social, and creative.",
};

export default function CrewPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28">
          <p className="engraved-label justify-center">The five</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] text-foreground sm:text-6xl">
            Meet the crew
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Five toads, one family business. Each one runs a different part of
            saasytoad.com, so you always know who to ask. Soon they&apos;ll
            talk back.
          </p>
          <GearDivider className="mt-9" />
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {SAASYTOADS.map((c) => {
            const agents = agentsForToad(c.id);
            return (
              <BrassPanel
                key={c.id}
                className="metal-grain overflow-hidden transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Accent rail across the top, tinted to the toad's color. */}
                <div
                  aria-hidden
                  className="h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
                  }}
                />
                <div className="relative z-10 flex items-center gap-5 px-5 py-6">
                  <span
                    className="gear-ring shrink-0"
                    style={{
                      boxShadow: `0 0 0 1px oklch(0 0 0 / 0.5), 0 0 0 4px color-mix(in oklch, ${c.accent} 55%, transparent), 0 0 0 5px color-mix(in oklch, ${c.accent} 30%, transparent), inset 0 2px 6px oklch(0 0 0 / 0.6), 0 16px 40px oklch(0 0 0 / 0.55)`,
                    }}
                  >
                    <ToadAvatar
                      toadId={c.id}
                      className="size-20 rounded-full"
                      iconClassName="size-8"
                    />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-foreground">
                      {c.name} Saasytoad
                    </h2>
                    <p
                      className="engraved-label mt-1"
                      style={{ color: c.accent }}
                    >
                      {c.role}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 border-t border-(--border) px-5 py-6">
                  <p className="text-lg font-semibold leading-tight text-foreground">
                    {c.tagline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {c.blurb}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {c.covers.map((x) => (
                      <li
                        key={x}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <Check
                          className="size-4 shrink-0"
                          style={{ color: c.accent }}
                        />
                        {x}
                      </li>
                    ))}
                  </ul>

                  {agents.length > 0 ? (
                    <div className="mt-5">
                      <p className="engraved-label">
                        Powers these agents
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {agents.map((a) => (
                          <span
                            key={a.key}
                            className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                            style={{
                              borderColor: `color-mix(in oklch, ${c.accent} 40%, transparent)`,
                              color: c.accent,
                              backgroundColor: `color-mix(in oklch, ${c.accent} 8%, transparent)`,
                            }}
                          >
                            {a.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="mt-5 text-xs text-foreground-subtle">
                      Keeps the wiring behind every other toad&apos;s agents.
                    </p>
                  )}

                  <div className="mt-5">
                    <Link
                      href={c.href}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                      )}
                    >
                      Explore {c.corner.toLowerCase()}
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </BrassPanel>
            );
          })}
        </div>
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
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <BrassPanel className="relative overflow-hidden px-8 py-12 sm:px-12">
            <FiligreeCorner corner="tl" />
            <FiligreeCorner corner="tr" />
            <FiligreeCorner corner="bl" />
            <FiligreeCorner corner="br" />
            <p className="engraved-label justify-center">Coming soon</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
              They&apos;re about to start talking back
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground-muted">
              Right now each toad guides their part of the app. Next, they
              become AI agents you can actually chat with, in their own voice,
              doing the work alongside you.
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
                See the CRM
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </BrassPanel>
        </div>
      </section>
    </>
  );
}
