import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: "blue" | "yellow" | "green" | "rose" | "violet" | "amber";
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  yellow: "bg-amber-50 text-amber-600 border-amber-100",
  green: "bg-emerald-50 text-emerald-600 border-emerald-100",
  rose: "bg-rose-50 text-rose-600 border-rose-100",
  violet: "bg-violet-50 text-violet-600 border-violet-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
};

export function StatCard({ label, value, icon: Icon, color = "blue" }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${colorMap[color]}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-bold text-slate-900">{value}</div>
          <div className="text-sm text-slate-500">{label}</div>
        </div>
      </div>
    </div>
  );
}
