import styles from "@/components/detail/detail.module.css";
import { EntityDetailView } from "@/components/detail/views/entity-detail-view";
import type { ResourceRecord } from "@/types/api.types";

export function SpeciesDetailView(props: {
  resource: ResourceRecord;
  title: string;
}) {
  return (
    <EntityDetailView
      category="species"
      resource={props.resource}
      title={props.title}
      heroClassName={styles.heroSpecies}
      heroMark="Species Record"
    />
  );
}
