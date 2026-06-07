/**
 * SaaSyToad brand constants. The one place for brand values that have to live
 * in JS instead of CSS tokens (inline styles, string-built markup, default
 * values in pickers).
 *
 * Keep BRAND_ACCENT in sync with `--toad-green` in globals.css. Sampled from the
 * final SaaSyToad mascot art (olive-moss toad green).
 */

/** Toad green. Default brand accent for any surface that can't use CSS tokens. */
export const BRAND_ACCENT = "#598A33";

/**
 * Where every "Book a demo" button points. Centralized so the owner swaps one
 * line when the real scheduling link is ready.
 *
 * TODO(owner): replace with the real SaaSyToad scheduling link (Calendly or the
 * in-app /book page) before launch. Placeholder for now.
 */
export const BOOK_A_DEMO_URL = "https://calendly.com/saasytoad/demo";

/**
 * Where the CRM app lives. This marketing site is deployed separately from the
 * app, so the "Log in" links are absolute, cross-site links into the app. Set
 * NEXT_PUBLIC_APP_URL per deploy to the app's domain (for example
 * https://app.saasytoad.com). If it is unset, we fall back to the current app
 * deploy so links still work in development and previews.
 */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") ||
  "https://thebestcrm.vercel.app";

/** The CRM app's log in page. */
export const APP_LOGIN_URL = `${APP_URL}/login`;

/** The product's one-line positioning. Used in marketing copy + metadata. */
export const BRAND_TAGLINE =
  "The honest all-in-one CRM. AI included. No surprise bill.";

/**
 * Where the "Try Easy Clipper" buttons point. Easy Clipper is a separate
 * SaaSyToad product (its own app and repo), so this is its public launch URL.
 *
 * Currently the live Vercel deploy. TODO(owner): swap to the branded
 * clipper.saasytoad.com once that subdomain points at the deploy.
 */
export const EASY_CLIPPER_URL = "https://saasytoadeasyclipper.vercel.app";

/** Easy Clipper's one-line positioning. Used in marketing copy + metadata. */
export const EASY_CLIPPER_TAGLINE =
  "The honest AI video clipper. Keeps the whole story, respects the pacing, holds the framing.";

/**
 * The parent company. SaaSyToadCRM is one of the products SaaSyToad builds
 * and runs. The company also does AI agentic apps, websites, and services.
 */
export const COMPANY_NAME = "SaaSyToad";

/** Company-level one-liner for the saasytoad.com homepage + metadata. */
export const COMPANY_TAGLINE =
  "AI agents, apps, and websites for businesses that want to move fast.";

/** Public company domain. */
export const COMPANY_WEBSITE = "saasytoad.com";

/**
 * The founders. Names are confirmed; roles default to "Co-founder" and bios
 * are short placeholders on purpose, not invented.
 *
 * TODO(owner): replace each role + bio with the real details (and add a
 * headshot path if you want photos instead of initials).
 */
export const FOUNDERS: { name: string; role: string; bio: string }[] = [
  {
    name: "Ronald Strickland",
    role: "Co-founder",
    bio: "More about Ronald coming soon.",
  },
  {
    name: "Joseph Jackson",
    role: "Co-founder",
    bio: "More about Joseph coming soon.",
  },
  {
    name: "Avery Bailey",
    role: "Co-founder",
    bio: "More about Avery coming soon.",
  },
];
