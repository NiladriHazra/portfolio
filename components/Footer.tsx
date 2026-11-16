import { site } from "@/data/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 py-4 text-sm font-sans text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
      <span>Last updated · {site.lastUpdated}</span>
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <span>© {currentYear} {site.name}</span>
      </div>
    </footer>
  );
}
