import { NextResponse } from "next/server";

import { CATEGORY_CONFIG, type Category } from "@/constants/categories";
import { DEFAULT_PAGE_SIZE } from "@/constants/ui";
import { getCategoryListing } from "@/modules/category/api";
import type { SortDirection } from "@/types/common.types";
import { isCategory, parsePositiveInteger } from "@/lib/validators";

type RouteContext = {
  params: Promise<{
    category: string;
  }>;
};

const MAX_PAGE_SIZE = 24;

export async function GET(request: Request, context: RouteContext) {
  const { category } = await context.params;

  if (!isCategory(category)) {
    return NextResponse.json(
      {
        error: `Invalid category request. Use one of: ${Object.keys(
          CATEGORY_CONFIG,
        ).join(", ")}.`,
      },
      { status: 400 },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
    const sortParam = searchParams.get("sort");
    const sort: SortDirection = sortParam === "desc" ? "desc" : "asc";
    const requestedPage = parsePositiveInteger(searchParams.get("page"), 1);
    const pageSize = Math.min(
      parsePositiveInteger(searchParams.get("pageSize"), DEFAULT_PAGE_SIZE),
      MAX_PAGE_SIZE,
    );

    const result = await getCategoryListing({
      category: category as Category,
      page: requestedPage,
      pageSize,
      search,
      sort,
    });

    return NextResponse.json(result);
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
