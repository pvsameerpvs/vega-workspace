"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Product } from "@/lib/data/types";

interface ProductCardProps {
  product: Product;
  tag?: string;
  tagColor?: string;
}

export function ProductCard({ product, tag, tagColor = "bg-[#1F3A93]" }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {tag && (
        <span className={`absolute top-3 left-3 z-10 ${tagColor} text-white text-[10px] font-bold uppercase px-2 py-1 rounded`}>
          {tag}
        </span>
      )}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </Link>
      <div className="p-3">
        <div className="text-[10px] text-slate-400 mb-1 uppercase tracking-wider">{product.category}</div>
        <Link href={`/products/${product.slug}`} className="block text-sm font-semibold text-slate-900 hover:text-[#1F3A93] line-clamp-2 mb-2">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <Link href={`/products/${product.slug}`} className="flex-1 inline-flex items-center justify-center gap-1 rounded bg-[#1F3A93] px-3 py-2 text-[11px] font-semibold text-white hover:bg-[#162d70] transition-all">
            <Eye className="h-3 w-3" /> View Details
          </Link>
          <a href={`https://wa.me/971567351095?text=${encodeURIComponent(`Hi Vega, I'm interested in ${product.name} (${product.sku}) - ${product.category}`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1 rounded bg-[#FFD400] px-3 py-2 text-[11px] font-bold text-[#1F3A93] hover:bg-[#e6bf00] transition-all">
            <WhatsAppIcon className="h-3 w-3" /> Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
