export function getResourceSlug(url: unknown): string {
  if (typeof url !== "string") {
    return "unknown";
  }

  return url.split("/").filter(Boolean).pop() ?? "unknown";
}
