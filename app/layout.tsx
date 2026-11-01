import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ListLab — A private investment opportunity for accredited investors",
  description:
    "Every investment right now needs you to predict the next few years. This one doesn't. For accredited investors with $10k+ liquid.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "ListLab — See if you qualify",
    description:
      "Built on a need people have in any economy. Boom or bust. AI or no AI. Accredited investors only.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
