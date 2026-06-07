import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initials(name: string | null | undefined, max = 2): string {
  if (!name) return "";
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, max);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("");
}

export function formatCurrency(
  amount: number | string | null | undefined,
  currency = "USD",
  opts: Intl.NumberFormatOptions = {},
): string {
  if (amount == null) return "—";
  const n = typeof amount === "string" ? Number(amount) : amount;
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
    ...opts,
  }).format(n);
}

export function formatCompactNumber(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function pluralize(n: number, singular: string, plural?: string) {
  return n === 1 ? singular : (plural ?? singular + "s");
}

export function safeRedirectPath(path: string | null | undefined): string {
  // Only allow internal redirects to prevent open-redirect attacks.
  if (!path) return "/dashboard";
  if (!path.startsWith("/") || path.startsWith("//")) return "/dashboard";
  return path;
}

export function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n - 1).trimEnd() + "…";
}
