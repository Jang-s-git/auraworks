"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";
import { productQueryKeys } from "../constants";
import type { ProductListParams } from "../types";

/** 상품 목록 CSR 조회 훅 (캐싱, 이전 페이지 데이터 유지) */
export function useProducts(params: ProductListParams) {
  return useQuery({
    queryKey: productQueryKeys.list(params),
    queryFn: () => fetchProducts(params),
    placeholderData: keepPreviousData,
  });
}
