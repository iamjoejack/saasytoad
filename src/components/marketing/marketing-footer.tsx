import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { BOOK_A_DEMO_URL, COMPANY_TAGLINE, APP_LOGIN_URL } from "@/lib/brand";
import { Cog } from "@/components/marketing/steampunk";

/**
 * Public footer for marketing + legal pages. Holds the legal links the brief
 * requires (/security, /terms, /privacy), the login link, and the brand
 * positioning line. Plain links only, so this stays a server component.
 *
 * "Log in" is an absolute link into the CRM app, which is deployed separately
 * from this marketing site (see APP_LOGIN_URL in @/lib/brand).
 */
export function MarketingFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 mt-24 overflow-hidden border-t border-(--border-strong) bg-(--sp-iron-deep)">
      {/* Brass rail across the top edge + a faint pair of gears in the far
          corner, like the back plate of the machine. Decorative. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-(--sp-brass)/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-8 text-(--sp-brass)/10"
      >
        <Cog size={180} teeth={14} spin="cw" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo variant="full" markSize={34} />
            <p className="mt-3 text-sm text-foreground-muted">
              {COMPANY_TAGLINE}
            </p>
            <p className="mt-4 text-sm font-medium text-foreground">
              Honest software for small businesses.
            </p>
          </div>

          <FooterColumn title="Products">
            <FooterLink href="/crm">SaaSyToadCRM</FooterLink>
            <FooterLink href="/easy-clipper">Easy Clipper</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href="/company">Home</FooterLink>
            <FooterLink href="/services">Services</FooterLink>
            <FooterLink href="/crew">The crew</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/security">Security</FooterLink>
            <FooterExternal href={BOOK_A_DEMO_URL}>Book a demo</FooterExternal>
          </FooterColumn>

          <FooterColumn title="Legal & access">
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <li>
              <a
                href={APP_LOGIN_URL}
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                Log in
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} SaaSyToad. All rights reserved.</p>
          <p>
            Built for small businesses tired of overpaying for clunky software.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="engraved-label">{title}</h3>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-foreground-muted transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterExternal({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-foreground-muted transition-colors hover:text-foreground"
      >
        {children}
      </a>
    </li>
  );
}
