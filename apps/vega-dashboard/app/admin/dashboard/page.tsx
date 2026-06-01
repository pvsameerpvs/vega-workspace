import { Metadata } from "next";
import { Package, FolderTree, Mail, FileText, Image, BookOpen, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | Vega Admin",
};

const stats = [
  { label: "Total Products", value: "300+", icon: Package, color: "bg-blue-50 text-blue-600 border-blue-100" },
  { label: "Categories", value: "12", icon: FolderTree, color: "bg-amber-50 text-amber-600 border-amber-100" },
  { label: "Enquiries", value: "45", icon: Mail, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { label: "Blogs", value: "12", icon: FileText, color: "bg-violet-50 text-violet-600 border-violet-100" },
  { label: "Gallery", value: "120", icon: Image, color: "bg-rose-50 text-rose-600 border-rose-100" },
  { label: "Catalogs", value: "4", icon: BookOpen, color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-slate-500">Welcome back to your admin panel.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`group rounded-xl border p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${stat.color}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:text-slate-500" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
