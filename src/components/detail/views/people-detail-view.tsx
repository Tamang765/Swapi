import styles from "@/components/detail/detail.module.css";
import { EntityDetailView } from "@/components/detail/views/entity-detail-view";
import type { ResourceRecord } from "@/types/api.types";

export function PeopleDetailView(props: {
  resource: ResourceRecord;
  title: string;
}) {
  return (
    <EntityDetailView
      category="people"
      resource={props.resource}
      title={props.title}
      heroClassName={styles.heroPeople}
      heroMark="Identity Record"
      shellClassName={styles.peopleShell}
      mastheadClassName={styles.peopleMasthead}
      heroPanelClassName={styles.peopleHeroPanel}
      heroFooterClassName={styles.peopleHeroFooter}
      dossierClassName={styles.peopleDossier}
      specsClassName={styles.peopleSpecs}
      hideHeroSpotlight
    />
  );
}
