import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Icicle — Shreya Khubber",
  description: "Icicle — a gallery by Shreya Khubber. Finance, code, art and everything in between.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}