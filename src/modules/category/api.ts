import { DEFAULT_PAGE_SIZE } from "@/constants/ui";
import type { Category } from "@/constants/categories";
import type { SortDirection } from "@/types/common.types";
import type { CategoryListingResponse } from "@/types/api.types";
import {
  fetchSwapiCategoryByPage,
  fetchSwapiCategoryPage,
} from "@/services/swapi.service";
import { normalizeSearchTerm } from "@/modules/search/utils";
import { createPagination } from "@/utils/pagination";
import { getPrimaryValue } from "@/utils/formatters";

export async function getCategoryListing(options: {
  category: Category;
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: SortDirection;
  all?: boolean;
}): Promise<CategoryListingResponse> {
  const {
    category,
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    search = "",
    sort = "asc",
    all = false,
  } = options;

  const normalizedSearch = normalizeSearchTerm(search);
  const query = new URLSearchParams({ page: String(page) });

  if (normalizedSearch) {
    query.set("search", normalizedSearch);
  }

  if (
    !all &&
    !normalizedSearch &&
    sort === "asc" &&
    pageSize === DEFAULT_PAGE_SIZE
  ) {
    const payload = await fetchSwapiCategoryByPage(category, query);

    return {
      category,
      count: payload.count,
      items: payload.results,
      pagination: createPagination(page, pageSize, payload.count),
    };
  }

  const firstPage = await fetchSwapiCategoryByPage(category, query);
  const aggregatedItems = [...firstPage.results];
  let nextUrl = firstPage.next ?? "";

  while (nextUrl) {
    const payload = await fetchSwapiCategoryPage(nextUrl);
    aggregatedItems.push(...payload.results);
    nextUrl = payload.next ?? "";
  }

  const sortedItems = aggregatedItems.sort((left, right) => {
    const leftValue = getPrimaryValue(left, category).toLowerCase();
    const rightValue = getPrimaryValue(right, category).toLowerCase();
    const comparison = leftValue.localeCompare(rightValue, undefined, {
      numeric: true,
    });

    return sort === "asc" ? comparison : comparison * -1;
  });

  const pagination = createPagination(page, pageSize, sortedItems.length);
  const start = (pagination.page - 1) * pageSize;
  const items = all ? sortedItems : sortedItems.slice(start, start + pageSize);

  return {
    category,
    count: sortedItems.length,
    items,
    pagination: all
      ? createPagination(1, sortedItems.length || pageSize, sortedItems.length)
      : pagination,
  };
}
