import type { ComponentPropsWithoutRef } from "react";
import styles from "@/components/ui/ui.module.css";

export function Dropdown(props: ComponentPropsWithoutRef<"select">) {
  return <select {...props} className={`${styles.select} ${props.className ?? ""}`} />;
}
