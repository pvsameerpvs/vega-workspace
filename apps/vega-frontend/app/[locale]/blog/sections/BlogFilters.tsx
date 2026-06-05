"use client";

import { Search } from "lucide-react";

interface BlogFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  locale?: string;
  resultCount: number;
}

export function BlogFilters({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  locale = "en",
  resultCount,
}: BlogFiltersProps) {
  const isAR = locale === "ar";

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={isAR ? "ابحث في المقالات..." : "Search articles..."}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 transition-all focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onCategoryChange("all")}
          className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300 ${
            activeCategory === "all"
              ? "bg-[#1F3A93] text-white shadow-md shadow-[#1F3A93]/20"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          {isAR ? "الكل" : "All"}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-[#1F3A93] text-white shadow-md shadow-[#1F3A93]/20"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-400 font-medium">
          {resultCount} {isAR ? "نتيجة" : "results"}
        </span>
      </div>
    </div>
  );
}
