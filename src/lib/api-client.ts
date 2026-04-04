import { logger } from "@/lib/logger";

export async function fetchJson<T>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    logger.error("HTTP request failed", { url, status: response.status });
    throw new Error("The upstream SWAPI service could not fulfil the request.");
  }

  return (await response.json()) as T;
}
