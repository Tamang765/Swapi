"use client";

import { useEffect, useState } from "react";

export function RouteProgress() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    window.addEventListener("beforeunload", show);
    window.addEventListener("load", hide);

    return () => {
      window.removeEventListener("beforeunload", show);
      window.removeEventListener("load", hide);
    };
  }, []);

  return isVisible ? <div className="route-progress" aria-hidden="true" /> : null;
}
