"use client";

import { useEffect, useRef, useState } from "react";
import { useProductListParams } from "../../hooks/useProductListParams";
import { useProducts } from "../../hooks/useProducts";
import ProductGrid, { ProductGridSkeleton } from "../ProductGrid/ProductGrid";
import ProductTypeTabs from "../ProductTypeTabs/ProductTypeTabs";
import styles from "./ProductListSection.module.css";

export default function ProductListSection() {
  const { params, setKeyword, setType, setPage } = useProductListParams();
  const { data, isPending, isError, error, refetch, isFetching } = useProducts(params);

  const sectionRef = useRef<HTMLElement>(null);
  const [keywordInput, setKeywordInput] = useState(params.keyword);

  useEffect(() => {
    if (data && params.page > data.totalPages) setPage(data.totalPages);
  }, [data, params.page, setPage]);

  const handlePageChange = (page: number) => {
    setPage(page);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleClear = () => {
    setKeywordInput("");
    setKeyword("");
  };

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="product-list-title">
      <div className={styles.inner}>
        <h2 id="product-list-title" className="sr-only">
          교재 목록
        </h2>

        <div className={styles.toolbar}>
          <ProductTypeTabs value={params.type} onChange={setType} />
        </div>

        <div className={styles.content} aria-busy={isFetching}>
          {isPending ? (
            <ProductGridSkeleton />
          ) : isError ? (
            <div className={styles.message} role="alert">
              <p>상품을 불러오지 못했습니다.</p>
              <p className={styles.subMessage}>{error.message}</p>
              <button type="button" className={styles.retry} onClick={() => refetch()}>
                다시 시도
              </button>
            </div>
          ) : data.items.length === 0 ? (
            <div className={styles.message}>
              <p>{params.keyword ? `‘${params.keyword}’ 검색 결과가 없습니다.` : "등록된 상품이 없습니다."}</p>
            </div>
          ) : (
            <>
              <div className={isFetching ? styles.fetching : undefined}>
                <ProductGrid products={data.items} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
