import { Metadata } from "next";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = {
  title: "Products | Vega UAE",
  description: "Browse our full range of camp furniture, barriers, office furniture, and more.",
};

export default function ProductsPage() {
  return (
    <main className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <div className="label-line mb-4">Catalogue</div>
          <h1 className="section-heading">Our Products</h1>
          <p className="mt-4 text-gray-500 max-w-lg">
            Explore our complete catalogue of camp furniture, queue barriers, metal barriers, and office furniture.
          </p>
        </div>
        <div className="mb-12 flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
            >
              {cat.name}
            </a>
          ))}
        </div>
        <ProductGrid products={PRODUCTS} />
      </div>
    </main>
  );
}
