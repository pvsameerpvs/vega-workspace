import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";

export function CategoriesSection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex items-end justify-between">
          <div>
            <span className="mb-6 block text-sm text-slate-400">Our Collection</span>
            <h2 className="section-heading text-4xl md:text-5xl">Browse Our Range</h2>
          </div>
          <Link href="/products" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-vega-blue hover:underline transition-all">
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="mb-5 aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
                <ProtectedImage
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-vega-blue transition-colors">{cat.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{cat.subcategories.length} types</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-vega-blue hover:underline transition-all">
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
