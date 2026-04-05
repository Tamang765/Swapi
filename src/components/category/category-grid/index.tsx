import styles from "@/components/category/category.module.css";
import type { Category } from "@/constants/categories";
import type { ResourceRecord } from "@/types/api.types";
import { CategoryCard } from "@/components/category/category-card";

export function CategoryGrid(props: {
  category: Category;
  items: ResourceRecord[];
}) {
  return (
    <div className={styles.grid}>
      {props.items.map((resource) => (
        <CategoryCard
          key={String(resource.url ?? JSON.stringify(resource))}
          category={props.category}
          resource={resource}
        />
      ))}
    </div>
  );
}
