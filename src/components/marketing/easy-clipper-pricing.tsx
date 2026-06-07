import { Check, KeyRound, Sparkles } from "lucide-react";
import { EASY_CLIPPER_URL } from "@/lib/brand";
import {
  EASY_CLIPPER_PLANS,
  BYO_PROVIDERS,
  formatUsd,
} from "@/lib/easy-clipper-pricing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Easy Clipper's public pricing display. Reads the tiers straight from the
 * single source of truth in `@/lib/easy-clipper-pricing` so the product page
 * never drifts from the plan definitions.
 *
 * Every CTA opens the app: there is no self-serve checkout until the live
 * Stripe products are confirmed (the price IDs in the data file are null).
 */
export function EasyClipperPricing({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid gap-5 lg:grid-cols-3">
        {EASY_CLIPPER_PLANS.map((plan) => {
          const isFree = plan.monthlyUsd === 0;
          const annualTotal = plan.annualMonthlyUsd * 12;
          const monthlyTotal = plan.monthlyUsd * 12;
          const annualSavingsPct =
            monthlyTotal > 0
              ? Math.round(((monthlyTotal - annualTotal) / monthlyTotal) * 100)
              : 0;
          return (
            <div
              key={plan.id}
              className={cn(
                "brass-panel relative flex flex-col p-6",
                plan.featured && "ring-1 ring-(--sp-amber)/40 shadow-lg",
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground shadow-sm">
                  Most popular
                </span>
              ) : null}

              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 min-h-[2.5rem] text-sm text-foreground-muted">
                {plan.blurb}
              </p>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-foreground">
                  {formatUsd(plan.monthlyUsd)}
                </span>
                <span className="text-sm text-foreground-muted">/mo</span>
              </div>
              <p className="mt-1 min-h-[1rem] text-xs text-foreground-subtle">
                {isFree
                  ? "No card needed"
                  : `or ${formatUsd(plan.annualMonthlyUsd)}/mo billed annually`}
              </p>
              {!isFree && annualSavingsPct > 0 ? (
                <div className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-(--sp-amber)/15 px-2.5 py-1 text-xs font-semibold text-(--sp-amber) ring-1 ring-(--sp-amber)/30">
                  <Sparkles className="size-3.5" aria-hidden />
                  Save {annualSavingsPct}% with annual
                </div>
              ) : (
                <div className="mt-2.5 h-[26px]" aria-hidden />
              )}

              {plan.aiIncluded ? (
                <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-toad-green/10 px-2.5 py-1 text-xs font-medium text-toad-ink">
                  <Check className="size-3.5" aria-hidden />
                  AI included, not an add-on
                </div>
              ) : (
                <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-(--surface) px-2.5 py-1 text-xs font-medium text-foreground-muted ring-1 ring-(--border)">
                  <KeyRound className="size-3.5" aria-hidden />
                  Bring your own key
                </div>
              )}

              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span className="text-foreground-muted">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={EASY_CLIPPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({
                    variant: plan.featured ? "primary" : "secondary",
                    size: "lg",
                  }),
                  "mt-6 w-full",
                )}
              >
                {plan.cta}
              </a>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-sm text-foreground-muted">
        Free stays free. Bring your own Anthropic key and you only ever pay your
        own AI provider.
      </p>
      <p className="mt-2 text-center text-xs text-foreground-subtle">
        Every paid plan includes the AI. No per-minute charges, no surprise
        overage bill. Pay yearly and save about 35%.
      </p>

      <div className="mt-10 rounded-2xl border border-(--border) bg-(--surface)/40 p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <KeyRound className="size-4 text-(--sp-amber)" aria-hidden />
          <h3 className="text-base font-semibold text-foreground">
            Bring your own keys
          </h3>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
          Already pay for AI? Connect your own key and run Easy Clipper on the
          models you already use. Your key is read on the server and never sent
          to the browser. On the free plan it is how you run for nothing. On a
          paid plan it lifts the monthly minutes cap, since the model cost is on
          your account.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <ProviderGroup label="AI models" items={BYO_PROVIDERS.models} />
          <ProviderGroup
            label="Transcription"
            items={BYO_PROVIDERS.transcription}
          />
        </div>
      </div>
    </div>
  );
}

function ProviderGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="engraved-label">{label}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((name) => (
          <li
            key={name}
            className="inline-flex items-center rounded-full border border-(--border) bg-(--surface) px-2.5 py-1 text-xs font-medium text-foreground-muted"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
