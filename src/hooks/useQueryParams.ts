"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const isPending =
    pendingQuery !== null && pendingQuery !== searchParams.toString();

  const replace = useCallback(
    (nextParams: URLSearchParams) => {
      const nextQuery = nextParams.toString();

      if (nextQuery === searchParams.toString()) {
        return;
      }

      setPendingQuery(nextQuery);
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  return {
    current: searchParams,
    isPending,
    replace,
  };
}
