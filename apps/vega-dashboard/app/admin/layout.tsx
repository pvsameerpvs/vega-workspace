import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Mail,
  Briefcase,
  FileText,
  Image,
  BookOpen,
  Users,
  HelpCircle,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/leads", label: "Leads", icon: Mail },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/catalogs", label: "Catalogs", icon: BookOpen },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-vega-blue text-white">
        <div className="p-6">
          <h2 className="text-xl font-bold text-vega-yellow">VEGA Admin</h2>
        </div>
        <nav className="space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition hover:bg-white/10"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
}
