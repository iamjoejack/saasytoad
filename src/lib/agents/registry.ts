/**
 * The AI agent catalog: one source of truth for what SaaSyToadCRM's agents are
 * called and what they do. Every surface that names an agent (run-status cards,
 * the agent-memory inspector, a future agents catalog page) should read names
 * and descriptions from here instead of hardcoding its own copy.
 *
 * Client-safe: pure data, no `server-only` import, so UI components can import
 * it. The agents' run functions live in their own files and are server-only;
 * reach those through the server barrel `@/lib/agents` (index.ts), not here.
 *
 * `key` matches the `AgentRun.kind` string a run is persisted under, so a run
 * row maps straight back to its catalog entry. One quirk worth knowing: the
 * content repurposer persists runs under kind `content_repurpose` (used here),
 * while its memory blob is stored under `content_repurposer` in agent-memory.ts.
 * That predates this module and is left as-is to avoid touching stored data.
 */

/**
 * The model every Tier-1 / Tier-2 agent runs on. Centralized so a version bump
 * is one edit, not seven. The agents pin Opus on purpose: they do multi-step
 * tool use and reasoning where answer quality matters more than latency.
 */
export const AGENT_MODEL = "claude-opus-4-7";

/** Canonical agent ids. Each equals the `AgentRun.kind` the agent writes. */
export type AgentKey =
  | "lead_enrichment"
  | "reengagement"
  | "daily_digest"
  | "pipeline_coach"
  | "content_repurpose"
  | "form_triage"
  | "campaign_brief";

/** How an agent usually kicks off. "automatic" fires on an event with no human
 *  in the loop; "scheduled" runs on the agents cron (and can also be run by
 *  hand); "manual" runs only when someone asks for it. */
export type AgentTrigger = "manual" | "scheduled" | "automatic";

export type AgentMeta = {
  /** Canonical id, equals the persisted `AgentRun.kind`. */
  key: AgentKey;
  /** Brand-facing display name. */
  name: string;
  /** One plain-English line on what it does. */
  description: string;
  /** The primary way this agent starts. */
  trigger: AgentTrigger;
  /** Where it surfaces in the app, for quick orientation. */
  runsAt: string;
};

export const AGENT_CATALOG: AgentMeta[] = [
  {
    key: "lead_enrichment",
    name: "Lead enrichment",
    description:
      "Researches a thin new lead from public sources and writes back a clean profile plus a 0 to 100 score, so nobody has to Google every contact by hand.",
    trigger: "manual",
    runsAt: "Contact page, the Enrich button",
  },
  {
    key: "reengagement",
    name: "Re-engagement",
    description:
      "Finds the contacts you've gone quiet on, drafts a tailored nudge for each, and leaves you a follow-up task.",
    trigger: "scheduled",
    runsAt: "Marketing, Re-engagement",
  },
  {
    key: "daily_digest",
    name: "Daily digest",
    description:
      "Reads the last day of activity and hands you a short morning brief: what moved, what needs you, who's hot.",
    trigger: "scheduled",
    runsAt: "Dashboard",
  },
  {
    key: "pipeline_coach",
    name: "Pipeline coach",
    description:
      "Reviews your deals every week, flags the stuck and the slipping ones, and turns the fixes into real tasks.",
    trigger: "scheduled",
    runsAt: "Pipelines",
  },
  {
    key: "content_repurpose",
    name: "Content repurposer",
    description:
      "Takes one piece of content and rewrites it to fit each channel you've connected, landing as drafts you approve.",
    trigger: "manual",
    runsAt: "Marketing, Posts",
  },
  {
    key: "form_triage",
    name: "Form triage",
    description:
      "Reads every form submission the second it lands, scores it, tags it, and sets up the next step.",
    trigger: "automatic",
    runsAt: "Fires on form submit",
  },
  {
    key: "campaign_brief",
    name: "Campaign brief",
    description:
      "Plays creative director for a campaign, generating on-brief images and video and filing them to the campaign.",
    trigger: "manual",
    runsAt: "Marketing, Campaigns",
  },
];

const byKey = new Map<string, AgentMeta>(
  AGENT_CATALOG.map((a) => [a.key, a]),
);

/** Look up an agent's metadata by its key / `AgentRun.kind`. */
export function getAgentMeta(key: string): AgentMeta | undefined {
  return byKey.get(key);
}

/** Friendly display name for an agent kind, falling back to the raw kind
 *  string when it isn't one of the cataloged agents (e.g. internal helper
 *  kinds like `inbox_categorize`). */
export function agentDisplayName(key: string): string {
  return byKey.get(key)?.name ?? key;
}
