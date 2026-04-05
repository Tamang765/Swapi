"use client";

import { SEARCH_DEBOUNCE_MS } from "@/constants/ui";
import { useDebounce } from "@/hooks/useDebounce";

export function useCategorySearchInput(value: string) {
  return useDebounce(value, SEARCH_DEBOUNCE_MS);
}
