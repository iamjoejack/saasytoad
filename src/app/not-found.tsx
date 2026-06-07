import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface-muted/30 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-5">
        <p className="text-[11px] uppercase tracking-wider text-foreground-subtle font-medium">
          SaaSyToadCRM
        </p>
        <div className="inline-flex size-12 items-center justify-center rounded-xl bg-surface border border-border shadow-sm">
          <Search className="size-5 text-foreground-muted" />
        </div>
        <div className="space-y-1">
          <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="text-[13.5px] text-foreground-muted leading-relaxed">
            The URL doesn&apos;t match any page on this CRM. It may have moved or
            never existed.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-primary hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Back home
        </Link>
      </div>
    </main>
  );
}
