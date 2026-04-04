import type { ReactNode, SelectHTMLAttributes } from "react";
import styles from "@/components/ui/ui.module.css";

export function Dropdown(
  props: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode },
) {
  const { className = "", children, ...rest } = props;

  return (
    <select className={`${styles.select} ${className}`} {...rest}>
      {children}
    </select>
  );
}
