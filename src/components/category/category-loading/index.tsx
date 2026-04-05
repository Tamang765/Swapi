"use client";

import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "@/components/category/category.module.css";

export function CategoryLoading() {
  const params = useParams<{ category?: string }>();
  const isTransportCategory =
    params.category === "vehicles" || params.category === "starships";

  return (
    <section className={styles.content} aria-label="Loading category page">
      <div className={styles.loadingHeader}>
        <div className={styles.loadingHeaderMain}>
          <Skeleton className={styles.loadingKicker} />
          <Skeleton className={styles.loadingTitle} />
          <Skeleton className={styles.loadingText} />
        </div>
        <Skeleton className={styles.loadingCount} />
      </div>

      <div className={styles.loadingFilterBar}>
        <div className={styles.loadingFilterMeta}>
          <Skeleton className={styles.loadingLabel} />
          <Skeleton className={styles.loadingMetaValue} />
        </div>
        <div className={styles.loadingControls}>
          <Skeleton className={styles.loadingControlLarge} />
          <Skeleton className={styles.loadingControlSmall} />
        </div>
      </div>

      {isTransportCategory ? (
        <div className={styles.loadingTransportGrid}>
          {Array.from({ length: 4 }, (_, index) => (
            <article key={index} className={styles.loadingTransportCard}>
              <div className={styles.loadingTransportHeader}>
                <Skeleton className={styles.loadingCardEyebrow} />
                <Skeleton className={styles.loadingTransportTitle} />
              </div>
              <div className={styles.loadingTransportSpecs}>
                {Array.from({ length: 7 }, (_, specIndex) => (
                  <div key={specIndex} className={styles.loadingTransportSpec}>
                    <Skeleton className={styles.loadingTransportSpecLabel} />
                    <Skeleton className={styles.loadingTransportSpecValue} />
                  </div>
                ))}
              </div>
              <div className={styles.loadingTransportFooter}>
                <Skeleton className={styles.loadingTransportAction} />
                <Skeleton className={styles.loadingTransportArrow} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.loadingGrid}>
          {Array.from({ length: 6 }, (_, index) => (
            <article key={index} className={styles.loadingCard}>
              <Skeleton className={styles.loadingCardVisual} />
              <div className={styles.loadingCardBody}>
                <Skeleton className={styles.loadingCardEyebrow} />
                <Skeleton className={styles.loadingCardTitle} />
                <Skeleton className={styles.loadingCardMeta} />
                <Skeleton className={styles.loadingCardStat} />
                <Skeleton className={styles.loadingCardAction} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
