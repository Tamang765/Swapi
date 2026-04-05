import type { Category } from "@/constants/categories";
import type { ResourceRecord, CategoryListingResponse } from "@/types/api.types";
import type { SortDirection } from "@/types/common.types";

export type CategoryState = {
  search: string;
  sort: SortDirection;
  page: number;
};

export type CategoryPageData = CategoryListingResponse & {
  category: Category;
  items: ResourceRecord[];
};
