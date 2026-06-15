import * as React from "react";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MessageSquare,
  MessageCircle,
  TrendingUp,
  Users,
  CheckSquare,
  Sparkles,
  Bot,
  PhoneCall,
  CalendarCheck,
  Workflow as WorkflowIcon,
  Clock,
  Building2,
  Globe,
  Palette,
  Play,
  Zap,
  Check,
  Folder,
  Terminal,
  Settings,
  FileCode,
  Send,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ---------- shared bits ---------- */

function Stat({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-foreground-subtle">
          {label}
        </span>
        <Icon className="size-4 text-primary" />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-[26px] font-semibold tracking-tight text-foreground">
          {value}
        </span>
        {delta ? (
          <span className="inline-flex items-center gap-0.5 text-[12px] font-medium text-(--color-success)">
            <ArrowUpRight className="size-3" />
            {delta}
          </span>
        ) : null}
      </div>
    </Card>
  );
}

function ChannelIcon({ channel, className }: { channel: string; className?: string }) {
  const map: Record<string, React.ComponentType<{ className?: string }>> = {
    sms: MessageSquare,
    email: Mail,
    ig: MessageCircle,
    call: Phone,
  };
  const Icon = map[channel] ?? MessageSquare;
  return <Icon className={className} />;
}

/* ---------- 1. Dashboard (hero) ---------- */

