export const categories = [
  "films",
  "people",
  "planets",
  "species",
  "vehicles",
  "starships",
] as const;

export type Category = (typeof categories)[number];

export type DisplayField = {
  key: string;
  label: string;
};

export type CategoryConfig = {
  label: string;
  description: string;
  searchPlaceholder: string;
  sortField: "name" | "title";
  displayFields: DisplayField[];
};

export const CATEGORY_CONFIG: Record<Category, CategoryConfig> = {
  films: {
    label: "Films",
    description: "View film titles, release dates, and production details.",
    searchPlaceholder: "Search films by title...",
    sortField: "title",
    displayFields: [
      { key: "title", label: "Title" },
      { key: "episode_id", label: "Episode" },
      { key: "director", label: "Director" },
      { key: "producer", label: "Producer" },
      { key: "release_date", label: "Release date" },
    ],
  },
  people: {
    label: "People",
    description: "View names, birth years, gender, height, and mass.",
    searchPlaceholder: "Search characters by name...",
    sortField: "name",
    displayFields: [
      { key: "name", label: "Name" },
      { key: "birth_year", label: "Birth year" },
      { key: "gender", label: "Gender" },
      { key: "height", label: "Height" },
      { key: "mass", label: "Mass" },
    ],
  },
  planets: {
    label: "Planets",
    description: "View climate, terrain, population, and diameter.",
    searchPlaceholder: "Search planets by name...",
    sortField: "name",
    displayFields: [
      { key: "name", label: "Name" },
      { key: "climate", label: "Climate" },
      { key: "terrain", label: "Terrain" },
      { key: "population", label: "Population" },
      { key: "diameter", label: "Diameter" },
    ],
  },
  species: {
    label: "Species",
    description: "View classification, language, and average lifespan.",
    searchPlaceholder: "Search species by name...",
    sortField: "name",
    displayFields: [
      { key: "name", label: "Name" },
      { key: "classification", label: "Classification" },
      { key: "designation", label: "Designation" },
      { key: "language", label: "Language" },
      { key: "average_lifespan", label: "Average lifespan" },
    ],
  },
  vehicles: {
    label: "Vehicles",
    description: "View model, maker, cost, crew, and cargo details.",
    searchPlaceholder: "Search vehicles by name...",
    sortField: "name",
    displayFields: [
      { key: "name", label: "Name" },
      { key: "model", label: "Model" },
      { key: "manufacturer", label: "Manufacturer" },
      { key: "cost_in_credits", label: "Cost in credits" },
      { key: "length", label: "Length" },
      { key: "crew", label: "Crew" },
      { key: "passengers", label: "Passengers" },
      { key: "cargo_capacity", label: "Cargo capacity" },
    ],
  },
  starships: {
    label: "Starships",
    description: "View model, maker, cost, crew, and cargo details.",
    searchPlaceholder: "Search starships by name...",
    sortField: "name",
    displayFields: [
      { key: "name", label: "Name" },
      { key: "model", label: "Model" },
      { key: "manufacturer", label: "Manufacturer" },
      { key: "cost_in_credits", label: "Cost in credits" },
      { key: "length", label: "Length" },
      { key: "crew", label: "Crew" },
      { key: "passengers", label: "Passengers" },
      { key: "cargo_capacity", label: "Cargo capacity" },
    ],
  },
};
