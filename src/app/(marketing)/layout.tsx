import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { BRAND_TAGLINE } from "@/lib/brand";

/**
 * Display face for the marketing surfaces only: Cinzel, an engraved Roman
 * capital with a Victorian, machined-brass character. Self-hosted by next/font
 * (no runtime calls to Google). Exposed as a CSS variable and applied through
 * the `.steampunk` scope so headings here get the engraved look while the app
 * keeps Geist everywhere. We load the lighter weights only.
 */
const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/**
 * Public marketing + legal shell (the company-facing side of the app). The root
 * layout marks the whole app `robots: { index: false }` because the product
 * itself shouldn't be crawled. These pages are the exception: the marketing
 * site and the legal pages are meant to be found, so we flip indexing back on
 * here and add the descriptive + Open Graph metadata Phase 3 deferred.
 *
 * The OG image is generated app-wide by src/app/opengraph-image.tsx, so we
 * don't repeat the image here.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://saasytoad.com"),
  title: {
    default: "SaaSyToadCRM, the honest all-in-one CRM",
    template: "%s · SaaSyToadCRM",
  },
  description: BRAND_TAGLINE + " Built for agencies and small teams who got burned by metered, surprise bills.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "SaaSyToadCRM",
    title: "SaaSyToadCRM, the honest all-in-one CRM",
    description: BRAND_TAGLINE,
    url: "https://saasytoad.com/crm",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaSyToadCRM, the honest all-in-one CRM",
    description: BRAND_TAGLINE,
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`steampunk ${cinzel.variable} relative flex min-h-screen flex-col bg-background`}
    >
      <MarketingNav />
      <main className="relative z-10 flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
