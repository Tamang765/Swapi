import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/layout/container";
import styles from "@/components/category/category.module.css";

export default function CategoryLayout(props: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <div className={styles.shell}>{props.children}</div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
