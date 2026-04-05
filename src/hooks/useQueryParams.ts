"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(false);
  }, [pathname, searchParams]);

  const replace = useCallback(
    (nextParams: URLSearchParams) => {
      setIsPending(true);
      router.replace(`${pathname}?${nextParams.toString()}`);
    },
    [pathname, router],
  );

  return {
    current: searchParams,
    isPending,
    replace,
  };
}
