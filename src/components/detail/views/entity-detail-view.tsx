import { ConnectedUniverse } from "@/components/detail/connected-universe";
import { DetailHeader } from "@/components/detail/detail-header";
import { DetailSpecs } from "@/components/detail/detail-specs";
import styles from "@/components/detail/detail.module.css";
import { CATEGORY_CONFIG, type Category } from "@/constants/categories";
import {
  getHeroCallout,
  getHeroStats,
  getPrimaryPanelTitle,
  getPrimaryPanels,
} from "@/modules/detail/utils";
import type { ResourceRecord } from "@/types/api.types";

export function EntityDetailView(props: {
  category: Category;
  resource: ResourceRecord;
  title: string;
  headerClassName?: string;
  heroClassName?: string;
  heroMark?: string;
  shellClassName?: string;
  mastheadClassName?: string;
  heroPanelClassName?: string;
  heroFooterClassName?: string;
  dossierClassName?: string;
  specsClassName?: string;
  hideHeroSpotlight?: boolean;
}) {
  const heroStats = getHeroStats(props.category, props.resource);
  const heroCallout = getHeroCallout(props.category, props.resource);
  const panels = getPrimaryPanels(props.category, props.resource);
  const heroSpotlight = props.hideHeroSpotlight ? [] : panels.core.slice(0, 2);
  const detailSections = props.hideHeroSpotlight
    ? panels.core
    : panels.core.slice(2);

  return (
    <section className={`${styles.shell} ${props.shellClassName ?? ""}`.trim()}>
      <section
        className={`${styles.masthead} ${props.mastheadClassName ?? ""}`.trim()}
      >
        <DetailHeader
          categoryLabel={CATEGORY_CONFIG[props.category].label}
          categoryPath={props.category}
          title={props.title}
          heroStats={heroStats}
          className={props.headerClassName}
        />
        <section
          className={`${styles.heroPanel} ${props.heroPanelClassName ?? ""}`.trim()}
          aria-label={`${props.title} archive visual`}
        >
          <div className={`${styles.heroImage} ${props.heroClassName ?? ""}`}>
            <div className={styles.heroArtwork} aria-hidden="true" />
            <span className={styles.heroCraftMark}>
              {props.heroMark ?? CATEGORY_CONFIG[props.category].label}
            </span>
          </div>
          <div
            className={`${styles.heroFooter} ${props.heroFooterClassName ?? ""}`.trim()}
          >
            {heroCallout ? (
              <div className={styles.heroCallout}>
                <span className={styles.metaLabel}>{heroCallout.title}</span>
                <p className={styles.heroCalloutText}>{heroCallout.body}</p>
              </div>
            ) : heroSpotlight.length > 0 ? (
              <dl className={styles.heroSpotlight}>
                {heroSpotlight.map((item) => (
                  <div key={item.label} className={styles.heroSpotlightItem}>
                    <dt className={styles.metaLabel}>{item.label}</dt>
                    <dd className={styles.heroSpotlightValue}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </section>
      </section>

      <div
        className={`${styles.dossier} ${props.dossierClassName ?? ""}`.trim()}
      >
        <DetailSpecs
          title={getPrimaryPanelTitle(props.category)}
          sections={detailSections}
          className={props.specsClassName}
        />
      </div>

      <ConnectedUniverse category={props.category} resource={props.resource} />
    </section>
  );
}
