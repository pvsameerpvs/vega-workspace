"use client";

import { useState, useEffect } from "react";
import { useToast } from "@vega/ui";
import { useHomepage } from "@/hooks/use-homepage";
import { Badge } from "@vega/ui";
import { Star } from "lucide-react";

interface FeaturedProductsManagerProps {
  products: any[];
  loading: boolean;
}

const sections = [
  { id: "featured", label: "Online Exclusive", badge: "Featured" },
  { id: "bestSellers", label: "Best Sellers", badge: "Best Seller" },
  { id: "newArrivals", label: "New Arrivals", badge: "New Arrival" },
  { id: "recentViewed", label: "Recently Viewed", badge: "" },
];

export function FeaturedProductsManager({ products, loading }: FeaturedProductsManagerProps) {
  const { toast } = useToast();
  const { config, saving, saveConfig } = useHomepage();
  const [activeSection, setActiveSection] = useState("featured");
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number[]>>({
    featured: [],
    bestSellers: [],
    newArrivals: [],
    recentViewed: [],
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (config?.featuredProducts) {
      setSelectedProducts(config.featuredProducts);
    }
  }, [config?.featuredProducts]);

  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = safeProducts.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleProduct = (sectionId: string, productId: number) => {
    setSelectedProducts((prev) => {
      const current = prev[sectionId] || [];
      const exists = current.includes(productId);
      const updated = exists ? current.filter((id) => id !== productId) : [...current, productId];
      return { ...prev, [sectionId]: updated };
    });
  };

  const handleSave = async () => {
    const ok = await saveConfig({ featuredProducts: selectedProducts });
    if (ok) {
      toast({ title: "Saved", description: "Product selections updated for homepage sections." });
    } else {
      toast({ title: "Error", description: "Failed to save featured products.", variant: "destructive" });
    }
  };

  const currentSection = sections.find((s) => s.id === activeSection);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                activeSection === s.id ? "bg-white text-vega-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button onClick={handleSave} disabled={saving} className="rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50">
          {saving ? "Saving..." : "Save Selection"}
        </button>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Star className="h-4 w-4 text-vega-yellow" />
          <p className="text-sm font-bold text-slate-900">
            {currentSection?.label} — Select products to display
          </p>
          <span className="text-xs text-slate-400 ml-auto">
            {(selectedProducts[activeSection] || []).length} selected
          </span>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full max-w-md rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
        />

        {loading ? (
          <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-slate-200" />)}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white py-12 text-center">
            <p className="text-sm text-slate-400">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => {
              const isSelected = (selectedProducts[activeSection] || []).includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleProduct(activeSection, p.id)}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                    isSelected ? "border-vega-blue/30 bg-vega-blue/5" : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <img
                    src={p.mainImage || p.image || ""}
                    alt={p.name}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="h-10 w-10 rounded-lg object-cover select-none pointer-events-none"
                    style={{ WebkitUserDrag: "none" } as any}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.sku}</p>
                  </div>
                  {isSelected && <Badge variant="vega">Selected</Badge>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
