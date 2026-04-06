"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/components/category/category.module.css";
import {
  CATEGORY_CONFIG,
  categories,
  type Category,
} from "@/constants/categories";
import type { CategoryState } from "@/modules/category/types";
import { categoryStateDefaults } from "@/modules/category/constants";
import {
  createCategorySearchParams,
  readCategoryStateFromSession,
  writeCategoryStateToSession,
} from "@/modules/category/utils";
import { useCategorySearchInput } from "@/modules/category/hooks";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { useQueryParams } from "@/hooks/useQueryParams";

function hasUrlStateForCategory(
  params: URLSearchParams,
  activeCategory: Category,
) {
  return (
    params.has("search") ||
    params.has("sort") ||
    params.has("page") ||
    params.has(`${activeCategory}Search`) ||
    params.has(`${activeCategory}Sort`) ||
    params.has(`${activeCategory}Page`)
  );
}

function isDefaultState(state: CategoryState) {
  return (
    state.search === categoryStateDefaults.search &&
    state.sort === categoryStateDefaults.sort &&
    state.page === categoryStateDefaults.page
  );
}

function isSameState(left: CategoryState, right: CategoryState) {
  return (
    left.search === right.search &&
    left.sort === right.sort &&
    left.page === right.page
  );
}

function SearchField(props: {
  category: Category;
  categoryState: Record<Category, CategoryState>;
  currentState: CategoryState;
  isPending: boolean;
  onNavigate: (
    category: Category,
    state: Record<Category, CategoryState>,
  ) => void;
}) {
  const { category, categoryState, currentState, isPending, onNavigate } =
    props;
  const [value, setValue] = useState(currentState.search);
  const debouncedValue = useCategorySearchInput(value);
  const isDebouncing = value !== debouncedValue;
  const isSearching =
    isPending && !isDebouncing && debouncedValue !== currentState.search;

  useEffect(() => {
    if (debouncedValue === currentState.search) {
      return;
    }

    onNavigate(category, {
      ...categoryState,
      [category]: {
        ...currentState,
        search: debouncedValue,
        page: 1,
      },
    });
  }, [category, categoryState, currentState, debouncedValue, onNavigate]);

  return (
    <div className={`${styles.field} ${styles.searchField}`}>
      <label className={styles.label} htmlFor="search">
        Search {CATEGORY_CONFIG[category].label.toLowerCase()}
      </label>
      <div className={styles.searchInputWrap}>
        <div
          className={`${styles.searchProgress} ${
            isDebouncing || isSearching ? styles.searchProgressActive : ""
          }`}
          aria-hidden="true"
        />
        <span
          className={`${styles.searchIndicator} ${
            isDebouncing || isSearching ? styles.searchIndicatorActive : ""
          }`}
          aria-hidden="true"
        />
        <Input
          id="search"
          type="search"
          value={value}
          aria-busy={isDebouncing || isSearching}
          className={styles.searchInput}
          placeholder={CATEGORY_CONFIG[category].searchPlaceholder}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    </div>
  );
}

function SortField(props: {
  activeCategory: Category;
  categoryState: Record<Category, CategoryState>;
  currentState: CategoryState;
  isPending: boolean;
  onNavigate: (
    category: Category,
    state: Record<Category, CategoryState>,
  ) => void;
}) {
  const { activeCategory, categoryState, currentState, isPending, onNavigate } =
    props;
  const [sortValue, setSortValue] = useState(currentState.sort);
  const isSortPending = isPending && sortValue !== currentState.sort;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="sort">
        Sort by {CATEGORY_CONFIG[activeCategory].sortField}
      </label>
      <div className={styles.sortInputWrap}>
        <span
          className={`${styles.sortIndicator} ${
            isSortPending ? styles.sortIndicatorActive : ""
          }`}
          aria-hidden="true"
        />
        <Dropdown
          id="sort"
          value={currentState.sort}
          aria-busy={isSortPending}
          className={styles.sortInput}
          disabled={isPending}
          onChange={(event) => {
            const nextSort = event.target.value as "asc" | "desc";
            setSortValue(nextSort);
            onNavigate(activeCategory, {
              ...categoryState,
              [activeCategory]: {
                ...currentState,
                sort: nextSort,
                page: 1,
              },
            });
          }}
        >
          <option value="asc">
            {CATEGORY_CONFIG[activeCategory].sortField === "title"
              ? "Title A to Z"
              : "Name A to Z"}
          </option>
          <option value="desc">
            {CATEGORY_CONFIG[activeCategory].sortField === "title"
              ? "Title Z to A"
              : "Name Z to A"}
          </option>
        </Dropdown>
      </div>
    </div>
  );
}

