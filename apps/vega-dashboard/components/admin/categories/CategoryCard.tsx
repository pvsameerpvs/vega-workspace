"use client";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { SubcategoryForm } from "./SubcategoryForm";
import { ChevronDown, ChevronUp, Trash2, Edit2, Plus } from "lucide-react";

interface Subcategory {
  id: number;
  name: string;
  nameAr?: string;
  image?: string;
  displayOrder?: number;
}

interface CategoryCardProps {
  cat: any;
  subs: Subcategory[];
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onEditSub: (sub: Subcategory) => void;
  onDeleteSub: (sub: Subcategory) => void;
  onAddSub: () => void;
  subFormOpen: boolean;
  subForm: any;
  editSub: any;
  updateSubForm: (k: string, v: any) => void;
  onSaveSub: () => void;
  onCancelSub: () => void;
}

export function CategoryCard({
  cat,
  subs,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  onEditSub,
  onDeleteSub,
  onAddSub,
  subFormOpen,
  subForm,
  editSub,
  updateSubForm,
  onSaveSub,
  onCancelSub,
}: CategoryCardProps) {
  const safeSubs = Array.isArray(subs) ? subs : [];
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <img
          src={cat.image || ""}
          alt={cat.name}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          className="h-14 w-14 rounded-xl object-cover border border-slate-100 select-none pointer-events-none"
          style={{ WebkitUserDrag: "none" } as any}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-slate-900">{cat.name}</p>
            <StatusBadge status={cat.isActive ? "active" : "inactive"} />
          </div>
          <p className="text-xs text-slate-400">{cat.nameAr} &middot; /{cat.slug} &middot; Order: {cat.displayOrder}</p>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{cat.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{safeSubs.length} subs</span>
          <button onClick={onEdit} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-vega-blue"><Edit2 className="h-4 w-4" /></button>
          <button onClick={onDelete} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
          <button onClick={onToggle} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100">{expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>
        </div>
      </div>

      {expanded && (
        <div className="border-t bg-slate-50/50 px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subcategories</p>
            <button onClick={onAddSub} className="flex items-center gap-1 rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark"><Plus className="h-3 w-3" /> Add Sub</button>
          </div>

          {safeSubs.length === 0 ? (
            <p className="text-sm text-slate-400 py-2">No subcategories yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {safeSubs.map((sub) => (
                <div key={sub.id} className="flex items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
                  <img
                    src={sub.image || ""}
                    alt={sub.name}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="h-10 w-10 rounded-lg object-cover select-none pointer-events-none"
                    style={{ WebkitUserDrag: "none" } as any}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{sub.name}</p>
                    <p className="text-xs text-slate-400">{sub.nameAr} &middot; Order: {sub.displayOrder}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => onEditSub(sub)} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-vega-blue"><Edit2 className="h-3 w-3" /></button>
                    <button onClick={() => onDeleteSub(sub)} className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {subFormOpen && (
            <SubcategoryForm
              catName={cat.name}
              subForm={subForm}
              editSub={editSub}
              updateSubForm={updateSubForm}
              onSave={onSaveSub}
              onCancel={onCancelSub}
            />
          )}
        </div>
      )}
    </div>
  );
}
