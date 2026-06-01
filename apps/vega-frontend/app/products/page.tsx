import { Metadata } from "next";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Products | Vega UAE",
  description: "Browse our full range of camp furniture, barriers, office furniture, and more.",
};

export default function ProductsPage() {
  return (
    <main className="pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <div className="label-line mb-4">Catalogue</div>
          <h1 className="section-heading">Our Products</h1>
          <p className="mt-4 text-base text-slate-500 max-w-lg leading-relaxed">
            Explore our complete catalogue of camp furniture, queue barriers, metal barriers, and office furniture.
          </p>
        </div>
        <div className="mb-12 flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-vega-blue hover:border-vega-blue hover:bg-vega-blue hover:text-white transition-all duration-300"
            >
              {cat.name} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
        <ProductGrid products={PRODUCTS} />
      </div>
    </main>
  );
}
