"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { useToast } from "@vega/ui";
import { PageHeader } from "@/components/admin/PageHeader";
import { SectionToggle } from "./SectionToggle";
import { FeaturedProductsManager } from "./FeaturedProductsManager";
import { SpotlightManager } from "./SpotlightManager";
import { LimitedDealsManager } from "./LimitedDealsManager";
import { PopularCategoriesManager } from "./PopularCategoriesManager";
import { TestimonialsManager } from "./TestimonialsManager";
import { BusinessSolutionsManager } from "./BusinessSolutionsManager";
import { Save, RotateCcw } from "lucide-react";

const defaultSections = {
  heroBanner: true,
  popularCategories: true,
  featuredProducts: true,
  spotlight: true,
  bestSellers: true,
  newArrivals: true,
  productRanges: true,
  limitedDeals: true,
  recentViewed: true,
  testimonials: true,
  faqSection: true,
  seoContent: true,
};

export function HomepageManager() {
  const { items: products, loading: productsLoading } = useProducts();
  const { categories, loading: catsLoading } = useCategories();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("sections");
  const [sections, setSections] = useState(defaultSections);

  const tabs = [
    { id: "sections", label: "Section Visibility" },
    { id: "featured", label: "Featured Products" },
    { id: "spotlight", label: "Spotlight" },
    { id: "deals", label: "Limited Deals" },
    { id: "popular", label: "Popular & Ranges" },
    { id: "reviews", label: "Testimonials" },
    { id: "industries", label: "Business Solutions" },
  ];

  const toggleSection = (key: string) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Homepage section visibility updated." });
  };

  const handleReset = () => {
    setSections(defaultSections);
    toast({ title: "Reset", description: "All sections restored to default." });
  };

  const loading = productsLoading || catsLoading;

  return (
    <div className="p-8">
      <PageHeader
        title="Homepage Manager"
        subtitle="Control which sections appear on the homepage and manage their content."
      />

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1 mb-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-shrink-0 rounded-md px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === t.id ? "bg-white text-vega-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Section Visibility Tab */}
      {activeTab === "sections" && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Section Visibility</h3>
              <p className="text-xs text-slate-500 mt-1">Toggle which sections appear on the homepage.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleReset} className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 rounded-md bg-vega-blue px-3 py-2 text-xs font-semibold text-white hover:bg-vega-blue-dark">
                <Save className="h-3 w-3" /> Save
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <SectionToggle name="Hero Banner" desc="Hero slider with CTA buttons" active={sections.heroBanner} onToggle={() => toggleSection("heroBanner")} />
            <SectionToggle name="Popular Categories" desc="Category grid with images" active={sections.popularCategories} onToggle={() => toggleSection("popularCategories")} />
            <SectionToggle name="Online Exclusive" desc="Featured products carousel" active={sections.featuredProducts} onToggle={() => toggleSection("featuredProducts")} />
            <SectionToggle name="In the Spotlight" desc="Large category banner grid" active={sections.spotlight} onToggle={() => toggleSection("spotlight")} />
            <SectionToggle name="Best Sellers" desc="Best seller products carousel" active={sections.bestSellers} onToggle={() => toggleSection("bestSellers")} />
            <SectionToggle name="New Arrivals" desc="New arrival products carousel" active={sections.newArrivals} onToggle={() => toggleSection("newArrivals")} />
            <SectionToggle name="Product Ranges" desc="Category cards with overlay" active={sections.productRanges} onToggle={() => toggleSection("productRanges")} />
            <SectionToggle name="Limited Deals" desc="Promotional deal cards" active={sections.limitedDeals} onToggle={() => toggleSection("limitedDeals")} />
            <SectionToggle name="Recently Viewed" desc="Recently viewed products" active={sections.recentViewed} onToggle={() => toggleSection("recentViewed")} />
            <SectionToggle name="Testimonials" desc="Customer reviews" active={sections.testimonials} onToggle={() => toggleSection("testimonials")} />
            <SectionToggle name="FAQ Section" desc="Frequently asked questions" active={sections.faqSection} onToggle={() => toggleSection("faqSection")} />
            <SectionToggle name="SEO Content" desc="Footer SEO text" active={sections.seoContent} onToggle={() => toggleSection("seoContent")} />
          </div>
        </div>
      )}

      {activeTab === "featured" && <FeaturedProductsManager products={products} loading={productsLoading} />}
      {activeTab === "spotlight" && <SpotlightManager categories={categories} loading={catsLoading} />}
      {activeTab === "deals" && <LimitedDealsManager />}
      {activeTab === "popular" && <PopularCategoriesManager categories={categories} loading={catsLoading} />}
      {activeTab === "reviews" && <TestimonialsManager />}
      {activeTab === "industries" && <BusinessSolutionsManager />}
    </div>
  );
}
