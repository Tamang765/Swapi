import styles from "@/components/detail/detail.module.css";
import { EntityDetailView } from "@/components/detail/views/entity-detail-view";
import type { Category } from "@/constants/categories";
import type { ResourceRecord } from "@/types/api.types";

export function CraftDetailView(props: {
  category: Extract<Category, "vehicles" | "starships">;
  resource: ResourceRecord;
  title: string;
}) {
  return (
    <EntityDetailView
      category={props.category}
      resource={props.resource}
      title={props.title}
      headerClassName={styles.craftHeader}
      heroClassName={
        props.category === "starships"
          ? styles.heroStarships
          : styles.heroVehicles
      }
      heroMark={
        props.category === "starships" ? "Starship Record" : "Vehicle Record"
      }
      shellClassName={styles.craftShell}
      mastheadClassName={styles.craftMasthead}
      heroPanelClassName={styles.craftHeroPanel}
      heroFooterClassName={styles.craftHeroFooter}
      dossierClassName={styles.craftDossier}
    />
  );
}
