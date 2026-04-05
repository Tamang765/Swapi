import styles from "@/components/layout/layout.module.css";
import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footerInner}>
        <p className={styles.footerCredit}>Built by Pradeep</p>
        <a
          href="https://pradeeptamang.com.np"
          target="_blank"
          rel="noreferrer"
          className={styles.footerLink}
        >
          pradeeptamang.com.np
        </a>
      </Container>
    </footer>
  );
}
