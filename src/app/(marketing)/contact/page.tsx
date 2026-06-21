import type { Metadata } from "next";
import { ContactForm, CONTACT_REASONS } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact SaaSyToad",
  description:
    "Tell us what you are trying to do. You will reach a real person, not a ticket queue.",
};

/** Map a ?reason= shortcut (or a full label) to one of the form's reasons. */
function reasonFromParam(raw: string | undefined): string {
  if (!raw) return "Book a demo";
  const shortcuts: Record<string, string> = {
    demo: "Book a demo",
    sales: "Sales question",
    support: "Product support",
    billing: "Billing question",
    partnership: "Partnership",
    press: "Press or media",
  };
  const key = raw.toLowerCase();
  if (shortcuts[key]) return shortcuts[key];
  const exact = CONTACT_REASONS.find((r) => r.toLowerCase() === key);
  return exact ?? "Something else";
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  const defaultReason = reasonFromParam(reason);

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-5">
        <p className="engraved-label text-center">Contact</p>
        <h1 className="mt-2 text-center font-display text-4xl">
          Talk to a real person
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-foreground-muted">
          Tell us what you are trying to do. We will tell you straight whether we
          can help, and what it would take. No card, no ticket queue.
        </p>
        <div className="mt-8">
          <ContactForm defaultReason={defaultReason} />
        </div>
      </div>
    </section>
  );
}
