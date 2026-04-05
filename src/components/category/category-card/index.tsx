import Link from "next/link";
import { Card } from "@/components/ui/card";
import styles from "@/components/category/category.module.css";
import { CATEGORY_CONFIG, type Category } from "@/constants/categories";
import type { ResourceRecord } from "@/types/api.types";
import { ROUTES } from "@/constants/routes";
import { formatResourceValue, getPrimaryValue } from "@/utils/formatters";
import { getResourceSlug } from "@/utils/slugify";

function getCountLabel(resource: ResourceRecord, key: string, label: string) {
  const value = resource[key];

  if (!Array.isArray(value)) {
    return null;
  }

  return {
    label,
    value: `${value.length}`,
  };
}

function getSupplementaryStats(category: Category, resource: ResourceRecord) {
  if (category === "films") {
    return [
      getCountLabel(resource, "characters", "Characters"),
      getCountLabel(resource, "planets", "Planets"),
      getCountLabel(resource, "starships", "Starships"),
      getCountLabel(resource, "vehicles", "Vehicles"),
      getCountLabel(resource, "species", "Species"),
    ].filter(Boolean) as Array<{ label: string; value: string }>;
  }

  return [
    getCountLabel(resource, "films", "Films"),
    getCountLabel(resource, "residents", "Residents"),
    getCountLabel(resource, "pilots", "Pilots"),
  ].filter(Boolean) as Array<{ label: string; value: string }>;
}

function getPrimaryMeta(category: Category, resource: ResourceRecord) {
  if (category === "films") {
    return { label: "Director", value: formatResourceValue(resource.director) };
  }

  if (category === "planets") {
    return { label: "Climate", value: formatResourceValue(resource.climate) };
  }

  const field = CATEGORY_CONFIG[category].displayFields[1];

  return field
    ? {
        label: field.label,
        value: formatResourceValue(resource[field.key]),
      }
    : null;
}

export function CategoryCard(props: {
  category: Category;
  resource: ResourceRecord;
}) {
  const { category, resource } = props;
  const config = CATEGORY_CONFIG[category];
  const primaryValue = getPrimaryValue(resource, category);
  const slug = getResourceSlug(resource.url);
  const supplementaryStat =
    getSupplementaryStats(category, resource)[0] ?? null;
  const primaryMeta = getPrimaryMeta(category, resource);

  return (
    <Link
      href={ROUTES.detail(category, slug)}
      className={styles.cardLink}
    >
      <Card
        className={category === "films" ? styles.filmCard : styles.resourceCard}
      >
      <div
        className={`${styles.cardVisual} ${styles[`visual${category[0].toUpperCase()}${category.slice(1)}`] ?? ""}`}
        aria-hidden="true"
      />
      <header className={styles.cardHeader}>
        <span className={styles.cardEyebrow}>{config.label}</span>
        <h2 className={styles.cardTitle}>{primaryValue}</h2>
      </header>
      {primaryMeta ? (
        <dl className={styles.cardMeta}>
          <div className={styles.cardMetaRow}>
            <dt className={styles.term}>{primaryMeta.label}</dt>
            <dd className={styles.cardMetaValue}>{primaryMeta.value}</dd>
          </div>
        </dl>
      ) : null}
      {supplementaryStat ? (
        <div
          className={styles.cardStatInline}
          aria-label="Related record summary"
        >
          <span className={styles.cardStatValue}>
            {supplementaryStat.value}
          </span>
          <span className={styles.cardStatLabel}>
            {supplementaryStat.label}
          </span>
        </div>
      ) : null}
      <div className={styles.cardFooter}>
        <span className={styles.cardAction}>View Record</span>
      </div>
      </Card>
    </Link>
  );
}
