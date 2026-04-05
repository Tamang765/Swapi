"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const replace = useCallback(
    (nextParams: URLSearchParams) => {
      router.replace(`${pathname}?${nextParams.toString()}`);
    },
    [pathname, router],
  );

  return {
    current: searchParams,
    replace,
  };
}
