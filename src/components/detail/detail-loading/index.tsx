import { Skeleton } from "@/components/ui/skeleton";
import styles from "@/components/detail/detail.module.css";

export function DetailLoading() {
  return (
    <section className={styles.shell} aria-label="Loading detail page">
      <section className={styles.masthead}>
        <section className={styles.header}>
          <div className={styles.loadingDetailTop}>
            <Skeleton className={styles.loadingDetailRoute} />
            <Skeleton className={styles.loadingDetailButton} />
          </div>
          <div className={styles.loadingDetailTitleWrap}>
            <Skeleton className={styles.loadingDetailTitle} />
          </div>
          <div className={styles.loadingDetailMetaGrid}>
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className={styles.loadingDetailMetaItem}>
                <Skeleton className={styles.loadingDetailMetaLabel} />
                <Skeleton className={styles.loadingDetailMetaValue} />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.heroPanel}>
          <Skeleton className={styles.loadingDetailHero} />
          <div className={styles.loadingDetailHeroFooter}>
            <Skeleton className={styles.loadingDetailHeroStat} />
            <Skeleton className={styles.loadingDetailHeroStat} />
          </div>
        </section>
      </section>

      <section className={styles.infoPanel}>
        <div className={`${styles.panelHeader} ${styles.loadingPanelHeader}`}>
          <Skeleton className={styles.loadingDetailSectionTitle} />
        </div>
        <div className={styles.loadingDetailSpecs}>
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className={styles.loadingDetailSpecRow}>
              <Skeleton className={styles.loadingDetailSpecLabel} />
              <Skeleton className={styles.loadingDetailSpecValue} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.universeExplorer}>
        <div className={styles.universeExplorerHeader}>
          <div className={styles.loadingDetailUniverseHeading}>
            <Skeleton className={styles.loadingDetailKicker} />
            <Skeleton className={styles.loadingDetailSectionTitle} />
          </div>
          <div className={styles.loadingDetailUniverseCopy}>
            <Skeleton className={styles.loadingDetailTextLine} />
            <Skeleton className={styles.loadingDetailTextLineShort} />
          </div>
        </div>

        <div className={styles.loadingDetailTabs}>
          <Skeleton className={styles.loadingDetailTab} />
          <Skeleton className={styles.loadingDetailTab} />
          <Skeleton className={styles.loadingDetailTab} />
        </div>

        <div className={styles.loadingDetailCards}>
          {Array.from({ length: 4 }, (_, index) => (
            <article key={index} className={styles.loadingDetailCard}>
              <Skeleton className={styles.loadingDetailCardVisual} />
              <div className={styles.loadingDetailCardBody}>
                <Skeleton className={styles.loadingDetailCardLabel} />
                <Skeleton className={styles.loadingDetailCardTitle} />
                <Skeleton className={styles.loadingDetailCardStat} />
                <Skeleton className={styles.loadingDetailCardStatShort} />
                <Skeleton className={styles.loadingDetailCardAction} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
