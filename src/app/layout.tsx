import type { Metadata } from "next";
import "./globals.scss";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";

export const metadata: Metadata = {
  title: "Vittorio Parfum",
  description: "Official Vittorio Parfum Online Store",
};

import SmoothScroll from "@/components/common/SmoothScroll";
import CustomCursor from "@/components/common/CustomCursor/CustomCursor";
import FilmGrain from "@/components/common/FilmGrain/FilmGrain";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <FilmGrain />
        <CustomCursor />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
