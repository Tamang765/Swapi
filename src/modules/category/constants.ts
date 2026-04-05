import { categories } from "@/constants/categories";

export const categoryStateDefaults = {
  search: "",
  sort: "asc" as const,
  page: 1,
};

export const categoryList = categories;
