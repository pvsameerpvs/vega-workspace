import Link from "next/link";
import { Plus, Mail, Image, FileText } from "lucide-react";

export function DashboardQuickActions() {
  const actions = [
    { label: "Add Product", href: "/admin/products", icon: Plus, color: "bg-vega-blue text-white" },
    { label: "View Leads", href: "/admin/leads", icon: Mail, color: "bg-vega-yellow text-vega-blue" },
    { label: "Upload Gallery", href: "/admin/gallery", icon: Image, color: "bg-rose-500 text-white" },
    { label: "Add Blog", href: "/admin/blog", icon: FileText, color: "bg-violet-500 text-white" },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-bold text-slate-900">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
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
  );
}
