import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ResumeBar from "./ResumeBar";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Niladri Hazra, GTM Engineer at Runable.",
  alternates: { canonical: "/resume" },
};

/**
 * Renders scripts/resume.html (the same file the PDF is printed from) as a
 * page, so the web resume and /resume.pdf never drift apart. The file's
 * `body` rules are scoped to the sheet.
 */
function loadResume() {
  const html = readFileSync(join(process.cwd(), "scripts/resume.html"), "utf8");
  const css = (html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "")
    .replace(/@page[^}]*}/, "")
    .replace(/\*\s*{[^}]*}/, ".resume-sheet, .resume-sheet * { box-sizing: border-box; margin: 0; padding: 0; }")
    .replace(/\bbody\s*{/, ".resume-sheet {")
    .replace(/(^|})\s*([a-z][^{@}]*){/g, (m, close, sel) =>
      sel.trim().startsWith(".resume-sheet")
        ? m
        : `${close}\n${sel
            .split(",")
            .map((s: string) => `.resume-sheet ${s.trim()}`)
            .join(", ")} {`,
    );
  const body = html.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? "";
  return { css, body };
}

export default function ResumePage() {
  const { css, body } = loadResume();
  return (
    <div className="min-h-screen bg-background pb-20">
      <style>{`${css}
        .resume-sheet ul { list-style: disc; }
        .resume-sheet { background: #fff; color: #000; margin: 0 auto; border: 1px solid #e4e4e7; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 24px 48px -24px rgba(0,0,0,.18); }
        .dark .resume-sheet { border-color: #323232; }
        @media (max-width: 880px) { .resume-sheet { zoom: 0.86; } }
        @media (max-width: 740px) { .resume-sheet { zoom: 0.7; } }
        @media (max-width: 600px) { .resume-sheet { zoom: 0.56; } }
        @media (max-width: 480px) { .resume-sheet { zoom: 0.44; } }
        @media print {
          @page { size: Letter; margin: 0; }
          .resume-bar { display: none !important; }
          .resume-page { padding: 0 !important; background: #fff !important; }
          .resume-sheet { zoom: 1 !important; box-shadow: none !important; border: 0 !important; border-radius: 0 !important; }
        }
      `}</style>
      <ResumeBar />
      <div className="resume-page px-4">
        <div className="resume-sheet" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </div>
  );
}
