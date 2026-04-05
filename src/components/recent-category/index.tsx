"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORY_CONFIG } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import { RECENT_CATEGORY_COOKIE } from "@/lib/config";
import { isCategory } from "@/lib/validators";

type RecentCategoryProps = {
  className?: string;
  cardClassName?: string;
  bodyClassName?: string;
  titleClassName?: string;
  nameClassName?: string;
  textClassName?: string;
  linkClassName?: string;
  emptyClassName?: string;
  visualClassName?: string;
  badgeClassName?: string;
};

function readCookie(name: string) {
  const match = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&")}=([^;]*)`,
    ),
  );

  return match ? decodeURIComponent(match[1]) : "";
}

export function RecentCategory(props: RecentCategoryProps) {
  const pathname = usePathname();
  const [recentCategory, setRecentCategory] = useState("");

  useEffect(() => {
    // Re-read the cookie after navigation so the landing page stays in sync.
    setRecentCategory(readCookie(RECENT_CATEGORY_COOKIE));
  }, [pathname]);

  return (
    <div className={props.className}>
      {isCategory(recentCategory) ? (
        <div className={props.cardClassName}>
          <div className={props.bodyClassName}>
            <span className={props.titleClassName}>Recent</span>
            <strong className={props.nameClassName}>
              {CATEGORY_CONFIG[recentCategory].label}
            </strong>
            <p className={props.textClassName}>
              Open the last category you viewed.
            </p>
            <Link
              href={ROUTES.category(recentCategory)}
              className={props.linkClassName}
            >
              Open category
            </Link>
          </div>
          <div
            className={props.visualClassName}
            style={{
              backgroundImage: `url(/art/categories/${recentCategory}.svg)`,
            }}
          >
            <span className={props.badgeClassName}>Last viewed</span>
          </div>
        </div>
      ) : (
        <div className={props.cardClassName}>
          <div className={props.bodyClassName}>
            <span className={props.titleClassName}>Recent</span>
            <strong className={props.nameClassName}>No recent category</strong>
            <p className={props.textClassName}>
              Open a category and it will show here.
            </p>
            <span className={props.emptyClassName}>Nothing yet</span>
          </div>
          <div className={props.visualClassName}>
            <span className={props.badgeClassName}>Open a category</span>
          </div>
        </div>
      )}
    </div>
  );
}
