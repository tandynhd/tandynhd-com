"use client";

import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeToggle />
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
