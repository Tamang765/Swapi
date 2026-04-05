"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/detail/detail.module.css";
import type { RelatedEntitySection } from "@/modules/detail/types";
import { Button } from "@/components/ui/button";

const INITIAL_VISIBLE_ITEMS = 4;

export function FilmUniverseClient(props: {
  sections: RelatedEntitySection[];
}) {
  const modalPanelRef = useRef<HTMLDivElement | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [activeSectionId, setActiveSectionId] = useState(
    props.sections[0]?.id ?? "",
  );
  const [modalSection, setModalSection] = useState<RelatedEntitySection | null>(
    null,
  );
  const activeSection =
    props.sections.find((section) => section.id === activeSectionId) ??
    props.sections[0];

  useEffect(() => {
    if (!activeSection && props.sections[0]) {
      setActiveSectionId(props.sections[0].id);
    }
  }, [activeSection, props.sections]);

  useEffect(() => {
    if (!modalSection) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    // Lock the page behind the modal so the focus stays on the related items
    // panel instead of the detail page moving underneath it.
    document.body.style.overflow = "hidden";
    modalCloseButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalSection(null);
        return;
      }

      if (event.key !== "Tab" || !modalPanelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        modalPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
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
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [modalSection]);

  if (!activeSection) {
    return null;
  }

  const visibleItems = activeSection.items.slice(0, INITIAL_VISIBLE_ITEMS);

  return (
    <>
      <section
        className={styles.universeExplorer}
        aria-labelledby="connected-universe-heading"
      >
        <div className={styles.universeExplorerHeader}>
          <div>
            <span className={styles.sectionEyebrow}>Related Items</span>
            <h2
              id="connected-universe-heading"
              className={styles.universeSectionTitle}
            >
              See related items
            </h2>
          </div>
          <p className={styles.universeExplorerCopy}>
            See people, planets, ships, and more from this page.
          </p>
        </div>

        <div
          className={styles.universeTabList}
          role="tablist"
          aria-label="Related item sections"
        >
          {props.sections.map((section) => {
            const isActive = section.id === activeSection.id;

            return (
              <button
                key={section.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${section.id}-panel`}
                id={`${section.id}-tab`}
                className={`${styles.universeTab} ${
                  isActive ? styles.universeTabActive : ""
                }`}
                onClick={() => setActiveSectionId(section.id)}
              >
                <span>{section.title}</span>
                <strong className={styles.universeTabCount}>
                  {section.items.length}
                </strong>
              </button>
            );
          })}
        </div>

        <div
          id={`${activeSection.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeSection.id}-tab`}
          className={styles.universePanel}
        >
          <div className={styles.universePanelHeader}>
            <p className={styles.universePanelLead}>
              Showing items from {activeSection.title.toLowerCase()}.
            </p>
            {activeSection.items.length > INITIAL_VISIBLE_ITEMS ? (
              <Button
                type="button"
                className={styles.universeToggle}
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setModalSection(activeSection);
                }}
              >
                See All
              </Button>
            ) : null}
          </div>

          <div className={styles.universeGrid}>
            <div className={styles.universeCardRail}>
              {visibleItems.map((item, index) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={styles.universeCard}
                >
                  <div className={styles.universeCardVisual}>
                    <span className={styles.universeCardIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={styles.universeCardBody}>
                    <span className={styles.universeCardCategory}>
                      {item.categoryLabel}
                    </span>
                    <h3 className={styles.universeCardTitle}>{item.title}</h3>
                    <dl className={styles.universeCardStats}>
                      {item.stats.slice(0, 2).map((stat) => (
                        <div
                          key={`${item.id}-${stat.label}`}
                          className={styles.universeCardStat}
                        >
                          <dt>{stat.label}</dt>
                          <dd>{stat.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className={styles.universeCardFooter}>
                    <span className={styles.universeCardAction}>View Item</span>
                    <span
                      className={styles.universeCardArrow}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {modalSection ? (
        <div
          className={styles.universeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="universe-modal-heading"
          onClick={() => setModalSection(null)}
        >
          <div
            className={styles.universeModalPanel}
            ref={modalPanelRef}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.universeModalHeader}>
              <div>
                <span className={styles.sectionEyebrow}>Related Items</span>
                <h2
                  id="universe-modal-heading"
                  className={styles.universePageTitle}
                >
                  {modalSection.title}
                </h2>
              </div>
              <Button
                type="button"
                ref={modalCloseButtonRef}
                className={styles.universeModalClose}
                onClick={() => setModalSection(null)}
              >
                Close
              </Button>
            </div>

            <div className={styles.universePageGrid}>
              {modalSection.items.map((item, index) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={styles.universePageCard}
                >
                  <div className={styles.universeCardVisual}>
                    <div className={styles.universeCardTopline}>
                      <span className={styles.universeCardCategory}>
                        {item.categoryLabel}
                      </span>
                      <span className={styles.universeCardIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className={styles.universeCardMark}>Item View</span>
                  </div>
                  <div className={styles.universeCardBody}>
                    <h3 className={styles.universeCardTitle}>{item.title}</h3>
                    <dl className={styles.universeCardStats}>
                      {item.stats.slice(0, 2).map((stat) => (
                        <div
                          key={`${item.id}-${stat.label}`}
                          className={styles.universeCardStat}
                        >
                          <dt>{stat.label}</dt>
                          <dd>{stat.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className={styles.universeCardPreview}>
                      {item.preview[0]?.value ?? "Open archive record"}
                    </p>
                  </div>
                  <div className={styles.universeCardFooter}>
                    <span className={styles.universeCardAction}>View Item</span>
                    <span
                      className={styles.universeCardArrow}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
