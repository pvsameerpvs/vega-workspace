import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";

export function CategoriesSection() {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="label-line mb-4">Our Collection</div>
            <h2 className="section-heading">Browse Our Range</h2>
          </div>
          <Link href="/products" className="hidden md:inline-flex pill-btn-blue group">
            View All Products <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-4 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 border border-slate-100 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
                <ProtectedImage
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-vega-blue">{cat.name}</h3>
                <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:text-vega-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-1 text-xs text-slate-400">{cat.subcategories.length} types</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="pill-btn-blue">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
