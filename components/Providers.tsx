"use client";

import { ThemeProvider } from "next-themes";
import { SoundProvider } from "@/context/SoundContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SoundProvider>{children}</SoundProvider>
    </ThemeProvider>
  );
}
