import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { PRODUCT_TYPE_LABEL } from "../../constants";
import type { Product } from "../../types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  eager?: boolean;
}

export default function ProductCard({ product, eager = false }: ProductCardProps) {
  const { title, type, originalPrice, salePrice, discountRate, thumbnailUrl } = product;
  const hasDiscount = discountRate > 0 && salePrice < originalPrice;

  return (
    <article className={styles.card}>
      <div className={styles.thumbnail}>
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          sizes="250px"
          className={styles.image}
          loading={eager ? "eager" : "lazy"}
        />
      </div>

      <div className={styles.info}>
        <p className={styles.type}>{PRODUCT_TYPE_LABEL[type]}</p>
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          {hasDiscount ? (
            <div className={styles.priceGroup}>
              <p className={styles.originalPrice}>
                <span className="sr-only">정가</span>
                <del>{formatPrice(originalPrice)}</del>
              </p>
              <p className={styles.priceRow}>
                <span className={styles.discount}>
                  <span className="sr-only">할인율</span>
                  {discountRate}%
                </span>
                <span className={styles.price}>
                  <span className="sr-only">판매가</span>
                  {formatPrice(salePrice)}
                </span>
              </p>
            </div>
          ) : (
            <p className={styles.price}>
              <span className="sr-only">판매가</span>
              {formatPrice(salePrice)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
