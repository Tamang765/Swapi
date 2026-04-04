import type { Category } from "@/constants/categories";

export type ResourceRecord = Record<string, unknown>;

export type CategoryListingResponse = {
  category: Category;
  count: number;
  items: ResourceRecord[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type SwapiPaginatedResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResourceRecord[];
};
