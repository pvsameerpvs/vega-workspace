import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Vega - Reliable Furniture, Barriers & Camp Supply Solutions UAE",
  description:
    "Supplying durable camp furniture, queue barriers, office furniture, flag poles, and industrial supply products for businesses across the UAE.",
  keywords: [
    "Camp furniture supplier in UAE",
    "Bunk bed supplier in UAE",
    "Labor camp furniture UAE",
    "Queue barrier supplier UAE",
    "Office furniture supplier UAE",
    "Flag pole supplier UAE",
    "Bulk furniture supplier UAE",
  ],
  openGraph: {
    title: "Vega - B2B Product Catalogue UAE",
    description: "Reliable Furniture, Barriers & Camp Supply Solutions Across UAE",
    type: "website",
  },
};

export default function RootLayout({
  children,
  params: { locale = "en" },
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
