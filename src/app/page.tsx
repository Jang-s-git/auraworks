import PromoBannerSlider from "@/features/banner/components/PromoBannerSlider";
import { PROMO_BANNERS } from "@/features/banner/data";

export default function StorePage() {
  return (
    <>
      <PromoBannerSlider banners={PROMO_BANNERS} />
    </>
  );
}
