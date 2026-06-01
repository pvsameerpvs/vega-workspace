import Link from "next/link";
import { PRODUCT_CATEGORIES } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";

export function CategoriesSection() {
  return (
    <section className="py-32 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="label-line mb-4">Our Collection</div>
            <h2 className="section-heading">Browse Our Range</h2>
          </div>
          <Link href="/products" className="hidden md:inline-flex pill-btn">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-5 transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                <ProtectedImage
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">{cat.name}</h3>
                <ArrowUpRight className="h-4 w-4 text-gray-400 transition-all group-hover:text-gray-900" />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {cat.subcategories.length} types
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="pill-btn">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
