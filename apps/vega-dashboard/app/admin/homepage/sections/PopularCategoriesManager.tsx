"use client";

import { useState } from "react";
import { useToast } from "@vega/ui";
import { Grid3X3, ArrowUp, ArrowDown } from "lucide-react";

interface PopularCategoriesManagerProps {
  categories: any[];
  loading: boolean;
}

export function PopularCategoriesManager({ categories, loading }: PopularCategoriesManagerProps) {
  const { toast } = useToast();
  const [popularOrder, setPopularOrder] = useState<number[]>([]);
  const [rangeOrder, setRangeOrder] = useState<number[]>([]);

  const handleSave = () => {
    toast({ title: "Saved", description: "Popular categories and product ranges updated." });
  };

  const moveItem = (order: number[], index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= order.length) return order;
    const newOrder = [...order];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    return newOrder;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4 text-vega-blue" />
            <p className="text-sm font-bold text-slate-900">Popular Categories — Order & Selection</p>
          </div>
          <button onClick={handleSave} className="rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark">
            Save
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          Select up to 8 categories to show in the Popular Categories section. Drag or use arrows to reorder.
        </p>
        {loading ? (
          <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-slate-200" />)}</div>
        ) : (
          <div className="space-y-2">
            {categories.map((cat, index) => (
              <div key={cat.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-2">
                <input type="checkbox" className="h-4 w-4" defaultChecked={index < 8} />
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
                  <button onClick={() => setPopularOrder((prev) => moveItem(prev.length ? prev : categories.map((c: any) => c.id), index, "up"))} className="rounded p-1 text-slate-400 hover:bg-slate-100" disabled={index === 0}>
                    <ArrowUp className="h-3 w-3" />
                  </button>
                  <button onClick={() => setPopularOrder((prev) => moveItem(prev.length ? prev : categories.map((c: any) => c.id), index, "down"))} className="rounded p-1 text-slate-400 hover:bg-slate-100" disabled={index === categories.length - 1}>
                    <ArrowDown className="h-3 w-3" />
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
