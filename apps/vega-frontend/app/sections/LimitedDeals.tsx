import Link from "next/link";
import { ArrowRight } from "lucide-react";

const deals = [
  { title: "Exchange Offer", subtitle: "Up to 70% Off", desc: "Honest deals! Big savings on bulk furniture orders.", cta: "Shop Now", bg: "bg-gradient-to-br from-[#1F3A93] to-[#162d70]" },
  { title: "Jumbo Offer", subtitle: "10% Off", desc: "Discover a wide range of camp & office furniture.", cta: "Shop Now", bg: "bg-gradient-to-br from-[#FFD400] to-[#e6bf00] text-[#1F3A93]" },
  { title: "Add On Sale", subtitle: "Get 10% Off", desc: "Extra discount when you add accessories to your order.", cta: "Shop Now", bg: "bg-gradient-to-br from-[#1F3A93] to-[#162d70]" },
  { title: "Wedding Package", subtitle: "Special Deal", desc: "Premium VIP poles, barriers & event furniture.", cta: "Shop Now", bg: "bg-gradient-to-br from-[#1F3A93] to-[#162d70]" },
];

export function LimitedDeals() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-xl font-bold text-slate-900 mb-8 font-display">Limited Time Deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {deals.map((d) => (
            <div key={d.title} className={`relative rounded-xl p-5 ${d.bg} ${d.bg.includes("FFD400") ? "text-[#1F3A93]" : "text-white"}`}>
              <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Limited Deal</div>
              <h3 className="text-lg font-bold mb-1">{d.title}</h3>
              <p className="text-xs font-bold mb-2">{d.subtitle}</p>
              <p className="text-[10px] opacity-70 mb-4 leading-relaxed">{d.desc}</p>
              <Link href="/contact-us" className={`inline-flex items-center gap-1 text-xs font-bold ${d.bg.includes("FFD400") ? "text-[#1F3A93]" : "text-white"}`}>
                {d.cta} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
