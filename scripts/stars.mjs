// Snapshots star counts for every public NiladriHazra repo into
// data/stars.json. Runs before each build (npm "prebuild"), so the site ships
// with recent numbers even before the browser refreshes them live.
// On a network failure it keeps the previous snapshot and lets the build go on.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const OUT = "data/stars.json";
const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};

try {
  const res = await fetch("https://api.github.com/users/NiladriHazra/repos?per_page=100&type=owner", {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "niladri.in-build" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const stars = Object.fromEntries(
    (await res.json()).filter((r) => !r.private).map((r) => [r.name, r.stargazers_count]),
  );
  writeFileSync(OUT, JSON.stringify(stars, null, 2) + "\n");
  console.log(`stars: ${Object.keys(stars).length} repos`);
} catch (err) {
  writeFileSync(OUT, JSON.stringify(previous, null, 2) + "\n");
  console.warn(`stars: kept previous snapshot (${err.message})`);
}
