"use client";
import { useState } from "react";
import { Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/brand";

/**
 * Marketing contact form. Posts straight to FormSubmit (this is a static site,
 * no server route), which forwards the message to CONTACT_EMAIL. "Book a demo"
 * buttons land here with the reason preset.
 *
 * One-time setup: the FIRST submission triggers a FormSubmit activation email to
 * saasytoad@gmail.com; click the link once and every submission after delivers.
 */
export const CONTACT_REASONS = [
  "Book a demo",
  "Sales question",
  "Product support",
  "Billing question",
  "Partnership",
  "Press or media",
  "Something else",
] as const;

const fieldClass =
  "h-10 w-full rounded-md border border-border bg-surface px-3 text-[14px] text-foreground";

export function ContactForm({ defaultReason }: { defaultReason: string }) {
  const [reason, setReason] = useState(defaultReason);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if ((data.get("_honey") as string)?.trim()) return; // honeypot

    const payload = {
      name: (data.get("name") as string)?.trim(),
      email: (data.get("email") as string)?.trim(),
      reason,
      message: (data.get("message") as string)?.trim(),
      _subject: `New contact from saasytoad.com: ${reason}`,
      _template: "table",
    };

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      const json = (await res.json().catch(() => null)) as {
        success?: string | boolean;
      } | null;
      const ok = res.ok && (json?.success === "true" || json?.success === true);
      if (ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError("Something went wrong sending that. Try again in a moment.");
      }
    } catch {
      setStatus("error");
      setError("Could not reach the form service. Check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-toad-green/15 text-toad-green">
          <Check className="size-6" />
        </div>
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
          Got it, thanks
        </h2>
        <p className="mt-2 text-foreground-muted">
          Your message is on its way to a real person. We will get back to you
          soon, probably Joe.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[13px] font-medium text-foreground">
            Your name
          </span>
          <input name="name" required maxLength={120} placeholder="Jane Doe" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-[13px] font-medium text-foreground">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="you@business.com"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-[13px] font-medium text-foreground">
          What is this about?
        </span>
        <select
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className={fieldClass}
        >
          {CONTACT_REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        <span className="mb-1 block text-[13px] font-medium text-foreground">
          Message
        </span>
        <textarea
          name="message"
          required
          maxLength={4000}
          rows={5}
          placeholder="Tell us what you are trying to do and we will tell you straight whether we can help."
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-[14px] text-foreground"
        />
      </label>

      {/* Honeypot: hidden from people, bots fill it and get dropped. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {error && <p className="mt-3 text-[13px] text-(--color-danger)">{error}</p>}

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-[12px] text-foreground-subtle">
          Goes straight to {CONTACT_EMAIL}. No bots, a real person reads it.
        </p>
        <Button type="submit" disabled={status === "sending"}>
          <Send className="size-4" />
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
