"use client";

import Link from "next/link";
import { Ruler, Weight, Hammer } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import { getProductUrl } from "@/lib/url";
import { track } from "@/lib/tracking";
import type { Product } from "@/lib/types";

interface LandingProductCardProps {
  product: Product;
  isAR: boolean;
  getQuoteLabel: string;
  viewDetailsLabel: string;
}

function selectProduct(name: string) {
  track("lp_product_quote", { product: name });
  window.dispatchEvent(new CustomEvent("landing:select-product", { detail: name }));
}

export function LandingProductCard({ product, isAR, getQuoteLabel, viewDetailsLabel }: LandingProductCardProps) {
  const productUrl = getProductUrl(product, isAR ? "ar" : "en");

  const specs = [
    { icon: Ruler, value: product.dimensions },
    { icon: Hammer, value: product.material },
    { icon: Weight, value: product.weight },
  ].filter((s) => s.value);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link href={productUrl} onClick={() => track("lp_product_click", { product: product.name })} className="block w-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <ProtectedImage
            src={product.image}
            alt={`${product.name} — ${product.category}`}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="mb-1 truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {product.sku}
        </p>
        <Link href={productUrl} className="text-sm font-bold text-slate-900 line-clamp-2 transition-colors group-hover:text-vega-blue">
          {product.name}
        </Link>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {product.description}
          </p>
        )}

        {specs.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {specs.slice(0, 2).map((spec) => (
              <div key={spec.icon.displayName} className="flex items-center gap-2 text-xs text-slate-500">
                <spec.icon className="h-3.5 w-3.5 shrink-0 text-vega-yellow" />
                <span className="truncate" dir="ltr">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col items-stretch gap-2 pt-1 sm:flex-row">
          <button
            type="button"
            onClick={() => selectProduct(product.name)}
            className="flex-1 rounded-full bg-vega-yellow px-4 py-2.5 text-xs font-bold text-vega-blue transition-all hover:brightness-95"
          >
            {getQuoteLabel}
          </button>
          <Link
            href={productUrl}
            className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-center text-xs font-semibold text-vega-blue transition-all hover:border-vega-blue hover:bg-vega-blue hover:text-white"
          >
            {viewDetailsLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}