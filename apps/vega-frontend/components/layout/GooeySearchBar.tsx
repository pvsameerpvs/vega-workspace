"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchResults } from "./SearchResults";
interface SearchResult {
  products: { id: number; name: string; nameAr: string | null; slug: string; sku: string; mainImage: string | null; categoryName: string | null }[];
  categories: { id: number; name: string; nameAr: string | null; slug: string; image: string | null }[];
}
export function GooeySearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult>({ products: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isAR = locale === "ar";
  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) { setResults({ products: [], categories: [] }); setLoading(false); return; }
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${base}/search?q=${encodeURIComponent(q)}&limit=8`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data);
    } catch { setResults({ products: [], categories: [] }); } finally { setLoading(false); }
  }, []);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchResults(query), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, fetchResults]);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  const handleOpen = () => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 150); };
  const handleClose = () => { setOpen(false); setQuery(""); setResults({ products: [], categories: [] }); };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const first = results.categories[0] || results.products[0];
      if (first) router.push(`/${locale}/products/${"slug" in first ? first.slug : ""}`);
      else router.push(`/${locale}/products`);
      handleClose();
    }
    if (e.key === "Escape") handleClose();
  };
  return (
    <div ref={wrapperRef} className="relative flex items-center">
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="goo-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="search-trigger"
            onClick={handleOpen}
            className="flex items-center justify-center text-white/70 hover:text-white transition-colors p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            aria-label={isAR ? "بحث" : "Search"}
          >
            <Search className="h-5 w-5" />
          </motion.button>
        ) : (
          <motion.div
            key="search-expanded"
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative"
          >
            <div className="relative" style={{ filter: "url(#goo-filter)" }}>
              <div className="absolute inset-0 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm" />
            </div>
            <div className="relative flex items-center">
              <div className={`absolute ${isAR ? "right-3" : "left-3"} flex items-center`}>
                {loading ? <Loader2 className="h-5 w-5 text-white/70 animate-spin" /> : <Search className="h-5 w-5 text-white/70" />}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isAR ? "ابحث عن المنتجات..." : "Search products..."}
                className={`w-full rounded-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none ${isAR ? "pr-12 pl-10" : "pl-12 pr-10"}`}
              />
              {query && (
                <button
                  onClick={handleClose}
                  className={`absolute ${isAR ? "left-3" : "right-3"} p-0.5 rounded-full hover:bg-white/10 transition-colors`}
                >
                  <X className="h-4 w-4 text-white/60 hover:text-white" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && <SearchResults results={results} query={query} loading={loading} locale={locale} isAR={isAR} onClose={handleClose} />}
      </AnimatePresence>
    </div>
  );
}
