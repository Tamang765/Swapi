"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Any pathname or query change means the new state landed, so we can stop
    // showing the local pending UI for the category page controls.
    setIsPending(false);
  }, [pathname, searchParams]);

  const replace = useCallback(
    (nextParams: URLSearchParams) => {
      if (nextParams.toString() === searchParams.toString()) {
        return;
      }

      setIsPending(true);
      window.dispatchEvent(
        new CustomEvent("category-search-change", {
          detail: nextParams.toString(),
        }),
      );
      router.replace(`${pathname}?${nextParams.toString()}`, {
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
