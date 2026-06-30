"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { getProductsFiltered, mapProductToFrontend } from "@/lib/api";
import { ProductGrid } from "./ProductGrid";
import { ProductFilters } from "./ProductFilters";
import { Product } from "@/lib/types";

interface ProductsPageClientProps {
  initialProducts: Product[];
  categories: any[];
  locale: string;
}

export function ProductsPageClient({
  initialProducts,
  categories,
  locale,
}: ProductsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);
  const isAR = locale === "ar";

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    const cat = categories.find((c: any) => String(c.id) === selectedCategory);
    return cat?.subcategories || [];
  }, [selectedCategory, categories]);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      setLoading(true);
      const params: Record<string, string> = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedSubcategory) params.subcategory = selectedSubcategory;

      const raw = await getProductsFiltered(params);
      if (cancelled) return;
      const mapped = (raw || []).map(mapProductToFrontend).filter(Boolean) as Product[];
      setProducts(mapped);
      setLoading(false);
    };

    fetchData();
    return () => { cancelled = true; };
  }, [debouncedSearch, selectedCategory, selectedSubcategory]);

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    setSelectedSubcategory("");
  };

  const hasFilters = !!(debouncedSearch || selectedCategory || selectedSubcategory);

  return (
    <div className="space-y-8">
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedSubcategory={selectedSubcategory}
        onSubcategoryChange={setSelectedSubcategory}
        categories={categories}
        subcategories={subcategories}
        locale={locale}
      />

      {hasFilters && (
        <div className="text-sm text-slate-500">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-vega-blue border-t-transparent" />
              {isAR ? "جاري التحميل..." : "Loading..."}
            </span>
          ) : (
            <span>
              {products.length} {isAR ? "منتج" : "product"}{products.length !== 1 ? "s" : ""} {isAR ? "تم العثور عليه" : "found"}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-2xl">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-vega-blue border-t-transparent" />
          </div>
        )}
        <ProductGrid products={products} locale={locale} />
      </div>
    </div>
  );
}
