import type { Metadata } from "next";

export function createPageTitle(title: string) {
  return `${title} | UKTV SWAPI Explorer`;
}

export function createPageMetadata(
  title: string,
  description: string,
): Metadata {
  return {
    title: createPageTitle(title),
    description,
    openGraph: {
      title: createPageTitle(title),
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: createPageTitle(title),
      description,
    },
  };
}
