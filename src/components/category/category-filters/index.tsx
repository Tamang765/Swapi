"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { useQueryParams } from "@/hooks/useQueryParams";
import { createCategorySearchParams } from "@/modules/category/utils";
import styles from "@/components/category/category.module.css";

export function CategoryFilters() {
  const queryParams = useQueryParams();
  const [search, setSearch] = useState(queryParams.current.get("search") ?? "");
  const [sort, setSort] = useState<"asc" | "desc">(
    queryParams.current.get("sort") === "desc" ? "desc" : "asc",
  );

  return (
    <div className={styles.filters}>
      <Input
        value={search}
        placeholder="Search"
        onChange={(event) => setSearch(event.target.value)}
      />
      <Dropdown
        value={sort}
        onChange={(event) => setSort(event.target.value as "asc" | "desc")}
      >
        <option value="asc">Name A to Z</option>
        <option value="desc">Name Z to A</option>
      </Dropdown>
      <Button
        type="button"
        onClick={() =>
          queryParams.replace(
            createCategorySearchParams({
              search,
              sort,
            }),
          )
        }
      >
        Apply
      </Button>
    </div>
  );
}
