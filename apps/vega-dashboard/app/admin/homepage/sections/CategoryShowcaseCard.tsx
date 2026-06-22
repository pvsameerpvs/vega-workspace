"use client";

import { ArrowUp, ArrowDown, Trash2, Pencil } from "lucide-react";

interface CategoryShowcaseCardProps {
  item: any;
  index: number;
  total: number;
  categories: any[];
  onMove: (index: number, direction: "up" | "down") => void;
  onRemove: (id: number) => void;
  onEdit: (item: any) => void;
}

export function CategoryShowcaseCard({ item, index, total, categories, onMove, onRemove, onEdit }: CategoryShowcaseCardProps) {
  const cat = categories.find((c) => c.id === item.categoryId);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex gap-1">
          <button onClick={() => onMove(index, "up")} disabled={index === 0} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
            <ArrowUp className="h-3 w-3" />
          </button>
          <button onClick={() => onMove(index, "down")} disabled={index === total - 1} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
            <ArrowDown className="h-3 w-3" />
          </button>
        </div>
        <span className="text-sm font-semibold text-slate-900 flex-1 truncate">{item.title || cat?.name || "Untitled"}</span>
        <button onClick={() => onEdit(item)} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-vega-blue">
          <Pencil className="h-3 w-3" />
        </button>
        <button onClick={() => onRemove(item.id)} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
          <Trash2 className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="relative h-24 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
            {item[`image${num}`] ? (
              <img
                src={item[`image${num}`]}
                alt={`Image ${num}`}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="h-full w-full object-cover select-none pointer-events-none"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-300">
                No image
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
