"use client";
import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ToadAvatar } from "@/components/brand/toad-avatar";
import { Cog, GearDivider } from "@/components/marketing/steampunk";
import { SAASYTOADS, agentsForToad, type ToadId } from "@/lib/characters";
import { cn } from "@/lib/utils";

/**
 * Interactive crew explorer. Pick a toad and their corner of the app reveals,
 * led by a big portrait framed in a brass gear-ring, themed in that toad's
 * color. The whole block is dressed as a machine you operate: a console of
 * brass-ringed character dials feeding a single readout plate.
 *
 * Client component (keeps the tab interactivity). All gears + framing are
 * decorative and respect prefers-reduced-motion via the .sp-spin class.
 */
export function CrewExplorer() {
  const [activeId, setActiveId] = React.useState<ToadId>("ronald");
  const active = SAASYTOADS.find((t) => t.id === activeId) ?? SAASYTOADS[0]!;
  const agents = agentsForToad(active.id);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="engraved-label justify-center">The crew</p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Meet your crew
          </h2>
          <p className="mt-3 text-lg text-foreground-muted">
            Five toads, one team. Tap one to see the part of your business they
            run.
          </p>
          <GearDivider className="mt-7" />
        </div>

        {/* The dial console: each toad sits in a brass gear-ring you can press. */}
        <div
          role="tablist"
          aria-label="The SaaSyToad crew"
          className="mt-10 flex flex-wrap items-start justify-center gap-4 sm:gap-6"
        >
          {SAASYTOADS.map((c) => {
            const on = c.id === active.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActiveId(c.id)}
                className="group flex w-24 flex-col items-center gap-2.5 rounded-xl px-1 py-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-(--sp-amber) sm:w-28"
              >
                <span
                  className="gear-ring relative transition-transform duration-200 group-hover:-translate-y-0.5"
                  style={
                    on
                      ? {
                          boxShadow: `0 0 0 1px oklch(0 0 0 / 0.5), 0 0 0 4px ${c.accent}, 0 0 0 6px color-mix(in oklch, ${c.accent} 45%, transparent), 0 14px 36px color-mix(in oklch, ${c.accent} 36%, transparent)`,
                        }
                      : undefined
                  }
                >
                  <ToadAvatar
                    toadId={c.id}
                    className="size-16 sm:size-20"
                    iconClassName="size-7 sm:size-8"
                  />
                </span>
                <span
                  className={cn(
                    "text-xs font-semibold transition-colors",
                    on ? "text-foreground" : "text-foreground-muted",
                  )}
                >
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* The readout plate: a machined panel that swaps as you turn a dial. */}
        <div
          key={active.id}
          className="brass-panel animate-in-slide-up riveted mx-auto mt-10 max-w-4xl overflow-hidden"
        >
          <span aria-hidden className="rivet-b" />
          <span aria-hidden className="rivet-c" />
          <div
            className="h-1 w-full"
            style={{
              background: `linear-gradient(90deg, ${active.accent}, color-mix(in oklch, ${active.accent} 25%, transparent))`,
            }}
          />
          <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative flex items-center justify-center overflow-hidden p-10">
              {/* A big slow cog behind the portrait sells the machine. */}
              <Cog
                size={300}
                teeth={16}
                spin="cw"
                tone={active.accent}
                className="pointer-events-none absolute opacity-[0.14]"
              />
              <span
                className="gear-ring relative"
                style={{
                  boxShadow: `0 0 0 1px oklch(0 0 0 / 0.5), 0 0 0 5px color-mix(in oklch, ${active.accent} 60%, transparent), 0 0 0 6px color-mix(in oklch, ${active.accent} 30%, transparent), 0 18px 50px color-mix(in oklch, ${active.accent} 34%, transparent)`,
                }}
              >
                <ToadAvatar
                  toadId={active.id}
                  className="size-40 sm:size-48"
                  iconClassName="size-16"
                />
              </span>
            </div>

            <div className="border-t border-(--border) p-8 md:border-l md:border-t-0">
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: active.accent }}
              >
                {active.name} Saasytoad &middot; {active.role}
              </p>
              <h3 className="mt-1.5 text-2xl font-semibold text-foreground">
                {active.corner}
              </h3>
              <p className="mt-1.5 text-foreground-muted">{active.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {active.blurb}
              </p>

              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {active.covers.map((x) => (
                  <li
                    key={x}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Check
                      className="size-4 shrink-0"
                      style={{ color: active.accent }}
                    />
                    {x}
                  </li>
                ))}
              </ul>

              {agents.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {agents.map((a) => (
                    <span
                      key={a.key}
                      className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        borderColor: `color-mix(in oklch, ${active.accent} 50%, transparent)`,
                        color: active.accent,
                        backgroundColor: `color-mix(in oklch, ${active.accent} 12%, transparent)`,
                      }}
                    >
                      {a.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={active.href}
                  className={cn(buttonVariants({ variant: "primary", size: "md" }))}
                >
                  Explore {active.corner.toLowerCase()}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/crew"
                  className={cn(buttonVariants({ variant: "ghost", size: "md" }))}
                >
                  Meet the whole crew
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
