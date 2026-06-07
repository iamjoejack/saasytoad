"use client";
import * as React from "react";
import {
  TrendingUp,
  Megaphone,
  Workflow,
  Share2,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { SAASYTOADS, type ToadId } from "@/lib/characters";
import { cn } from "@/lib/utils";

const ICON: Record<ToadId, LucideIcon> = {
  ronald: TrendingUp,
  camille: Megaphone,
  dbug: Workflow,
  amanda: Share2,
  sammy: Wand2,
};

/**
 * A toad's portrait, color-coded to that character. Shows the real art at
 * public/characters/<id>.png when it exists, and falls back to the line icon
 * until then. The image is invisible until it actually loads, so a missing
 * file never flashes a broken image. Size and shape come from `className`.
 *
 * TODO(owner): drop square (ideally transparent) PNGs at
 * public/characters/ronald.png, camille.png, dbug.png, amanda.png, sammy.png.
 */
export function ToadAvatar({
  toadId,
  className,
  iconClassName,
}: {
  toadId: ToadId;
  className?: string;
  iconClassName?: string;
}) {
  const toad = SAASYTOADS.find((t) => t.id === toadId) ?? SAASYTOADS[0]!;
  const Icon = ICON[toad.id];
  const [loaded, setLoaded] = React.useState(false);
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    // Catch images already cached before the onLoad handler attached.
    if (ref.current?.complete && ref.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <span
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full",
        className,
      )}
      style={{
        backgroundColor: `color-mix(in oklch, ${toad.accent} 14%, transparent)`,
        color: toad.accent,
      }}
    >
      {!loaded && <Icon className={cn("size-6", iconClassName)} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={`/characters/${toad.id}.png`}
        alt={`${toad.name} Saasytoad`}
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 size-full object-contain transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </span>
  );
}
