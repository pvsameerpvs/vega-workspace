import type { Metadata } from "next";
import { Inter, Poppins, Cairo } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
});

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
      <body className={`${inter.variable} ${poppins.variable} ${cairo.variable} font-sans antialiased pt-28`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
