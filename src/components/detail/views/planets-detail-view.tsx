import styles from "@/components/detail/detail.module.css";
import { EntityDetailView } from "@/components/detail/views/entity-detail-view";
import type { ResourceRecord } from "@/types/api.types";

export function PlanetsDetailView(props: {
  resource: ResourceRecord;
  title: string;
}) {
  return (
    <EntityDetailView
      category="planets"
      resource={props.resource}
      title={props.title}
      heroClassName={styles.heroPlanets}
      heroMark="World Record"
    />
  );
}
