import * as React from "react";
import {
  LayoutDashboard,
  MessagesSquare,
  Users,
  Kanban,
  CheckSquare,
  Inbox,
  FormInput,
  Settings,
  Sparkles,
  Megaphone,
  CalendarClock,
  BarChart3,
  Receipt,
  Search,
  Plus,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";

/**
 * Presentational replica of the operator app shell (sidebar + topbar), used
 * ONLY to render faithful, on-brand marketing screenshots under /shots without
 * needing auth or a database. Mirrors the real Sidebar/Topbar markup so the
 * captured images match the live, steampunk-restyled app. Not linked anywhere
 * and noindex (the root layout marks the whole app robots:index:false).
 */

const NAV: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string; tone?: "primary" | "danger" }[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/assistant", label: "Ask the crew", icon: MessagesSquare },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/pipelines", label: "Pipelines", icon: Kanban },
  { href: "/marketing", label: "Marketing", icon: Megaphone },
  { href: "/booking", label: "Booking", icon: CalendarClock },
  { href: "/tasks", label: "Tasks", icon: CheckSquare, badge: "3", tone: "danger" },
  { href: "/inbox", label: "Inbox", icon: Inbox, badge: "5", tone: "primary" },
  { href: "/forms", label: "Forms", icon: FormInput },
  { href: "/invoices", label: "Invoices", icon: Receipt },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export function MockShell({
  active,
  workspace = "Northgate Roofing",
  children,
}: {
  active: string;
  workspace?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="steampunk flex h-[820px] w-[1320px] overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="metal-grain flex w-64 shrink-0 flex-col border-r border-border-strong bg-surface/60 backdrop-blur">
        <div className="relative z-10 h-14 flex items-center px-4 border-b border-border-strong">
          <Logo variant="full" markSize={28} />
        </div>
        <nav className="relative z-10 flex-1 overflow-hidden px-3 py-4">
          <ul className="flex flex-col gap-0.5">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = item.href === active;
              return (
                <li key={item.href}>
                  <span
                    className={cn(
                      "group flex items-center gap-2.5 rounded-md px-2.5 h-9 text-[13px] font-medium",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground-muted",
                    )}
                  >
                    <Icon className="size-[18px] shrink-0" />
                    <span className="truncate">{item.label}</span>
                    {item.badge ? (
                      <span
                        className={cn(
                          "ml-auto inline-flex h-4 min-w-4 px-1 items-center justify-center rounded text-[10px] font-semibold",
                          item.tone === "danger"
                            ? "bg-(--color-danger)/15 text-(--color-danger)"
                            : "bg-primary/15 text-primary",
                        )}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wider text-foreground-subtle">
              Workspace
            </p>
            <span className="flex items-center gap-2.5 rounded-md px-2.5 h-9 text-[13px] font-medium text-foreground-muted">
              <Settings className="size-[18px]" />
              <span>Settings</span>
            </span>
          </div>
        </nav>
        <div className="relative z-10 m-3 rounded-lg border border-dashed border-border-strong p-3 text-[12px] text-foreground-muted">
          <div className="flex items-center gap-1.5 text-foreground font-medium mb-1">
            <Sparkles className="size-3.5 text-primary" /> What&apos;s next
          </div>
          Email, SMS, calendar booking, workflows, and invoicing.
        </div>
      </aside>

      {/* Right column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-14 flex items-center gap-2 px-6 border-b border-border-strong glass-strong">
          <button className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface px-2.5 h-8 text-[13px] font-medium text-foreground">
            <span className="inline-flex size-5 items-center justify-center rounded bg-primary/15 text-primary text-[10px] font-bold">
              {workspace.slice(0, 1)}
            </span>
            {workspace}
          </button>
          <div className="ml-1 hidden md:flex items-center gap-2 rounded-md border border-border bg-surface-muted/60 px-2.5 h-8 text-[13px] text-foreground-subtle w-72">
            <Search className="size-3.5" />
            Search contacts, deals, conversations
            <span className="ml-auto rounded border border-border px-1 text-[10px]">
              ⌘K
            </span>
          </div>
          <div className="flex-1" />
          <span className="inline-flex size-8 items-center justify-center rounded-md text-foreground-muted">
            <Bell className="size-[18px]" />
          </span>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-surface px-2.5 h-8 text-[13px] font-medium text-foreground">
            <Plus className="size-4" /> Create
          </button>
          <span className="ml-1 inline-flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary text-[12px] font-semibold">
            JM
          </span>
        </header>

        <main className="flex-1 overflow-hidden px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
