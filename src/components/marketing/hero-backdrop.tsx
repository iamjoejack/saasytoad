import { Cog } from "@/components/marketing/steampunk";

/**
 * Layered steampunk page-hero backdrop. From back to front: a deep iron base
 * with a warm gaslight glow at the top, a faint engraved grid masked toward the
 * edges, two big slow-turning brass cogs set into the corners, and a soft
 * vignette so the frame reads like the inside of a machined housing.
 *
 * Drop it inside a `relative overflow-hidden` section, before the centered
 * content. Everything here is decorative and aria-hidden, and the cog rotation
 * is disabled under prefers-reduced-motion (handled by the .sp-spin class).
 */
export function HeroBackdrop() {
  return (
    <>
      {/* Warm amber gaslight halo at the top. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 46% at 50% -4%, oklch(0.78 0.14 72 / 0.34), transparent 62%)",
        }}
      />
      {/* A second cooler patina glow low-left for depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40% 40% at 8% 92%, oklch(0.62 0.1 152 / 0.18), transparent 60%)",
        }}
      />
      {/* Fine engraved grid, faded toward the edges. */}
      <div
        aria-hidden
        className="circuit-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_62%_60%_at_50%_0%,black,transparent_72%)]"
      />
      {/* Brass cogs set into the housing. Large, low-opacity, slow. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-16 -z-10 text-(--sp-brass)/15"
      >
        <Cog size={300} teeth={16} spin="cw" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-24 -z-10 text-(--sp-copper)/12"
      >
        <Cog size={200} teeth={12} spin="ccw" />
      </div>
      {/* Vignette to seat the content inside the frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, transparent 55%, oklch(0.1 0.015 220 / 0.6) 100%)",
        }}
      />
    </>
  );
}
