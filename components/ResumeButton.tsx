"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { usePortfolioSound } from "@/hooks/usePortfolioSound";

/**
 * "Resume" pill in the header. Opens the resume in a sheet over the page
 * (rendered from /resume.html, so it reads like a page, not a download),
 * with the PDF one click away.
 */
export default function ResumeButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const playClick = usePortfolioSound("/sounds/click.mp3");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          playClick();
          setOpen(true);
        }}
        className="cursor-pointer rounded-full border border-zinc-200 bg-white px-3 py-0.5 text-sm text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
      >
        Resume
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/40 backdrop-blur-sm sm:items-center sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Resume"
                  className="flex h-[92dvh] w-full max-w-[860px] flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:h-[90dvh] sm:rounded-2xl dark:bg-zinc-900"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2.5 text-sm dark:border-zinc-800">
                    <span className="text-zinc-500">Resume · Niladri Hazra</span>
                    <span className="flex items-center gap-3">
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-600 underline decoration-dotted underline-offset-[3px] hover:text-blue dark:text-zinc-300"
                      >
                        PDF ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="cursor-pointer rounded-md border border-zinc-200 px-2 py-0.5 text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
                        aria-label="Close resume"
                      >
                        Close
                      </button>
                    </span>
                  </div>
                  <div className="flex-1 overflow-auto bg-zinc-100 dark:bg-zinc-950">
                    <iframe
                      src="/resume"
                      title="Resume"
                      className="mx-auto block h-[1060px] w-[816px] max-w-none origin-top bg-white sm:my-6 sm:shadow-lg [zoom:0.46] min-[440px]:[zoom:0.53] sm:[zoom:0.9] md:[zoom:1]"
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
