export type ProductType = "PASS" | "SINGLE";

export interface Product {
  id: number;
  title: string;
  type: ProductType;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  thumbnailUrl: string;
}

export type ProductTypeFilter = ProductType | "ALL";

export interface ProductListParams {
  keyword: string;
  type: ProductTypeFilter;
  page: number;
  pageSize: number;
}

export interface ProductListResult {
  items: Product[];
  totalCount: number;
  totalPages: number;
}
