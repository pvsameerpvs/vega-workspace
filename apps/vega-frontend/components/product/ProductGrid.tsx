"use client";

import { Product } from "@/lib/data";
import { getWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-vega-blue/5">
          <svg className="h-6 w-6 text-vega-blue/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-base text-slate-400">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <div key={product.id} className="group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
          <Link href={`/products/${product.slug}`} className="block">
            <div className="relative mb-4 overflow-hidden rounded-2xl bg-slate-50 shadow-subtle transition-all duration-500 group-hover:shadow-card-hover">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-vega-blue shadow-sm border border-vega-blue/10">
                  {product.sku}
                </span>
              </div>
            </div>
          </Link>
          <div className="px-1">
            <span className="text-sm font-bold text-slate-400">{product.category}</span>
            <h3 className="mt-1 text-base font-bold text-vega-blue group-hover:text-vega-blue-light transition-colors duration-300 leading-tight">
              {product.name}
            </h3>
            <p className="mt-1.5 text-sm text-slate-400 line-clamp-2 leading-relaxed">{product.description}</p>
            <div className="mt-4 flex gap-2.5">
              <Link
                href={`/products/${product.slug}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-vega-blue hover:border-vega-blue hover:bg-vega-blue hover:text-white transition-all duration-300"
              >
                View Details
              </Link>
              <button
                onClick={() => window.open(getWhatsAppLink(product), "_blank")}
                className="rounded-full bg-vega-yellow px-4 py-2 text-sm font-bold text-vega-blue hover:bg-vega-yellow-dark transition-all duration-300 hover:shadow-yellow hover:-translate-y-0.5"
              >
                Enquire <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
