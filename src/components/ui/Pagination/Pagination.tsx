"use client";

import Image from "next/image";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  pageRange?: number;
}

function getPageNumbers(current: number, total: number, range: number): number[] {
  const groupStart = Math.floor((current - 1) / range) * range + 1;
  const groupEnd = Math.min(groupStart + range - 1, total);
  return Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i);
}

export default function Pagination({ currentPage, totalPages, onChange, pageRange = 5 }: PaginationProps) {
  if (totalPages < 1) return null;

  const pages = getPageNumbers(currentPage, totalPages, pageRange);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className={styles.pagination} aria-label="페이지 이동">
      <button
        type="button"
        className={styles.item}
        onClick={() => onChange(currentPage - 1)}
        disabled={isFirst}
        aria-label="이전 페이지"
      >
        <Image src="/icons/chevron-left.svg" alt="" width={20} height={20} />
      </button>

      {pages.map((page) => {
        const active = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            className={active ? `${styles.item} ${styles.active}` : styles.item}
            onClick={() => onChange(page)}
            aria-current={active ? "page" : undefined}
            aria-label={`${page} 페이지`}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className={styles.item}
        onClick={() => onChange(currentPage + 1)}
        disabled={isLast}
        aria-label="다음 페이지"
      >
        <Image src="/icons/chevron-right.svg" alt="" width={20} height={20} />
      </button>
    </nav>
  );
}
