import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import styles from "@/app/archive.module.css";

const categories = [
  "Films",
  "People",
  "Planets",
  "Species",
  "Vehicles",
  "Starships",
];

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <div className={styles.main}>
            <section className={styles.intro}>
              <span className={styles.eyebrow}>Categories</span>
              <h1 className={styles.title}>Category list</h1>
              <p className={styles.text}>Browse the available data groups.</p>
            </section>

            <section className={styles.grid}>
              {categories.map((category) => (
                <article key={category} className={styles.card}>
                  <h2 className={styles.cardTitle}>{category}</h2>
                  <p className={styles.cardText}>View {category.toLowerCase()} data.</p>
                  <Link href="/">Open</Link>
                </article>
              ))}
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
