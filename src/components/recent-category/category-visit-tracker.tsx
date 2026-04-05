"use client";

import { useEffect } from "react";
import { RECENT_CATEGORY_COOKIE } from "@/lib/config";

export function CategoryVisitTracker(props: { category: string }) {
  useEffect(() => {
    document.cookie = `${RECENT_CATEGORY_COOKIE}=${encodeURIComponent(
      props.category,
    )}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
  }, [props.category]);

  return null;
}
