import { Building, Home, Briefcase, PartyPopper, Hotel, Landmark } from "lucide-react";

const solutions = [
  { icon: Building, label: "Construction", desc: "Labor camps & sites" },
  { icon: Home, label: "Worker Housing", desc: "Camp furniture" },
  { icon: Briefcase, label: "Offices", desc: "Modern workspaces" },
  { icon: PartyPopper, label: "Events", desc: "Barriers & VIP" },
  { icon: Hotel, label: "Hotels", desc: "Hospitality gear" },
  { icon: Landmark, label: "Government", desc: "Flags & poles" },
];

export function BusinessSolutions() {
  return (
    <section className="bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-center text-lg font-bold text-white mb-8 font-display">Serving Businesses Across UAE</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {solutions.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center group">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 mb-3 transition-all group-hover:bg-[#FFD400] group-hover:border-[#FFD400]">
                <s.icon className="h-6 w-6 text-white/70 group-hover:text-[#1F3A93] transition-colors" />
              </div>
              <div className="text-sm font-semibold text-white">{s.label}</div>
              <div className="text-[10px] text-white/40">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
