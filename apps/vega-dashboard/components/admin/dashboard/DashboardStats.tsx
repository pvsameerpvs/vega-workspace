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
  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "blue" as const },
    { label: "Enquiries", value: leads.length, icon: Mail, color: "yellow" as const },
    { label: "Blogs", value: blogs.length, icon: FileText, color: "violet" as const },
    { label: "Gallery", value: gallery.length, icon: Image, color: "rose" as const },
    { label: "Catalogs", value: catalogs.length, icon: BookOpen, color: "green" as const },
    { label: "Team", value: team.length, icon: Users, color: "amber" as const },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} color={stat.color} />
      ))}
    </div>
  );
}
