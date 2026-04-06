import { NextResponse } from "next/server";

import type { Category } from "@/constants/categories";
import { CATEGORY_CONFIG } from "@/constants/categories";
import { getRelatedCards } from "@/modules/detail/api";
import { isCategory } from "@/lib/validators";

type RelatedItemsRequest = {
  category?: string;
  urls?: string[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RelatedItemsRequest;
    const category = body.category;
    const urls = Array.isArray(body.urls)
      ? body.urls.filter((url): url is string => typeof url === "string")
      : [];

    if (!category || !isCategory(category)) {
      return NextResponse.json(
        {
          error: `Invalid category request. Use one of: ${Object.keys(
            CATEGORY_CONFIG,
          ).join(", ")}.`,
        },
        { status: 400 },
      );
    }

    const items = await getRelatedCards(category as Category, urls);

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "A network error prevented the request from completing. Please try again.",
      },
      { status: 502 },
    );
  }
}
