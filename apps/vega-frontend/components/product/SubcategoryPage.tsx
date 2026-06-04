import { Product } from "@/lib/types";
import { ProductGrid } from "./ProductGrid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoryUrl } from "@/lib/url";

interface SubcategoryPageProps {
  subcategory: {
    id: string | number;
    name: string;
    nameAr?: string;
    slug: string;
    categorySlug?: string;
    categoryName?: string;
    categoryNameAr?: string;
  };
  products: Product[];
  locale: string;
}

export function SubcategoryPage({ subcategory, products, locale }: SubcategoryPageProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;
  const displayName = isAR && subcategory.nameAr ? subcategory.nameAr : subcategory.name;
  const categoryDisplayName = isAR && subcategory.categoryNameAr ? subcategory.categoryNameAr : subcategory.categoryName || "";

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <Link href={l("/products")} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
          <ArrowLeft className="h-4 w-4" /> {isAR ? "العودة إلى المنتجات" : "Back to Products"}
        </Link>

        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-slate-400">
          <Link href={l("/products")} className="hover:text-vega-blue transition-colors">{isAR ? "المنتجات" : "Products"}</Link>
          {subcategory.categorySlug && (
            <>
              <span className="mx-2">/</span>
              <Link href={getCategoryUrl(subcategory.categorySlug, locale)} className="hover:text-vega-blue transition-colors">
                {categoryDisplayName}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-slate-600">{displayName}</span>
        </nav>

        <div className="mb-16">
          <span className="mb-6 block text-sm text-slate-400">{isAR ? "الفئة الفرعية" : "Subcategory"}</span>
          <h1 className="section-heading text-4xl md:text-5xl">{displayName}</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-lg leading-relaxed">
            {isAR
              ? `تصفح منتجات ${displayName.toLowerCase()}.`
              : `Browse ${subcategory.name.toLowerCase()} products.`}
          </p>
        </div>

        <ProductGrid products={products} locale={locale} />
      </div>
    </main>
  );
}
