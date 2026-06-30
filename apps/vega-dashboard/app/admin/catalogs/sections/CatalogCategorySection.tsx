"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useToast } from "@vega/ui";
import { Select } from "@vega/ui";
import { X, Package, ExternalLink } from "lucide-react";

interface Props {
  catalogId: number;
  categories: { id: number; name: string; nameAr?: string; slug: string }[];
  onRefresh: () => void;
}

export function CatalogCategorySection({ catalogId, categories, onRefresh }: Props) {
  const { toast } = useToast();
  const [allCats, setAllCats] = useState<any[]>([]);
  const [products, setProducts] = useState<Record<number, any[]>>({});
  const [selectedCat, setSelectedCat] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getCategories().then((res) => {
      const list = Array.isArray(res) ? res : res?.data ?? [];
      setAllCats(list);
    });
  }, []);

  useEffect(() => {
    if (categories.length === 0) { setProducts({}); return; }
    const ids = categories.map((c) => c.id);
    Promise.all(ids.map((id) =>
      api.getProductsPaginated(1, 50, undefined, id).then((r) => ({ id, products: r.data || [] }))
    )).then((results) => {
      const map: Record<number, any[]> = {};
      results.forEach((r) => { map[r.id] = r.products; });
      setProducts(map);
    });
  }, [categories]);

  const handleAdd = async () => {
    if (!selectedCat) return;
    setLoading(true);
    try {
      await api.linkCategoryToCatalog(catalogId, Number(selectedCat));
      toast({ title: "Category linked", description: "Category added to catalog." });
      setSelectedCat("");
      onRefresh();
    } catch (e: any) {
      toast({ title: "Error", description: e?.message || "Failed to link category.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (categoryId: number) => {
    try {
      await api.unlinkCategoryFromCatalog(catalogId, categoryId);
      toast({ title: "Category removed", description: "Category unlinked from catalog." });
      onRefresh();
    } catch (e: any) {
      toast({ title: "Error", description: e?.message || "Failed to unlink.", variant: "destructive" });
    }
  };

  const linkedIds = new Set(categories.map((c) => c.id));
  const availableCats = allCats.filter((c: any) => !linkedIds.has(c.id));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)} className="flex-1 text-sm">
          <option value="">Select category to link...</option>
          {availableCats.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>
        <button onClick={handleAdd} disabled={!selectedCat || loading} className="rounded-md bg-vega-blue px-4 py-2 text-xs font-bold text-white hover:bg-vega-blue/90 disabled:opacity-50">
          {loading ? "..." : "Add"}
        </button>
      </div>

      {categories.length === 0 && <p className="text-sm text-slate-400 py-2">No categories linked yet.</p>}

      {categories.map((cat) => (
        <div key={cat.id} className="rounded-lg border bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-50">
            <span className="text-sm font-semibold text-slate-800">{cat.name}</span>
            <button onClick={() => handleRemove(cat.id)} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="p-3 space-y-1.5">
            {(products[cat.id] || []).length === 0 && (
              <p className="text-xs text-slate-400">No products in this category.</p>
            )}
            {(products[cat.id] || []).slice(0, 10).map((p: any) => (
              <div key={p.id} className="flex items-center gap-3 rounded-md bg-slate-50 px-3 py-2">
                <img src={p.mainImage || ""} alt={p.name} className="h-8 w-8 rounded object-cover bg-slate-200" draggable={false} onContextMenu={(e) => e.preventDefault()} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-700 truncate">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.sku}</p>
                </div>
                <a href={`/admin/products?id=${p.id}`} className="rounded p-1 text-slate-400 hover:text-vega-blue">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
            {(products[cat.id] || []).length > 10 && (
              <p className="text-xs text-slate-400 text-center pt-1">+ {(products[cat.id] || []).length - 10} more</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