export function CategoryFilters(props: {
  activeCategory: Category;
  categoryState: Record<Category, CategoryState>;
  showCategoryList?: boolean;
}) {
  const { activeCategory, categoryState, showCategoryList = false } = props;
  const currentState = categoryState[activeCategory];
  const queryParams = useQueryParams();
  const currentQuery = queryParams.current.toString();
  const hasUrlState = useMemo(
    () => hasUrlStateForCategory(queryParams.current, activeCategory),
    [activeCategory, currentQuery, queryParams.current],
  );
  const [isResetPending, setIsResetPending] = useState(false);

  const navigate = useCallback(
    (nextCategory: Category, nextState: Record<Category, CategoryState>) => {
      const storedState = readCategoryStateFromSession();
      const mergedState = { ...storedState };
      const targetState = nextState[nextCategory];

      mergedState[activeCategory] = nextState[activeCategory];
      mergedState[nextCategory] = targetState;

      writeCategoryStateToSession(mergedState);
      queryParams.replace(
        createCategorySearchParams(nextCategory, mergedState),
      );
    },
    [activeCategory, queryParams],
  );

  useEffect(() => {
    const storedState = readCategoryStateFromSession();
    const currentActiveState = categoryState[activeCategory];
    const storedActiveState = storedState[activeCategory];

    // Do not overwrite saved category state with SSR defaults on bare routes.
    if (
      !hasUrlState &&
      isDefaultState(currentActiveState) &&
      !isDefaultState(storedActiveState)
    ) {
      return;
    }

    if (isSameState(currentActiveState, storedActiveState)) {
      return;
    }

    writeCategoryStateToSession({
      ...storedState,
      [activeCategory]: currentActiveState,
    });
  }, [activeCategory, categoryState, hasUrlState]);

  useEffect(() => {
    if (hasUrlState || queryParams.isPending) {
      return;
    }

    const storedState = readCategoryStateFromSession();
    const storedActiveState = storedState[activeCategory];

    if (isDefaultState(storedActiveState)) {
      return;
    }

    queryParams.replace(
      createCategorySearchParams(activeCategory, storedState),
    );
  }, [activeCategory, hasUrlState, queryParams]);

  const canReset =
    currentState.search !== categoryStateDefaults.search ||
    currentState.sort !== categoryStateDefaults.sort;

  return (
    <>
      {showCategoryList ? (
        <div className={styles.categoryList}>
          {categories.map((category) => {
            const config = CATEGORY_CONFIG[category];
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                className={`${styles.categoryButton} ${
                  isActive ? styles.categoryButtonActive : ""
                }`}
                onClick={() => navigate(category, categoryState)}
                aria-pressed={isActive}
                disabled={queryParams.isPending}
              >
                <span className={styles.categoryLabel}>{config.label}</span>
                <span className={styles.categoryDescription}>
                  {config.description}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div className={styles.filters}>
        <SearchField
          key={`${activeCategory}:${currentState.search}`}
          category={activeCategory}
          categoryState={categoryState}
          currentState={currentState}
          isPending={queryParams.isPending}
          onNavigate={navigate}
        />

        <SortField
          key={`${activeCategory}:${currentState.sort}`}
          activeCategory={activeCategory}
          categoryState={categoryState}
          currentState={currentState}
          isPending={queryParams.isPending}
          onNavigate={navigate}
        />

        <div className={styles.filterActions}>
          <Button
            type="button"
            className={styles.resetButton}
            disabled={!canReset || queryParams.isPending}
            onClick={() => {
              setIsResetPending(true);
              navigate(activeCategory, {
                ...categoryState,
                [activeCategory]: {
                  ...currentState,
                  search: categoryStateDefaults.search,
                  sort: categoryStateDefaults.sort,
                  page: categoryStateDefaults.page,
                },
              });
            }}
          >
            {isResetPending && queryParams.isPending
              ? "Resetting..."
              : "Reset all"}
          </Button>
        </div>
      </div>
    </>
  );
}
