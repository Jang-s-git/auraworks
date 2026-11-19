import PromoBannerSlider from "@/features/banner/components/PromoBannerSlider";
import { PROMO_BANNERS } from "@/features/banner/data";
import ProductListSection from "@/features/products/components/ProductListSection/ProductListSection";
import {Suspense} from "react";

export default function StorePage() {
  return (
    <>
      <PromoBannerSlider banners={PROMO_BANNERS} />
        <Suspense>
          <ProductListSection />
        </Suspense>
    </>
  );
}
