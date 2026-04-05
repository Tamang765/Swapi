import { categories, type Category } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import type { SearchParamsRecord, SortDirection } from "@/types/common.types";
import { isCategory, isSortDirection } from "@/lib/validators";
import { categoryStateDefaults } from "@/modules/category/constants";
import type { CategoryState } from "@/modules/category/types";

const stateFieldSuffixes = {
  search: "Search",
  sort: "Sort",
  page: "Page",
} satisfies Record<keyof CategoryState, string>;

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePage(value: string | undefined) {
  const parsedValue = Number.parseInt(value ?? "", 10);

  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : categoryStateDefaults.page;
}

function parseCategoryState(
  searchParams: SearchParamsRecord,
  category: Category,
) {
  // Read one category state from the shared URL params.
  const searchValue = getSingleValue(
    searchParams[getCategoryStateParamKey(category, "search")],
  );
  const sortValue = getSingleValue(
    searchParams[getCategoryStateParamKey(category, "sort")],
  );
  const pageValue = getSingleValue(
    searchParams[getCategoryStateParamKey(category, "page")],
  );

  return {
    search: searchValue?.trim() ?? "",
    sort: isSortDirection(sortValue) ? sortValue : categoryStateDefaults.sort,
    page: parsePage(pageValue),
    rawSort: sortValue,
    rawPage: pageValue,
  };
}

export function getCategoryStateParamKey(
  category: Category,
  field: keyof CategoryState,
) {
  return `${category}${stateFieldSuffixes[field]}`;
}

export function createDefaultCategoryState(): Record<Category, CategoryState> {
  return Object.fromEntries(
    categories.map((category) => [category, { ...categoryStateDefaults }]),
  ) as Record<Category, CategoryState>;
}

export function parseCategoryRouteState(searchParams: SearchParamsRecord) {
  const requestedCategory = getSingleValue(searchParams.category);
  const activeCategory =
    requestedCategory && isCategory(requestedCategory)
      ? requestedCategory
      : "planets";
  const categoryState = createDefaultCategoryState();
  const errors: string[] = [];

  if (requestedCategory && !isCategory(requestedCategory)) {
    errors.push("Invalid category request received. Showing planets instead.");
  }

  // Keep one search/sort/page state per category in the URL.
  for (const category of categories) {
    const nextState = parseCategoryState(searchParams, category);

    categoryState[category] = {
      search: nextState.search,
      sort: nextState.sort as SortDirection,
      page: nextState.page,
    };

    if (
      category === activeCategory &&
      nextState.rawSort !== undefined &&
      !isSortDirection(nextState.rawSort)
    ) {
      errors.push("Invalid sort request received. Showing ascending order.");
    }

    if (
      category === activeCategory &&
      nextState.rawPage !== undefined &&
      categoryState[category].page === categoryStateDefaults.page &&
      nextState.rawPage !== String(categoryStateDefaults.page)
    ) {
      errors.push("Invalid page request received. Showing page 1.");
    }
  }

  return { activeCategory, categoryState, errors };
}

export function createCategorySearchParams(
  activeCategory: Category,
  categoryState: Record<Category, CategoryState>,
) {
  const params = new URLSearchParams({ category: activeCategory });

  // Skip default values to keep the URL short.
  for (const category of categories) {
    const state = categoryState[category];

    if (state.search) {
      params.set(getCategoryStateParamKey(category, "search"), state.search);
    }

    if (state.sort !== categoryStateDefaults.sort) {
      params.set(getCategoryStateParamKey(category, "sort"), state.sort);
    }

    if (state.page !== categoryStateDefaults.page) {
      params.set(
        getCategoryStateParamKey(category, "page"),
        String(state.page),
      );
    }
  }

  return params;
}

export function createCategoryHref(
  activeCategory: Category,
  categoryState: Record<Category, CategoryState>,
) {
  const params = createCategorySearchParams(activeCategory, categoryState);
  const query = params.toString();

  return query
    ? `${ROUTES.category(activeCategory)}?${query}`
    : ROUTES.category(activeCategory);
}
