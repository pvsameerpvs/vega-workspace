import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TOOLTIP_STYLE = {
  borderRadius: "8px",
  border: "none",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
};

interface DashboardLeadChartProps {
  leads: any[];
}

export function DashboardLeadChart({ leads }: DashboardLeadChartProps) {
  const data = [
    { status: "New", count: leads.filter((l) => l.status === "new").length },
    { status: "Contacted", count: leads.filter((l) => l.status === "contacted").length },
    { status: "Quotation", count: leads.filter((l) => l.status === "quotation_sent").length },
    { status: "Follow Up", count: leads.filter((l) => l.status === "follow_up_required").length },
    { status: "Closed", count: leads.filter((l) => l.status === "closed").length },
    { status: "Lost", count: leads.filter((l) => l.status === "lost").length },
  ];

  return (
    <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-bold text-slate-900">Leads by Status</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="count" fill="#1F3A93" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
