import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Product, ProductListParams, ProductListResult, ProductType } from "../types";

/** DB 레코드 (snake_case) */
interface ProductRow {
  id: number;
  title: string;
  product_type: ProductType;
  original_price: number;
  sale_price: number;
  discount_rate: number;
  thumbnail_url: string;
}

const PRODUCT_COLUMNS =
  "id, title, product_type, original_price, sale_price, discount_rate, thumbnail_url";

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    title: row.title,
    type: row.product_type,
    originalPrice: row.original_price,
    salePrice: row.sale_price,
    discountRate: row.discount_rate,
    thumbnailUrl: row.thumbnail_url,
  };
}

/** LIKE 패턴 특수문자(%, _, \) 이스케이프 */
function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}

/**
 * 상품 목록 조회 (검색 + 타입 필터 + 페이지네이션).
 * 데이터 소스가 바뀌어도(예: 자체 API 서버) 이 함수만 교체하면 되도록
 * 화면은 도메인 타입(Product)만 알게 한다.
 */
export async function fetchProducts({
  keyword,
  type,
  page,
  pageSize,
}: ProductListParams): Promise<ProductListResult> {
  const supabase = getSupabaseBrowserClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("products")
    .select(PRODUCT_COLUMNS, { count: "exact" })
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true })
    .range(from, to);

  const trimmed = keyword.trim();
  if (trimmed) {
    query = query.ilike("title", `%${escapeLikePattern(trimmed)}%`);
  }
  if (type !== "ALL") {
    query = query.eq("product_type", type);
  }

  const { data, count, error } = await query;
  if (error) throw new Error(error.message);

  const totalCount = count ?? 0;
  return {
    items: (data as ProductRow[]).map(toProduct),
    totalCount,
    totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
  };
}
