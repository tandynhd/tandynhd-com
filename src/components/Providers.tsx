"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { LoadingProvider } from "@/context/LoadingContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </ThemeProvider>
  );
}
