import { Check } from "lucide-react";
import { BOOK_A_DEMO_URL } from "@/lib/brand";
import { PRICING_PLANS, FOUNDER, formatUsd } from "@/lib/pricing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The public pricing display. Reads the three tiers straight from the single
 * source of truth in `@/lib/pricing` so the /crm landing teaser and the
 * /pricing page never drift from the in-app plan definitions.
 *
 * Every CTA is "Book a demo" on purpose, per the brief: we don't run self-serve
 * checkout until the live Stripe products are confirmed (the price IDs in
 * pricing.ts are still null).
 */
export function PricingTiers({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid gap-5 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.tier}
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
            <p className="mt-1 text-xs text-foreground-subtle">
              or about {formatUsd(plan.annualMonthlyUsd)}/mo billed annually
            </p>

            <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-toad-green/10 px-2.5 py-1 text-xs font-medium text-toad-ink">
              <Check className="size-3.5" aria-hidden />
              AI included, not an add-on
            </div>

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
              href={BOOK_A_DEMO_URL}
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
              Book a demo
            </a>
          </div>
        ))}
      </div>

      {FOUNDER.enabled ? (
        <p className="mt-6 text-center text-sm text-foreground-muted">
          {FOUNDER.note}
        </p>
      ) : null}
      <p className="mt-2 text-center text-xs text-foreground-subtle">
        Every plan includes the AI. No per-message metering, no surprise overage
        bill. Annual billing saves you roughly two months.
      </p>
    </div>
  );
}
