"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Only reset on pathname changes. Query-only updates on category pages
    // should keep scroll so search, sort, and pagination feel stable.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
