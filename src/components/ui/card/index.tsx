import type { ReactNode } from "react";
import styles from "@/components/ui/ui.module.css";

export function Card(props: { children: ReactNode; className?: string }) {
  return <article className={`${styles.card} ${props.className ?? ""}`}>{props.children}</article>;
}
