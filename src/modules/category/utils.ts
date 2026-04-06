import { categories, type Category } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import type { SearchParamsRecord, SortDirection } from "@/types/common.types";
import { isCategory, isSortDirection } from "@/lib/validators";
import { categoryStateDefaults } from "@/modules/category/constants";
import type { CategoryState } from "@/modules/category/types";

const storageKey = "swapi-category-state";

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
  activeCategory: Category,
) {
  if (category !== activeCategory) {
    return {
      ...categoryStateDefaults,
      rawSort: undefined,
      rawPage: undefined,
    };
  }

  // Keep supporting old category-prefixed query params if present.
  const searchValue =
    getSingleValue(searchParams.search) ??
    getSingleValue(searchParams[`${category}Search`]);
  const sortValue =
    getSingleValue(searchParams.sort) ??
    getSingleValue(searchParams[`${category}Sort`]);
  const pageValue =
    getSingleValue(searchParams.page) ??
    getSingleValue(searchParams[`${category}Page`]);

  return {
    search: searchValue?.trim() ?? "",
    sort: isSortDirection(sortValue) ? sortValue : categoryStateDefaults.sort,
    page: parsePage(pageValue),
    rawSort: sortValue,
    rawPage: pageValue,
  };
}

export function createDefaultCategoryState(): Record<Category, CategoryState> {
  return Object.fromEntries(
    categories.map((category) => [category, { ...categoryStateDefaults }]),
  ) as Record<Category, CategoryState>;
}

function isCategoryState(value: unknown): value is CategoryState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const possibleState = value as Partial<CategoryState>;

  return (
    typeof possibleState.search === "string" &&
    isSortDirection(possibleState.sort) &&
    typeof possibleState.page === "number" &&
    Number.isInteger(possibleState.page) &&
    possibleState.page > 0
  );
}

export function readCategoryStateFromSession(): Record<
  Category,
  CategoryState
> {
  const defaultState = createDefaultCategoryState();

  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const rawValue = window.sessionStorage.getItem(storageKey);
    if (!rawValue) {
      return defaultState;
    }

    const parsedValue = JSON.parse(rawValue) as Record<string, unknown>;
    for (const category of categories) {
      const state = parsedValue[category];
      if (isCategoryState(state)) {
        defaultState[category] = state;
      }
    }
  } catch {
    return defaultState;
  }

  return defaultState;
}

export function writeCategoryStateToSession(
  categoryState: Record<Category, CategoryState>,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(storageKey, JSON.stringify(categoryState));
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

  // URL carries only active category state; other categories stay in session.
  for (const category of categories) {
    const nextState = parseCategoryState(
      searchParams,
      category,
      activeCategory,
    );

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
  const params = new URLSearchParams();
  const state = categoryState[activeCategory];

  if (state.search) {
    params.set("search", state.search);
  }

  if (state.sort !== categoryStateDefaults.sort) {
    params.set("sort", state.sort);
  }

  if (state.page !== categoryStateDefaults.page) {
    params.set("page", String(state.page));
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
