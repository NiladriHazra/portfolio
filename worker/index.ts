/**
 * The site is static (out/), served as Worker assets. This script only handles
 * /api/agents: agent-manager on my Mac POSTs a small status, the home page
 * GETs it. Everything else falls through to the assets.
 */

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  AGENT_STATUS: KV;
  AGENT_TOKEN: string;
}

const KEY = "status";
const AGENTS = ["claude", "codex", "opencode", "cursor", "gemini", "antigravity", "grok", "hermes"];
const STATES = ["working", "waiting", "idle"];
// KV free tier allows 1,000 writes a day. An unchanged status is stored at most
// every 4 minutes (heartbeat) and any status at most every 90 seconds.
const MIN_WRITE_MS = 90_000;
const HEARTBEAT_MS = 4 * 60_000;

const int = (v: unknown, max = 1e13) =>
  typeof v === "number" && Number.isFinite(v) ? Math.max(0, Math.min(Math.round(v), max)) : 0;
const project = (v: unknown) =>
  typeof v === "string" && /^[A-Za-z0-9._-]{1,40}$/.test(v) ? v : null;

/** Rebuilds the payload from known fields only, so nothing unexpected is ever stored or served. */
function clean(body: any) {
  const agents = (Array.isArray(body?.agents) ? body.agents : [])
    .filter((a: any) => AGENTS.includes(a?.id))
    .slice(0, 8)
    .map((a: any) => ({
      id: a.id as string,
      working: int(a.working, 50),
      waiting: int(a.waiting, 50),
      open: int(a.open, 50),
      tokensToday: a.tokensToday == null ? null : int(a.tokensToday),
    }));
  const sessions = (Array.isArray(body?.sessions) ? body.sessions : [])
    .filter((s: any) => AGENTS.includes(s?.agent) && STATES.includes(s?.state))
    .slice(0, 12)
    .map((s: any) => ({ agent: s.agent as string, state: s.state as string, project: project(s.project) }));
  return {
    working: int(body?.working, 50),
    waiting: int(body?.waiting, 50),
    open: int(body?.open, 50),
    tokensToday: int(body?.tokensToday),
    agents,
    sessions,
  };
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
    },
  });

async function handle(request: Request, env: Env): Promise<Response> {
  if (request.method === "GET") {
    const raw = await env.AGENT_STATUS.get(KEY);
    return json({ now: new Date().toISOString(), status: raw ? JSON.parse(raw) : null });
  }

  if (request.method === "OPTIONS") return json(null, 204);
  if (request.method !== "POST") return json({ error: "method" }, 405);

  const auth = request.headers.get("authorization") ?? "";
  if (!env.AGENT_TOKEN || auth !== `Bearer ${env.AGENT_TOKEN}`) return json({ error: "unauthorized" }, 401);

  const text = await request.text();
  if (text.length > 16_000) return json({ error: "too large" }, 413);
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: "bad json" }, 400);
  }

  const next = clean(body);
  const now = Date.now();
  const prevRaw = await env.AGENT_STATUS.get(KEY);
  if (prevRaw) {
    const { at, ...prev } = JSON.parse(prevRaw);
    const age = now - Date.parse(at);
    const same = JSON.stringify(prev) === JSON.stringify(next);
    if (same && age < HEARTBEAT_MS) return json({ stored: false }, 202);
    // A real change that came too soon: a non-2xx makes the app retry in 30s.
    if (age < MIN_WRITE_MS) return json({ error: "too soon" }, 429);
  }
  await env.AGENT_STATUS.put(KEY, JSON.stringify({ at: new Date(now).toISOString(), ...next }));
  return json({ stored: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/agents") return handle(request, env);
    return env.ASSETS.fetch(request);
  },
};
