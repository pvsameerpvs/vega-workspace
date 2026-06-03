"use client";

import { useState } from "react";
import { useToast } from "@vega/ui";
import { usePopularCategories } from "@/hooks/use-popular-categories";
import { useHomepage } from "@/hooks/use-homepage";
import { Grid3X3, ArrowUp, ArrowDown, Plus, Trash2 } from "lucide-react";

interface PopularCategoriesManagerProps {
  categories: any[];
  loading: boolean;
}

export function PopularCategoriesManager({ categories, loading: catsLoading }: PopularCategoriesManagerProps) {
  const { toast } = useToast();
  const { items: popularCategories, loading: popularLoading, create, update, remove } = usePopularCategories();
  const { saving, saveConfig } = useHomepage();
  const [newCat, setNewCat] = useState({ name: "", nameAr: "", image: "", link: "" });

  const handleAdd = async () => {
    if (!newCat.name) return;
    await create({ ...newCat, isActive: true, displayOrder: popularCategories.length + 1 });
    setNewCat({ name: "", nameAr: "", image: "", link: "" });
    toast({ title: "Added", description: "Popular category added." });
  };

  const handleSaveOrder = async () => {
    const ok = await saveConfig({ popularCategories: popularCategories.map((c) => c.id) });
    if (ok) {
      toast({ title: "Saved", description: "Popular categories updated." });
    } else {
      toast({ title: "Error", description: "Failed to save.", variant: "destructive" });
    }
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= popularCategories.length) return;
    const newOrder = [...popularCategories];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    // Update display order in backend
    Promise.all([
      update(newOrder[index].id, { displayOrder: index }),
      update(newOrder[newIndex].id, { displayOrder: newIndex }),
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4 text-vega-blue" />
            <p className="text-sm font-bold text-slate-900">Popular Categories — Manage & Order</p>
          </div>
          <button onClick={handleSaveOrder} disabled={saving} className="rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="mb-4 grid grid-cols-4 gap-2">
          <input value={newCat.name} onChange={(e) => setNewCat((p) => ({ ...p, name: e.target.value }))} placeholder="Name" className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
          <input value={newCat.nameAr} onChange={(e) => setNewCat((p) => ({ ...p, nameAr: e.target.value }))} placeholder="Arabic name" className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
          <input value={newCat.image} onChange={(e) => setNewCat((p) => ({ ...p, image: e.target.value }))} placeholder="Image URL" className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
          <button onClick={handleAdd} className="flex items-center justify-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Plus className="h-3 w-3" /> Add
          </button>
        </div>

        {popularLoading ? (
          <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-slate-200" />)}</div>
        ) : popularCategories.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white py-12 text-center">
            <p className="text-sm text-slate-400">No popular categories found.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {popularCategories.map((cat, index) => (
              <div key={cat.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-2">
                <img
                  src={cat.image || ""}
                  alt={cat.name}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-8 w-8 rounded-lg object-cover select-none pointer-events-none"
                  style={{ WebkitUserDrag: "none" } as any}
                />
                <span className="text-sm text-slate-900 flex-1">{cat.name}</span>
                <div className="flex gap-1">
                  <button onClick={() => moveItem(index, "up")} className="rounded p-1 text-slate-400 hover:bg-slate-100" disabled={index === 0}>
                    <ArrowUp className="h-3 w-3" />
                  </button>
                  <button onClick={() => moveItem(index, "down")} className="rounded p-1 text-slate-400 hover:bg-slate-100" disabled={index === popularCategories.length - 1}>
                    <ArrowDown className="h-3 w-3" />
                  </button>
                  <button onClick={() => remove(cat.id)} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
