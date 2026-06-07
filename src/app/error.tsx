"use client";
import * as React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Root error boundary. Renders for any uncaught error in a server or
 * client component. Has to be a Client Component per Next.js convention.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Surface to the browser console for inspection; production logs catch
    // the same digest server-side.
    console.error(error);
  }, [error]);

  const looksLikeDbConfig = /DATABASE_URL|Environment variable not found|connect ECONN|prisma/i.test(
    error.message,
  );

  return (
    <main className="min-h-screen bg-surface-muted/30 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-5 text-center">
        <p className="text-[11px] uppercase tracking-wider text-foreground-subtle font-medium">
          SaaSyToadCRM
        </p>
        <div className="inline-flex size-12 items-center justify-center rounded-xl bg-surface border border-border shadow-sm">
          <AlertTriangle className="size-5 text-(--color-danger)" />
        </div>
        <div className="space-y-1">
          <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="text-[13.5px] text-foreground-muted leading-relaxed">
            {looksLikeDbConfig
              ? "The database isn't reachable. If this is a fresh deploy, finish the env-var + prisma db push setup. See DEPLOY.md."
              : "An unexpected error occurred. The team has been notified. Try again in a moment."}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button onClick={reset} variant="secondary" size="sm">
            <RefreshCw className="size-3.5" />
            Try again
          </Button>
        </div>
        {error.digest && (
          <p className="text-[11px] text-foreground-subtle">
            Error ID: <code className="font-mono">{error.digest}</code>
          </p>
        )}
      </div>
    </main>
  );
}
