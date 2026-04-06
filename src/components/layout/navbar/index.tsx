"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/components/layout/layout.module.css";
import { categories, CATEGORY_CONFIG } from "@/constants/categories";
import { ROUTES } from "@/constants/routes";
import { Container } from "@/components/layout/container";
import { LinkButton } from "@/components/ui/button";
import {
  createDefaultCategoryState,
  createCategorySearchParams,
  getCategoryStateParamKey,
} from "@/modules/category/utils";
import { isCategory } from "@/lib/validators";

const navCategories = ["planets", "starships", "people", "vehicles"] as const;

function parseNavbarPage(value: string | null) {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : 1;
}

export function Navbar() {
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSearch, setCurrentSearch] = useState(
    typeof window === "undefined" ? "" : window.location.search,
  );

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    // Keep keyboard focus inside the mobile menu while it is open.
    const focusableElements = Array.from(
      mobileMenuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );

    focusableElements[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleCategorySearchChange = (event: Event) => {
      const nextSearch =
        event instanceof CustomEvent && typeof event.detail === "string"
          ? event.detail
          : "";
      setCurrentSearch(nextSearch ? `?${nextSearch}` : "");
    };

    window.addEventListener(
      "category-search-change",
      handleCategorySearchChange,
    );

    return () => {
      window.removeEventListener(
        "category-search-change",
        handleCategorySearchChange,
      );
    };
  }, []);

  const categoryHrefs = useMemo(() => {
    const [maybeCategory] = pathname.split("/").filter(Boolean);
    const baseHrefs = Object.fromEntries(
      categories.map((category) => [category, ROUTES.category(category)]),
    ) as Record<(typeof categories)[number], string>;

    if (!isCategory(maybeCategory ?? "")) {
      return baseHrefs;
    }

    const params = new URLSearchParams(currentSearch);
    const routeState = createDefaultCategoryState();

    // Preserve the current per-category state when jumping between categories.
    for (const category of categories) {
      routeState[category] = {
        search:
          params.get(getCategoryStateParamKey(category, "search"))?.trim() ??
          "",
        sort:
          params.get(getCategoryStateParamKey(category, "sort")) === "desc"
            ? "desc"
            : "asc",
        page: parseNavbarPage(
          params.get(getCategoryStateParamKey(category, "page")),
        ),
      };
    }

    return Object.fromEntries(
      categories.map((category) => [
        category,
        `${ROUTES.category(category)}?${createCategorySearchParams(
          category,
          routeState,
        ).toString()}`,
      ]),
    ) as Record<(typeof categories)[number], string>;
  }, [currentSearch, pathname]);

  const closeMenu = () => setIsMenuOpen(false);
  const [activeCategory] = pathname.split("/").filter(Boolean);
  const isCategoriesPage = pathname === ROUTES.categories;

  return (
    <header className={styles.navbar}>
      <Container className={styles.navInner}>
        <Link href={ROUTES.home} className={styles.brand} onClick={closeMenu}>
          <span className={styles.brandMark}>SWAPI Explorer</span>
          <span className={styles.brandSub}>Live API data</span>
        </Link>
        <nav className={styles.navLinks} aria-label="Primary">
          {navCategories.map((category) => (
            <Link
              key={category}
              href={categoryHrefs[category]}
              className={
                activeCategory === category ? styles.navLinkActive : ""
              }
              aria-current={activeCategory === category ? "page" : undefined}
            >
              {CATEGORY_CONFIG[category].label}
            </Link>
          ))}
        </nav>
        <div className={styles.navActions}>
          <LinkButton
            href={ROUTES.categories}
            className={`${styles.navCta} ${styles.navCtaDesktop} ${
              isCategoriesPage ? styles.navCtaActive : ""
            }`}
            aria-current={isCategoriesPage ? "page" : undefined}
          >
            Categories
          </LinkButton>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className={styles.menuButtonLabel}>
              {isMenuOpen ? "Close" : "Menu"}
            </span>
            <span className={styles.menuIcon} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <Container className={styles.mobileMenuInner}>
          <Link
            href={ROUTES.categories}
            className={styles.mobileMenuPrimary}
            onClick={closeMenu}
          >
            View All Categories
          </Link>
          <nav className={styles.mobileNav} aria-label="Mobile">
            {categories.map((category) => (
              <Link
                key={category}
                href={categoryHrefs[category]}
                className={`${styles.mobileNavLink} ${
                  activeCategory === category ? styles.mobileNavLinkActive : ""
                }`}
                aria-current={activeCategory === category ? "page" : undefined}
                onClick={closeMenu}
              >
                <span className={styles.mobileNavLabel}>
                  {CATEGORY_CONFIG[category].label}
                </span>
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
}
