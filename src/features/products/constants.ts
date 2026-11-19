import type { ProductType, ProductTypeFilter } from "./types";

export const PRODUCT_PAGE_SIZE = 12;

export const PRODUCT_TYPE_LABEL: Record<ProductType, string> = {
  PASS: "패스",
  SINGLE: "단품",
};

export const PRODUCT_TYPE_FILTERS: { value: ProductTypeFilter; label: string }[] = [
  { value: "ALL", label: "전체" },
  { value: "PASS", label: PRODUCT_TYPE_LABEL.PASS },
  { value: "SINGLE", label: PRODUCT_TYPE_LABEL.SINGLE },
];

export const productQueryKeys = {
  all: ["products"] as const,
  list: (params: object) => [...productQueryKeys.all, "list", params] as const,
};
