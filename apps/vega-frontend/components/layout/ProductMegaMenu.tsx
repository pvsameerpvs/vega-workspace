"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductMegaMenuProps {
  categories: { id: string; name: string; nameAr?: string; slug: string; subcategories?: string[] }[];
  products: { id: string; name: string; nameAr?: string; slug: string; image: string; category: string }[];
  isAR: boolean;
  locale: string;
  open: boolean;
}

export function ProductMegaMenu({ categories, products, isAR, locale, open }: ProductMegaMenuProps) {
  const productsByCategory = useMemo(() => {
    const map: Record<string, typeof products> = {};
    for (const cat of categories) {
      map[cat.slug] = products
        .filter((p) =>
          p.category.toLowerCase().replace(/\s+/g, "-") === cat.slug.toLowerCase() ||
          p.category.toLowerCase() === cat.name.toLowerCase()
        )
        .slice(0, 3);
    }
    return map;
  }, [categories, products]);

  const l = (path: string) => `/${locale}${path}`;
  if (!open) return null;

  return (
    <div className={`absolute top-full pt-3 ${isAR ? "right-0" : "left-1/2 -translate-x-1/2"}`}>
      <div className="w-[800px] rounded-2xl bg-white p-6 shadow-elevated border border-slate-100 animate-scale-in origin-top">
        <div className="grid grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.id}>
              <Link href={l(`/products/${cat.slug}`)} className="block text-sm font-bold text-[#1F3A93] mb-2 hover:text-[#162d70] transition-colors">
                {isAR && cat.nameAr ? cat.nameAr : cat.name}
              </Link>
              <ul className="space-y-1 mb-3">
                {(cat.subcategories || []).slice(0, 4).map((sub, idx) => (
                  <li key={idx}>
                    <Link href={l(`/products/${cat.slug}`)} className="text-xs text-slate-400 hover:text-[#1F3A93] transition-colors">
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
              {(productsByCategory[cat.slug] || []).length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {(productsByCategory[cat.slug] || []).map((prod) => (
                    <Link key={prod.id} href={l(`/products/${prod.slug}`)} className="flex items-center gap-2 group">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                        <img src={prod.image} alt={isAR && prod.nameAr ? prod.nameAr : prod.name} className="h-full w-full object-cover" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                      </div>
                      <span className="text-[10px] text-slate-500 group-hover:text-[#1F3A93] transition-colors line-clamp-1">{isAR && prod.nameAr ? prod.nameAr : prod.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              <Link href={l(`/products/${cat.slug}`)} className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#FFD400] hover:text-[#1F3A93] transition-colors mt-2">
                {isAR ? "عرض الكل" : "View All"} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
