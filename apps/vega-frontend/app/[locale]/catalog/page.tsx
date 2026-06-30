import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { getCatalogs, mapCatalogToFrontend } from "@/lib/api";
import Link from "next/link";
import { CatalogGrid } from "./sections/CatalogGrid";
import { CatalogCTA } from "./sections/CatalogCTA";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Catalogs | Vega UAE",
  description: "Download our product catalogs in PDF format. Browse our complete range of furniture, barriers, and industrial supplies.",
};

export default async function CatalogPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  const rawCatalogs = await getCatalogs();
  const catalogs = rawCatalogs.map(mapCatalogToFrontend).filter(Boolean);
  const categories = Array.from(new Set(catalogs.map((c: any) => c.category)));

  return (
    <main className="pt-20 pb-16">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-6 mb-20">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-[#FFD400]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">
            {isAR ? "التنزيلات" : "Downloads"}
          </span>
        </div>
        <h1 className="section-heading text-4xl md:text-5xl mb-6">
          {isAR ? "كتالوجات المنتجات" : "Product Catalogs"}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          {isAR
            ? "تصفح وحمّل كتالوجات منتجاتنا الكاملة. مواصفات تفصيلية، وأبعاد، وتسعير لكل خط إنتاج."
            : "Browse and download our complete product catalogs. Detailed specifications, dimensions, and pricing for every product line."}
        </p>
      </div>

      {/* Category Chips */}
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <div className="flex flex-wrap gap-3">
          <Link
            href={l("/catalog#all")}
            className="inline-flex items-center gap-2 rounded-full bg-[#1F3A93] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#162d70]"
          >
            <BookOpen className="h-4 w-4" /> {isAR ? "جميع الكتالوجات" : "All Catalogs"}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={l(`/catalog#${cat?.toLowerCase().replace(/\s+/g, "-")}`)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-500 transition-all hover:border-[#FFD400] hover:text-[#1F3A93]"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="mx-auto max-w-7xl px-6">
        <CatalogGrid catalogs={catalogs} locale={locale} />
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-6 mt-24">
        <CatalogCTA locale={locale} />
      </div>
    </main>
  );
}
