import type { Category } from "@/constants/categories";
import { CATEGORY_CONFIG } from "@/constants/categories";
import {
  fetchSwapiResourceByUrl,
  fetchSwapiResourceDetail,
} from "@/services/swapi.service";
import type { ResourceRecord } from "@/types/api.types";
import type {
  RelatedEntityCard,
  RelatedEntitySection,
} from "@/modules/detail/types";
import { getPrimaryValue } from "@/utils/formatters";
import { getResourceSlug } from "@/utils/slugify";

export async function getDetailResource(category: Category, slug: string) {
  return fetchSwapiResourceDetail(category, slug);
}

function createStat(label: string, value: unknown) {
  if (
    typeof value !== "string" ||
    value.trim().length === 0 ||
    value === "unknown"
  ) {
    return null;
  }

  return {
    label,
    value,
  };
}

function mapRelatedCard(
  category: Category,
  resource: ResourceRecord,
): RelatedEntityCard | null {
  const url = typeof resource.url === "string" ? resource.url : null;

  if (!url) {
    return null;
  }

  const slug = getResourceSlug(url);
  const title = getPrimaryValue(resource, category);

  // Keep related cards short for each category.
  const config: Record<
    Category,
    { stats: Array<[string, unknown]>; preview: Array<[string, unknown]> }
  > = {
    people: {
      stats: [
        ["Gender", resource.gender],
        ["Birth year", resource.birth_year],
      ],
      preview: [
        ["Height", resource.height],
        ["Mass", resource.mass],
        ["Hair color", resource.hair_color],
      ],
    },
    planets: {
      stats: [
        ["Climate", resource.climate],
        ["Terrain", resource.terrain],
      ],
      preview: [
        ["Population", resource.population],
        ["Gravity", resource.gravity],
        ["Diameter", resource.diameter],
      ],
    },
    starships: {
      stats: [
        ["Model", resource.model],
        ["Manufacturer", resource.manufacturer],
      ],
      preview: [
        ["Crew", resource.crew],
        ["Passengers", resource.passengers],
        ["Class", resource.starship_class],
      ],
    },
    vehicles: {
      stats: [
        ["Model", resource.model],
        ["Manufacturer", resource.manufacturer],
      ],
      preview: [
        ["Crew", resource.crew],
        ["Passengers", resource.passengers],
        ["Class", resource.vehicle_class],
      ],
    },
    species: {
      stats: [
        ["Classification", resource.classification],
        ["Language", resource.language],
      ],
      preview: [
        ["Designation", resource.designation],
        ["Average lifespan", resource.average_lifespan],
        ["Average height", resource.average_height],
      ],
    },
    films: {
      stats: [
        ["Director", resource.director],
        ["Release", resource.release_date],
      ],
      preview: [
        ["Episode", resource.episode_id],
        ["Producer", resource.producer],
      ],
    },
  };

  const definition = config[category];

  return {
    id: `${category}-${slug}`,
    href: `/${category}/${slug}`,
    title,
    categoryLabel: CATEGORY_CONFIG[category].label,
    stats: definition.stats
      .map(([label, value]) => createStat(label, value))
      .filter(Boolean) as RelatedEntityCard["stats"],
    preview: definition.preview
      .map(([label, value]) => createStat(label, value))
      .filter(Boolean) as RelatedEntityCard["preview"],
  };
}

export async function getFilmConnectedUniverse(
  film: ResourceRecord,
): Promise<RelatedEntitySection[]> {
  return getConnectedUniverse("films", film);
}

export async function getConnectedUniverse(
  category: Category,
  resource: ResourceRecord,
): Promise<RelatedEntitySection[]> {
  // Match SWAPI relation keys to UI sections.
  const relationMap: Record<
    Category,
    Array<{ key: string; title: string; category: Category; multiple: boolean }>
  > = {
    films: [
      {
        key: "characters",
        title: "Characters",
        category: "people",
        multiple: true,
      },
      { key: "planets", title: "Planets", category: "planets", multiple: true },
      {
        key: "starships",
        title: "Starships",
        category: "starships",
        multiple: true,
      },
      {
        key: "vehicles",
        title: "Vehicles",
        category: "vehicles",
        multiple: true,
      },
      { key: "species", title: "Species", category: "species", multiple: true },
    ],
    people: [
      {
        key: "homeworld",
        title: "Homeworld",
        category: "planets",
        multiple: false,
      },
      { key: "films", title: "Films", category: "films", multiple: true },
      { key: "species", title: "Species", category: "species", multiple: true },
      {
        key: "vehicles",
        title: "Vehicles",
        category: "vehicles",
        multiple: true,
      },
      {
        key: "starships",
        title: "Starships",
        category: "starships",
        multiple: true,
      },
    ],
    planets: [
      {
        key: "residents",
        title: "Residents",
        category: "people",
        multiple: true,
      },
      { key: "films", title: "Films", category: "films", multiple: true },
    ],
    species: [
      {
        key: "homeworld",
        title: "Homeworld",
        category: "planets",
        multiple: false,
      },
      { key: "people", title: "People", category: "people", multiple: true },
      { key: "films", title: "Films", category: "films", multiple: true },
    ],
    vehicles: [
      { key: "pilots", title: "Pilots", category: "people", multiple: true },
      { key: "films", title: "Films", category: "films", multiple: true },
    ],
    starships: [
      { key: "pilots", title: "Pilots", category: "people", multiple: true },
      { key: "films", title: "Films", category: "films", multiple: true },
    ],
  };

  const sections = await Promise.all(
    relationMap[category].map(async (definition) => {
      const relationValue = resource[definition.key];
      // Turn single and list relations into one URL list.
      const urls = definition.multiple
        ? Array.isArray(relationValue)
          ? relationValue.filter(
              (value): value is string => typeof value === "string",
            )
          : []
        : typeof relationValue === "string"
          ? [relationValue]
          : [];

      const items = await Promise.all(
        urls.map(async (url) =>
          mapRelatedCard(
            definition.category,
            await fetchSwapiResourceByUrl(url),
          ),
        ),
      );

      return {
        id: definition.key,
        title: definition.title,
        items: items.filter(Boolean) as RelatedEntityCard[],
      };
    }),
  );

  return sections.filter((section) => section.items.length > 0);
}
