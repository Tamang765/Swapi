import type { Category } from "@/constants/categories";
import { getDetailTitle } from "@/modules/detail/utils";
import type { ResourceRecord } from "@/types/api.types";

import { CraftDetailView } from "@/components/detail/views/craft-detail-view";
import { FilmDetailView } from "@/components/detail/views/film-detail-view";
import { PeopleDetailView } from "@/components/detail/views/people-detail-view";
import { PlanetsDetailView } from "@/components/detail/views/planets-detail-view";
import { SpeciesDetailView } from "@/components/detail/views/species-detail-view";

export function renderDetailView(category: Category, resource: ResourceRecord) {
  const title = getDetailTitle(category, resource);

  switch (category) {
    case "films":
      return <FilmDetailView category="films" resource={resource} title={title} />;
    case "people":
      return <PeopleDetailView resource={resource} title={title} />;
    case "planets":
      return <PlanetsDetailView resource={resource} title={title} />;
    case "species":
      return <SpeciesDetailView resource={resource} title={title} />;
    case "vehicles":
    case "starships":
      return (
        <CraftDetailView
          category={category}
          resource={resource}
          title={title}
        />
      );
    default:
      return <SpeciesDetailView resource={resource} title={title} />;
  }
}
