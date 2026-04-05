"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "@/components/category/category.module.css";
import {
  CATEGORY_CONFIG,
  categories,
  type Category,
} from "@/constants/categories";
import type { CategoryState } from "@/modules/category/types";
import { categoryStateDefaults } from "@/modules/category/constants";
import { createCategorySearchParams } from "@/modules/category/utils";
import { useCategorySearchInput } from "@/modules/category/hooks";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { useQueryParams } from "@/hooks/useQueryParams";

function SearchField(props: {
  category: Category;
  categoryState: Record<Category, CategoryState>;
  currentState: CategoryState;
  onNavigate: (
    category: Category,
    state: Record<Category, CategoryState>,
  ) => void;
}) {
  const { category, categoryState, currentState, onNavigate } = props;
  const [value, setValue] = useState(currentState.search);
  const [isSearchPending, setIsSearchPending] = useState(false);
  const debouncedValue = useCategorySearchInput(value);
  const isDebouncing = value !== debouncedValue;
  const isSearching = !isDebouncing && isSearchPending;

  useEffect(() => {
    // Search has its own loading state so sort/page changes do not make the
    // input look busy when the user did not touch search.
    setValue(currentState.search);
    setIsSearchPending(false);
  }, [currentState.search]);

  useEffect(() => {
    if (debouncedValue === currentState.search) {
      return;
    }

    setIsSearchPending(true);
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

export function CategoryFilters(props: {
  activeCategory: Category;
  categoryState: Record<Category, CategoryState>;
  showCategoryList?: boolean;
}) {
  const { activeCategory, categoryState, showCategoryList = false } = props;
  const currentState = categoryState[activeCategory];
  const queryParams = useQueryParams();
  const [isSortPending, setIsSortPending] = useState(false);

  useEffect(() => {
    // Reset the sort spinner once the selected value comes back from the URL.
    setIsSortPending(false);
  }, [currentState.sort]);

  const navigate = useCallback(
    (nextCategory: Category, nextState: Record<Category, CategoryState>) => {
      queryParams.replace(createCategorySearchParams(nextCategory, nextState));
    },
    [queryParams],
  );

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
          onNavigate={navigate}
        />

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
              disabled={queryParams.isPending}
              onChange={(event) => {
                setIsSortPending(true);
                navigate(activeCategory, {
                  ...categoryState,
                  [activeCategory]: {
                    ...currentState,
                    sort: event.target.value as "asc" | "desc",
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

        <div className={styles.filterActions}>
          <Button
            type="button"
            className={styles.resetButton}
            disabled={!canReset || queryParams.isPending}
            onClick={() =>
              navigate(activeCategory, {
                ...categoryState,
                [activeCategory]: {
                  ...currentState,
                  search: categoryStateDefaults.search,
                  sort: categoryStateDefaults.sort,
                  page: categoryStateDefaults.page,
                },
              })
            }
          >
            Reset all
          </Button>
        </div>
      </div>
    </>
  );
}
