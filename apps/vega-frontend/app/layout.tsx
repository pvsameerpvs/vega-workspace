import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar, Footer, FloatingContact } from "@/components/layout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE VEGA UAE - Reliable Camp Furniture Supplier in UAE",
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
  icons: {
    icon: "/images/logo/fevic.jpeg",
    shortcut: "/images/logo/fevic.jpeg",
    apple: "/images/logo/fevic.jpeg",
  },
  metadataBase: new URL("https://www.thevegauae.com"),
  openGraph: {
    title: "THE VEGA UAE - Reliable Camp Furniture Supplier in UAE",
    description: "Reliable Furniture, Barriers & Camp Supply Solutions Across UAE",
    type: "website",
    url: "https://www.thevegauae.com",
    siteName: "Vega UAE",
    images: [
      {
        url: "/images/logo/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "THE VEGA UAE - Reliable Camp Furniture Supplier in UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vega - B2B Product Catalogue UAE",
    description: "Reliable Furniture, Barriers & Camp Supply Solutions Across UAE",
    images: ["/images/logo/logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={`${poppins.variable} font-sans`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var path = window.location.pathname;
                var locale = path.split('/')[1];
                if (locale === 'ar') {
                  document.documentElement.dir = 'rtl';
                  document.documentElement.lang = 'ar';
                } else {
                  document.documentElement.dir = 'ltr';
                  document.documentElement.lang = 'en';
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased pt-28`}>
        <Navbar />
        {children}
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
