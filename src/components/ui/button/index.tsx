"use client";

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { forwardRef, useState } from "react";
import Link from "next/link";
import styles from "@/components/ui/ui.module.css";

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button"> & { children: ReactNode }
>(function Button(props, ref) {
  const { className = "", children, ...rest } = props;

  return (
    <button ref={ref} className={`${styles.button} ${className}`} {...rest}>
      {children}
    </button>
  );
});

export function LinkButton(props: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const { href, children, className = "" } = props;
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    if (event.currentTarget.href === window.location.href) {
      return;
    }

    // We show feedback immediately here because route changes can take a moment
    // and a silent button feels broken on slower page transitions.
    setIsNavigating(true);
  };

  return (
    <Link
      href={href}
      className={`${styles.linkButton} ${
        isNavigating ? styles.linkButtonLoading : ""
      } ${className}`}
      onClick={handleClick}
      aria-busy={isNavigating}
    >
      {children}
      <span
        className={`${styles.linkButtonSpinner} ${
          isNavigating ? styles.linkButtonSpinnerVisible : ""
        }`}
        aria-hidden="true"
      />
    </Link>
  );
}
