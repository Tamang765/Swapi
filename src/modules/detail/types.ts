export type DetailSection = {
  label: string;
  value: string;
};

export type DetailHeroCallout = {
  title: string;
  body: string;
};

export type RelatedEntityCard = {
  id: string;
  href: string;
  title: string;
  categoryLabel: string;
  stats: DetailSection[];
  preview: DetailSection[];
};

export type RelatedEntitySection = {
  id: string;
  title: string;
  items: RelatedEntityCard[];
};
