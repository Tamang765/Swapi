import type { ReactNode } from "react";
import styles from "@/components/layout/layout.module.css";

export function Container(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.container} ${props.className ?? ""}`}>
      {props.children}
    </div>
  );
}
