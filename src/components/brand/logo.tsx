import { cn } from "@/lib/utils";

/** Single source of truth for the logo art files. */
export const LOGO_SRC = "/brand/saasytoad-logo.png";
export const LOGO_FULL_SRC = "/brand/saasytoad-logo-full.png"; // Full horizontal logo with wordmark

/**
 * The one SaaSyToadCRM logo. Swap the underlying files and this component
 * and the logo updates everywhere: sidebar, auth, marketing nav, footer.
 * Supports a "mark" variant (square toad head) and a "full" variant (horizontal mascot + wordmark).
 *
 * Shared component (no "use client"): safe to render from server or client trees.
 */
export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark,
  wordmark = "SaaSyToadCRM",
  markSize = 28,
  variant = "mark",
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
  wordmark?: string;
  markSize?: number;
  variant?: "mark" | "full";
}) {
  const isFull = variant === "full";
  const finalShowWordmark = showWordmark ?? !isFull;
  const height = markSize;
  const width = isFull ? Math.round(markSize * 4.421) : markSize;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static brand PNG, no optimization needed */}
      <img
        src={isFull ? LOGO_FULL_SRC : LOGO_SRC}
        alt="SaaSyToad"
        width={width}
        height={height}
        style={{ width, height }}
        className={cn("select-none", !isFull && "rounded-md shadow-xs", markClassName)}
        draggable={false}
      />
      {finalShowWordmark && (
        <span
          className={cn(
            "text-[14px] font-semibold tracking-tight text-foreground",
            wordmarkClassName,
          )}
        >
          {wordmark}
        </span>
      )}
    </span>
  );
}

