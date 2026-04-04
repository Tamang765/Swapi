import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "@/components/ui/ui.module.css";

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode },
) {
  const { className = "", children, ...rest } = props;

  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton(props: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={props.href}
      className={`${styles.linkButton} ${props.className ?? ""}`}
    >
      {props.children}
    </Link>
  );
}
