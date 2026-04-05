import type { ResourceRecord } from "@/types/api.types";

export function getDetailTitle(resource: ResourceRecord) {
  return String(resource.name ?? resource.title ?? "Item");
}
