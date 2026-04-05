import styles from "@/components/detail/detail.module.css";
import type { DetailSection } from "@/modules/detail/types";

export function DetailSpecs(props: {
  title: string;
  sections: DetailSection[];
  className?: string;
}) {
  if (props.sections.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.infoPanel} ${props.className ?? ""}`.trim()}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>{props.title}</h2>
      </div>
      <dl className={styles.specList}>
        {props.sections.map((section) => (
          <div key={section.label} className={styles.specRow}>
            <dt className={styles.label}>{section.label}</dt>
            <dd className={styles.value}>{section.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
