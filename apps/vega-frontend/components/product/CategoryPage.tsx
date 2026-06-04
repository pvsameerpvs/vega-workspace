import { Product, ProductCategory } from "@/lib/types";
import { ProductGrid } from "./ProductGrid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSubcategoryUrl } from "@/lib/url";
import { ProtectedImage } from "@/components/ProtectedImage";

interface CategoryPageProps {
  category: ProductCategory;
  products: Product[];
  locale: string;
}

export function CategoryPage({ category, products, locale }: CategoryPageProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;
  const displayName = isAR && category.nameAr ? category.nameAr : category.name;

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <Link href={l("/products")} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-vega-blue transition-colors">
          <ArrowLeft className="h-4 w-4" /> {isAR ? "العودة إلى المنتجات" : "Back to Products"}
        </Link>

        <div className="mb-16">
          <span className="mb-6 block text-sm text-slate-400">{isAR ? "الفئة" : "Category"}</span>
          <h1 className="section-heading text-4xl md:text-5xl">{displayName}</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-lg leading-relaxed">
            {isAR
              ? `تصفح مجموعة ${displayName.toLowerCase()}.`
              : `Browse our ${category.name.toLowerCase()} collection.`}
          </p>
        </div>

        {/* Subcategories Grid */}
        {category.subcategories.length > 0 && (
          <div className="mb-20">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-vega-yellow" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-vega-yellow">
                {isAR ? "الفئات الفرعية" : "Subcategories"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={getSubcategoryUrl(category.slug, sub.slug, locale)}
                  className="group modern-card overflow-hidden transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {sub.image ? (
                      <ProtectedImage
                        src={sub.image}
                        alt={isAR && sub.nameAr ? sub.nameAr : sub.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-50">
                        <span className="text-2xl font-bold text-slate-200">{sub.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-vega-blue/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-vega-blue transition-colors">
                      {isAR && sub.nameAr ? sub.nameAr : sub.name}
                    </h3>
                    {sub.description && (
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2">{sub.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        {products.length > 0 && (
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-8 bg-vega-yellow" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-vega-yellow">
                {isAR ? "جميع المنتجات" : "All Products"}
              </span>
            </div>
            <ProductGrid products={products} locale={locale} />
          </div>
        )}
      </div>
    </main>
  );
}
