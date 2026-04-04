import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { RecentCategory } from "@/components/recent-category";
import { LinkButton } from "@/components/ui/button";
import styles from "@/app/landing.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <div className={styles.main}>
            <section className={styles.hero}>
              <span className={styles.eyebrow}>Live data app</span>
              <h1 className={styles.title}>Browse all categories</h1>
              <p className={styles.text}>
                Search and open data from films, people, planets, species,
                vehicles, and starships.
              </p>
              <div className={styles.actions}>
                <LinkButton href="/categories">View categories</LinkButton>
                <LinkButton href="/">Open app</LinkButton>
              </div>
            </section>

            <section>
              <RecentCategory />
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
