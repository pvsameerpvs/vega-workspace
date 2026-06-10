"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getCategoryUrl, getSubcategoryUrl, getProductUrl } from "@/lib/url";

interface ProductMegaMenuProps {
  categories: { id: string; name: string; nameAr?: string; slug: string; subcategories?: { id: string; name: string; nameAr?: string; slug: string }[] }[];
  products: { id: string; name: string; nameAr?: string; slug: string; image: string; category: string; categorySlug?: string; subcategorySlug?: string }[];
  isAR: boolean;
  locale: string;
  open: boolean;
}

export function ProductMegaMenu({ categories, products, isAR, locale, open }: ProductMegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const productsBySubcategory = useMemo(() => {
    const map: Record<string, typeof products> = {};
    for (const prod of products) {
      const key = prod.subcategorySlug;
      if (key) {
        if (!map[key]) map[key] = [];
        map[key].push(prod);
      }
    }
    return map;
  }, [products]);

  const currentCategory = activeCategory
    ? categories.find((c) => c.slug === activeCategory)
    : null;

  const currentSubs = currentCategory?.subcategories || [];

  const currentProducts = activeSubcategory
    ? productsBySubcategory[activeSubcategory] || []
    : [];

  const panelOrder = isAR ? "flex-row-reverse" : "";

  if (!open) return null;

  return (
    <div className={`absolute top-full pt-3 ${isAR ? "right-0" : "left-1/2 -translate-x-1/2"}`}>
      <div className={`w-[900px] rounded-2xl bg-white shadow-elevated border border-slate-100 animate-scale-in origin-top flex ${panelOrder} overflow-hidden`}>
        {/* Categories */}
        <div className="w-56 shrink-0 border-r border-slate-100 p-3 space-y-1 max-h-[70vh] overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onMouseEnter={() => { setActiveCategory(cat.slug); setActiveSubcategory(null); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeCategory === cat.slug
                  ? "bg-[#1F3A93] text-white font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {isAR && cat.nameAr ? cat.nameAr : cat.name}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        <div className="w-56 shrink-0 border-r border-slate-100 p-3 space-y-1 max-h-[70vh] overflow-y-auto">
          {currentSubs.length > 0 ? (
            currentSubs.map((sub) => (
              <Link
                key={sub.slug}
                href={getSubcategoryUrl(activeCategory!, sub.slug, locale)}
                onMouseEnter={() => setActiveSubcategory(sub.slug)}
                className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  activeSubcategory === sub.slug
                    ? "bg-[#FFD400] text-[#1F3A93] font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {isAR && sub.nameAr ? sub.nameAr : sub.name}
              </Link>
            ))
          ) : (
            <p className="px-3 py-2.5 text-xs text-slate-400">
              {activeCategory
                ? (isAR ? "لا توجد فئات فرعية" : "No subcategories")
                : (isAR ? "اختر تصنيفاً" : "Select a category")}
            </p>
          )}
        </div>

        {/* Products */}
        <div className="flex-1 p-3 max-h-[70vh] overflow-y-auto">
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {currentProducts.map((prod) => (
                <Link
                  key={prod.id}
                  href={getProductUrl(prod as any, locale)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="h-10 w-10 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={prod.image}
                      alt={isAR && prod.nameAr ? prod.nameAr : prod.name}
                      className="h-full w-full object-cover"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                  <span className="text-xs text-slate-600 group-hover:text-[#1F3A93] transition-colors line-clamp-2 leading-tight">
                    {isAR && prod.nameAr ? prod.nameAr : prod.name}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[120px]">
              <p className="text-xs text-slate-400">
                {activeSubcategory
                  ? (isAR ? "لا توجد منتجات" : "No products")
                  : activeCategory
                    ? (isAR ? "اختر فئة فرعية لعرض المنتجات" : "Select a subcategory")
                    : (isAR ? "اختر تصنيفاً لعرض المنتجات" : "Select a category")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
