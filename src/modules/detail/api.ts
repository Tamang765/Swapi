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

const INITIAL_RELATED_ITEM_COUNT = 4;
type CardField = [string, unknown];
type RelationDefinition = {
  key: string;
  title: string;
  category: Category;
  multiple: boolean;
};

const relationMap: Record<Category, RelationDefinition[]> = {
  films: [
    { key: "characters", title: "Characters", category: "people", multiple: true },
    { key: "planets", title: "Planets", category: "planets", multiple: true },
    { key: "starships", title: "Starships", category: "starships", multiple: true },
    { key: "vehicles", title: "Vehicles", category: "vehicles", multiple: true },
    { key: "species", title: "Species", category: "species", multiple: true },
  ],
  people: [
    { key: "homeworld", title: "Homeworld", category: "planets", multiple: false },
    { key: "films", title: "Films", category: "films", multiple: true },
    { key: "species", title: "Species", category: "species", multiple: true },
    { key: "vehicles", title: "Vehicles", category: "vehicles", multiple: true },
    { key: "starships", title: "Starships", category: "starships", multiple: true },
  ],
  planets: [
    { key: "residents", title: "Residents", category: "people", multiple: true },
    { key: "films", title: "Films", category: "films", multiple: true },
  ],
  species: [
    { key: "homeworld", title: "Homeworld", category: "planets", multiple: false },
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

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function createStats(fields: CardField[]) {
  return fields
    .map(([label, value]) => createStat(label, value))
    .filter(Boolean) as RelatedEntityCard["stats"];
}

function getRelatedCardFields(category: Category, resource: ResourceRecord) {
  switch (category) {
    case "people":
      return {
        stats: [
          ["Gender", resource.gender],
          ["Birth year", resource.birth_year],
        ] satisfies CardField[],
        preview: [
          ["Height", resource.height],
          ["Mass", resource.mass],
          ["Hair color", resource.hair_color],
        ] satisfies CardField[],
      };
    case "planets":
      return {
        stats: [
          ["Climate", resource.climate],
          ["Terrain", resource.terrain],
        ] satisfies CardField[],
        preview: [
          ["Population", resource.population],
          ["Gravity", resource.gravity],
          ["Diameter", resource.diameter],
        ] satisfies CardField[],
      };
    case "starships":
      return {
        stats: [
          ["Model", resource.model],
          ["Manufacturer", resource.manufacturer],
        ] satisfies CardField[],
        preview: [
          ["Crew", resource.crew],
          ["Passengers", resource.passengers],
          ["Class", resource.starship_class],
        ] satisfies CardField[],
      };
    case "vehicles":
      return {
        stats: [
          ["Model", resource.model],
          ["Manufacturer", resource.manufacturer],
        ] satisfies CardField[],
        preview: [
          ["Crew", resource.crew],
          ["Passengers", resource.passengers],
          ["Class", resource.vehicle_class],
        ] satisfies CardField[],
      };
    case "species":
      return {
        stats: [
          ["Classification", resource.classification],
          ["Language", resource.language],
        ] satisfies CardField[],
        preview: [
          ["Designation", resource.designation],
          ["Average lifespan", resource.average_lifespan],
          ["Average height", resource.average_height],
        ] satisfies CardField[],
      };
    case "films":
      return {
        stats: [
          ["Director", resource.director],
          ["Release", resource.release_date],
        ] satisfies CardField[],
        preview: [
          ["Episode", resource.episode_id],
          ["Producer", resource.producer],
        ] satisfies CardField[],
      };
  }
}

function getRelationUrls(
  resource: ResourceRecord,
  definition: RelationDefinition,
) {
  const relationValue = resource[definition.key];

  if (definition.multiple) {
    return Array.isArray(relationValue) ? relationValue.filter(isString) : [];
  }

  return isString(relationValue) ? [relationValue] : [];
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
  const fields = getRelatedCardFields(category, resource);

  return {
    id: `${category}-${slug}`,
    href: `/${category}/${slug}`,
    title,
    categoryLabel: CATEGORY_CONFIG[category].label,
    stats: createStats(fields.stats),
    preview: createStats(fields.preview),
  };
}

export async function getRelatedCards(
  category: Category,
  urls: string[],
): Promise<RelatedEntityCard[]> {
  const items = await Promise.all(
    urls.map(async (url) =>
      mapRelatedCard(category, await fetchSwapiResourceByUrl(url)),
    ),
  );

  return items.filter(Boolean) as RelatedEntityCard[];
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
  const sections = await Promise.all(
    relationMap[category].map(async (definition) => {
      const urls = getRelationUrls(resource, definition);
      const previewUrls = urls.slice(0, INITIAL_RELATED_ITEM_COUNT);
      const items = await getRelatedCards(definition.category, previewUrls);

      return {
        id: definition.key,
        title: definition.title,
        category: definition.category,
        items,
        totalItems: urls.length,
        remainingUrls: urls.slice(INITIAL_RELATED_ITEM_COUNT),
      };
    }),
  );

  return sections.filter((section) => section.items.length > 0);
}
