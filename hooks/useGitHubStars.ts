"use client";

import { useEffect, useState } from "react";
import snapshot from "@/data/stars.json";

type Stars = Record<string, number>;

const KEY = "gh-stars:v1";
const MAX_AGE_MS = 30 * 60 * 1000;

let inflight: Promise<Stars | null> | null = null;

/** One request for all repos, shared by every component and cached for 30 minutes. */
function fetchStars(): Promise<Stars | null> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
    if (cached && Date.now() - cached.at < MAX_AGE_MS) return Promise.resolve(cached.stars);
  } catch {}

  inflight ??= fetch("https://api.github.com/users/NiladriHazra/repos?per_page=100&type=owner", {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((repos: { name: string; stargazers_count: number }[] | null) => {
      if (!repos) return null;
      const stars = Object.fromEntries(repos.map((r) => [r.name, r.stargazers_count]));
      try {
        sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), stars }));
      } catch {}
      return stars;
    })
    .catch(() => null);
  return inflight;
}

/**
 * Star counts for public repos. Starts from the snapshot taken at build time
 * (scripts/stars.mjs), then swaps in live numbers from GitHub. If the API is
 * unreachable or rate-limited, the snapshot stays.
 */
export function useGitHubStars(): Stars {
  const [stars, setStars] = useState<Stars>(snapshot as Stars);

  useEffect(() => {
    let alive = true;
    fetchStars().then((live) => {
      if (alive && live) setStars((prev) => ({ ...prev, ...live }));
    });
    return () => {
      alive = false;
    };
  }, []);

  return stars;
}
