"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Renders a fixed design-sized child (e.g. a 1320x820 app mock) scaled down to
 * fit its responsive container width, preserving aspect ratio. Used to drop
 * full-fidelity product previews into marketing slots without exporting static
 * images. The wrapper reserves height via aspect-ratio so there's no layout
 * shift before the scale is measured.
 */
export function ScaledFrame({
  designWidth,
  designHeight,
  className,
  children,
}: {
  designWidth: number;
  designHeight: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / designWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: `${designWidth} / ${designHeight}` }}
    >
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          opacity: scale ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
