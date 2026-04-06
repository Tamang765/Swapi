import Link from "next/link";
import { cookies } from "next/headers";

import { PageShell } from "@/components/layout/page-shell";
import { LinkButton } from "@/components/ui/button";
import { CATEGORY_CONFIG, categories } from "@/constants/categories";
import { isCategory } from "@/lib/validators";
import { ROUTES } from "@/constants/routes";
import styles from "@/app/archive.module.css";

const categorySummaries: Record<(typeof categories)[number], string> = {
  films: "Film list with titles, episode numbers, release dates, and credits.",
  people: "People list with names, birth years, gender, height, and mass.",
  planets: "Planet list with climate, terrain, population, and diameter.",
  species: "Species list with classification, language, and lifespan.",
  starships: "Starship list with model, maker, crew, passengers, and cargo.",
  vehicles: "Vehicle list with model, maker, crew, passengers, and cargo.",
};

export default async function ArchivePage() {
  const cookieStore = await cookies();
  const recentCategory = cookieStore.get("recentCategory")?.value;

  return (
    <PageShell contentClassName={styles.main}>
            <section className={styles.intro}>
              <span className={styles.eyebrow}>Categories</span>
              <h1 className={styles.title}>Category list</h1>
              <p className={styles.text}>
                Open a category to search, sort, and view all available items.
              </p>
              {recentCategory && isCategory(recentCategory) ? (
                <Link
                  href={ROUTES.category(recentCategory)}
                  className={styles.recentLink}
                >
                  Recent category: {CATEGORY_CONFIG[recentCategory].label}
                </Link>
              ) : null}
            </section>

            <section className={styles.grid} aria-label="Archive categories">
              {categories.map((category, index) => (
                <article key={category} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardIndex}>
                      {(index + 1).toString().padStart(2, "0")} / category
                    </span>
                    <h2 className={styles.cardTitle}>
                      {CATEGORY_CONFIG[category].label}
                    </h2>
                    <p className={styles.cardText}>
                      {categorySummaries[category]}
                    </p>
                  </div>

                  <LinkButton
                    className={styles.cardAction}
                    href={ROUTES.category(category)}
                  >
                    View
                    <span>+</span>
                  </LinkButton>
                </article>
              ))}
            </section>
    </PageShell>
  );
}
