const krwFormatter = new Intl.NumberFormat("ko-KR");

export function formatPrice(value: number): string {
  return `${krwFormatter.format(value)}원`;
}
