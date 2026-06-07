import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { BOOK_A_DEMO_URL, APP_LOGIN_URL } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { MarketingMobileMenu } from "./marketing-mobile-menu";

/**
 * Top navigation for the public SaaSyToad marketing + legal pages. The desktop
 * link row is `hidden md:flex`; below md the links move into MarketingMobileMenu
 * (a hamburger), so every destination stays reachable on a phone. The logo and
 * links point at the company site; the CRM is one product under it.
 *
 * "Log in" is an absolute link into the CRM app, which is deployed separately
 * from this marketing site (see APP_LOGIN_URL in @/lib/brand).
 */
export function MarketingNav() {
  return (
    <header className="glass-strong sticky top-0 z-40 border-b border-(--border-strong)">
      {/* Brass rail: a hairline that fades in from the edges, like a polished
          bar across the top of a brass instrument. Decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-(--sp-brass)/70 to-transparent"
      />
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/company"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)"
          aria-label="SaaSyToad home"
        >
          <Logo variant="full" markSize={30} />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Services
          </Link>
          <Link
            href="/company#products"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Products
          </Link>
          <Link
            href="/crew"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Crew
          </Link>
          <Link
            href="/pricing"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={APP_LOGIN_URL}
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Log in
          </a>
          <a
            href={BOOK_A_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            Book a demo
          </a>
          <MarketingMobileMenu />
        </div>
      </nav>
    </header>
  );
}
