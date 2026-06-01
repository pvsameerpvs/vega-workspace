import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vega Admin Dashboard",
  description: "Admin dashboard for managing Vega website content.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
