"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Search, X, Loader2, Package, Tag } from "lucide-react";
import Link from "next/link";
import { getCategoryUrl } from "@/lib/url";

interface SearchResult {
  products: {
    id: number;
    name: string;
    nameAr: string | null;
    slug: string;
    sku: string;
    mainImage: string | null;
    categoryName: string | null;
  }[];
  categories: {
    id: number;
    name: string;
    nameAr: string | null;
    slug: string;
    image: string | null;
  }[];
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isAR = locale === "ar";

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults({ products: [], categories: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${base}/search?q=${encodeURIComponent(q)}&limit=8`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data);
    } catch {
      setResults({ products: [], categories: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchResults(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchResults]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const first = results.categories[0] || results.products[0];
      if (first) {
        const slug = "slug" in first ? first.slug : "";
        router.push(`/${locale}/products/${slug}`);
      } else {
        router.push(`/${locale}/products`);
      }
      setOpen(false);
      setQuery("");
    }
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const hasResults = results.categories.length > 0 || results.products.length > 0;
  const showEmpty = query.trim() && !loading && !hasResults;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isAR ? "ابحث عن المنتجات أو الفئات..." : "Search products or categories..."}
          className={`w-full rounded-full bg-white/10 border border-white/20 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#FFD400] ${query ? "pl-10 pr-12" : "px-4 pr-10"}`}
        />
        <div className={`absolute top-1/2 -translate-y-1/2 ${isAR ? "left-3" : "right-3"} flex items-center gap-1`}>
          {loading && <Loader2 className="h-4 w-4 text-white/50 animate-spin" />}
          {!loading && <Search className="h-4 w-4 text-white/50" />}
        </div>
        {query && (
          <button
            onClick={() => { setQuery(""); setResults({ products: [], categories: [] }); inputRef.current?.focus(); }}
            className={`absolute top-1/2 -translate-y-1/2 ${isAR ? "right-3" : "left-3"}`}
          >
            <X className="h-4 w-4 text-white/50 hover:text-white" />
          </button>
        )}
      </div>

      {open && (query || hasResults) && (
        <div className={`absolute top-full mt-2 w-full rounded-2xl bg-white shadow-elevated border border-slate-100 overflow-hidden z-50`}>
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
                  <Link
                    key={cat.id}
                    href={getCategoryUrl(cat.slug, locale)}
                    onClick={() => { setOpen(false); setQuery(""); }}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                      {cat.image ? (
                        <img src={cat.image} alt={isAR && cat.nameAr ? cat.nameAr : cat.name} className="h-full w-full object-cover" draggable={false} onContextMenu={(e) => e.preventDefault()} />
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
                  <Link
                    key={prod.id}
                    href={`/${locale}/products/${prod.slug}`}
                    onClick={() => { setOpen(false); setQuery(""); }}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                      {prod.mainImage ? (
                        <img src={prod.mainImage} alt={isAR && prod.nameAr ? prod.nameAr : prod.name} className="h-full w-full object-cover" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                      ) : (
                        <Package className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-slate-700 font-medium block truncate">{isAR && prod.nameAr ? prod.nameAr : prod.name}</span>
                      <span className="text-[10px] text-slate-400">{prod.sku}{prod.categoryName ? ` · ${prod.categoryName}` : ""}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
