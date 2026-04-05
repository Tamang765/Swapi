import { Skeleton } from "@/components/ui/skeleton";
import styles from "@/app/landing.module.css";

export function LandingLoading() {
  return (
    <div className={styles.main} aria-label="Loading landing page">
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Skeleton className={styles.loadingEyebrow} />
          <div className={styles.loadingHeroTitleWrap}>
            <Skeleton className={styles.loadingHeroTitle} />
            <Skeleton className={styles.loadingHeroTitleShort} />
          </div>
          <div className={styles.loadingHeroText}>
            <Skeleton className={styles.loadingTextLine} />
            <Skeleton className={styles.loadingTextLine} />
            <Skeleton className={styles.loadingTextLineShort} />
          </div>
          <div className={styles.loadingHeroActions}>
            <Skeleton className={styles.loadingAction} />
            <Skeleton className={styles.loadingAction} />
          </div>
          <div className={styles.loadingHeroStats}>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className={styles.loadingHeroStat}>
                <Skeleton className={styles.loadingStatLabel} />
                <Skeleton className={styles.loadingStatValue} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroStage}>
          <Skeleton className={styles.loadingHeroFrame} />
          <div className={styles.heroRail}>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className={styles.heroRailCard}>
                <Skeleton className={styles.loadingRailLabel} />
                <Skeleton className={styles.loadingRailValue} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.loadingSectionHeaderMain}>
            <Skeleton className={styles.loadingEyebrow} />
            <Skeleton className={styles.loadingSectionTitle} />
          </div>
          <div className={styles.loadingSectionCopy}>
            <Skeleton className={styles.loadingTextLine} />
            <Skeleton className={styles.loadingTextLineShort} />
          </div>
        </div>

        <div className={styles.categoriesGrid}>
          {Array.from({ length: 6 }, (_, index) => (
            <article key={index} className={styles.categoryCard}>
              <Skeleton className={styles.loadingCategoryArtwork} />
              <div className={styles.categoryCardBody}>
                <div className={styles.categoryCardTop}>
                  <Skeleton className={styles.loadingCategoryLabel} />
                  <Skeleton className={styles.loadingCategoryCount} />
                </div>
                <Skeleton className={styles.loadingCategoryTitle} />
                <Skeleton className={styles.loadingCategoryMeta} />
                <div className={styles.loadingCategoryText}>
                  <Skeleton className={styles.loadingTextLine} />
                  <Skeleton className={styles.loadingTextLineShort} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.banner}>
        <div className={styles.loadingBannerHeader}>
          <Skeleton className={styles.loadingEyebrow} />
          <Skeleton className={styles.loadingBannerTitle} />
        </div>
        <div className={styles.bannerList}>
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className={styles.bannerItem}>
              <Skeleton className={styles.loadingBannerItemTitle} />
              <Skeleton className={styles.loadingTextLine} />
              <Skeleton className={styles.loadingTextLineShort} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
