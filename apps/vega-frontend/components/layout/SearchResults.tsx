"use client";

import { Search, Loader2, Package, Tag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCategoryUrl } from "@/lib/url";

interface SearchResult {
  products: {
    id: number; name: string; nameAr: string | null; slug: string;
    sku: string; mainImage: string | null; categoryName: string | null;
  }[];
  categories: {
    id: number; name: string; nameAr: string | null; slug: string; image: string | null;
  }[];
}

interface Props {
  results: SearchResult;
  query: string;
  loading: boolean;
  locale: string;
  isAR: boolean;
  onClose: () => void;
}

export function SearchResults({ results, query, loading, locale, isAR, onClose }: Props) {
  const hasResults = results.categories.length > 0 || results.products.length > 0;
  const showEmpty = query.trim() && !loading && !hasResults;

  if (!query && !hasResults) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full mt-2 w-full min-w-[320px] right-0 rounded-2xl bg-white shadow-elevated border border-slate-100 overflow-hidden z-50"
    >
      {loading && (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />
        </div>
      )}
      {showEmpty && (
        <div className="p-4 text-sm text-slate-400 text-center">
          {isAR ? "لم يتم العثور على نتائج" : "No results found"}
        </div>
      )}
      {results.categories.length > 0 && (
        <div className="p-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
            {isAR ? "الفئات" : "Categories"}
          </div>
          <div className="space-y-1">
            {results.categories.map((cat) => (
              <Link key={cat.id} href={getCategoryUrl(cat.slug, locale)} onClick={onClose}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                  {cat.image ? (
                    <img src={cat.image} alt="" className="h-full w-full object-cover" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                  ) : (
                    <Tag className="h-4 w-4 text-slate-300" />
                  )}
                </div>
                <span className="text-sm text-slate-700 font-medium">{isAR && cat.nameAr ? cat.nameAr : cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {results.products.length > 0 && (
        <div className={`p-3 ${results.categories.length > 0 ? "border-t border-slate-100" : ""}`}>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
            {isAR ? "المنتجات" : "Products"}
          </div>
          <div className="space-y-1">
            {results.products.map((prod) => (
              <Link key={prod.id} href={`/${locale}/products/${prod.slug}`} onClick={onClose}
                className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                  {prod.mainImage ? (
                    <img src={prod.mainImage} alt="" className="h-full w-full object-cover" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                  ) : (
                    <Package className="h-4 w-4 text-slate-300" />
                  )}
                </div>
                <div className="min-w-0">
                  <span className="text-sm text-slate-700 font-medium block truncate">
                    {isAR && prod.nameAr ? prod.nameAr : prod.name}
                  </span>
                  <span className="text-[10px] text-slate-400">{prod.sku}{prod.categoryName ? ` · ${prod.categoryName}` : ""}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
