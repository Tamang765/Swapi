import { CATEGORY_CONFIG, type Category } from "@/constants/categories";
import type { DetailHeroCallout, DetailSection } from "@/modules/detail/types";
import type { ResourceRecord } from "@/types/api.types";
import { formatResourceValue, getPrimaryValue } from "@/utils/formatters";
import { getResourceSlug } from "@/utils/slugify";

export function getDetailSections(
  category: Category,
  resource: ResourceRecord,
): DetailSection[] {
  return CATEGORY_CONFIG[category].displayFields.map((field) => ({
    label: field.label,
    value: formatResourceValue(resource[field.key]),
  }));
}

export function getDetailTitle(category: Category, resource: ResourceRecord) {
  return getPrimaryValue(resource, category);
}

function createSection(label: string, value: unknown): DetailSection {
  return {
    label,
    value: formatResourceValue(value),
  };
}

function formatEntityReference(value: unknown, fallbackLabel: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return "Unknown";
  }

  try {
    // Turn SWAPI URLs into simple labels.
    const url = new URL(value);
    const segments = url.pathname.split("/").filter(Boolean);
    const entityType = segments.at(-2);
    const entityId = segments.at(-1);

    if (!entityType || !entityId) {
      return fallbackLabel;
    }

    const typeLabel = entityType.slice(0, -1);

    return `${typeLabel.charAt(0).toUpperCase()}${typeLabel.slice(1)} #${entityId}`;
  } catch {
    const entityId = getResourceSlug(value);

    return entityId === "unknown"
      ? fallbackLabel
      : `${fallbackLabel} #${entityId}`;
  }
}

function getCoreSections(
  category: Category,
  resource: ResourceRecord,
): DetailSection[] {
  if (category === "people") {
    return [
      createSection("Birth year", resource.birth_year),
      createSection("Gender", resource.gender),
      createSection("Height", resource.height),
      createSection("Mass", resource.mass),
      createSection("Hair color", resource.hair_color),
      createSection("Skin color", resource.skin_color),
      createSection("Eye color", resource.eye_color),
      {
        label: "Homeworld",
        value: formatEntityReference(resource.homeworld, "Planet"),
      },
    ];
  }

  return getDetailSections(category, resource);
}

export function getHeroCallout(
  category: Category,
  resource: ResourceRecord,
): DetailHeroCallout | null {
  if (category === "films" && typeof resource.opening_crawl === "string") {
    const crawl = resource.opening_crawl.replace(/\r\n/g, "\n").trim();

    if (!crawl) {
      return null;
    }

    return {
      title: "Opening Crawl",
      body: crawl,
    };
  }

  return null;
}

export function getPrimaryPanels(
  category: Category,
  resource: ResourceRecord,
): {
  core: DetailSection[];
} {
  const sections = getCoreSections(category, resource);
  const heroLabels = new Set(
    getHeroStats(category, resource).map((section) => section.label),
  );

  return {
    // Do not repeat hero values in the details section.
    core: sections.filter((section) => !heroLabels.has(section.label)),
  };
}

export function getHeroStats(category: Category, resource: ResourceRecord) {
  return getCoreSections(category, resource).slice(0, 4);
}

export function getPrimaryPanelTitle(category: Category) {
  switch (category) {
    case "people":
      return "People Details";
    case "planets":
      return "Planet Details";
    case "films":
      return "Film Details";
    case "vehicles":
      return "Vehicle Details";
    case "starships":
      return "Starship Details";
    case "species":
      return "Species Details";
    default:
      return "Details";
  }
}
