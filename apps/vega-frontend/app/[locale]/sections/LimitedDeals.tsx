import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LimitedDealsProps {
  locale?: string;
}

export function LimitedDeals({ locale = "en" }: LimitedDealsProps) {
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  const deals = [
    {
      title: isAR ? "عرض الاستبدال" : "Exchange Offer",
      subtitle: isAR ? "خصم يصل إلى 70%" : "Up to 70% Off",
      desc: isAR ? "عروض صادقة! توفير كبير على طلبات الأثاث بالجملة." : "Honest deals! Big savings on bulk furniture orders.",
      cta: isAR ? "تسوق الآن" : "Shop Now",
      bg: "bg-gradient-to-br from-[#1F3A93] to-[#162d70]",
    },
    {
      title: isAR ? "عرض ضخم" : "Jumbo Offer",
      subtitle: isAR ? "خصم 10%" : "10% Off",
      desc: isAR ? "اكتشف مجموعة واسعة من أثاث المخيمات والمكاتب." : "Discover a wide range of camp & office furniture.",
      cta: isAR ? "تسوق الآن" : "Shop Now",
      bg: "bg-gradient-to-br from-[#FFD400] to-[#e6bf00] text-[#1F3A93]",
    },
    {
      title: isAR ? "عرض الإضافات" : "Add On Sale",
      subtitle: isAR ? "احصل على خصم 10%" : "Get 10% Off",
      desc: isAR ? "خصم إضافي عند إضافة إكسسوارات إلى طلبك." : "Extra discount when you add accessories to your order.",
      cta: isAR ? "تسوق الآن" : "Shop Now",
      bg: "bg-gradient-to-br from-[#1F3A93] to-[#162d70]",
    },
    {
      title: isAR ? "باقة الأعراس" : "Wedding Package",
      subtitle: isAR ? "صفقة خاصة" : "Special Deal",
      desc: isAR ? "أعمدة VIP متميزة، وحواجز، وأثاث فعاليات." : "Premium VIP poles, barriers & event furniture.",
      cta: isAR ? "تسوق الآن" : "Shop Now",
      bg: "bg-gradient-to-br from-[#1F3A93] to-[#162d70]",
    },
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-xl font-bold text-slate-900 mb-8 font-display">{isAR ? "عروض محدودة الوقت" : "Limited Time Deals"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {deals.map((d) => (
            <div key={d.title} className={`relative rounded-xl p-5 ${d.bg} ${d.bg.includes("FFD400") ? "text-[#1F3A93]" : "text-white"}`}>
              <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">{isAR ? "عرض محدود" : "Limited Deal"}</div>
              <h3 className={`text-lg font-bold mb-1 ${d.bg.includes("FFD400") ? "text-[#1F3A93]" : "text-white"}`}>{d.title}</h3>
              <p className="text-xs font-bold mb-2">{d.subtitle}</p>
              <p className="text-[10px] opacity-70 mb-4 leading-relaxed">{d.desc}</p>
              <Link href={l("/contact-us")} className={`inline-flex items-center gap-1 text-xs font-bold ${d.bg.includes("FFD400") ? "text-[#1F3A93]" : "text-white"}`}>
                {d.cta} <ArrowRight className={`h-3 w-3 ${isAR ? "rotate-180" : ""}`} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
