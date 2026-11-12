import type { Metadata } from "next";
import localFont from "next/font/local";
import "./max.css";

/**
 * Root layout for Max's VSL landing page ("/"). It is separate from app/(funnel)/layout.tsx on purpose:
 * this page has its own type and stylesheet and loads none of the application pages' Tailwind CSS.
 * Moving between the two is a normal full page load.
 *
 * The fonts are the same four files the reviewed draft loaded from Google Fonts (see fonts/README.md),
 * served from this site instead. Newsreader's italic exists at regular weight only, as it did there.
 */

const inter = localFont({
  src: [{ path: "./fonts/inter-latin.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: "Arial",
});

const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-latin.woff2", weight: "400 600", style: "normal" },
    { path: "./fonts/newsreader-latin-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const caveat = localFont({
  src: [{ path: "./fonts/caveat-latin.woff2", weight: "600", style: "normal" }],
  variable: "--font-caveat",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Max Mayes on Investing",
  robots: { index: false, follow: false },
};

export default function MaxLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
