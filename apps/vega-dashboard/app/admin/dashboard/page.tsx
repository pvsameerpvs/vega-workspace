import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Vega Admin",
};

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-vega-blue">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {[
          { label: "Total Products", value: "300+", color: "bg-blue-50" },
          { label: "Total Categories", value: "12", color: "bg-yellow-50" },
          { label: "Total Enquiries", value: "45", color: "bg-green-50" },
          { label: "New Leads", value: "8", color: "bg-red-50" },
          { label: "Total Blogs", value: "12", color: "bg-purple-50" },
          { label: "Gallery Images", value: "120", color: "bg-pink-50" },
          { label: "Catalogs", value: "4", color: "bg-indigo-50" },
          { label: "Recent WhatsApp Clicks", value: "156", color: "bg-orange-50" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-lg border p-6 ${stat.color}`}>
            <div className="text-3xl font-bold text-vega-blue">{stat.value}</div>
            <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
