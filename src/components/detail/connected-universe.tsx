import type { Category } from "@/constants/categories";
import type { ResourceRecord } from "@/types/api.types";
import { getConnectedUniverse } from "@/modules/detail/api";
import { FilmUniverseClient } from "@/components/detail/film-universe-client";

export async function ConnectedUniverse(props: {
  category: Category;
  resource: ResourceRecord;
}) {
  const sections = await getConnectedUniverse(props.category, props.resource);

  return <FilmUniverseClient sections={sections} />;
}
