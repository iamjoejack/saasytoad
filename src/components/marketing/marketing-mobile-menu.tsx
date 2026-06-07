"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { BOOK_A_DEMO_URL } from "@/lib/brand";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/company#products", label: "Products" },
  { href: "/crew", label: "Crew" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

/**
 * Mobile menu for the marketing nav. The desktop link row is `hidden md:flex`,
 * so below md this hamburger is the only way to reach Services / Products /
 * Crew / Pricing / About and the demo CTA. Closes on navigation and on Escape.
 */
export function MarketingMobileMenu() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex size-9 items-center justify-center rounded-md border border-(--border-strong) bg-(--surface)/60 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-ring)"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open ? (
        <>
          <div
            aria-hidden
            className="fixed inset-0 top-16 z-40 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 top-16 z-50 border-b border-(--border-strong) glass-strong">
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-[15px] font-medium text-foreground hover:bg-surface-hover"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href={BOOK_A_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "md" }),
                    "w-full",
                  )}
                >
                  Book a demo
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
