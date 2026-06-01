import Link from "next/link";
import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export function ProductRanges() {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-xl font-bold text-slate-900 mb-8 font-display">Product Ranges</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/products/${cat.slug}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/3]"
            >
              <ProtectedImage
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-[#0f172a]/20 transition-opacity group-hover:from-[#1F3A93]/80" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-sm font-bold text-white">{cat.name}</div>
                <div className="text-[10px] text-white/60">{cat.subcategories.length} items</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
