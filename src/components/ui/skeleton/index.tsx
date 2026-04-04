import styles from "@/components/ui/ui.module.css";

export function Skeleton(props: { className?: string }) {
  return <div className={`${styles.skeleton} ${props.className ?? ""}`} />;
}
