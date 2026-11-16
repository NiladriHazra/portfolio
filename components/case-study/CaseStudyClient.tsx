"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { caseStudies } from "@/data/caseStudies";
import { posterFor } from "@/lib/poster";
import type { CaseStudy } from "@/data/caseStudies";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import ColorCard, { type ColorSwatch } from "@/components/ColorCard";
import FontCard, { type FontPair } from "@/components/FontCard";
import TopicImageCard from "@/components/case-study/TopicImageCard";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";
import ThemeToggle from "@/components/ThemeToggle";

const designColorsBySlug: Record<string, ColorSwatch[]> = {};

const designFontsBySlug: Record<string, FontPair[]> = {};

const designNotesBySlug: Record<string, { color: string; typography: string }> = {};

export default function CaseStudyClient({ study }: { study: CaseStudy }) {
  const searchParams = useSearchParams();
  const [heroPreviewOpen, setHeroPreviewOpen] = useState(false);
  const tocItems = study.sections.map((section) => ({ id: section.id, label: section.title }));
  const studyIndex = caseStudies.findIndex((item) => item.slug === study.slug);
  const previousStudy = studyIndex > 0 ? caseStudies[studyIndex - 1] : null;
  const nextStudy = studyIndex < caseStudies.length - 1 ? caseStudies[studyIndex + 1] : null;
  const from = searchParams.get("from");
  const backHref = "/";
  const backLabel = "Home";
  const withFrom = (slug: string) => `/projects/${slug}${from ? `?from=${from}` : ""}`;

  const playClick = usePortfolioSound("/sounds/click.mp3");
  const playHover = usePortfolioSound("/sounds/hover.mp3", 0.06);
  const router = useRouter();

  const isVideo = Boolean(study.demoVideo && /\.(mp4|webm|mov)$/i.test(study.demoVideo));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        playClick();
        router.push("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, playClick]);

  useEffect(() => {
    if (!heroPreviewOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setHeroPreviewOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [heroPreviewOpen]);

  const sectionMediaSrc = study.sectionMedia ?? {};

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ReadingProgress />

      <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:pt-10 md:px-6 md:pt-12">
        <div className="fixed left-4 top-20 xl:left-6">
          <TableOfContents items={tocItems} />
        </div>

        <main className="mx-auto max-w-xl scroll-smooth">
          <header className="mb-10">
            <div className="mb-8 flex items-center justify-between gap-3">
              <Link
                href={backHref}
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="inline-flex items-center gap-2 px-3 text-sm py-1 bg-zinc-50 border border-zinc-200 w-fit rounded-lg text-zinc-950 transition-colors hover:text-zinc-700 cursor-pointer dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-300"
                aria-label={`Back to ${backLabel.toLowerCase()}`}
              >
                <span>↩</span>
                <span>Back</span>
              </Link>
              <ThemeToggle />
            </div>

            <p className="text-sm text-zinc-500">
              {study.category} · {study.year}
            </p>
            <h1 className="mt-2 text-lg text-zinc-900">{study.title}</h1>
            <p className="mt-3 text-zinc-500">{study.subtitle}</p>

            <div className="mt-6 w-full pb-2">
              <button
                type="button"
                onClick={() => {
                  setHeroPreviewOpen(true);
                  playClick();
                }}
                className="relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl border border-neutral-200 bg-zinc-100 transition-transform hover:scale-[1.01] dark:border-zinc-800 dark:bg-zinc-900"
                aria-label="Open case study demo media"
              >
                {isVideo ? (
                  <video
                    src={study.demoVideo}
                    poster={posterFor(study.demoVideo)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={study.demoVideo}
                    alt={study.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </button>
              <div className="mt-3 flex items-center gap-4">
                {study.downloadUrl && (
                  <a
                    href={study.downloadUrl}
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3 py-1 text-[15px] text-white transition-colors hover:bg-blue dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-blue dark:hover:text-white"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{study.downloadLabel ?? "Download"}</span>
                  </a>
                )}

                {study.githubUrl && (
                  <a
                    href={study.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="inline-flex items-center gap-1.5 text-[16px] text-zinc-950 transition-colors hover:text-blue"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 .5C5.648.5.5 5.648.5 12c0 5.084 3.292 9.397 7.86 10.92.575.106.785-.25.785-.556 0-.274-.01-1-.015-1.963-3.197.695-3.873-1.54-3.873-1.54-.523-1.328-1.277-1.682-1.277-1.682-1.044-.713.08-.698.08-.698 1.154.081 1.761 1.185 1.761 1.185 1.026 1.758 2.694 1.25 3.35.956.104-.744.402-1.25.731-1.537-2.552-.291-5.236-1.276-5.236-5.68 0-1.255.449-2.281 1.184-3.086-.118-.29-.513-1.462.112-3.048 0 0 .965-.309 3.162 1.179A10.99 10.99 0 0 1 12 6.095c.977.005 1.963.132 2.884.388 2.196-1.488 3.16-1.179 3.16-1.179.627 1.586.232 2.758.114 3.048.737.805 1.182 1.831 1.182 3.086 0 4.415-2.688 5.386-5.249 5.67.414.357.783 1.06.783 2.138 0 1.543-.014 2.787-.014 3.167 0 .309.207.668.79.554C20.213 21.393 23.5 17.082 23.5 12 23.5 5.648 18.352.5 12 .5Z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}

                {study.telegramUrl && (
                  <a
                    href={study.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="inline-flex items-center gap-1.5 text-[16px] text-zinc-950 transition-colors hover:text-blue"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.29 13.82l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.858.739Z" />
                    </svg>
                    <span>Telegram</span>
                  </a>
                )}

                {study.liveUrl && (
                  <a
                    href={study.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    className="inline-flex items-center gap-1.5 text-[16px] text-zinc-950 transition-colors hover:text-blue"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <span>{study.liveLabel ?? "Visit site"}</span>
                  </a>
                )}
              </div>
            </div>
          </header>

          {study.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-12 scroll-mt-20">
              <h2 className="text-lg text-zinc-900">{section.title}</h2>

              {section.id === "tech" && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs text-zinc-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-3 space-y-4 text-zinc-500">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.id !== "design" &&
                section.id !== "overview" &&
                section.id !== "problem" &&
                section.id !== "tech" &&
                section.id !== "next" &&
                sectionMediaSrc[section.id] && (
                  <TopicImageCard
                    src={sectionMediaSrc[section.id]}
                    alt={`${study.title}: ${section.title}`}
                    bordered={study.bordered}
                  />
                )}

              {section.id === "design" && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {designColorsBySlug[study.slug] && (
                    <div className="w-full rounded-lg pb-2">
                      <ColorCard colors={designColorsBySlug[study.slug]} />
                      <div className="px-1 pt-2">
                        <p className="text-sm text-zinc-900">Color</p>
                        <p className="text-sm text-zinc-600">
                          {designNotesBySlug[study.slug]?.color ?? "Write your color decisions here."}
                        </p>
                      </div>
                    </div>
                  )}
                  {designFontsBySlug[study.slug] && (
                    <div className="w-full rounded-lg pb-2">
                      <FontCard fonts={designFontsBySlug[study.slug]} />
                      <div className="px-1 pt-2">
                        <p className="text-sm text-zinc-900">Typography</p>
                        <p className="text-sm text-zinc-600">
                          {designNotesBySlug[study.slug]?.typography ?? "Write your typography choices here."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          ))}

          {heroPreviewOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#fffffa]/92 p-4 backdrop-blur-sm dark:bg-zinc-950/90"
              onClick={() => setHeroPreviewOpen(false)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") setHeroPreviewOpen(false);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setHeroPreviewOpen(false);
                  playClick();
                }}
                onMouseEnter={() => playHover()}
                className="absolute right-4 top-4 rounded-md border border-zinc-200 bg-white/90 px-2 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-200 cursor-pointer"
                aria-label="Close media preview"
              >
                Close
              </button>
              <div
                className="bg-white relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700"
                onClick={(event) => event.stopPropagation()}
              >
                {isVideo ? (
                  <video
                    src={study.demoVideo}
                    poster={posterFor(study.demoVideo)}
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                    className="h-full max-h-[90vh] w-full object-contain"
                  />
                ) : (
                  <img
                    src={study.demoVideo}
                    alt={study.title}
                    className="h-full max-h-[90vh] w-full object-contain"
                  />
                )}
              </div>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-zinc-200 pt-8 sm:grid-cols-2 sm:gap-0">
            <div>
              {previousStudy ? (
                <Link
                  href={withFrom(previousStudy.slug)}
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className="group block"
                >
                  <p className="text-[16px] text-zinc-500 transition-colors group-hover:text-zinc-700">Previous</p>
                  <p className="mt-1 text-[16px] text-zinc-800 transition-colors group-hover:text-zinc-900">{previousStudy.title}</p>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="sm:text-right">
              {nextStudy ? (
                <Link
                  href={withFrom(nextStudy.slug)}
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className="group block"
                >
                  <p className="text-[16px] text-zinc-500 transition-colors group-hover:text-zinc-700">Next</p>
                  <p className="mt-1 text-[16px] text-zinc-800 transition-colors group-hover:text-zinc-900">{nextStudy.title}</p>
                </Link>
              ) : (
                <Link
                  href="/"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                  className="group block"
                >
                  <p className="text-[16px] text-zinc-500 transition-colors group-hover:text-zinc-700">Next</p>
                  <p className="mt-1 text-[16px] text-zinc-800 transition-colors group-hover:text-zinc-900">Home</p>
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
