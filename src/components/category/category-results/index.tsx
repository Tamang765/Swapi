import styles from "@/components/category/category.module.css";
import type { ResourceRecord } from "@/types/api.types";

export function CategoryResults(props: {
  items: ResourceRecord[];
  isPending?: boolean;
}) {
  return (
    <div className={styles.grid}>
      {props.isPending ? <p>Updating results...</p> : null}
      {props.items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        props.items.map((item, index) => (
          <article key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>
              {String(item.name ?? item.title ?? "Item")}
            </h3>
          </article>
        ))
      )}
    </div>
  );
}
