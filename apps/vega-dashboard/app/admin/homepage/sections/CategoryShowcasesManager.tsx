"use client";

import { useState } from "react";
import { useToast } from "@vega/ui";
import { useCategoryShowcases } from "@/hooks/use-category-showcases";
import { CategoryShowcaseForm } from "./CategoryShowcaseForm";
import { CategoryShowcaseCard } from "./CategoryShowcaseCard";
import { Plus, Check, LayoutGrid } from "lucide-react";

interface CategoryShowcasesManagerProps {
  categories: any[];
  loading: boolean;
}

export function CategoryShowcasesManager({ categories, loading: catsLoading }: CategoryShowcasesManagerProps) {
  const { toast } = useToast();
  const { items, loading, create, update, remove } = useCategoryShowcases();
  const [isAdding, setIsAdding] = useState(false);

  const handleCreate = async (data: any) => {
    await create({ ...data, displayOrder: items.length });
    setIsAdding(false);
    toast({ title: "Added", description: "Category showcase created." });
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newOrder = [...items];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    Promise.all([
      update(newOrder[index].id, { displayOrder: index }),
      update(newOrder[newIndex].id, { displayOrder: newIndex }),
    ]);
  };

  const handleUpdateImage = async (id: number, field: string, url: string) => {
    await update(id, { [field]: url });
    toast({ title: "Updated", description: "Image saved." });
  };

  const isLoading = loading || catsLoading;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-vega-blue" />
            <p className="text-sm font-bold text-slate-900">Category Showcases</p>
          </div>
          <button
            onClick={() => setIsAdding((p) => !p)}
            className="flex items-center gap-1 rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark"
          >
            {isAdding ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            {isAdding ? "Cancel" : "Add New"}
          </button>
        </div>

        {isAdding && (
          <CategoryShowcaseForm
            categories={categories}
            onCreate={handleCreate}
            onCancel={() => setIsAdding(false)}
          />
        )}

        {isLoading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 animate-pulse rounded-lg bg-slate-200" />)}</div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white py-12 text-center">
            <p className="text-sm text-slate-400">No category showcases found. Add one to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <CategoryShowcaseCard
                key={item.id}
                item={item}
                index={index}
                total={items.length}
                categories={categories}
                onMove={moveItem}
                onRemove={remove}
                onUpdateImage={handleUpdateImage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
