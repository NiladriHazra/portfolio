"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type State = "working" | "waiting" | "idle";

interface Status {
  at: string;
  working: number;
  waiting: number;
  open: number;
  tokensToday: number;
  agents: { id: string; working: number; waiting: number; open: number; tokensToday: number | null }[];
  sessions: { agent: string; state: State; project: string | null }[];
}

const NAMES: Record<string, string> = {
  claude: "Claude Code",
  codex: "Codex",
  opencode: "OpenCode",
  cursor: "Cursor",
  gemini: "Gemini",
  antigravity: "Antigravity",
  grok: "Grok",
  hermes: "Hermes",
};

const LOGOS: Record<string, string> = {
  claude: "/agents/claude-code.svg",
  codex: "/agents/codex.svg",
  opencode: "/agents/opencode.svg",
  cursor: "/agents/cursor.svg",
  gemini: "/agents/gemini.svg",
  antigravity: "/agents/antigravity.svg",
  grok: "/agents/grok.svg",
  hermes: "/agents/hermes.png",
};

/** agent-manager posts at least every 5 minutes while the Mac is awake. */
const STALE_MS = 11 * 60_000;
const POLL_MS = 20_000;

function compact(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(n >= 1e8 ? 0 : 1)}M`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return String(n);
}

function ago(ms: number) {
  const m = Math.round(ms / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

/** The vendor mark, drawn in the current text colour so it follows the theme. */
function Mark({ agent }: { agent: string }) {
  const src = LOGOS[agent];
  if (!src) return null;
  return (
    <span
      aria-hidden
      className="inline-block size-3.5 shrink-0 bg-current align-[-2px]"
      style={{ mask: `url(${src}) center / contain no-repeat`, WebkitMask: `url(${src}) center / contain no-repeat` }}
    />
  );
}

function plural(n: number, word: string) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/**
 * What my coding agents are doing right now, as reported by agent-manager on
 * my Mac. Counts and allow-listed repo names only; nothing else leaves the Mac.
 */
export default function AgentBoard() {
  const [data, setData] = useState<{ status: Status; skew: number } | null>(null);
  const [, tick] = useState(0);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/agents", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((res) => {
          if (!alive || !res?.status) return;
          // Server clock vs this browser's, so "ago" is right on a wrong clock.
          setData({ status: res.status, skew: Date.now() - Date.parse(res.now) });
        })
        .catch(() => {});
    load();
    const poll = setInterval(() => document.visibilityState === "visible" && load(), POLL_MS);
    const clock = setInterval(() => tick((n) => n + 1), 30_000);
    return () => {
      alive = false;
      clearInterval(poll);
      clearInterval(clock);
    };
  }, []);

  if (!data) return null;
  const { status, skew } = data;
  const age = Date.now() - skew - Date.parse(status.at);
  const awake = age < STALE_MS;

  // One line per agent, not per session: "Codex  2 working on klipeo, 1 waiting".
  const rows = Object.entries(
    status.sessions
      .filter((x) => x.state !== "idle")
      .reduce<Record<string, { working: number; waiting: number; projects: Set<string> }>>((acc, x) => {
        const row = (acc[x.agent] ??= { working: 0, waiting: 0, projects: new Set() });
        if (x.state === "working") {
          row.working += 1;
          if (x.project) row.projects.add(x.project);
        } else row.waiting += 1;
        return acc;
      }, {}),
  ).sort((x, y) => y[1].working - x[1].working || y[1].waiting - x[1].waiting);

  let headline: string;
  if (!awake) headline = `Agents asleep. Last ran ${ago(age)}.`;
  else if (status.working > 0)
    headline = `${plural(status.working, "agent")} working${status.waiting ? `, ${status.waiting} waiting on me` : ""}.`;
  else if (status.waiting > 0) headline = `${plural(status.waiting, "agent")} waiting on me.`;
  else headline = status.open > 0 ? `${plural(status.open, "agent")} open, all idle.` : "No agents running.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="pt-10"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-sans text-zinc-500">Right now</h2>
        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          via{" "}
          <a
            href="/projects/agent-manager"
            className="underline decoration-dotted decoration-zinc-400 underline-offset-[3px] transition-colors hover:text-blue hover:decoration-blue dark:decoration-zinc-600"
          >
            agent-manager
          </a>
        </span>
      </div>

      <p className="mt-3">{headline}</p>

      <AnimatePresence initial={false}>
        {awake && rows.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 flex flex-col gap-1 overflow-hidden text-sm"
          >
            {rows.map(([agent, row]) => {
              const parts: string[] = [];
              if (row.working)
                parts.push(
                  `${row.working} working${row.projects.size ? ` on ${[...row.projects].join(", ")}` : ""}`,
                );
              if (row.waiting) parts.push(`${row.waiting} waiting`);
              return (
                <li key={agent} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                  <Mark agent={agent} />
                  <span>
                    {NAMES[agent] ?? agent}{" "}
                    <span className="text-zinc-400 dark:text-zinc-500">{parts.join(", ")}</span>
                  </span>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {awake && status.tokensToday > 0 && (
        <p className="mt-2 font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
          {compact(status.tokensToday)} tokens today
        </p>
      )}
    </motion.div>
  );
}
