"use client";

import { useState } from "react";
import { useToast } from "@vega/ui";
import { Tag, Plus, Trash2 } from "lucide-react";

export function LimitedDealsManager() {
  const { toast } = useToast();
  const [deals, setDeals] = useState([
    { id: 1, title: "Exchange Offer", subtitle: "Up to 70% Off", desc: "Honest deals! Big savings on bulk furniture orders.", cta: "Shop Now", bg: "blue", active: true },
    { id: 2, title: "Jumbo Offer", subtitle: "10% Off", desc: "Discover a wide range of camp & office furniture.", cta: "Shop Now", bg: "yellow", active: true },
    { id: 3, title: "Add On Sale", subtitle: "Get 10% Off", desc: "Extra discount when you add accessories to your order.", cta: "Shop Now", bg: "blue", active: true },
    { id: 4, title: "Wedding Package", subtitle: "Special Deal", desc: "Premium VIP poles, barriers & event furniture.", cta: "Shop Now", bg: "blue", active: true },
  ]);

  const updateDeal = (id: number, key: string, value: any) => {
    setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, [key]: value } : d)));
  };

  const addDeal = () => {
    setDeals((prev) => [...prev, { id: Date.now(), title: "", subtitle: "", desc: "", cta: "Shop Now", bg: "blue", active: true }]);
  };

  const removeDeal = (id: number) => {
    setDeals((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSave = () => {
    toast({ title: "Saved", description: "Limited deals updated." });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-vega-yellow" />
          <p className="text-sm font-bold text-slate-900">Limited Time Deals</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addDeal} className="flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Plus className="h-3 w-3" /> Add Deal
          </button>
          <button onClick={handleSave} className="rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark">
            Save
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {deals.map((deal) => (
          <div key={deal.id} className={`rounded-xl border p-4 shadow-sm ${deal.bg === "yellow" ? "border-amber-200 bg-amber-50/30" : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-2 mb-3">
              <input type="checkbox" checked={deal.active} onChange={(e) => updateDeal(deal.id, "active", e.target.checked)} className="h-4 w-4" />
              <span className="text-xs font-semibold text-slate-500">Active</span>
              <div className="ml-auto flex items-center gap-2">
                <select
                  value={deal.bg}
                  onChange={(e) => updateDeal(deal.id, "bg", e.target.value)}
                  className="rounded-md border border-slate-200 px-2 py-1 text-xs"
                >
                  <option value="blue">Blue</option>
                  <option value="yellow">Yellow</option>
                </select>
                <button onClick={() => removeDeal(deal.id)} className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500">Title</label>
                <input value={deal.title} onChange={(e) => updateDeal(deal.id, "title", e.target.value)} className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Subtitle</label>
                <input value={deal.subtitle} onChange={(e) => updateDeal(deal.id, "subtitle", e.target.value)} className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-500">Description</label>
                <textarea rows={2} value={deal.desc} onChange={(e) => updateDeal(deal.id, "desc", e.target.value)} className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-slate-500">CTA Text</label>
                <input value={deal.cta} onChange={(e) => updateDeal(deal.id, "cta", e.target.value)} className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
