import * as React from "react";
import { cn } from "@/lib/utils";
import { ScaledFrame } from "./scaled-frame";
import { MockShell } from "./mock-shell";
import { SCREENS } from "./screens";

/**
 * A live, on-brand preview of a real app screen for the marketing page. Renders
 * the steampunk-restyled app shell (sidebar + topbar + screen) at full design
 * size, scaled to fit its slot, inside a thin window chrome. Replaces the old
 * ScreenshotPlaceholder slots — these stay pixel-crisp at any resolution and
 * never drift from the actual product because they ARE the product's UI.
 */
export function AppPreview({
  screen,
  className,
}: {
  screen: keyof typeof SCREENS | string;
  className?: string;
}) {
  const entry = SCREENS[screen];
  if (!entry) return null;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[oklch(0.5_0.08_78_/_0.5)] bg-[#0b0d10] shadow-[0_18px_40px_-8px_oklch(0_0_0_/_0.7)]",
        className,
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-[oklch(0.5_0.08_78_/_0.35)] bg-[oklch(0.2_0.018_219)] px-3 py-2">
        <span className="size-2.5 rounded-full bg-[oklch(0.6_0.16_25)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.78_0.13_78)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.72_0.12_150)]" />
      </div>
      <ScaledFrame designWidth={1320} designHeight={820}>
        <MockShell active={entry.active}>{entry.render()}</MockShell>
      </ScaledFrame>
    </div>
  );
}
