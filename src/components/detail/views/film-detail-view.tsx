import { DetailHeader } from "@/components/detail/detail-header";
import { FilmUniverse } from "@/components/detail/film-universe";
import styles from "@/components/detail/detail.module.css";
import { CATEGORY_CONFIG } from "@/constants/categories";
import { getHeroCallout } from "@/modules/detail/utils";
import type { ResourceRecord } from "@/types/api.types";

export function FilmDetailView(props: {
  category: "films";
  resource: ResourceRecord;
  title: string;
}) {
  const heroCallout = getHeroCallout(props.category, props.resource);
  const releaseYear =
    typeof props.resource.release_date === "string"
      ? props.resource.release_date.slice(0, 4)
      : null;
  const episode =
    typeof props.resource.episode_id === "number"
      ? `Episode ${props.resource.episode_id}`
      : null;

  return (
    <section className={styles.shell}>
      <section className={styles.masthead}>
        <DetailHeader
          categoryLabel={CATEGORY_CONFIG[props.category].label}
          categoryPath={props.category}
          title={props.title}
          heroStats={[
            ...(episode ? [{ label: "Episode", value: episode }] : []),
            ...(releaseYear
              ? [{ label: "Release year", value: releaseYear }]
              : []),
            ...(typeof props.resource.director === "string"
              ? [{ label: "Director", value: props.resource.director }]
              : []),
            ...(typeof props.resource.producer === "string"
              ? [{ label: "Producer", value: props.resource.producer }]
              : []),
          ]}
        />

        <section
          className={styles.heroPanel}
          aria-label={`${props.title} archive visual`}
        >
          <div className={`${styles.heroImage} ${styles.heroFilms}`}>
            <div className={styles.heroCraft} aria-hidden="true">
              <span className={styles.heroCraftMark}>Film Archive</span>
            </div>
          </div>
        </section>
      </section>

      {heroCallout ? (
        <section
          className={styles.crawlSection}
          aria-labelledby="opening-crawl-heading"
        >
          <div className={styles.crawlHeader}>
            <span className={styles.sectionEyebrow}>Opening Crawl</span>
            <h2 id="opening-crawl-heading" className={styles.crawlTitle}>
              Cinematic Introduction
            </h2>
          </div>
          <div className={styles.crawlFrame}>
            <p className={styles.crawlText}>{heroCallout.body}</p>
          </div>
        </section>
      ) : null}

      <FilmUniverse film={props.resource} />
    </section>
  );
}
