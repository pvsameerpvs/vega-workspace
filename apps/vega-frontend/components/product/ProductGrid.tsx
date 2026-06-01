"use client";

import { Product } from "@/lib/data";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-base text-gray-400">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div key={product.id} className="group">
          <Link href={`/products/${product.slug}`} className="block">
            <div className="relative mb-4 overflow-hidden rounded-2xl bg-gray-100">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-900 shadow-sm">
                  {product.sku}
                </span>
              </div>
            </div>
          </Link>
          <div className="px-1">
            <span className="text-base text-gray-400">{product.category}</span>
            <h3 className="mt-1 text-base font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
              {product.name}
            </h3>
            <p className="mt-1 text-base text-gray-400 line-clamp-2">{product.description}</p>
            <div className="mt-4 flex gap-2">
              <Link
                href={`/products/${product.slug}`}
                className="rounded-full border border-gray-200 px-4 py-2 text-base text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
              >
                View Details
              </Link>
              <button
                onClick={() => window.open(getWhatsAppLink(product), "_blank")}
                className="rounded-full bg-gray-900 px-4 py-2 text-base text-white hover:bg-gray-700 transition-all"
              >
                Enquire
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
