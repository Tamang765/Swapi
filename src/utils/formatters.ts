import { CATEGORY_CONFIG, type Category } from "@/constants/categories";
import type { ResourceRecord } from "@/types/api.types";

export function getPrimaryValue(resource: ResourceRecord, category: Category): string {
  const sortField = CATEGORY_CONFIG[category].sortField;
  const value = resource[sortField];

  return typeof value === "string" && value.trim().length > 0
    ? value
    : "Untitled";
}

export function formatResourceValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Unknown";
  }

  if (Array.isArray(value)) {
    return value.length === 0 ? "None" : value.map(String).join(", ");
  }

  return String(value).trim() || "Unknown";
}
