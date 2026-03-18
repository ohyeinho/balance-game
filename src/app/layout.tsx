import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "웨파 GWP 행사",
  description: "당신의 진짜 가치관을 알아보는 22가지 밸런스 게임",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <div className="max-w-md mx-auto min-h-screen">{children}</div>
      </body>
    </html>
  );
}
