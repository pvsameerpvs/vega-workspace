"use client";

import { useState } from "react";
import { useSettings } from "@/hooks/use-settings";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { BannerEditCard, CounterEditCard, SeoEditCard } from "@/components/admin/settings";
import { api } from "@/lib/api";
import { Image, Type, Hash, Globe, Plus, Save } from "lucide-react";

export function SettingsManager() {
  const { settings, loading, createBanner, updateBanner, deleteBanner, updateCounter, updateSeo } = useSettings();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [generalForm, setGeneralForm] = useState<Record<string, string>>({});
  const [isSavingGeneral, setIsSavingGeneral] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: Type },
    { id: "banners", label: "Banners", icon: Image },
    { id: "counters", label: "Counters", icon: Hash },
    { id: "seo", label: "SEO", icon: Globe },
  ];

  const handleBannerSave = async (id: number, banner: any) => {
    try {
      await updateBanner(id, banner);
      toast({ title: "Banner updated", description: "Home banner saved successfully." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save banner.", variant: "destructive" });
    }
  };

  const handleCounterSave = async (id: number, counter: any) => {
    try {
      await updateCounter(id, counter);
      toast({ title: "Counter updated", description: "Stat counter saved." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save counter.", variant: "destructive" });
    }
  };

  const handleSeoSave = async (id: number, seo: any) => {
    try {
      await updateSeo(id, seo);
      toast({ title: "SEO updated", description: "SEO meta saved." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save SEO.", variant: "destructive" });
    }
  };

  const handleGeneralSave = async () => {
    setIsSavingGeneral(true);
    try {
      await Promise.all(
        Object.entries(generalForm).map(([key, value]) =>
          api.updateSetting(key, value)
        )
      );
      toast({ title: "Settings saved", description: "General settings updated successfully." });
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to save settings.", variant: "destructive" });
    } finally {
      setIsSavingGeneral(false);
    }
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
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">General Settings</h3>
            <button
              onClick={handleGeneralSave}
              disabled={isSavingGeneral}
              className="flex items-center gap-2 rounded-md bg-vega-blue px-3 py-2 text-xs font-semibold text-white hover:bg-vega-blue-dark disabled:opacity-50"
            >
              <Save className="h-3 w-3" />
              {isSavingGeneral ? "Saving..." : "Save Settings"}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {settings?.settings?.map((s: any) => (
              <div key={s.key}>
                <label className="mb-1 block text-xs font-semibold text-slate-700">{s.key}</label>
                <input
                  type="text"
                  defaultValue={s.value}
                  onChange={(e) => setGeneralForm((prev) => ({ ...prev, [s.key]: e.target.value }))}
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
                try {
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
                    slideDuration: 6000,
                    isActive: true,
                  });
                  toast({ title: "Banner created", description: `Banner #${newBanner.id} added.` });
                } catch (e) {
                  toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to create banner.", variant: "destructive" });
                }
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
                try {
                  await deleteBanner(b.id);
                  toast({ title: "Banner deleted", description: `Banner #${b.id} removed.` });
                } catch (e) {
                  toast({ title: "Error", description: e instanceof Error ? e.message : "Failed to delete banner.", variant: "destructive" });
                }
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
