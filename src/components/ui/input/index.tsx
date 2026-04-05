import type { ComponentPropsWithoutRef } from "react";
import styles from "@/components/ui/ui.module.css";

export function Input(props: ComponentPropsWithoutRef<"input">) {
  return <input {...props} className={`${styles.input} ${props.className ?? ""}`} />;
}
