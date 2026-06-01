import { Users, Globe, BadgePercent, ShieldCheck, RefreshCcw } from "lucide-react";

const features = [
  { icon: Users, label: "5000+ Customers", desc: "Trusted across UAE" },
  { icon: Globe, label: "UAE Delivery", desc: "All 7 emirates" },
  { icon: BadgePercent, label: "Best Prices", desc: "Bulk discounts" },
  { icon: ShieldCheck, label: "Secure Payment", desc: "Multiple options" },
  { icon: RefreshCcw, label: "Easy Returns", desc: "15 days policy" },
];

export function TrustBar() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 min-w-[160px] shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F3A93]/5">
                <f.icon className="h-5 w-5 text-[#1F3A93]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{f.label}</div>
                <div className="text-[10px] text-slate-400">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
