import { fetchJson } from "@/lib/api-client";
import { SWAPI_BASE_URL } from "@/lib/config";
import type { SwapiPaginatedResponse, ResourceRecord } from "@/types/api.types";
import type { Category } from "@/constants/categories";

export async function fetchSwapiCategoryPage(url: string) {
  return fetchJson<SwapiPaginatedResponse>(url, {
    next: { revalidate: 60 * 60 },
  });
}

export async function fetchSwapiCategoryByPage(
  category: Category,
  query: URLSearchParams,
) {
  return fetchSwapiCategoryPage(
    `${SWAPI_BASE_URL}/${category}/?${query.toString()}`,
  );
}

export async function fetchSwapiResourceDetail(
  category: Category,
  slug: string,
) {
  return fetchJson<ResourceRecord>(`${SWAPI_BASE_URL}/${category}/${slug}/`, {
    next: { revalidate: 60 * 60 },
  });
}

export async function fetchSwapiResourceByUrl(url: string) {
  return fetchJson<ResourceRecord>(url, {
    next: { revalidate: 60 * 60 },
  });
}
