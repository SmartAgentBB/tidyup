import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "비움 챌린지 - Tidyup Challenge",
  description: "연말 비움 챌린지로 더 가벼운 삶을 시작하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
