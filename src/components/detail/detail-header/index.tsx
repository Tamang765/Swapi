import Link from "next/link";
import styles from "@/components/detail/detail.module.css";
import { ROUTES } from "@/constants/routes";
import type { DetailSection } from "@/modules/detail/types";
import { LinkButton } from "@/components/ui/button";

export function DetailHeader(props: {
  categoryLabel: string;
  title: string;
  categoryPath: string;
  heroStats: DetailSection[];
  className?: string;
}) {
  return (
    <header className={`${styles.header} ${props.className ?? ""}`.trim()}>
      <div className={styles.headerTop}>
        <div className={styles.headerRoute}>
          <Link
            href={ROUTES.category(props.categoryPath)}
            className={styles.backLink}
          >
            {props.categoryLabel}
          </Link>
          <span className={styles.headerDivider} aria-hidden="true">
            /
          </span>
          <span className={styles.headerCurrent}>Details</span>
        </div>
        <LinkButton
          href={ROUTES.category(props.categoryPath)}
          className={styles.headerTag}
        >
          Back to List
        </LinkButton>
      </div>
      <div className={styles.titleWrap}>
        {/*<p className={styles.headerEyebrow}>{props.categoryLabel}</p>*/}
        <h1 className={styles.title}>{props.title}</h1>
      </div>
      {props.heroStats.length > 0 ? (
        <dl className={styles.metaBar}>
          {props.heroStats.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <dt className={styles.metaLabel}>{item.label}</dt>
              <dd className={styles.metaValue}>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
}