export function DashboardScreen() {
  const stale = [
    { name: "Maple Street reroof", who: "Dana Whitfield", value: "$18,400", days: 16, stage: "Proposal sent" },
    { name: "Commercial flat-roof bid", who: "Ridgeline Property Mgmt", value: "$62,000", days: 21, stage: "Negotiation" },
    { name: "Storm damage, Oakwood", who: "Marcus Bell", value: "$9,250", days: 14, stage: "Inspection booked" },
  ];
  const activity = [
    { icon: Phone, text: "AI receptionist booked an inspection for Marcus Bell", time: "12m ago", tone: "primary" },
    { icon: Mail, text: "Re-engagement agent emailed 8 cold leads", time: "1h ago", tone: "muted" },
    { icon: CheckSquare, text: "Dana Whitfield signed the Maple Street proposal", time: "2h ago", tone: "success" },
    { icon: MessageSquare, text: "New SMS from (704) 555-0182, missed-call text-back sent", time: "3h ago", tone: "muted" },
    { icon: Users, text: "Lead enrichment filled in 5 new contacts from the website form", time: "5h ago", tone: "muted" },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
            Good morning, Joe
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Here&apos;s what the shop looks like today.
          </p>
        </div>
        <Badge variant="primary" className="gap-1">
          <Sparkles className="size-3" /> AI included on this plan
        </Badge>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Stat label="Open pipeline" value="$248,500" delta="12%" icon={TrendingUp} />
        <Stat label="Win rate (90d)" value="34%" delta="4 pts" icon={CheckSquare} />
        <Stat label="New leads (7d)" value="23" delta="9" icon={Users} />
        <Stat label="Tasks due today" value="7" icon={Clock} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Needs attention</CardTitle>
            <span className="text-[12px] text-foreground-subtle">
              Deals untouched for 14+ days
            </span>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border">
              {stale.map((d) => (
                <li key={d.name} className="flex items-center gap-3 py-2.5">
                  <span className="inline-flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <TrendingUp className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-medium text-foreground truncate">
                      {d.name}
                    </p>
                    <p className="text-[12px] text-foreground-subtle truncate">
                      {d.who} · {d.stage}
                    </p>
                  </div>
                  <span className="text-[13px] font-semibold text-foreground">
                    {d.value}
                  </span>
                  <Badge variant="danger" className="ml-1">
                    {d.days}d
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {activity.map((a, i) => {
                const Icon = a.icon;
                return (
                  <li key={i} className="flex gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full",
                        a.tone === "primary"
                          ? "bg-primary/15 text-primary"
                          : a.tone === "success"
                            ? "bg-(--color-success)/15 text-(--color-success)"
                            : "bg-surface-muted text-foreground-subtle",
                      )}
                    >
                      <Icon className="size-3" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] leading-snug text-foreground">
                        {a.text}
                      </p>
                      <p className="text-[11px] text-foreground-subtle">{a.time}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ---------- 2. Unified inbox ---------- */

export function InboxScreen() {
  const convos = [
    { name: "Marcus Bell", channel: "sms", preview: "Sounds good, see you Thursday at 9.", time: "12m", unread: true },
    { name: "Dana Whitfield", channel: "email", preview: "Re: Maple Street proposal, signed and attached.", time: "1h", unread: true },
    { name: "@ridgeline.pm", channel: "ig", preview: "Can you quote a 12,000 sq ft flat roof?", time: "2h", unread: false },
    { name: "Priya Nadeem", channel: "sms", preview: "Do you handle gutter guards too?", time: "4h", unread: false },
    { name: "Greg Halvorsen", channel: "email", preview: "Thanks for the fast turnaround.", time: "Yesterday", unread: false },
  ];
  const thread = [
    { from: "them", text: "Hi, my roof started leaking after the storm last night. Can someone come look?", time: "9:02 AM" },
    { from: "us", text: "So sorry to hear that, Marcus. We can get an inspector out tomorrow morning. Does 9am work?", time: "9:05 AM" },
    { from: "them", text: "Sounds good, see you Thursday at 9.", time: "9:07 AM" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">Inbox</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Calls, texts, email, and DMs in one thread, tied to the right contact.
        </p>
      </div>
      <div className="grid grid-cols-[320px_1fr] gap-4 h-[600px]">
        <Card className="overflow-hidden">
          <ul className="divide-y divide-border">
            {convos.map((c) => (
              <li
                key={c.name}
                className={cn(
                  "flex gap-3 p-3",
                  c.unread && "bg-primary/[0.06]",
                )}
              >
                <span className="relative mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-foreground-muted">
                  <ChannelIcon channel={c.channel} className="size-4" />
                  {c.unread && (
                    <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-primary ring-2 ring-surface" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-foreground truncate">
                      {c.name}
                    </p>
                    <span className="text-[11px] text-foreground-subtle">{c.time}</span>
                  </div>
                  <p className="text-[12px] text-foreground-muted truncate">
                    {c.preview}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border p-3.5">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary text-[12px] font-semibold">
              MB
            </span>
            <div className="flex-1">
              <p className="text-[13.5px] font-medium text-foreground">Marcus Bell</p>
              <p className="text-[11.5px] text-foreground-subtle flex items-center gap-1">
                <MessageSquare className="size-3" /> SMS · (704) 555-0182
              </p>
            </div>
            <Badge variant="success">Consented</Badge>
          </div>
          <div className="flex-1 space-y-3 p-4">
            {thread.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.from === "us" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug",
                    m.from === "us"
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-muted text-foreground",
                  )}
                >
                  {m.text}
                  <div
                    className={cn(
                      "mt-1 text-[10px]",
                      m.from === "us" ? "text-primary-foreground/70" : "text-foreground-subtle",
                    )}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-lg border border-border-strong bg-surface-muted/50 px-3 py-2">
              <Badge variant="outline" className="gap-1">
                <MessageSquare className="size-3" /> SMS
              </Badge>
              <span className="flex-1 text-[13px] text-foreground-subtle">
                Type a reply, or let an agent draft it…
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-[12px] font-medium text-primary-foreground">
                Send
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------- 3. AI receptionist & booking ---------- */

export function ReceptionistScreen() {
  const transcript = [
    { who: "ai", text: "Thanks for calling Northgate Roofing, this is the front desk. How can I help?" },
    { who: "caller", text: "Hi, I think I've got some storm damage on my roof and need someone to take a look." },
    { who: "ai", text: "I can set that up. What's the property address?" },
    { who: "caller", text: "418 Oakwood Lane." },
    { who: "ai", text: "Got it. We have Thursday at 9am or Friday at 1pm open for an inspection. Which works?" },
    { who: "caller", text: "Thursday at 9 is perfect." },
    { who: "ai", text: "Booked. You'll get a text confirmation and a reminder the morning of. Anything else?" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
          AI receptionist
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          It answers the phone, handles the common questions, and books straight into your calendar.
        </p>
      </div>
      <div className="grid grid-cols-[1fr_360px] gap-4">
        <Card className="overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border p-3.5">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
              <PhoneCall className="size-4" />
            </span>
            <div className="flex-1">
              <p className="text-[13.5px] font-medium text-foreground">
                Live call · (704) 555-0147
              </p>
              <p className="text-[11.5px] text-foreground-subtle">
                Inbound · 1m 48s · transcribing
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-(--color-success)">
              <span className="size-2 rounded-full bg-(--color-success) animate-pulse" />
              On the line
            </span>
          </div>
          <CardContent className="space-y-3 p-4">
            {transcript.map((t, i) => (
              <div key={i} className="flex gap-2.5">
                <span
                  className={cn(
                    "mt-0.5 inline-flex h-5 shrink-0 items-center rounded px-1.5 text-[10px] font-semibold uppercase tracking-wide",
                    t.who === "ai"
                      ? "bg-primary/15 text-primary"
                      : "bg-surface-muted text-foreground-subtle",
                  )}
                >
                  {t.who === "ai" ? "AI" : "Caller"}
                </span>
                <p className="text-[13px] leading-snug text-foreground">{t.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-(--color-success)/40 bg-(--color-success)/[0.06]">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-(--color-success)">
                <CalendarCheck className="size-4" />
                <span className="text-[13px] font-semibold">Inspection booked</span>
              </div>
              <div className="mt-3 space-y-1.5 text-[13px]">
                <p className="font-medium text-foreground">Storm damage inspection</p>
                <p className="text-foreground-muted">Thursday, June 11 · 9:00 AM</p>
                <p className="text-foreground-muted">418 Oakwood Lane</p>
                <p className="text-foreground-subtle text-[12px]">
                  Synced to Google Calendar · confirmation texted
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-[12px] font-medium text-foreground-subtle">
                If a call is missed
              </p>
              <p className="mt-1.5 text-[13px] text-foreground">
                The caller gets an automatic text back before they ring the next shop:
              </p>
              <div className="mt-2 rounded-lg bg-surface-muted px-3 py-2 text-[12.5px] text-foreground-muted">
                &ldquo;Sorry we missed you. This is Northgate Roofing, how can we help? Reply here and we&apos;ll get right back to you.&rdquo;
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. AI agents ---------- */

export function AgentsScreen() {
  const agents = [
    { name: "Lead enrichment", desc: "Fills in new leads from their email + site", last: "8m ago" },
    { name: "Re-engagement", desc: "Wins back contacts who went quiet", last: "1h ago" },
    { name: "Daily digest", desc: "Morning summary of what needs you", last: "Today, 7:00 AM" },
    { name: "Form triage", desc: "Sorts and routes inbound form fills", last: "22m ago" },
    { name: "Pipeline coach", desc: "Flags stalled deals and next steps", last: "3h ago" },
    { name: "Content repurposer", desc: "Turns one post into many", last: "Yesterday" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
            AI agents
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            The busywork on autopilot. Included on every plan, never metered.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-[13px] font-medium text-primary-foreground">
          <Play className="size-3.5" /> Run all agents now
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {agents.map((a) => (
          <Card key={a.name} className="p-4">
            <div className="flex items-start justify-between">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bot className="size-4" />
              </span>
              {/* on switch */}
              <span className="inline-flex h-5 w-9 items-center rounded-full bg-primary px-0.5">
                <span className="ml-auto size-4 rounded-full bg-primary-foreground" />
              </span>
            </div>
            <p className="mt-3 text-[14px] font-semibold text-foreground">{a.name}</p>
            <p className="mt-0.5 text-[12.5px] leading-snug text-foreground-muted">
              {a.desc}
            </p>
            <p className="mt-3 flex items-center gap-1 text-[11.5px] text-foreground-subtle">
              <Clock className="size-3" /> Last run {a.last}
            </p>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent runs</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="divide-y divide-border text-[12.5px]">
            {[
              { a: "Daily digest", r: "Summarized 12 deals, 7 tasks, 3 new leads", t: "7:00 AM", ok: true },
              { a: "Lead enrichment", r: "Enriched 5 contacts from the contact form", t: "8:12 AM", ok: true },
              { a: "Pipeline coach", r: "Flagged 3 stalled deals, drafted next steps", t: "9:40 AM", ok: true },
            ].map((row, i) => (
              <li key={i} className="flex items-center gap-3 py-2.5">
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-(--color-success)/15 text-(--color-success)">
                  <Check className="size-3" />
                </span>
                <span className="font-medium text-foreground w-36 shrink-0">{row.a}</span>
                <span className="flex-1 text-foreground-muted truncate">{row.r}</span>
                <span className="text-foreground-subtle">{row.t}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- 5. Workspaces (white-label) ---------- */

export function WorkspacesScreen() {
  const clients = [
    { name: "Northgate Roofing", plan: "Pro", members: 4, domain: "crm.northgateroofing.com" },
    { name: "Bayline Plumbing", plan: "Solo", members: 1, domain: "app.baylineplumbing.com" },
    { name: "Verde Landscaping", plan: "Pro", members: 3, domain: "portal.verdescapes.com" },
    { name: "Apex Pest Control", plan: "Agency", members: 6, domain: "go.apexpest.com" },
  ];
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
          Workspaces
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Every client in one login, each white-labeled with their own brand and domain.
        </p>
      </div>
      <div className="grid grid-cols-[1fr_360px] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Client workspaces</CardTitle>
            <span className="text-[12px] text-foreground-subtle">4 active</span>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="divide-y divide-border">
              {clients.map((c) => (
                <li key={c.name} className="flex items-center gap-3 py-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary text-[13px] font-semibold">
                    {c.name.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-medium text-foreground">{c.name}</p>
                    <p className="text-[12px] text-foreground-subtle flex items-center gap-1">
                      <Globe className="size-3" /> {c.domain}
                    </p>
                  </div>
                  <Badge variant={c.plan === "Agency" ? "primary" : "neutral"}>
                    {c.plan}
                  </Badge>
                  <span className="text-[12px] text-foreground-subtle w-20 text-right">
                    {c.members} {c.members === 1 ? "seat" : "seats"}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="size-4 text-primary" /> White-label branding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div>
              <p className="text-[12px] font-medium text-foreground-subtle mb-1.5">Logo</p>
              <div className="flex items-center gap-2 rounded-lg border border-border-strong bg-surface-muted/50 px-3 py-2.5">
                <span className="inline-flex size-7 items-center justify-center rounded bg-primary/15 text-primary">
                  <Building2 className="size-4" />
                </span>
                <span className="text-[13px] text-foreground">northgate-logo.svg</span>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-medium text-foreground-subtle mb-1.5">Brand color</p>
              <div className="flex items-center gap-2">
                <span className="size-7 rounded-md bg-(--color-stage-1) ring-1 ring-border-strong" />
                <span className="text-[13px] font-mono text-foreground">#2F6BD6</span>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-medium text-foreground-subtle mb-1.5">Custom domain</p>
              <div className="flex items-center gap-2 rounded-lg border border-border-strong bg-surface-muted/50 px-3 py-2.5">
                <Globe className="size-4 text-foreground-subtle" />
                <span className="text-[13px] font-mono text-foreground">crm.northgateroofing.com</span>
                <Badge variant="success" className="ml-auto">Verified</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ---------- 6. Workflow builder ---------- */

function Node({
  icon: Icon,
  title,
  sub,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
  tone?: "default" | "trigger" | "wait";
}) {
  return (
    <div
      className={cn(
        "w-60 rounded-xl border bg-surface p-3.5 shadow-md",
        tone === "trigger"
          ? "border-primary/50"
          : tone === "wait"
            ? "border-(--color-warning)/40"
            : "border-border-strong",
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-lg",
            tone === "trigger"
              ? "bg-primary/15 text-primary"
              : tone === "wait"
                ? "bg-(--color-warning)/15 text-(--color-warning)"
                : "bg-surface-muted text-foreground-muted",
          )}
        >
          <Icon className="size-4" />
        </span>
        <div>
          <p className="text-[13px] font-semibold text-foreground">{title}</p>
          <p className="text-[11.5px] text-foreground-subtle">{sub}</p>
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center">
      <span className="h-6 w-px bg-border-strong" />
    </div>
  );
}

export function WorkflowScreen() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
          Workflow builder
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Build it once and let it run. Triggers, waits, and steps that actually close.
        </p>
      </div>
      <Card className="circuit-grid overflow-hidden">
        <CardContent className="flex flex-col items-center py-8">
          <Node icon={WorkflowIcon} title="Form submitted" sub="Trigger · Roof inspection request" tone="trigger" />
          <Connector />
          <Node icon={Zap} title="Enrich + create contact" sub="Lead enrichment agent" />
          <Connector />
          <Node icon={MessageSquare} title="Send SMS" sub="“Thanks! When works for a quick look?”" />
          <Connector />
          <Node icon={Clock} title="Wait 1 day" sub="If no reply" tone="wait" />
          <Connector />
          <Node icon={PhoneCall} title="Notify owner + assign task" sub="Follow up by phone" />
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- 7. Forge Editor Screen ---------- */

export function ForgeEditorScreen() {
  return (
    <div className="grid h-[820px] grid-rows-[auto_1fr] bg-[#0c0c0e] text-zinc-200 font-sans select-none text-left">
      {/* IDE Topbar */}
      <header className="flex items-center gap-3 border-b border-white/5 px-4 py-3 bg-[#0f0f12] h-14">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐸</span>
          <span className="text-sm font-semibold tracking-tight text-white font-cinzel">Forge</span>
        </div>
        <span className="text-zinc-700">/</span>
        <span className="text-xs text-zinc-400">workspaces</span>
        <span className="text-zinc-700">/</span>
        <span className="font-mono text-[10px] text-[var(--sp-brass-bright)]">toad-forge-sandbox</span>
        <span className="text-zinc-800 font-light mx-1">|</span>
        <div className="flex items-center gap-1">
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map((item) => (
            <span key={item} className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-200">
              {item}
            </span>
          ))}
        </div>
        <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1 border border-white/5 px-2 py-0.5 rounded bg-white/[0.02]">
          ⚙️ Steampunk UI
        </span>
        <span className="text-zinc-850">|</span>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#b5a642] text-black">
          🚀 Deploy App
        </span>
        <span className="text-zinc-850">|</span>
        <span className="text-xs text-zinc-400">settings</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          sandbox live
        </span>
      </header>

      {/* Main Grid */}
      <div className="grid min-h-0 grid-cols-[240px_1fr_360px] h-[764px]">
        {/* Left Sidebar: File Tree */}
        <aside className="border-r border-white/5 bg-[#0c0c0e] flex flex-col p-4 space-y-4">
          <div className="flex border-b border-white/5 pb-2 text-xs font-semibold text-white uppercase tracking-wider">
            📁 Files
          </div>
          <div className="space-y-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2 text-zinc-200 bg-white/[0.04] p-1 rounded border border-white/5">
              <FileCode className="size-4 text-[#b5a642]" />
              <span className="font-mono">src/App.tsx</span>
            </div>
            <div className="flex items-center gap-2 p-1 pl-4">
              <FileCode className="size-4" />
              <span className="font-mono text-zinc-500">src/index.css</span>
            </div>
            <div className="flex items-center gap-2 p-1 pl-4">
              <Folder className="size-4 text-zinc-650" />
              <span className="font-mono text-zinc-500">public/</span>
            </div>
            <div className="flex items-center gap-2 p-1">
              <FileCode className="size-4" />
              <span className="font-mono text-zinc-500">package.json</span>
            </div>
            <div className="flex items-center gap-2 p-1">
              <FileCode className="size-4" />
              <span className="font-mono text-zinc-500">vite.config.ts</span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5">
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Sandboxes</span>
            <div className="mt-2 p-2 bg-black/40 rounded border border-white/5 text-[11px]">
              <div className="text-zinc-400">Compute usage: 12%</div>
              <div className="w-full bg-zinc-800 h-1.5 rounded mt-1 overflow-hidden">
                <div className="bg-[#b5a642] h-full w-[12%]" />
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Editor + Console */}
        <section className="grid grid-rows-[1fr_220px] bg-[#0d0d0f] border-r border-white/5 min-h-0">
          {/* Monaco Editor Pane */}
          <div className="p-6 font-mono text-xs text-zinc-300 relative overflow-hidden flex flex-col min-h-0">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-4">
              <span className="text-[#b5a642] border-b border-[#b5a642] pb-2 -mb-2 font-sans font-semibold">src/App.tsx</span>
            </div>
            <div className="flex-1 space-y-1 text-zinc-400 overflow-y-auto">
              <div><span className="text-indigo-400">import</span> React, &#123; useState &#125; <span className="text-indigo-400">from</span> <span className="text-emerald-400">&apos;react&apos;</span>;</div>
              <div><span className="text-indigo-400">import</span> &#123; Sparkles, Bot &#125; <span className="text-indigo-400">from</span> <span className="text-emerald-400">&apos;lucide-react&apos;</span>;</div>
              <div className="text-zinc-700">// Complete development workspace loaded in E2B Container</div>
              <div><span className="text-indigo-400">export default function</span> <span className="text-amber-400">App</span>() &#123;</div>
              <div className="pl-4">const [count, setCount] = <span className="text-amber-400">useState</span>(<span className="text-orange-400">0</span>);</div>
              <div className="pl-4"><span className="text-indigo-400">return</span> (</div>
              <div className="pl-8 text-zinc-350">&lt;<span className="text-cyan-400">div</span> <span className="text-yellow-400">className</span>=<span className="text-emerald-400">&quot;flex flex-col min-h-screen bg-neutral-950&quot;</span>&gt;</div>
              <div className="pl-12 text-zinc-350">&lt;<span className="text-cyan-400">header</span> <span className="text-yellow-400">className</span>=<span className="text-emerald-400">&quot;border-b border-white/10 p-4&quot;</span>&gt;</div>
              <div className="pl-16 text-zinc-350">&lt;<span className="text-cyan-400">h1</span> <span className="text-yellow-400">className</span>=<span className="text-emerald-400">&quot;text-white font-bold&quot;</span>&gt;My Awesome Website&lt;/<span className="text-cyan-400">h1</span>&gt;</div>
              <div className="pl-12 text-zinc-350">&lt;/<span className="text-cyan-400">header</span>&gt;</div>
              <div className="pl-8 text-zinc-350">&lt;/<span className="text-cyan-400">div</span>&gt;</div>
              <div className="pl-4">);</div>
              <div>&#125;</div>
            </div>
            <div className="absolute right-4 bottom-4 p-2 bg-black/80 rounded border border-white/5 text-[10px] text-zinc-550">
              UTF-8 · TSX · Monaco Editor
            </div>
          </div>

          {/* Bottom Terminal Console */}
          <div className="border-t border-white/5 bg-[#08080a] p-4 flex flex-col justify-between font-mono text-[11px] h-[220px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-2 text-zinc-650 font-sans">
              <span className="flex items-center gap-1.5"><Terminal className="size-3.5" /> Terminal Logs</span>
              <span>12:30:15</span>
            </div>
            <div className="flex-1 space-y-1 text-emerald-400">
              <div>vite v5.2.11 dev server running...</div>
              <div>➜  Local:   <span className="underline">http://localhost:5173/</span></div>
              <div className="text-zinc-500">[vite] hot module replacement enabled</div>
              <div className="text-zinc-500">[vite] watching for file changes in src/App.tsx</div>
            </div>
          </div>
        </section>

        {/* Right: Agent Panel */}
        <aside className="bg-[#0b0b0d] flex flex-col p-4 justify-between min-h-0">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2">
              <span className="text-lg">🐸</span>
              <div>
                <div className="text-xs font-semibold text-white">Ask Ronald</div>
                <div className="text-[10px] text-zinc-500 font-mono">Agent Coder · Active</div>
              </div>
              <span className="ml-auto inline-flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Chat Messages */}
            <div className="space-y-3 text-[12px] overflow-y-auto max-h-[500px]">
              <div className="p-3 bg-zinc-900/40 rounded-lg border border-white/5 space-y-1">
                <span className="font-semibold text-zinc-300">User</span>
                <p className="text-zinc-400">Add a dark mode toggle button to the header navbar</p>
              </div>

              <div className="p-3 bg-white/[0.02] rounded-lg border border-white/10 space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-zinc-200">
                  <Bot className="size-3.5" />
                  <span>Ronald</span>
                </div>
                <p className="text-zinc-350 leading-relaxed">I have analyzed <span className="font-mono text-[11px] text-zinc-200">src/App.tsx</span>. Adding a React state variable for theme toggling, rendering the sun/moon button elements, and configuring dark utility classes. File compiled successfully!</p>
                <div className="text-[10px] text-zinc-500 font-mono">✓ App.tsx modified (+18, -4 lines)</div>
              </div>
            </div>
          </div>

          {/* User Input Slot */}
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 mt-auto">
            <input type="text" placeholder="Type instruction to build app..." disabled className="bg-transparent flex-1 text-xs outline-none text-zinc-500" />
            <Send className="size-3.5 text-zinc-650" />
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- 8. Forge Deploy Screen ---------- */

export function ForgeDeployScreen() {
  return (
    <div className="grid h-[820px] grid-rows-[auto_1fr] bg-[#0c0c0e] text-zinc-200 font-sans select-none text-left relative">
      {/* IDE Topbar */}
      <header className="flex items-center gap-3 border-b border-white/5 px-4 py-3 bg-[#0f0f12] h-14 opacity-40 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐸</span>
          <span className="text-sm font-semibold tracking-tight text-white font-cinzel">Forge</span>
        </div>
        <span className="text-zinc-700">/</span>
        <span className="text-xs text-zinc-400">workspaces</span>
        <span className="text-zinc-850">|</span>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-[var(--sp-brass-bright)] animate-pulse">
          Deploying...
        </span>
      </header>

      {/* Main Grid Blur Layout */}
      <div className="grid min-h-0 grid-cols-[240px_1fr_360px] h-[764px] opacity-30 pointer-events-none">
        <aside className="border-r border-white/5 bg-[#0c0c0e] flex flex-col p-4 space-y-4" />
        <section className="grid grid-rows-[1fr_220px] bg-[#0d0d0f] border-r border-white/5" />
        <aside className="bg-[#0b0b0d] flex flex-col p-4" />
      </div>

      {/* Deploy Modal Overlaid in center */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none">
        <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0e0e12] p-6 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <h3 className="font-cinzel text-xs font-bold text-zinc-200 tracking-wider">
              Deployment Build Pipeline Logs
            </h3>
            <span className="text-[10px] uppercase font-bold text-emerald-500 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
              Active
            </span>
          </div>

          <pre className="rounded bg-black p-4 font-mono text-[10.5px] text-emerald-400 overflow-auto max-h-[280px] border border-white/5 whitespace-pre-wrap leading-relaxed">
            [1/4] 📦 Resolving production package bundles...{"\n"}
            [2/4] 🔧 Running compilation check (&apos;npm run build&apos;)...{"\n"}
            ✓ Vite static bundle generated successfully (128KB, assets/index-B912cf.js){"\n"}
            [3/4] 🚀 Deploying bundle to edge container VM...{"\n"}
            ✓ Virtual microVM booted on edge node (21ms){"\n"}
            [4/4] 🌐 Mapping DNS to CDN edge router...{"\n"}
            ✓ Public edge deployment success!
          </pre>

          {/* Success Banner */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <Check className="size-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider">Application Live on CDN</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400 font-mono">Url:</span>
              <a href="#" className="underline font-bold text-white hover:text-white">https://toad-forge-sandbox.sh/quick-crm-demo</a>
            </div>
          </div>

          <div className="flex justify-end pt-1 gap-2">
            <button className="rounded bg-zinc-800 border border-zinc-700 px-4 py-1.5 text-xs font-semibold text-zinc-200">
              Close Logs
            </button>
            <button className="rounded bg-[#b5a642] text-black px-4 py-1.5 text-xs font-bold">
              Open App Live
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 9. Forge Zapier Screen ---------- */

export function ForgeZapierScreen() {
  return (
    <div className="grid h-[820px] grid-rows-[auto_1fr] bg-[#0c0c0e] text-zinc-200 font-sans select-none text-left">
      {/* IDE Topbar */}
      <header className="flex items-center gap-3 border-b border-white/5 px-4 py-3 bg-[#0f0f12] h-14">
        <div className="flex items-center gap-2">
          <span className="text-xl">🐸</span>
          <span className="text-sm font-semibold tracking-tight text-white font-cinzel">Forge</span>
        </div>
        <span className="text-zinc-700">/</span>
        <span className="text-xs text-zinc-400">workspaces</span>
        <span className="text-zinc-750">|</span>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-white/[0.02]">
          🚀 Deploy App
        </span>
      </header>

      {/* Main Grid */}
      <div className="grid min-h-0 grid-cols-[240px_1fr_360px] h-[764px]">
        {/* Left Sidebar */}
        <aside className="border-r border-white/5 bg-[#0c0c0e] flex flex-col p-4 space-y-4">
          <div className="flex border-b border-white/5 pb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            📁 Files
          </div>
          <div className="space-y-2 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <FileCode className="size-4" />
              <span className="font-mono">src/App.tsx</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCode className="size-4" />
              <span className="font-mono">package.json</span>
            </div>
          </div>
        </aside>

        {/* Center */}
        <section className="bg-[#0d0d0f] p-6 border-r border-white/5">
          <h2 className="text-lg font-semibold font-cinzel text-white mb-2">Zapier Webhook Automations</h2>
          <p className="text-xs text-zinc-500 leading-relaxed mb-6">You can configure automated workflows. Every action or form submission in your sandboxed application can trigger a webhook payload sent directly to Zapier to interact with 8,000+ API connections.</p>

          <div className="space-y-4 max-w-lg">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">1. Configure Active Trigger Webhook Url</label>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value="https://hooks.zapier.com/hooks/catch/98765/zpy-forge" className="bg-black/60 border border-white/10 rounded-lg p-2 text-xs font-mono flex-1 text-zinc-300 outline-none" />
                <Badge variant="outline" className="border-emerald-500/35 text-emerald-400">Active</Badge>
              </div>
            </div>

            <div className="space-y-1.5 pt-3">
              <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">2. Test Webhook Connection</label>
              <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 font-mono text-[11px] text-zinc-550 space-y-1.5">
                <div className="text-zinc-650">// JSON payload sent to trigger Zapier node:</div>
                <div>&#123;</div>
                <div className="pl-4">&quot;event&quot;: &quot;forge_lead_enriched&quot;,</div>
                <div className="pl-4">&quot;lead&quot;: &#123;</div>
                <div className="pl-8">&quot;name&quot;: &quot;Marcus Bell&quot;,</div>
                <div className="pl-8">&quot;email&quot;: &quot;marcus@bellroofs.com&quot;</div>
                <div className="pl-4">&#125;</div>
                <div>&#125;</div>
              </div>
            </div>

            <div className="pt-3">
              <button className="px-4 py-2 bg-[#b5a642] text-black rounded text-xs font-bold">
                Trigger Test Webhook Payload
              </button>
            </div>
          </div>
        </section>

        {/* Right Pane: Zapier Logs */}
        <aside className="bg-[#0b0b0d] p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="font-mono text-[10px] tracking-widest text-zinc-550 uppercase block border-b border-white/5 pb-2">
              Webhook Run Log Console
            </span>
            
            <div className="space-y-3 font-mono text-[11px]">
              <div className="p-3 bg-zinc-950 rounded border border-white/5 text-emerald-400 space-y-1.5">
                <div>&gt;&gt;&gt; Sending event: forge_lead_enriched</div>
                <div>&gt;&gt;&gt; POST to Zapier Webhook URL</div>
                <div className="text-zinc-500">&lt;&lt;&lt; HTTP 200 OK (182ms)</div>
                <div className="font-bold text-white flex items-center gap-1">✓ Connection Successful!</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- registry ---------- */

export const SCREENS: Record<string, { active: string; variant?: "crm" | "none"; render: () => React.ReactNode }> = {
  dashboard: { active: "/dashboard", render: () => <DashboardScreen /> },
  inbox: { active: "/inbox", render: () => <InboxScreen /> },
  receptionist: { active: "/booking", render: () => <ReceptionistScreen /> },
  agents: { active: "/assistant", render: () => <AgentsScreen /> },
  workspaces: { active: "/dashboard", render: () => <WorkspacesScreen /> },
  workflow: { active: "/marketing", render: () => <WorkflowScreen /> },
  forge_editor: { active: "/editor", variant: "none", render: () => <ForgeEditorScreen /> },
  forge_deploy: { active: "/deploy", variant: "none", render: () => <ForgeDeployScreen /> },
  forge_zapier: { active: "/zapier", variant: "none", render: () => <ForgeZapierScreen /> },
};
