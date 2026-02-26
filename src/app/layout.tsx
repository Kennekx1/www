import type { Metadata } from "next";
import "./globals.scss";
import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";

export const metadata: Metadata = {
  title: "Vittorio Parfum",
  description: "Official Vittorio Parfum Online Store",
};

import SmoothScroll from "@/components/common/SmoothScroll";
import FilmGrain from "@/components/common/FilmGrain/FilmGrain";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <FilmGrain />
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
