import type { ResourceRecord } from "@/types/api.types";
import { getFilmConnectedUniverse } from "@/modules/detail/api";
import { FilmUniverseClient } from "@/components/detail/film-universe-client";

export async function FilmUniverse(props: { film: ResourceRecord }) {
  const sections = await getFilmConnectedUniverse(props.film);

  return <FilmUniverseClient sections={sections} />;
}
