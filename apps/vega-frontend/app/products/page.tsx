import { Metadata } from "next";
import {
  getProducts,
  getCategories,
  mapProductToFrontend,
  mapCategoryToFrontend,
} from "@/lib/api";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Products | Vega UAE",
  description: "Browse our full range of camp furniture, barriers, office furniture, and more.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const mappedProducts = (products || []).map(mapProductToFrontend).filter(Boolean) as any[];
  const mappedCategories = (categories || []).map(mapCategoryToFrontend).filter(Boolean) as any[];

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20">
          <span className="mb-6 block text-sm text-slate-400">Catalogue</span>
          <h1 className="section-heading text-4xl md:text-5xl">Our Products</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-lg leading-relaxed">
            Explore our complete catalogue of camp furniture, queue barriers, metal barriers, and office furniture.
          </p>
        </div>
        <div className="mb-16 flex flex-wrap gap-3">
          {mappedCategories.map((cat) => (
            <a
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-vega-blue transition-all duration-300"
            >
              {cat.name} <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
        <ProductGrid products={mappedProducts} />
      </div>
    </main>
  );
}
