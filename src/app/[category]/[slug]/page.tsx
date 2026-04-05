import { notFound } from "next/navigation";
import { renderDetailView } from "@/components/detail/views";
import { getDetailResource } from "@/modules/detail/api";
import { isCategory } from "@/lib/validators";

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
