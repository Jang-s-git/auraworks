export interface PromoBanner {
  id: number;
  imageUrl: string;
  alt: string;
  href?: string;
}

const HIDDEN_KICE_BANNER_ALT =
    "히든카이스 - 모두가 푸는 건 이유가 있습니다. 상위권이 선택한 문제집, 결과로 증명된 실전 대비서";

export const PROMO_BANNERS: PromoBanner[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  imageUrl: "/images/banners/promo-hidden-kice.png",
  alt: HIDDEN_KICE_BANNER_ALT,
}));
