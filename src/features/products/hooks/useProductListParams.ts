"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PRODUCT_PAGE_SIZE } from "../constants";
import type { ProductListParams, ProductTypeFilter } from "../types";

const TYPE_VALUES: ProductTypeFilter[] = ["ALL", "PASS", "SINGLE"];

function parseType(value: string | null): ProductTypeFilter {
  const upper = value?.toUpperCase() as ProductTypeFilter | undefined;
  return upper && TYPE_VALUES.includes(upper) ? upper : "ALL";
}

function parsePage(value: string | null): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

/**
 * 검색어 / 필터 / 페이지 상태를 URL 쿼리스트링(?q=&type=&page=)과 동기화한다.
 * 새로고침, 뒤로가기, 링크 공유 시에도 같은 목록이 보인다.
 */
export function useProductListParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params: ProductListParams = useMemo(
    () => ({
      keyword: searchParams.get("q") ?? "",
      type: parseType(searchParams.get("type")),
      page: parsePage(searchParams.get("page")),
      pageSize: PRODUCT_PAGE_SIZE,
    }),
    [searchParams],
  );

  const update = useCallback(
    (next: Partial<Omit<ProductListParams, "pageSize">>) => {
      const merged = { ...params, ...next };
      const query = new URLSearchParams();
      if (merged.keyword.trim()) query.set("q", merged.keyword.trim());
      if (merged.type !== "ALL") query.set("type", merged.type.toLowerCase());
      if (merged.page > 1) query.set("page", String(merged.page));

      const qs = query.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  const setKeyword = useCallback((keyword: string) => update({ keyword, page: 1 }), [update]);
  const setType = useCallback((type: ProductTypeFilter) => update({ type, page: 1 }), [update]);
  const setPage = useCallback((page: number) => update({ page }), [update]);

  return { params, setKeyword, setType, setPage };
}
