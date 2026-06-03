import Image from "next/image";

interface BusinessSolutionsProps {
  locale?: string;
}

export function BusinessSolutions({ locale = "en" }: BusinessSolutionsProps) {
  const isAR = locale === "ar";

  const solutions = [
    {
      image: "/images/business-solutions/construction.png",
      label: isAR ? "البناء" : "Construction",
      desc: isAR ? "مخيمات العمال والمواقع" : "Labor camps & sites",
    },
    {
      image: "/images/business-solutions/worker-housing.png",
      label: isAR ? "سكن العمال" : "Worker Housing",
      desc: isAR ? "أثاث المخيمات" : "Camp furniture",
    },
    {
      image: "/images/business-solutions/offices.png",
      label: isAR ? "المكاتب" : "Offices",
      desc: isAR ? "مساحات عمل حديثة" : "Modern workspaces",
    },
    {
      image: "/images/business-solutions/events.png",
      label: isAR ? "الفعاليات" : "Events",
      desc: isAR ? "حواجز وVIP" : "Barriers & VIP",
    },
    {
      image: "/images/business-solutions/hotels.png",
      label: isAR ? "الفنادق" : "Hotels",
      desc: isAR ? "معدات الضيافة" : "Hospitality gear",
    },
    {
      image: "/images/business-solutions/government.png",
      label: isAR ? "الحكومة" : "Government",
      desc: isAR ? "أعلام وأعمدة" : "Flags & poles",
    },
  ];

  return (
    <section className="bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <h2 className="text-center text-xl lg:text-2xl font-bold text-white mb-10 font-display">{isAR ? "نخدم الشركات في جميع أنحاء الإمارات" : "Serving Businesses Across UAE"}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {solutions.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center group">
              <div className="relative h-20 w-20 lg:h-24 lg:w-24 mb-4 shrink-0">
                <Image
                  src={s.image}
                  alt={s.label}
                  fill
                  className="object-contain"
                  draggable={false}
                  sizes="96px"
                />
              </div>
              <div className="text-base font-semibold text-white">{s.label}</div>
              <div className="text-xs text-white/40">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
