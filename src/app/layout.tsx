"use client";

import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import LoadingScreen from "@/components/LoadingScreen";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LoadingScreen />
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
