"use client";

import { useState } from "react";
import { useSettings } from "@/hooks/use-content";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Image, Type, Hash, Globe, Save, Plus, Trash2 } from "lucide-react";

export function SettingsManager() {
  const { settings, loading, createBanner, updateBanner, deleteBanner, updateCounter, updateSeo } = useSettings();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Type },
    { id: "banners", label: "Banners", icon: Image },
    { id: "counters", label: "Counters", icon: Hash },
    { id: "seo", label: "SEO", icon: Globe },
  ];

  const handleBannerSave = async (id: number, banner: any) => {
    await updateBanner(id, banner);
    toast({ title: "Banner updated", description: "Home banner saved successfully." });
  };

  const handleCounterSave = async (id: number, counter: any) => {
    await updateCounter(id, counter);
    toast({ title: "Counter updated", description: "Stat counter saved." });
  };

  const handleSeoSave = async (id: number, seo: any) => {
    await updateSeo(id, seo);
    toast({ title: "SEO updated", description: "SEO meta saved." });
  };

  if (loading) {
    return (
      <div className="p-8">
        <PageHeader title="Website Settings" subtitle="Manage logo, contact, banners, stats, and SEO." />
        <div className="h-48 animate-pulse rounded-xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader title="Website Settings" subtitle="Manage logo, contact, banners, stats, and SEO." />

      <div className="flex gap-1 rounded-lg bg-slate-100 p-1 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === t.id ? "bg-white text-vega-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "general" && (
        <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">General Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            {settings?.settings?.map((s: any) => (
              <div key={s.key}>
                <label className="mb-1 block text-xs font-semibold text-slate-700">{s.key}</label>
                <input
                  type="text"
                  defaultValue={s.value}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
                />
              </div>
            )) || <p className="text-sm text-slate-400">No settings found.</p>}
          </div>
        </div>
      )}

      {activeTab === "banners" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={async () => {
                const newBanner = await createBanner({
                  title: "New Banner",
                  titleAr: "",
                  subtitle: "",
                  subtitleAr: "",
                  ctaText: "Learn More",
                  ctaTextAr: "",
                  ctaLink: "/",
                  ctaSecondaryText: "",
                  ctaSecondaryTextAr: "",
                  ctaSecondaryLink: "",
                  image: "",
                  displayOrder: (settings?.banners?.length || 0) + 1,
                  isActive: true,
                });
                toast({ title: "Banner created", description: `Banner #${newBanner.id} added.` });
              }}
              className="flex items-center gap-2 rounded-md bg-vega-blue px-4 py-2 text-sm font-semibold text-white hover:bg-vega-blue-dark"
            >
              <Plus className="h-4 w-4" /> Add Banner
            </button>
          </div>
          {settings?.banners?.map((b: any) => (
            <BannerEditCard
              key={b.id}
              banner={b}
              onSave={(data) => handleBannerSave(b.id, data)}
              onDelete={async () => {
                await deleteBanner(b.id);
                toast({ title: "Banner deleted", description: `Banner #${b.id} removed.` });
              }}
            />
          )) || <p className="text-sm text-slate-400">No banners found.</p>}
        </div>
      )}

      {activeTab === "counters" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {settings?.stats?.map((s: any) => (
            <CounterEditCard key={s.id} counter={s} onSave={(data) => handleCounterSave(s.id, data)} />
          )) || <p className="text-sm text-slate-400">No counters found.</p>}
        </div>
      )}

      {activeTab === "seo" && (
        <div className="space-y-4">
          {settings?.seo?.map((s: any) => (
            <SeoEditCard key={s.id} seo={s} onSave={(data) => handleSeoSave(s.id, data)} />
          )) || <p className="text-sm text-slate-400">No SEO entries found.</p>}
        </div>
      )}
    </div>
  );
}

function BannerEditCard({ banner, onSave, onDelete }: { banner: any; onSave: (data: any) => void; onDelete: () => void }) {
  const [form, setForm] = useState(banner);
  const [saving, setSaving] = useState(false);

  const update = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
      <div className="flex gap-4 items-start">
        <div className="w-40">
          <ImageUpload value={form.image} onChange={(url) => update("image", url)} folder="banners" label="Banner Image" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Title</label>
              <input value={form.title || ""} onChange={(e) => update("title", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Banner title" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Title (Arabic)</label>
              <input value={form.titleAr || ""} onChange={(e) => update("titleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="العنوان" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Subtitle</label>
              <textarea rows={2} value={form.subtitle || ""} onChange={(e) => update("subtitle", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="Short description" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Subtitle (Arabic)</label>
              <textarea rows={2} value={form.subtitleAr || ""} onChange={(e) => update("subtitleAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="الوصف" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">CTA Text</label>
              <input value={form.ctaText || ""} onChange={(e) => update("ctaText", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. Request a Quote" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">CTA Text (Arabic)</label>
              <input value={form.ctaTextAr || ""} onChange={(e) => update("ctaTextAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. اطلب عرض سعر" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">CTA Link</label>
              <input value={form.ctaLink || ""} onChange={(e) => update("ctaLink", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="/contact-us" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Secondary CTA Text</label>
              <input value={form.ctaSecondaryText || ""} onChange={(e) => update("ctaSecondaryText", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. View Products" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Secondary CTA Text (Arabic)</label>
              <input value={form.ctaSecondaryTextAr || ""} onChange={(e) => update("ctaSecondaryTextAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="e.g. عرض المنتجات" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Secondary CTA Link</label>
              <input value={form.ctaSecondaryLink || ""} onChange={(e) => update("ctaSecondaryLink", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" placeholder="/products" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Display Order</label>
              <input type="number" value={form.displayOrder || 0} onChange={(e) => update("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
            </div>
            <div className="flex items-center gap-4 pt-5">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={!!form.isActive} onChange={(e) => update("isActive", e.target.checked)} />
                Active
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" /> Delete
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-md bg-vega-blue px-4 py-2 text-sm font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Banner"}
        </button>
      </div>
    </div>
  );
}

function CounterEditCard({ counter, onSave }: { counter: any; onSave: (data: any) => void }) {
  const [form, setForm] = useState(counter);
  const [saving, setSaving] = useState(false);

  const update = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
      <div>
        <label className="text-xs font-semibold text-slate-700">Label</label>
        <input value={form.label || ""} onChange={(e) => update("label", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Label (Ar)</label>
        <input value={form.labelAr || ""} onChange={(e) => update("labelAr", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Value</label>
        <input value={form.value || ""} onChange={(e) => update("value", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Order</label>
        <input type="number" value={form.displayOrder || 0} onChange={(e) => update("displayOrder", Number(e.target.value))} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 rounded-md bg-vega-blue px-4 py-2 text-sm font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

function SeoEditCard({ seo, onSave }: { seo: any; onSave: (data: any) => void }) {
  const [form, setForm] = useState(seo);
  const [saving, setSaving] = useState(false);

  const update = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
      <div>
        <label className="text-xs font-semibold text-slate-700">Page</label>
        <input value={form.page || ""} onChange={(e) => update("page", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Meta Title</label>
        <input value={form.metaTitle || ""} onChange={(e) => update("metaTitle", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">Meta Description</label>
        <textarea rows={3} value={form.metaDescription || ""} onChange={(e) => update("metaDescription", e.target.value)} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none" />
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full flex items-center justify-center gap-2 rounded-md bg-vega-blue px-4 py-2 text-sm font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        {saving ? "Saving..." : "Save SEO"}
      </button>
    </div>
  );
}
