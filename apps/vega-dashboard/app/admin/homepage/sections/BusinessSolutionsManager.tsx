"use client";

import { useState } from "react";
import { useToast } from "@vega/ui";
import { useIndustries } from "@/hooks/use-industries";
import { Building2, Plus, Trash2 } from "lucide-react";

export function BusinessSolutionsManager() {
  const { toast } = useToast();
  const { items: industries, loading, create, update, remove } = useIndustries();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = () => {
    create({ name: "", nameAr: "", icon: "Building", isActive: true });
  };

  const handleUpdate = (id: number, key: string, value: any) => {
    const item = industries.find((i) => i.id === id);
    if (!item) return;
    update(id, { ...item, [key]: value });
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await Promise.all(
        industries.map((ind) =>
          update(ind.id, { name: ind.name, nameAr: ind.nameAr, icon: ind.icon, isActive: ind.isActive })
        )
      );
      toast({ title: "Saved", description: "Business solutions industries updated." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Failed to save.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-vega-blue" />
          <p className="text-sm font-bold text-slate-900">Business Solutions — Industries</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleAdd} className="flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Plus className="h-3 w-3" /> Add Industry
          </button>
          <button onClick={handleSave} disabled={isSubmitting} className="rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50">
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-12 animate-pulse rounded-lg bg-slate-200" />)}</div>
      ) : industries.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white py-12 text-center">
          <p className="text-sm text-slate-400">No industries found.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {industries.map((industry) => (
            <div key={industry.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
              <input type="checkbox" checked={industry.isActive} onChange={(e) => handleUpdate(industry.id, "isActive", e.target.checked)} className="h-4 w-4" />
              <div className="flex-1 grid grid-cols-3 gap-2">
                <input value={industry.name} onChange={(e) => handleUpdate(industry.id, "name", e.target.value)} className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" placeholder="Name" />
                <input value={industry.nameAr || ""} onChange={(e) => handleUpdate(industry.id, "nameAr", e.target.value)} className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" placeholder="Arabic name" />
                <input value={industry.icon || ""} onChange={(e) => handleUpdate(industry.id, "icon", e.target.value)} className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" placeholder="Icon name" />
              </div>
              <button onClick={() => remove(industry.id)} className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
