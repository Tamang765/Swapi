import { categories, type Category } from "@/constants/categories";
import type { SortDirection } from "@/types/common.types";

export function isCategory(value: string): value is Category {
  return categories.includes(value as Category);
}

export function isSortDirection(value: string | undefined): value is SortDirection {
  return value === "asc" || value === "desc";
}

export function parsePositiveInteger(value: string | null | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}
