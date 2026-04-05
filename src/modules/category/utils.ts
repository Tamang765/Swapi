import type { CategoryState } from "@/modules/category/types";

export function createCategorySearchParams(state: CategoryState) {
  const params = new URLSearchParams();

  if (state.search) {
    params.set("search", state.search);
  }

  if (state.sort !== "asc") {
    params.set("sort", state.sort);
  }

  return params;
}
