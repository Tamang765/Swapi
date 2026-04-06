import Link from "next/link";
import styles from "@/components/category/category.module.css";
import type { Category } from "@/constants/categories";
import type { ResourceRecord } from "@/types/api.types";
import { ROUTES } from "@/constants/routes";
import { formatResourceValue, getPrimaryValue } from "@/utils/formatters";
import { getResourceSlug } from "@/utils/slugify";

const transportFields = [
  { key: "model", label: "Model" },
  { key: "manufacturer", label: "Manufacturer" },
  { key: "cost_in_credits", label: "Cost in credits" },
  { key: "length", label: "Length" },
  { key: "crew", label: "Crew" },
  { key: "passengers", label: "Passengers" },
  { key: "cargo_capacity", label: "Cargo capacity" },
] as const;

export function CategoryTransportTable(props: {
  category: Extract<Category, "vehicles" | "starships">;
  items: ResourceRecord[];
}) {
  const categoryLabel = props.category === "vehicles" ? "Vehicle" : "Starship";

  return (
    <div className={styles.transportGrid}>
      {props.items.map((item) => {
        const slug = getResourceSlug(item.url);

        return (
          <Link
            key={String(item.url ?? slug)}
            href={ROUTES.detail(props.category, slug)}
            className={styles.transportCard}
          >
            <div
              className={`${styles.transportCardVisual} ${
                props.category === "vehicles"
                  ? styles.transportVisualVehicles
                  : styles.transportVisualStarships
              }`}
              aria-hidden="true"
            />
            <div className={styles.transportCardHeader}>
              <span className={styles.transportCardLabel}>{categoryLabel}</span>
              <h3 className={styles.transportCardTitle}>
                {getPrimaryValue(item, props.category)}
              </h3>
            </div>

            <dl className={styles.transportCardSpecs}>
              {transportFields.map((field) => (
                <div key={field.key} className={styles.transportCardSpec}>
                  <dt>{field.label}</dt>
                  <dd>{formatResourceValue(item[field.key])}</dd>
                </div>
              ))}
            </dl>

            <div className={styles.transportCardFooter}>
              <span className={styles.cardAction}>View record</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
