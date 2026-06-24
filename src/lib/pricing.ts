/**
 * Single source of truth for SaaSyToadCRM's published pricing.
 *
 * The three public tiers (Solo / Pro / Agency) map onto the existing Prisma
 * PlanTier enum so the marketing site, the in-app plan labels, and any future
 * Stripe checkout all read the SAME numbers. Don't scatter prices into
 * components or copy — import from here.
 *
 * Prices are the brand's published monthly rates. Annual is billed up front at
 * roughly two months free. AI is included on every tier on purpose: that's the
 * whole pitch against the metered all-in-ones that bill AI as a separate add-on
 * per sub-account.
 *
 * Client-safe: pure data, no `server-only` import, so both server pages and
 * client components can read it.
 *
 * NOTE: nothing here talks to Stripe. The `stripe` price IDs are intentionally
 * null until the owner confirms the live products — every CTA stays "Book a
 * demo" so we never run self-serve checkout against a tier that has no product.
 */

/**
 * The enum values that carry a public price. PLATFORM (the self-hosted owner)
 * and FREE (internal trial) are real PlanTier values but are never sold on the
 * marketing site, so they're excluded here.
 */
export type PublicPlanTier = "STARTER" | "PRO" | "AGENCY";

export type PricingPlan = {
  /** Prisma PlanTier enum value this plan is stored as. */
  tier: PublicPlanTier;
  /** Public marketing name shown on the pricing card. */
  name: string;
  /** One line on who it's for. */
  blurb: string;
  /** Published monthly price, whole US dollars. */
  monthlyUsd: number;
  /** Effective monthly price when billed annually, whole US dollars. */
  annualMonthlyUsd: number;
  /** Marketing feature bullets, in display order. */
  features: string[];
  /** The single "most popular" highlight. Exactly one plan sets this. */
  featured?: boolean;
  /**
   * Stripe price IDs. TODO(owner): fill these in once the live products exist.
   * Leaving them null keeps the CTA on "Book a demo" — we do NOT wire self-serve
   * checkout until the live Stripe products are confirmed.
   */
  stripe: {
    monthlyPriceId: string | null;
    annualPriceId: string | null;
  };
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    tier: "STARTER",
    name: "Solo",
    blurb: "For the owner-operator doing it all themselves.",
    monthlyUsd: 197,
    annualMonthlyUsd: 179,
    features: [
      "One workspace",
      "Unified inbox: calls, texts, email, DMs",
      "Online booking + missed-call text-back",
      "AI voice receptionist",
      "Core AI agents (lead follow-up, enrichment)",
      "Pipelines, contacts, tasks, and reports",
    ],
    stripe: { monthlyPriceId: null, annualPriceId: null },
  },
  {
    tier: "PRO",
    name: "Pro",
    blurb: "For a growing team with real call and message volume.",
    monthlyUsd: 397,
    annualMonthlyUsd: 347,
    featured: true,
    features: [
      "Everything in Solo",
      "More seats for your team",
      "Marketing automation: workflows, drip, blasts",
      "Smart lists and review requests",
      "Premium AI agents (reactivation, pipeline coach)",
      "Priority support from a human",
    ],
    stripe: { monthlyPriceId: null, annualPriceId: null },
  },
  {
    tier: "AGENCY",
    name: "Agency",
    blurb: "White-label. For agencies running a book of clients.",
    monthlyUsd: 697,
    annualMonthlyUsd: 597,
    features: [
      "Everything in Pro",
      "Client workspaces, run them all from one login",
      "Your branding and your domain",
      "Spin up a new client from a snapshot",
      "Per-client phone numbers and automations",
      "White-label client portals",
    ],
    stripe: { monthlyPriceId: null, annualPriceId: null },
  },
];

/**
 * Display name for every PlanTier enum value. PLATFORM and FREE aren't sold
 * publicly but still need a friendly label for the in-app tenant settings, so
 * they live here too. Keeps the marketing names and the in-app labels in sync.
 */
export const PLAN_TIER_NAMES: Record<
  "PLATFORM" | "FREE" | "STARTER" | "PRO" | "AGENCY",
  string
> = {
  PLATFORM: "Platform",
  FREE: "Free",
  STARTER: "Solo",
  PRO: "Pro",
  AGENCY: "Agency",
};

/**
 * Founding-customer pricing is a FLAG, not a list price. Founders lock in launch
 * pricing for life; the exact rate is settled on the demo call, so it never
 * shows up as a public number on the site.
 *
 * TODO(owner): set the exact founding-customer monthly rate before launch. Keep
 * it internal — surface the note, not the number.
 */
export const FOUNDER = {
  /** Whether to surface the founder note on the marketing site. */
  enabled: true,
  /** TODO(owner): exact founding-customer monthly rate. Stays internal. */
  monthlyUsd: null as number | null,
  note: "Founding customers lock in launch pricing for life. Ask about it on the call.",
};

/**
 * Bring-your-own-AI discount. Customers who connect their own Claude or
 * Higgsfield account take that usage off our shared bill, so we hand back
 * part of the cost as a lower monthly rate. It's componentized on purpose:
 * the two providers are separate cost buckets, so a customer who connects
 * only one still earns that one's discount.
 *
 * Keep each discount SMALLER than the average cost it removes — BYO stays
 * attractive while we still net positive on the software. The wiring that
 * makes a connected key bill the client's own account already exists
 * (per-workspace overrides in [[project_subaccounts]] / settings.ts); this
 * is only the published price modifier.
 *
 * TODO(owner): set the exact monthly discounts before launch. Until then
 * the amounts stay null and the site surfaces the offer, not a number —
 * same discipline as FOUNDER above. No self-serve discount is applied
 * while every CTA is still "Book a demo".
 */
export const BYO_AI_DISCOUNT = {
  /** Whether to surface the BYO offer on the marketing + settings copy. */
  enabled: true,
  /** TODO(owner): monthly $ off for connecting their own Claude key. */
  claudeMonthlyUsd: null as number | null,
  /** TODO(owner): monthly $ off for connecting their own Higgsfield key. */
  higgsfieldMonthlyUsd: null as number | null,
  note: "Already have a Claude or Higgsfield account? Connect it and pay less. Your AI runs on your own account, and you're not capped by our included pool.",
};

/** Format a whole-dollar amount as US currency, e.g. 1297 -> "$1,297". */
export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
