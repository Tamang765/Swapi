import type { DetailPageData } from "@/modules/detail/types";

export async function getDetailPageData(): Promise<DetailPageData> {
  return {
    title: "Detail item",
    resource: {},
  };
}
