"use client";

import styles from "@/components/category/category.module.css";
import { CategoryGrid } from "@/components/category/category-grid";
import { CategoryTransportTable } from "@/components/category/category-transport-table";
import type { Category } from "@/constants/categories";
import type { ResourceRecord } from "@/types/api.types";
import { useQueryParams } from "@/hooks/useQueryParams";

export function CategoryResults(props: {
  category: Category;
  items: ResourceRecord[];
}) {
  const queryParams = useQueryParams();
  const transportCategory =
    props.category === "vehicles" || props.category === "starships"
      ? props.category
      : null;

  return (
    <div className={styles.resultsSection}>
      <div className={styles.resultsStatusRow} aria-live="polite">
        <span className={styles.resultsStatus}>
          {queryParams.isPending ? "Updating results..." : "Results ready"}
        </span>
        <span className="sr-only" role="status">
          {queryParams.isPending
            ? `Updating ${props.category} results`
            : `${props.items.length} results loaded`}
        </span>
      </div>

      <div className={styles.resultsFrame} aria-busy={queryParams.isPending}>
        <div
          className={`${styles.resultsContent} ${
            queryParams.isPending ? styles.resultsContentPending : ""
          }`}
        >
          {transportCategory ? (
            <CategoryTransportTable
              category={transportCategory}
              items={props.items}
            />
          ) : (
            <CategoryGrid category={props.category} items={props.items} />
          )}
        </div>
        {queryParams.isPending ? (
          <div className={styles.resultsOverlay} aria-hidden="true" />
        ) : null}
      </div>
    </div>
  );
}
