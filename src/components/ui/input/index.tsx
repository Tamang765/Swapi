import type { InputHTMLAttributes } from "react";
import styles from "@/components/ui/ui.module.css";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;

  return <input className={`${styles.input} ${className}`} {...rest} />;
}
