import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { RecentCategory } from "@/components/recent-category";
import { LinkButton } from "@/components/ui/button";
import {
  CATEGORY_CONFIG,
  categories,
  type Category,
} from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import { fetchSwapiCategoryByPage } from "@/services/swapi.service";
import { formatResourceValue, getPrimaryValue } from "@/utils/formatters";
import styles from "@/app/landing.module.css";

async function getLandingCategories() {
  const records = await Promise.all(
    categories.map(async (category) => {
      const payload = await fetchSwapiCategoryByPage(
        category,
        new URLSearchParams({ page: "1" }),
      );
      const lead = payload.results[0] ?? {};
      const config = CATEGORY_CONFIG[category];
      const secondaryField = config.displayFields[1];

      return {
        category,
        label: config.label,
        description: config.description,
        count: payload.count,
        leadTitle: getPrimaryValue(lead, category),
        leadMeta: secondaryField
          ? `${secondaryField.label}: ${formatResourceValue(lead[secondaryField.key])}`
          : "Live API data",
      };
    }),
  );

  return { records };
}

function getCategoryCardClass(category: Category) {
  return styles[`categoryCard${category[0].toUpperCase()}${category.slice(1)}`];
}

export default async function Home() {
  const { records } = await getLandingCategories();
  const heroLead = records[2] ?? records[0];

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Container>
          <div className={styles.main}>
            <section className={styles.hero}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>Live data app</span>
                <h1 className={styles.heroTitle}>Browse all categories</h1>
                <p className={styles.heroText}>
                  Search planets, people, species, vehicles, starships, and
                  films in one app using live SWAPI data.
                </p>

                <div className={styles.heroActions}>
                  <LinkButton
                    className={styles.primaryAction}
                    href={ROUTES.categories}
                  >
                    View categories
                  </LinkButton>
                  <LinkButton
                    className={styles.secondaryAction}
                    href={ROUTES.category(heroLead.category)}
                  >
                    View {heroLead.label}
                  </LinkButton>
                </div>
              </div>

              <div className={styles.heroStage}>
                <div className={styles.heroFrame}>
                  <div
                    className={`${styles.heroArtwork} ${getCategoryCardClass(heroLead.category)}`}
                  />
                  <div className={styles.heroStageCard}>
                    <span className={styles.heroStageLabel}>Top category</span>
                    <strong className={styles.heroStageTitle}>
                      {heroLead.label}
                    </strong>
                    <p className={styles.heroStageMeta}>{heroLead.leadTitle}</p>
                  </div>
                </div>

                <div className={styles.heroRail}>
                  {records.slice(0, 3).map((record) => (
                    <Link
                      key={record.category}
                      href={ROUTES.category(record.category)}
                      className={styles.heroRailCard}
                    >
                      <span>{record.label}</span>
                      <strong>{record.count}</strong>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles.recentSection}>
              <RecentCategory
                className={styles.recentCategory}
                cardClassName={styles.recentCategoryCard}
                bodyClassName={styles.recentCategoryBody}
                titleClassName={styles.recentCategoryLabel}
                nameClassName={styles.recentCategoryName}
                textClassName={styles.recentCategoryText}
                linkClassName={styles.recentCategoryLink}
                emptyClassName={styles.recentCategoryEmpty}
                visualClassName={styles.recentCategoryVisual}
                badgeClassName={styles.recentCategoryBadge}
              />
            </section>

            <section className={styles.categoriesSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.eyebrow}>Categories</span>
                  <h2 className={styles.sectionTitle}>Choose a category</h2>
                </div>
                <p className={styles.sectionCopy}>
                  Each card shows live data and opens the full list for that
                  category.
                </p>
              </div>

              <div className={styles.categoriesGrid}>
                {records.map((record, index) => (
                  <Link
                    key={record.category}
                    href={ROUTES.category(record.category)}
                    className={`${styles.categoryCard} ${getCategoryCardClass(record.category)}`}
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className={styles.categoryCardArtwork} />
                    <div className={styles.categoryCardBody}>
                      <div className={styles.categoryCardTop}>
                        <span className={styles.categoryCardLabel}>
                          {record.label}
                        </span>
                        <span className={styles.categoryCardCount}>
                          {record.count}
                        </span>
                      </div>
                      <h3 className={styles.categoryCardTitle}>
                        {record.leadTitle}
                      </h3>
                      <p className={styles.categoryCardMeta}>
                        {record.leadMeta}
                      </p>
                      <p className={styles.categoryCardText}>
                        {record.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className={styles.banner}>
              <div className={styles.bannerLead}>
                <span className={styles.eyebrow}>Why this app</span>
                <h2 className={styles.bannerTitle}>
                  Built for simple search and clear data views
                </h2>
                <p className={styles.bannerText}>
                  Use one place to search, sort, and open details across all
                  categories.
                </p>
              </div>
              <div className={styles.bannerList}>
                <div
                  className={`${styles.bannerItem} ${styles.bannerItemLarge}`}
                >
                  <strong>Live category counts</strong>
                  <p>
                    Each category card shows current record totals from the API.
                  </p>
                </div>
                <div className={styles.bannerItem}>
                  <strong>Clear details</strong>
                  <p>
                    Open any item and check related data without losing context.
                  </p>
                </div>
                <div className={styles.bannerItem}>
                  <strong>Fast controls</strong>
                  <p>
                    Search, sort, and browse with quick feedback while data
                    updates.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
