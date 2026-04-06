import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderDetailView } from "@/components/detail/views";
import { getDetailResource } from "@/modules/detail/api";
import { CATEGORY_CONFIG } from "@/constants/categories";
import { isCategory } from "@/lib/validators";
import { getPrimaryValue } from "@/utils/formatters";
import { createPageMetadata } from "@/utils/seo";

export async function generateMetadata(props: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await props.params;

  if (!isCategory(category)) {
    return createPageMetadata("Details", "View SWAPI item details.");
  }

  const resource = await getDetailResource(category, slug);
  const title = getPrimaryValue(resource, category);

  return createPageMetadata(
    title,
    `View ${title} in ${CATEGORY_CONFIG[category].label.toLowerCase()} and browse related SWAPI data.`,
  );
}

export default async function DetailPage(props: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await props.params;

  if (!isCategory(category)) {
    notFound();
  }

  const resource = await getDetailResource(category, slug);

  return renderDetailView(category, resource);
}
