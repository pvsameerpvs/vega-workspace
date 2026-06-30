"use client";

import { Search, X } from "lucide-react";

interface FilterItem {
  id: number;
  name: string;
  nameAr?: string;
  slug: string;
}

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  selectedSubcategory: string;
  onSubcategoryChange: (id: string) => void;
  categories: any[];
  subcategories: FilterItem[];
  locale: string;
}

export function ProductFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  categories,
  subcategories,
  locale,
}: ProductFiltersProps) {
  const isAR = locale === "ar";

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={isAR ? "ابحث عن المنتجات..." : "Search products..."}
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm text-vega-blue placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all duration-300"
          dir={isAR ? "rtl" : "ltr"}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("")}
          className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
            !selectedCategory
              ? "bg-vega-blue text-white shadow-md"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          {isAR ? "الكل" : "All"}
        </button>
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(String(cat.id))}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
              selectedCategory === String(cat.id)
                ? "bg-vega-blue text-white shadow-md"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {isAR && cat.nameAr ? cat.nameAr : cat.name}
          </button>
        ))}
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSubcategoryChange("")}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
              !selectedSubcategory
                ? "bg-vega-yellow text-vega-blue shadow-md"
                : "bg-vega-yellow/20 text-slate-500 hover:bg-vega-yellow/40"
            }`}
          >
            {isAR ? "جميع الفئات الفرعية" : "All Subcategories"}
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSubcategoryChange(String(sub.id))}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                selectedSubcategory === String(sub.id)
                  ? "bg-vega-yellow text-vega-blue shadow-md"
                  : "bg-vega-yellow/20 text-slate-500 hover:bg-vega-yellow/40"
              }`}
            >
              {isAR && sub.nameAr ? sub.nameAr : sub.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
