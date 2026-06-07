/**
 * Single source of truth for SaaSyToad Easy Clipper's published pricing.
 *
 * Easy Clipper is a separate product from the CRM, so it gets its own tiers.
 * Same brand discipline applies: pricing is flat, AI is included on every paid
 * plan, and there is no per-minute metering or surprise overage bill.
 *
 * Why minutes, not videos: the competition (Opus Clip, Vizard) all meter by
 * source minutes, and minutes are what actually drive our cost. A 3 hour
 * upload burns far more transcription + model tokens than a 5 minute one, so
 * capping by "videos" would let one heavy user wreck the margin. We cap by
 * source minutes a month instead, with no overage bill: hit the cap and you
 * wait for the reset, upgrade, or connect your own keys to lift it.
 *
 * Cost model (the "cover AI usage" math):
 *   Blended variable cost is roughly $0.02 to $0.03 per source minute, all in:
 *   transcription (Whisper / AssemblyAI ~ $0.006/min) + the Claude agent team
 *   with prompt caching (~ $0.013 to $0.02/min) + render + storage. At the caps
 *   below, worst-case AI cost stays well under each plan's price, and blended
 *   cost is far lower because few users max the cap. The BYO valve is the real
 *   safety net: heavy users connect their own keys, which moves the model cost
 *   onto them and leaves us only render + storage.
 *   TODO(owner): retune $/min and the caps once real usage data lands.
 *
 * Competitive context (2026): Opus Clip Starter $15/150min, Pro $29/300min;
 * Vizard Creator $29 ($14.5 annual); Submagic Starter $20, Pro $40, Agency $80;
 * Klap $29 to $79. Our $19 Creator / $49 Studio sit inside that band and win on
 * "AI included, honest, bring your own key for any major model".
 *
 * The free plan is sustainable on purpose: it runs on the customer's own key
 * (any major provider) or the no-key sample brain, so we are not paying for
 * free users' models. Paid plans include the AI in the flat price.
 *
 * Client-safe: pure data, no `server-only` import.
 *
 * NOTE: nothing here talks to Stripe. The price IDs stay null until the owner
 * confirms the live products, so the CTAs just open the app.
 *
 * TODO(owner): confirm the monthly/annual prices and the monthly caps below.
 * These are a proposed launch structure, easy to change in this one file.
 */

import { formatUsd } from "@/lib/pricing";

export { formatUsd };

export type EasyClipperPlanId = "free" | "creator" | "studio";

export type EasyClipperPlan = {
  /** Stable id used as the React key and (later) the plan stored per account. */
  id: EasyClipperPlanId;
  /** Public marketing name shown on the card. */
  name: string;
  /** One line on who it is for. */
  blurb: string;
  /** Published monthly price, whole US dollars. 0 for the free plan. */
  monthlyUsd: number;
  /** Effective monthly price when billed annually, whole US dollars. */
  annualMonthlyUsd: number;
  /**
   * Whether the flat price includes our AI pool. Free is false: that plan
   * runs on the customer's own key, so we surface "bring your own key"
   * instead of the "AI included" badge.
   */
  aiIncluded: boolean;
  /** The single highlighted plan. Exactly one sets this. */
  featured?: boolean;
  /** Marketing feature bullets, in display order. */
  features: string[];
  /** Button label for this plan. */
  cta: string;
  /**
   * Stripe price IDs. TODO(owner): fill these in once the live products exist.
   * Null keeps the CTA pointed at the app instead of a checkout that does not
   * exist yet.
   */
  stripe: {
    monthlyPriceId: string | null;
    annualPriceId: string | null;
  };
};

export const EASY_CLIPPER_PLANS: EasyClipperPlan[] = [
  {
    id: "free",
    name: "Free",
    blurb: "Kick the tires on your own key. Free forever.",
    monthlyUsd: 0,
    annualMonthlyUsd: 0,
    aiIncluded: false,
    features: [
      "60 minutes of video a month",
      "Bring your own key from any major AI provider, or run the sample brain with no key",
      "Vertical 9:16 export with burned-in captions",
      "Titles, descriptions, and hashtags",
      "1080p export with a small SaaSyToad mark",
    ],
    cta: "Start free",
    stripe: { monthlyPriceId: null, annualPriceId: null },
  },
  {
    id: "creator",
    name: "Creator",
    blurb: "For the creator posting every week.",
    monthlyUsd: 19,
    annualMonthlyUsd: 12,
    aiIncluded: true,
    featured: true,
    features: [
      "Everything in Free, plus AI included",
      "300 minutes of video a month",
      "Up to 90 minutes per video",
      "Every aspect ratio: 9:16, 1:1, and 16:9",
      "No watermark, 1080p export",
      "Priority rendering",
      "Bring your own keys to lift the monthly cap",
    ],
    cta: "Choose Creator",
    stripe: { monthlyPriceId: null, annualPriceId: null },
  },
  {
    id: "studio",
    name: "Studio",
    blurb: "For teams and agencies clipping at volume.",
    monthlyUsd: 49,
    annualMonthlyUsd: 32,
    aiIncluded: true,
    features: [
      "Everything in Creator",
      "600 minutes of video a month",
      "Up to 3 hours per video",
      "Up to 4K export",
      "Team seats, brand kit, and saved caption styles",
      "Priority support from a human",
      "Bring your own keys to lift the monthly cap",
    ],
    cta: "Choose Studio",
    stripe: { monthlyPriceId: null, annualPriceId: null },
  },
];

/**
 * Bring-your-own-key support. Easy Clipper reads your own provider keys server
 * side and never sends them to the browser. BYO is the cost valve on paid
 * plans (it lifts the included-minutes cap) and the whole point of the free
 * plan (you pay your own provider, we pay nothing for your models).
 *
 * IMPORTANT (owner): this is the TARGET provider set the marketing copy
 * advertises. The Easy Clipper app (separate repo) today wires Anthropic for
 * the agent brain and OpenAI / AssemblyAI for transcription. The other model
 * providers below must be implemented in the app before this list is fully
 * truthful in production. Keep the list in sync with what the app actually
 * supports, or trim it, before launch.
 */
export const BYO_PROVIDERS = {
  /** Model providers for the agent brain. */
  models: [
    "Claude (Anthropic)",
    "GPT (OpenAI)",
    "Gemini (Google)",
    "Grok (xAI)",
    "Llama (Meta)",
    "DeepSeek",
    "Mistral",
  ],
  /** Transcription providers. */
  transcription: ["Whisper (OpenAI)", "AssemblyAI", "Deepgram"],
};
