import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Steampunk motif kit for the marketing surfaces. Everything here is decorative
 * brass-and-circuitry detailing: inline SVG cogs, ornate dividers, machined
 * brass panels, and fine filigree. All purely visual pieces are aria-hidden,
 * and the spinning cog respects prefers-reduced-motion (the .sp-spin class in
 * globals.css turns the animation off under reduce).
 *
 * Shared (no "use client"): pure presentational SVG/markup, safe on the server.
 */

/**
 * A single engraved cog/gear. Sized by `size` (px), tinted by `tone`, and
 * optionally slow-rotating via `spin`. Decorative by default (aria-hidden).
 */
export function Cog({
  size = 48,
  teeth = 12,
  spin,
  className,
  tone = "currentColor",
  style,
}: {
  size?: number;
  teeth?: number;
  spin?: false | "cw" | "ccw";
  className?: string;
  tone?: string;
  style?: React.CSSProperties;
}) {
  // Build the toothed outline procedurally so any tooth count looks even.
  const cx = 50;
  const cy = 50;
  const rOuter = 48;
  const rInner = 39;
  const rHub = 16;
  const toothHalf = (Math.PI / teeth) * 0.46;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const a0 = a - toothHalf;
    const a1 = a + toothHalf;
    const aGap0 = a + toothHalf;
    const aGap1 = a + (Math.PI / teeth) - toothHalf;
    const p = (r: number, ang: number) =>
      `${(cx + r * Math.cos(ang)).toFixed(2)},${(cy + r * Math.sin(ang)).toFixed(2)}`;
    d +=
      (i === 0 ? "M" : "L") +
      `${p(rOuter, a0)} L${p(rOuter, a1)} L${p(rInner, aGap0)} L${p(rInner, aGap1)} `;
  }
  d += "Z";

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn(
        spin === "cw" && "sp-spin",
        spin === "ccw" && "sp-spin-rev",
        className,
      )}
      style={{ color: tone, ...style }}
      fill="none"
    >
      <path
        d={d}
        fill="currentColor"
        fillOpacity={0.16}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <circle
        cx={cx}
        cy={cy}
        r={rHub}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <circle cx={cx} cy={cy} r={5.5} fill="currentColor" fillOpacity={0.5} />
    </svg>
  );
}

/**
 * Ornate section divider: a hairline that fades transparent -> brass ->
 * transparent with a small static cog at its center. Use between major
 * sections to read like an engraved rule.
 */
export function GearDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto flex w-full max-w-xs items-center gap-3 text-(--color-primary)",
        className,
      )}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-(--color-primary)/60" />
      <Cog size={22} teeth={10} tone="var(--sp-brass)" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-(--color-primary)/60" />
    </div>
  );
}

/**
 * Machined brass plate wrapper. Applies the `brass-panel` utility (hairline
 * brass border, lit top edge, inner shadow) and, when `rivets` is on, drops
 * the four corner rivets. Renders a plain <div> by default.
 */
export function BrassPanel({
  className,
  rivets = false,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { rivets?: boolean }) {
  return (
    <div
      className={cn("brass-panel", rivets && "riveted", className)}
      {...rest}
    >
      {rivets && (
        <>
          <span aria-hidden className="rivet-b" />
          <span aria-hidden className="rivet-c" />
        </>
      )}
      {children}
    </div>
  );
}

/**
 * Fine filigree corner flourish. Place inside a relative container and pass a
 * `corner` to anchor + mirror it. Decorative only.
 */
export function FiligreeCorner({
  corner = "tl",
  className,
  size = 92,
}: {
  corner?: "tl" | "tr" | "bl" | "br";
  className?: string;
  size?: number;
}) {
  const flip =
    corner === "tr"
      ? "scaleX(-1)"
      : corner === "bl"
        ? "scaleY(-1)"
        : corner === "br"
          ? "scale(-1,-1)"
          : undefined;
  const pos =
    corner === "tl"
      ? "left-0 top-0"
      : corner === "tr"
        ? "right-0 top-0"
        : corner === "bl"
          ? "left-0 bottom-0"
          : "right-0 bottom-0";
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      className={cn("pointer-events-none absolute text-(--sp-brass)", pos, className)}
      style={{ transform: flip, opacity: 0.7 }}
    >
      <path
        d="M6 6 L34 6 M6 6 L6 34"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <path
        d="M10 10 C 10 30, 30 10, 30 30 C 30 18, 20 22, 16 16"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.85}
      />
      <circle cx="34" cy="6" r="2" fill="currentColor" />
      <circle cx="6" cy="34" r="2" fill="currentColor" />
    </svg>
  );
}
