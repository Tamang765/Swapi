import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/layout/container";
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
    <>
      <Navbar />
      <CategoryVisitTracker category={category} />
      <main id="main-content">
        <Container>
          <div className={styles.shell}>{props.children}</div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
