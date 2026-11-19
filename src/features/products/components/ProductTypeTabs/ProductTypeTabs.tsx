"use client";

import { Fragment } from "react";
import { PRODUCT_TYPE_FILTERS } from "../../constants";
import type { ProductTypeFilter } from "../../types";
import styles from "./ProductTypeTabs.module.css";

interface ProductTypeTabsProps {
  value: ProductTypeFilter;
  onChange: (value: ProductTypeFilter) => void;
}

export default function ProductTypeTabs({ value, onChange }: ProductTypeTabsProps) {
  return (
    <div className={styles.tabs} role="group" aria-label="상품 유형 필터">
      {PRODUCT_TYPE_FILTERS.map((filter, index) => {
        const active = filter.value === value;
        return (
          <Fragment key={filter.value}>
            {index > 0 && (
              <span className={styles.divider} aria-hidden="true">
                |
              </span>
            )}
            <button
              type="button"
              className={active ? `${styles.tab} ${styles.active}` : styles.tab}
              aria-pressed={active}
              onClick={() => onChange(filter.value)}
            >
              {filter.label}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
