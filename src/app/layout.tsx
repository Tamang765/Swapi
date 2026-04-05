import type { Metadata } from "next";
import { RouteProgress } from "@/components/layout/route-progress";
import { ScrollReset } from "@/components/layout/scroll-reset";
import "./globals.css";

export const metadata: Metadata = {
  title: "SWAPI App",
  description: "A Next.js app using SWAPI data.",
};

export default function RootLayout(
  props: Readonly<{ children: React.ReactNode }>,
) {
  return (
    <html lang="en">
      <body>
        <ScrollReset />
        <RouteProgress />
        {props.children}
      </body>
    </html>
  );
}
