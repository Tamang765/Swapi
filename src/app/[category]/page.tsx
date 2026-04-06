import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import styles from "@/components/category/category.module.css";
import { CategoryFilters } from "@/components/category/category-filters";
import { CategoryResults } from "@/components/category/category-results";
import { CATEGORY_CONFIG, type Category } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import { getCategoryListing } from "@/modules/category/api";
import { parseCategoryRouteState } from "@/modules/category/utils";
import type { SearchParamsRecord } from "@/types/common.types";
import { isCategory } from "@/lib/validators";
import { createPageMetadata } from "@/utils/seo";

type SearchParams = Promise<SearchParamsRecord>;

export async function generateMetadata(props: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await props.params;

  if (!isCategory(category)) {
    return createPageMetadata(
      "Category",
      "Browse SWAPI category data in a searchable and sortable list.",
    );
  }

  return createPageMetadata(
    CATEGORY_CONFIG[category].label,
    CATEGORY_CONFIG[category].description,
  );
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  if (!isCategory(params.category)) {
    notFound();
  }

  const category = params.category as Category;
  const cookieStore = await cookies();
  const recentCategory = cookieStore.get("recentCategory")?.value;

  const routeState = parseCategoryRouteState({
    ...searchParams,
    category,
  });
  const currentState = routeState.categoryState[category];
  const result = await getCategoryListing({
    category,
    search: currentState.search,
    sort: currentState.sort,
    all: true,
  });
  routeState.categoryState[category].page = 1;

  return (
    <section className={styles.content} aria-labelledby="results-heading">
      {recentCategory && isCategory(recentCategory) ? (
        <div className={styles.recent}>
          <span className={styles.recentLabel}>Recent category</span>
          <strong className={styles.recentValue}>
            {CATEGORY_CONFIG[recentCategory].label}
          </strong>
        </div>
      ) : null}

      <header className={styles.contentHeader}>
        <div>
          <span className={styles.kicker}>Category page</span>
          <h2 id="results-heading">{CATEGORY_CONFIG[category].label}</h2>
          <p className={styles.contentMeta}>
            {CATEGORY_CONFIG[category].description}
          </p>
        </div>
        <div className={styles.resultsCount}>SWAPI data</div>
      </header>

      <div className={styles.filterBar}>
        <div className={styles.filterBarMeta}>
          <span className={styles.toolbarLabel}>Results</span>
          <strong>{result.count} entries</strong>
        </div>
        <CategoryFilters
          activeCategory={category}
          categoryState={routeState.categoryState}
        />
      </div>

      {routeState.errors.length > 0 ? (
        <p className={styles.error} role="alert">
          {routeState.errors.join(" ")}
        </p>
      ) : null}

      {result.items.length === 0 ? (
        <div className={styles.empty} role="status">
          <div
            className={`${styles.emptyVisual} ${styles[`visual${category[0].toUpperCase()}${category.slice(1)}`] ?? ""}`}
            aria-hidden="true"
          />
          <div className={styles.emptyBody}>
            <strong className={styles.emptyTitle}>
              No {CATEGORY_CONFIG[category].label.toLowerCase()} found
            </strong>
            <p className={styles.emptyText}>
              No {CATEGORY_CONFIG[category].label.toLowerCase()} matched your
              current search.
            </p>
          </div>
        </div>
      ) : (
        <CategoryResults category={category} items={result.items} />
      )}
      <p className={styles.backLinkRow}>
        <Link href={ROUTES.home}>Back to landing page</Link>
      </p>
    </section>
  );
}
