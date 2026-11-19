import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "스토어 | HIDDEN KICE",
  description: "상위권이 선택한 문제집, 결과로 증명된 실전 대비서 - 히든카이스 교재 스토어",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <head></head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
