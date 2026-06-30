import { Metadata } from "next";
import {
  getProducts,
  getCategories,
  mapProductToFrontend,
} from "@/lib/api";
import { ProductsPageClient } from "@/components/product/ProductsPageClient";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Products | Vega UAE",
  description: "Browse our full range of camp furniture, barriers, office furniture, and more.",
};

export default async function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const isAR = locale === "ar";

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const mappedProducts = (products || []).map(mapProductToFrontend).filter(Boolean) as any[];

  return (
    <main className="pt-20 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <span className="mb-6 block text-sm text-slate-400">{isAR ? "الكتالوج" : "Catalogue"}</span>
          <h1 className="section-heading text-4xl md:text-5xl">{isAR ? "منتجاتنا" : "Our Products"}</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-lg leading-relaxed">
            {isAR
              ? "استكشف كتالوجنا الكامل للأثاث المخيمات، وحواجز الطوابير، والحواجز المعدنية، والأثاث المكتبي."
              : "Explore our complete catalogue of camp furniture, queue barriers, metal barriers, and office furniture."}
          </p>
        </div>
        <ProductsPageClient
          initialProducts={mappedProducts}
          categories={categories || []}
          locale={locale}
        />
      </div>
    </main>
  );
}
