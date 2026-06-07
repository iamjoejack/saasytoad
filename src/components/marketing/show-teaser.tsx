import { Play, Clapperboard } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SHOW } from "@/lib/characters";
import { cn } from "@/lib/utils";

/**
 * Homepage teaser for the SaaSyToads animated series. Links to the YouTube
 * episode when SHOW.youtubeUrl is set, otherwise shows a "coming soon" state
 * so there's never a dead link. The thumbnail is a branded placeholder until
 * a real still or embed goes in.
 */
export function ShowTeaser() {
  const live = SHOW.youtubeUrl.length > 0;

  const thumbnail = (
    <div className="brass-panel relative aspect-video w-full overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, oklch(0.3 0.05 70 / 0.6), transparent 60%), linear-gradient(135deg, oklch(0.22 0.03 200) 0%, oklch(0.14 0.016 220) 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-(--sp-brass) text-(--sp-iron-deep) shadow-lg ring-2 ring-(--sp-brass-bright)/50 transition-transform group-hover:scale-105">
          <Play className="size-7 translate-x-0.5 fill-current" />
        </span>
      </div>
      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-(--border-strong) bg-black/50 px-2.5 py-1 text-xs font-medium text-(--sp-parchment) backdrop-blur">
        <Clapperboard className="size-3.5" />
        {live ? "Watch now" : "Coming soon"}
      </span>
    </div>
  );

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="engraved-label">
              <span className="size-1.5 rounded-full bg-(--sp-amber) shadow-[0_0_8px_var(--sp-amber)]" />
              {SHOW.status}
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
              {SHOW.title}
            </h2>
            <p className="mt-3 text-foreground-muted">{SHOW.blurb}</p>
            <div className="mt-6">
              {live ? (
                <a
                  href={SHOW.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
                >
                  <Play className="size-4 fill-current" />
                  Watch Episode 1
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground-muted">
                  <Clapperboard className="size-4" />
                  Premiering soon on YouTube
                </span>
              )}
            </div>
          </div>

          {live ? (
            <a
              href={SHOW.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              aria-label={`Watch ${SHOW.title} on YouTube`}
            >
              {thumbnail}
            </a>
          ) : (
            <div className="group">{thumbnail}</div>
          )}
        </div>
      </div>
    </section>
  );
}
