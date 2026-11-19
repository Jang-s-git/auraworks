import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className={styles.grid}>
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} eager={index < 4} />
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <ul className={styles.grid} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonThumb} />
          <div className={styles.skeletonLine} style={{ width: "30%" }} />
          <div className={styles.skeletonLine} style={{ width: "80%" }} />
          <div className={styles.skeletonLine} style={{ width: "50%" }} />
        </li>
      ))}
    </ul>
  );
}
