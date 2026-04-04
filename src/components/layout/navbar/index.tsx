import Link from "next/link";
import { Container } from "@/components/layout/container";
import styles from "@/components/layout/layout.module.css";

export function Navbar() {
  return (
    <header className={styles.navbar}>
      <Container className={styles.navInner}>
        <Link href="/" className={styles.brand}>
          SWAPI App
        </Link>
      </Container>
    </header>
  );
}
