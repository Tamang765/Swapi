"use client";

import styles from "@/components/category/category.module.css";
import { ErrorState } from "@/components/feedback/error-state";

export default function Error(props: { error: Error; reset: () => void }) {
  return (
    <section className={styles.content}>
      <ErrorState
        message={
          props.error.message ||
          "Something went wrong while loading this category."
        }
        onRetry={props.reset}
      />
    </section>
  );
}
