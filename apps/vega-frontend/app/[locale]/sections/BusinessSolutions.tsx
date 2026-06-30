"use client";

interface BusinessSolutionsProps {
  locale?: string;
}

const IMG_PATH = "/images/serving-businesses-across-uae";

const solutions = [
  { image: "construction", labelEn: "Construction", labelAr: "البناء", descEn: "Labor camps & sites", descAr: "مخيمات العمال والمواقع" },
  { image: "worker-housing", labelEn: "Worker Housing", labelAr: "سكن العمال", descEn: "Camp furniture", descAr: "أثاث المخيمات" },
  { image: "offices", labelEn: "Offices", labelAr: "المكاتب", descEn: "Modern workspaces", descAr: "مساحات عمل حديثة" },
  { image: "events", labelEn: "Events", labelAr: "الفعاليات", descEn: "Barriers & VIP", descAr: "حواجز وVIP" },
  { image: "hotels", labelEn: "Hotels", labelAr: "الفنادق", descEn: "Hospitality gear", descAr: "معدات الضيافة" },
  { image: "government", labelEn: "Government", labelAr: "الحكومة", descEn: "Flags & poles", descAr: "أعلام وأعمدة" },
  { image: "real-estatedevelopers", labelEn: "Real Estate Developers", labelAr: "مطورو العقارات", descEn: "Contracting Companies", descAr: "شركات المقاولات" },
  { image: "industries-fabrication", labelEn: "Industries", labelAr: "الصناعات", descEn: "Fabrication / Manufacturing / Processing", descAr: "التصنيع / الإنتاج / المعالجة" },
];

export function BusinessSolutions({ locale = "en" }: BusinessSolutionsProps) {
  const isAR = locale === "ar";

  return (
    <section className="bg-[#0f172a]">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <h2 className="text-center text-2xl lg:text-3xl font-bold text-white mb-12 lg:mb-14 font-display">
          {isAR ? "نخدم الشركات في جميع أنحاء الإمارات" : "Serving Businesses Across UAE"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {solutions.map((s) => (
            <div
              key={s.image}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
            >
              <img
                src={`${IMG_PATH}/${s.image}.jpeg`}
                alt={isAR ? s.labelAr : s.labelEn}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                <h3 className="text-sm lg:text-lg font-bold text-white leading-tight">
                  {isAR ? s.labelAr : s.labelEn}
                </h3>
                <p className="text-xs lg:text-sm text-white/70 mt-1 leading-tight">
                  {isAR ? s.descAr : s.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
