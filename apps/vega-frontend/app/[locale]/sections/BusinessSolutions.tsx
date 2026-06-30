interface BusinessSolutionsProps {
  locale?: string;
}

const ICON_COLOR = "%231F3A93";

export function BusinessSolutions({ locale = "en" }: BusinessSolutionsProps) {
  const isAR = locale === "ar";

  const solutions = [
    {
      icon: "mdi/crane",
      label: isAR ? "البناء" : "Construction",
      desc: isAR ? "مخيمات العمال والمواقع" : "Labor camps & sites",
    },
    {
      icon: "fa6-solid/house-chimney-user",
      label: isAR ? "سكن العمال" : "Worker Housing",
      desc: isAR ? "أثاث المخيمات" : "Camp furniture",
    },
    {
      icon: "fa6-solid/building",
      label: isAR ? "المكاتب" : "Offices",
      desc: isAR ? "مساحات عمل حديثة" : "Modern workspaces",
    },
    {
      icon: "fa6-solid/calendar-check",
      label: isAR ? "الفعاليات" : "Events",
      desc: isAR ? "حواجز وVIP" : "Barriers & VIP",
    },
    {
      icon: "fa6-solid/bed",
      label: isAR ? "الفنادق" : "Hotels",
      desc: isAR ? "معدات الضيافة" : "Hospitality gear",
    },
    {
      icon: "fa6-solid/building-columns",
      label: isAR ? "الحكومة" : "Government",
      desc: isAR ? "أعلام وأعمدة" : "Flags & poles",
    },
  ];

  return (
    <section className="bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-center text-2xl lg:text-3xl font-bold text-white mb-12 lg:mb-14 font-display">
          {isAR ? "نخدم الشركات في جميع أنحاء الإمارات" : "Serving Businesses Across UAE"}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-7xl mx-auto">
          {solutions.map((s) => (
            <div
              key={s.label}
              className="group flex flex-col items-center text-center bg-white rounded-2xl border-2 border-[#1F3A93] px-4 py-7 lg:px-6 lg:py-9 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:shadow-[#1F3A93]/20 w-[calc(50%-8px)] md:w-[calc(25%-12px)] lg:w-[calc(25%-18px)]"
            >
              <div className="p-3 lg:p-4 rounded-2xl bg-[#1F3A93]/10 mb-4 lg:mb-5 group-hover:bg-[#1F3A93]/20 transition-colors ring-1 ring-[#1F3A93]/20">
                <img
                  src={`https://api.iconify.design/${s.icon}.svg?color=${ICON_COLOR}`}
                  alt={s.label}
                  className="h-12 w-12 lg:h-14 lg:w-14"
                  draggable={false}
                />
              </div>
              <div className="text-base lg:text-lg font-bold text-[#1F3A93] leading-tight">
                {s.label}
              </div>
              <div className="text-sm lg:text-base text-[#1F3A93]/60 mt-1.5 leading-tight">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
