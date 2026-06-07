import type { Metadata } from "next";
import { BOOK_A_DEMO_URL } from "@/lib/brand";
import { buttonVariants } from "@/components/ui/button";
import { PricingTiers } from "@/components/marketing/pricing-tiers";
import { cn } from "@/lib/utils";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import {
  BrassPanel,
  Cog,
  GearDivider,
  FiligreeCorner,
} from "@/components/marketing/steampunk";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat monthly pricing with the AI included on every plan. No metered texts, no surprise overage bill.",
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is the AI really included?",
    a: "Yes, on every plan. The receptionist, the agents, the writing help, all of it. There's no separate AI add-on and no per-message AI metering. That's the whole point of the brand.",
  },
  {
    q: "Do you charge per text or per email?",
    a: "The software and the AI are flat. If you connect your own Twilio or email provider, you pay that provider directly at their rates and we don't mark it up. So the part you pay us never swings with your volume.",
  },
  {
    q: "What counts as fair use?",
    a: "We set generous limits sized for real shops, not bait numbers. If you ever push past them we'll have a conversation, not quietly slap an overage on your card.",
  },
  {
    q: "Can I switch from another all-in-one?",
    a: "Yep. We'll help you bring your contacts across and rebuild your automations so you're not starting cold. Book a demo and we'll scope the move with you.",
  },
  {
    q: "Monthly or annual?",
    a: "Either. Annual billing saves you roughly two months versus paying month to month. No long lock-in on monthly.",
  },
  {
    q: "What's this Founder pricing?",
    a: "Founding customers lock in launch pricing for as long as they stay. We're early and we'd rather reward the people who took the bet. Ask about it on the call.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroBackdrop />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-28">
          <p className="engraved-label justify-center">Flat pricing</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
            One price. AI included. No surprise bill.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Pick a tier and that&apos;s the number on your card every month. The
            AI is already in it, and there&apos;s no metered add-on waiting for
            you at the end of the month.
          </p>
          <GearDivider className="mt-9" />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <PricingTiers className="mt-2" />
      </div>

      <section className="relative py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="engraved-label justify-center">Q and A</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Questions people actually ask
            </h2>
            <GearDivider className="mt-6" />
          </div>
          <BrassPanel className="mt-8 px-2">
            <dl className="divide-y divide-(--border)">
              {FAQ.map((item) => (
                <div key={item.q} className="px-5 py-5">
                  <dt className="text-base font-medium text-foreground">
                    {item.q}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-foreground-muted">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </BrassPanel>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-(--border-strong) bg-(--sp-iron-deep) py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 120%, oklch(0.78 0.14 72 / 0.28), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 text-(--sp-brass)/10"
        >
          <Cog size={220} teeth={14} spin="cw" />
        </div>
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <BrassPanel className="relative overflow-hidden px-8 py-12 sm:px-12">
            <FiligreeCorner corner="tl" />
            <FiligreeCorner corner="tr" />
            <FiligreeCorner corner="bl" />
            <FiligreeCorner corner="br" />
            <p className="engraved-label justify-center">No pressure</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
              Still weighing it up?
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-foreground-muted">
              Book a demo and we&apos;ll run your numbers next to what you pay
              now. If it doesn&apos;t save you money or headaches, we&apos;ll
              say so.
            </p>
            <div className="mt-7 flex justify-center">
              <a
                href={BOOK_A_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                Book a demo
              </a>
            </div>
          </BrassPanel>
        </div>
      </section>
    </>
  );
}
