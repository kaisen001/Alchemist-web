"use client";

import type { ReactNode } from "react";
import { LocaleProvider } from "@/lib/locale";
import { ThemeProvider } from "@/lib/theme";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
