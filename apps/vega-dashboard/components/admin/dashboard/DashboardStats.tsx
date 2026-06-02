import { StatCard } from "@/components/admin/StatCard";
import { Package, Mail, FileText, Image, BookOpen, Users } from "lucide-react";

interface StatsGridProps {
  products: any[];
  leads: any[];
  blogs: any[];
  gallery: any[];
  catalogs: any[];
  team: any[];
}

export function DashboardStats({ products, leads, blogs, gallery, catalogs, team }: StatsGridProps) {
  const safeProducts = Array.isArray(products) ? products : [];
  const safeLeads = Array.isArray(leads) ? leads : [];
  const safeBlogs = Array.isArray(blogs) ? blogs : [];
  const safeGallery = Array.isArray(gallery) ? gallery : [];
  const safeCatalogs = Array.isArray(catalogs) ? catalogs : [];
  const safeTeam = Array.isArray(team) ? team : [];
  const stats = [
    { label: "Total Products", value: safeProducts.length, icon: Package, color: "blue" as const },
    { label: "Enquiries", value: safeLeads.length, icon: Mail, color: "yellow" as const },
    { label: "Blogs", value: safeBlogs.length, icon: FileText, color: "violet" as const },
    { label: "Gallery", value: safeGallery.length, icon: Image, color: "rose" as const },
    { label: "Catalogs", value: safeCatalogs.length, icon: BookOpen, color: "green" as const },
    { label: "Team", value: safeTeam.length, icon: Users, color: "amber" as const },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />
      ))}
    </div>
  );
}
