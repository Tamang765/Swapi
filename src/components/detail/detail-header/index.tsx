import styles from "@/components/detail/detail.module.css";

export function DetailHeader(props: { title: string }) {
  return (
    <header className={styles.header}>
      <span className={styles.eyebrow}>Details</span>
      <h1 className={styles.title}>{props.title}</h1>
    </header>
  );
}
