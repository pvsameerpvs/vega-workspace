"use client";

import { useProducts } from "@/hooks/use-products";
import { useLeads } from "@/hooks/use-leads";
import { useBlog } from "@/hooks/use-content";
import { useGallery } from "@/hooks/use-content";
import { useCatalogs } from "@/hooks/use-content";
import { useTeam } from "@/hooks/use-content";
import { useFaqs } from "@/hooks/use-content";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@vega/ui";
import {
  Package,
  FolderTree,
  Mail,
  FileText,
  Image,
  BookOpen,
  Users,
  HelpCircle,
  ArrowRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function AdminDashboard() {
  const { products, loading: pl } = useProducts();
  const { leads, loading: ll } = useLeads();
  const { blogs, loading: bl } = useBlog();
  const { items: gallery, loading: gl } = useGallery();
  const { catalogs, loading: cl } = useCatalogs();
  const { members: team, loading: tl } = useTeam();
  const { faqs, loading: fl } = useFaqs();

  const loading = pl || ll || bl || gl || cl || tl || fl;

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "blue" as const },
    { label: "Enquiries", value: leads.length, icon: Mail, color: "yellow" as const },
    { label: "Blogs", value: blogs.length, icon: FileText, color: "violet" as const },
    { label: "Gallery", value: gallery.length, icon: Image, color: "rose" as const },
    { label: "Catalogs", value: catalogs.length, icon: BookOpen, color: "green" as const },
    { label: "Team", value: team.length, icon: Users, color: "amber" as const },
  ];

  const leadStatusData = [
    { status: "New", count: leads.filter((l) => l.status === "new").length },
    { status: "Contacted", count: leads.filter((l) => l.status === "contacted").length },
    { status: "Quotation", count: leads.filter((l) => l.status === "quotation_sent").length },
    { status: "Follow Up", count: leads.filter((l) => l.status === "follow_up_required").length },
    { status: "Closed", count: leads.filter((l) => l.status === "closed").length },
    { status: "Lost", count: leads.filter((l) => l.status === "lost").length },
  ];

  const recentLeads = leads.slice(0, 5);

  const quickActions = [
    { label: "Add Product", href: "/admin/products", icon: Plus, color: "bg-vega-blue text-white" },
    { label: "View Leads", href: "/admin/leads", icon: Mail, color: "bg-vega-yellow text-vega-blue" },
    { label: "Upload Gallery", href: "/admin/gallery", icon: Image, color: "bg-rose-500 text-white" },
    { label: "Add Blog", href: "/admin/blog", icon: FileText, color: "bg-violet-500 text-white" },
  ];

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

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </div>

      {/* Charts + Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Lead Status Chart */}
        <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-900">Leads by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadStatusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Bar dataKey="count" fill="#1F3A93" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold text-slate-900">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all hover:shadow-md ${action.color}`}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recent Leads</h3>
          <Link href="/admin/leads" className="flex items-center gap-1 text-xs font-semibold text-vega-blue hover:underline">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="text-sm text-slate-400">No leads yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-semibold text-slate-500">Name</th>
                  <th className="pb-3 font-semibold text-slate-500">Product</th>
                  <th className="pb-3 font-semibold text-slate-500">Location</th>
                  <th className="pb-3 font-semibold text-slate-500">Status</th>
                  <th className="pb-3 font-semibold text-slate-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-900">{lead.name}</td>
                    <td className="py-3 text-slate-600">{lead.productName}</td>
                    <td className="py-3 text-slate-600">{lead.location}</td>
                    <td className="py-3"><StatusBadge status={lead.status} /></td>
                    <td className="py-3 text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
