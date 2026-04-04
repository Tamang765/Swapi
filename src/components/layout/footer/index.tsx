import { Container } from "@/components/layout/container";
import styles from "@/components/layout/layout.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footerInner}>
        <p>Built by Pradeep</p>
      </Container>
    </footer>
  );
}
