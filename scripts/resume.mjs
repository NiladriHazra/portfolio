// Renders scripts/resume.html -> public/resume.pdf and scripts/og.html ->
// public/og.png with headless Chrome. Run after editing either file:
//   npm run resume
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const chrome =
  process.env.CHROME_PATH ??
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(existsSync);
if (!chrome) throw new Error("Chrome not found; set CHROME_PATH");

const url = (f) => `file://${resolve("scripts", f)}`;
const base = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-pdf-header-footer"];

execFileSync(chrome, [...base, `--print-to-pdf=${resolve("public/resume.pdf")}`, url("resume.html")], { stdio: "inherit" });
execFileSync(chrome, [...base, "--window-size=1200,630", `--screenshot=${resolve("public/og.png")}`, url("og.html")], { stdio: "inherit" });
console.log("Wrote public/resume.pdf and public/og.png");
