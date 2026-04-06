import type { Metadata } from "next";
import { Suspense } from "react";
import { Epilogue, Manrope } from "next/font/google";
import { RouteProgress } from "@/components/layout/route-progress";
import { ScrollReset } from "@/components/layout/scroll-reset";
import { ScrollTop } from "@/components/layout/scroll-top";
import "./globals.css";

const headlineFont = Epilogue({
  variable: "--font-headline",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://uktv-swapi-explorer.vercel.app"),
  title: {
    default: "UKTV SWAPI Explorer",
    template: "%s",
  },
  description:
    "A searchable, sortable category browser built with Next.js, TypeScript, and CSS modules.",
  openGraph: {
    title: "UKTV SWAPI Explorer",
    description:
      "A searchable, sortable category browser built with Next.js, TypeScript, and CSS modules.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UKTV SWAPI Explorer",
    description:
      "A searchable, sortable category browser built with Next.js, TypeScript, and CSS modules.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headlineFont.variable} ${bodyFont.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ScrollReset />
        <Suspense fallback={null}>
          <RouteProgress />
        </Suspense>
        <ScrollTop />
        {children}
      </body>
    </html>
  );
}
