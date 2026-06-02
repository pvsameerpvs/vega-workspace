"use client";

import { useProducts } from "@/hooks/use-products";
import { useLeads } from "@/hooks/use-leads";
import { useBlog } from "@/hooks/use-blog";
import { useGallery } from "@/hooks/use-gallery";
import { useCatalogs } from "@/hooks/use-catalogs";
import { useTeam } from "@/hooks/use-team";
import { useFaqs } from "@/hooks/use-faqs";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  DashboardStats,
  DashboardLeadChart,
  DashboardQuickActions,
  DashboardRecentLeads,
} from "@/components/admin/dashboard";

export function AdminDashboard() {
  const { items: products, loading: pl } = useProducts();
  const { leads, loading: ll } = useLeads();
  const { items: blogs, loading: bl } = useBlog();
  const { items: gallery, loading: gl } = useGallery();
  const { items: catalogs, loading: cl } = useCatalogs();
  const { items: team, loading: tl } = useTeam();
  const { items: faqs, loading: fl } = useFaqs();

  const loading = pl || ll || bl || gl || cl || tl || fl;

  if (loading) {
    return (
      <div className="p-8">
        <PageHeader title="Dashboard Overview" subtitle="Welcome back to your admin panel." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <PageHeader title="Dashboard Overview" subtitle="Welcome back to your admin panel." />

      <DashboardStats
        products={products}
        leads={leads}
        blogs={blogs}
        gallery={gallery}
        catalogs={catalogs}
        team={team}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <DashboardLeadChart leads={leads} />
        <DashboardQuickActions />
      </div>

      <DashboardRecentLeads leads={leads} />
    </div>
  );
}
