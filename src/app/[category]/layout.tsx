import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { CategoryVisitTracker } from "@/components/recent-category/category-visit-tracker";
import styles from "@/components/category/category.module.css";
import { isCategory } from "@/lib/validators";

export default async function CategoryLayout(props: {
  children: ReactNode;
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;

  if (!isCategory(category)) {
    notFound();
  }

  return (
    <PageShell
      beforeMain={<CategoryVisitTracker category={category} />}
      contentClassName={styles.shell}
    >
      {props.children}
    </PageShell>
  );
}
