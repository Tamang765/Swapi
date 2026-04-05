import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import styles from "@/app/not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Container>
          <section className={styles.shell}>
            <div className={styles.panel}>
              <span className={styles.kicker}>404</span>
              <h1 className={styles.title}>Page not found</h1>
              <p className={styles.text}>
                The page you are looking for is not here. Go home, open the
                category list, or open films.
              </p>
              <div className={styles.actions}>
                <LinkButton href={ROUTES.home}>Go home</LinkButton>
                <LinkButton
                  href={ROUTES.categories}
                  className={styles.secondaryAction}
                >
                  Open categories
                </LinkButton>
                <LinkButton
                  href={ROUTES.category("films")}
                  className={styles.secondaryAction}
                >
                  Browse films
                </LinkButton>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
