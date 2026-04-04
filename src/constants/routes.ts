export const ROUTES = {
  home: "/",
  categories: "/categories",
  category: (category: string) => `/${category}`,
  detail: (category: string, slug: string) => `/${category}/${slug}`,
} as const;
