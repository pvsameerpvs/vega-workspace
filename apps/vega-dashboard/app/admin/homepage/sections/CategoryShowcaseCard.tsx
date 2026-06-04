"use client";

import { ImageUpload } from "@/components/admin/ImageUpload";
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";

interface CategoryShowcaseCardProps {
  item: any;
  index: number;
  total: number;
  categories: any[];
  onMove: (index: number, direction: "up" | "down") => void;
  onRemove: (id: number) => void;
  onUpdateImage: (id: number, field: string, url: string) => void;
}

export function CategoryShowcaseCard({ item, index, total, categories, onMove, onRemove, onUpdateImage }: CategoryShowcaseCardProps) {
  const cat = categories.find((c) => c.id === item.categoryId);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex gap-1">
          <button onClick={() => onMove(index, "up")} disabled={index === 0} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
            <ArrowUp className="h-3 w-3" />
          </button>
          <button onClick={() => onMove(index, "down")} disabled={index === total - 1} className="rounded p-1 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
            <ArrowDown className="h-3 w-3" />
          </button>
        </div>
        <span className="text-sm font-semibold text-slate-900 flex-1">{item.title || cat?.name || "Untitled"}</span>
        <button onClick={() => onRemove(item.id)} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((num) => (
          <ImageUpload
            key={num}
            value={item[`image${num}` as keyof typeof item] as string}
            onChange={(url) => onUpdateImage(item.id, `image${num}`, url)}
          />
        ))}
      </div>
    </div>
  );
}
