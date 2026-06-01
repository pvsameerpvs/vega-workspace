"use client";

import { useState } from "react";
import { useToast } from "@vega/ui";
import { Building2, Plus, Trash2 } from "lucide-react";

export function BusinessSolutionsManager() {
  const { toast } = useToast();
  const [industries, setIndustries] = useState([
    { id: 1, name: "Construction & contracting companies", nameAr: "شركات البناء والمقاولات", icon: "Building", active: true },
    { id: 2, name: "Labor camps & worker housing", nameAr: "مخيمات العمال وإسكان العمال", icon: "Home", active: true },
    { id: 3, name: "Landscaping companies", nameAr: "شركات تنسيق الحدائق", icon: "TreePine", active: true },
    { id: 4, name: "Facilities management companies", nameAr: "شركات إدارة المرافق", icon: "Briefcase", active: true },
    { id: 5, name: "Real estate developers", nameAr: "مطورو العقارات", icon: "Landmark", active: true },
    { id: 6, name: "Joineries and steel fabrication", nameAr: "النجارة والتشكيل الفولاذي", icon: "Hammer", active: true },
    { id: 7, name: "Manpower supply companies", nameAr: "شركات توريد العمالة", icon: "Users2", active: true },
    { id: 8, name: "Waste management companies", nameAr: "شركات إدارة النفايات", icon: "Trash2", active: true },
    { id: 9, name: "Government entities", nameAr: "الجهات الحكومية", icon: "Factory", active: true },
    { id: 10, name: "Cold storage facilities", nameAr: "مرافق التخزين البارد", icon: "Snowflake", active: true },
  ]);

  const updateIndustry = (id: number, key: string, value: any) => {
    setIndustries((prev) => prev.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  };

  const addIndustry = () => {
    setIndustries((prev) => [...prev, { id: Date.now(), name: "", nameAr: "", icon: "Building", active: true }]);
  };

  const removeIndustry = (id: number) => {
    setIndustries((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSave = () => {
    toast({ title: "Saved", description: "Business solutions industries updated." });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-vega-blue" />
          <p className="text-sm font-bold text-slate-900">Business Solutions — Industries</p>
        </div>
        <div className="flex gap-2">
          <button onClick={addIndustry} className="flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Plus className="h-3 w-3" /> Add Industry
          </button>
          <button onClick={handleSave} className="rounded-md bg-vega-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-vega-blue-dark">
            Save
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {industries.map((industry) => (
          <div key={industry.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
            <input type="checkbox" checked={industry.active} onChange={(e) => updateIndustry(industry.id, "active", e.target.checked)} className="h-4 w-4" />
            <div className="flex-1 grid grid-cols-3 gap-2">
              <input value={industry.name} onChange={(e) => updateIndustry(industry.id, "name", e.target.value)} className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" placeholder="Name" />
              <input value={industry.nameAr} onChange={(e) => updateIndustry(industry.id, "nameAr", e.target.value)} className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" placeholder="Arabic name" />
              <input value={industry.icon} onChange={(e) => updateIndustry(industry.id, "icon", e.target.value)} className="rounded-md border border-slate-200 px-2 py-1.5 text-sm focus:border-vega-blue focus:outline-none" placeholder="Icon name" />
            </div>
            <button onClick={() => removeIndustry(industry.id)} className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
