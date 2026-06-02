"use client";

import { useState, useEffect } from "react";
import { useToast } from "@vega/ui";
import { useHomepage } from "@/hooks/use-homepage";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Star } from "lucide-react";

interface SpotlightManagerProps {
  categories: any[];
  loading: boolean;
}

const DEFAULT_ITEMS = [
  { id: 1, categoryId: "", name: "", image: "", position: "large" },
  { id: 2, categoryId: "", name: "", image: "", position: "small" },
  { id: 3, categoryId: "", name: "", image: "", position: "small" },
  { id: 4, categoryId: "", name: "", image: "", position: "small" },
  { id: 5, categoryId: "", name: "", image: "", position: "small" },
];

export function SpotlightManager({ categories, loading }: SpotlightManagerProps) {
  const { toast } = useToast();
  const { config, saving, saveConfig } = useHomepage();
  const safeCategories = Array.isArray(categories) ? categories : [];

  const [items, setItems] = useState<any[]>(DEFAULT_ITEMS);

  useEffect(() => {
    if (config?.spotlight) {
      setItems(config.spotlight);
    }
  }, [config?.spotlight]);

  const updateItem = (id: number, key: string, value: any) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const handleCategorySelect = (id: number, categoryId: string) => {
    const cat = safeCategories.find((c) => c.id === Number(categoryId));
    if (cat) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, categoryId, name: cat.name, image: cat.image || cat.banner || "" }
            : item
        )
      );
    }
  };

  const handleSave = async () => {
    const ok = await saveConfig({ spotlight: items });
    if (ok) {
      toast({ title: "Saved", description: "Spotlight section configuration updated." });
    } else {
      toast({ title: "Error", description: "Failed to save spotlight config.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-vega-blue" />
          <p className="text-sm font-bold text-slate-900">In the Spotlight — Category Grid</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <p className="text-xs text-slate-500 mb-4">
          The first item is large (2x2), the rest are small (1x1). Select categories for each slot.
        </p>
        {loading ? (
          <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-200" />)}</div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className={`flex items-center gap-3 rounded-lg border p-3 ${index === 0 ? "border-vega-blue/20 bg-vega-blue/5" : "border-slate-200"}`}>
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${index === 0 ? "bg-vega-blue text-white" : "bg-slate-200 text-slate-500"}`}>
                  {index + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-slate-500">Category</label>
                      <select
                        value={item.categoryId}
                        onChange={(e) => handleCategorySelect(item.id, e.target.value)}
                        className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none"
                      >
                        <option value="">Select...</option>
                        {safeCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Name</label>
                      <input value={item.name || ""} onChange={(e) => updateItem(item.id, "name", e.target.value)} className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" placeholder="Display name" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Image</label>
                    <ImageUpload
                      value={item.image || ""}
                      onChange={(url) => updateItem(item.id, "image", url)}
                      folder="spotlight"
                      label=""
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
