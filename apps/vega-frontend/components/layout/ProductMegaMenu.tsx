"use client";

import { useState } from "react";
import Link from "next/link";
import { getCategoryUrl, getSubcategoryUrl } from "@/lib/url";

interface ProductMegaMenuProps {
  categories: { id: string; name: string; nameAr?: string; slug: string; subcategories?: { id: string; name: string; nameAr?: string; slug: string }[] }[];
  isAR: boolean;
  locale: string;
  open: boolean;
}

export function ProductMegaMenu({ categories, isAR, locale, open }: ProductMegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  const currentCategory = activeCategory
    ? categories.find((c) => c.slug === activeCategory)
    : null;

  const currentSubs = currentCategory?.subcategories || [];

  const panelOrder = isAR ? "flex-row-reverse" : "";

  if (!open) return null;

  return (
    <div className={`absolute top-full pt-3 ${isAR ? "right-0" : "left-1/2 -translate-x-1/2"}`}>
      <div className={`rounded-2xl bg-white shadow-elevated border border-slate-100 animate-scale-in origin-top flex ${panelOrder} overflow-hidden`}>
        {/* Categories */}
        <div className="w-56 shrink-0 border-r border-slate-100 p-3 space-y-1 max-h-[70vh] overflow-y-auto">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={getCategoryUrl(cat.slug, locale)}
              onMouseEnter={() => { setActiveCategory(cat.slug); setActiveSubcategory(null); }}
              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeCategory === cat.slug
                  ? "bg-[#1F3A93] text-white font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {isAR && cat.nameAr ? cat.nameAr : cat.name}
            </Link>
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

      </div>
    </div>
  );
}
