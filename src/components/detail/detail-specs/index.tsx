import styles from "@/components/detail/detail.module.css";
import type { ResourceRecord } from "@/types/api.types";

export function DetailSpecs(props: { resource: ResourceRecord }) {
  const entries = Object.entries(props.resource).slice(0, 6);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Details</h2>
      <div className={styles.specs}>
        {entries.length === 0 ? (
          <p>No details yet.</p>
        ) : (
          entries.map(([key, value]) => (
            <div key={key} className={styles.spec}>
              <dt>{key}</dt>
              <dd>{String(value)}</dd>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
