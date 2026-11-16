"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { posterFor } from "@/lib/poster";

type TopicImageCardProps = {
  src?: string;
  alt?: string;
  bordered?: boolean;
};

export default function TopicImageCard({ src, alt = "Section media", bordered }: TopicImageCardProps) {
  const [open, setOpen] = useState(false);
  const isVideo = Boolean(src && (src.endsWith(".mp4") || src.endsWith(".webm")));

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {src ? (
        <div className="mt-6 w-full">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative w-full block transition-transform hover:scale-[1.005] cursor-zoom-in overflow-hidden rounded-lg"
            aria-label={`Open ${alt}`}
          >
            {isVideo ? (
              <video
                src={src}
                poster={src ? posterFor(src) : undefined}
                autoPlay
                loop
                muted
                playsInline
                className="max-h-96 md:max-h-[500px] max-w-full h-auto w-auto mx-auto block object-contain rounded-lg"
              />
            ) : (
              <img
                src={src}
                alt={alt}
                className={`max-h-96 md:max-h-[500px] max-w-full h-auto w-auto mx-auto block object-contain rounded-lg${bordered ? " border border-neutral-200 dark:border-zinc-800" : ""}`}
              />
            )}
          </button>
        </div>
      ) : (
        <div className="bg-white mt-6 w-full rounded-lg border border-dashed border-neutral-300 p-2 sm:p-3 flex h-56 items-center justify-center sm:h-72">
          <p className="text-sm text-zinc-400">Add image or video</p>
        </div>
      )}

      {open && src && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#fffffa]/92 p-4 backdrop-blur-sm dark:bg-zinc-950/90"
          onClick={() => setOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setOpen(false);
            }
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-md border border-zinc-200 bg-white/90 px-2 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-200"
            aria-label="Close media preview"
          >
            Close
          </button>

          <div
            className="bg-white relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700"
            onClick={(event) => event.stopPropagation()}
          >
            {isVideo ? (
              <video src={src} poster={src ? posterFor(src) : undefined} autoPlay loop muted controls playsInline className="h-full max-h-[90vh] w-full object-contain" />
            ) : (
              <div className="bg-white relative h-[70vh] w-full">
                <Image src={src} alt={alt} fill className="object-contain" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
