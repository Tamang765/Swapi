import { CategoryFilters } from "@/components/category/category-filters";
import { CategoryResults } from "@/components/category/category-results";
import { getCategoryItems } from "@/modules/category/api";
import styles from "@/components/category/category.module.css";

export default async function CategoryPage() {
  const items = await getCategoryItems();

  return (
    <section className={styles.content}>
      <h1>Category page</h1>
      <CategoryFilters />
      <CategoryResults items={items} />
    </section>
  );
}
