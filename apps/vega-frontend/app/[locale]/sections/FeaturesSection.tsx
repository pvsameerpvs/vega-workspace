import { Truck, BadgePercent, ShieldCheck, Package, Puzzle } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  titleAr: string;
}

interface FeaturesSectionProps {
  locale?: string;
}

const features: Feature[] = [
  {
    icon: <Truck className="h-10 w-10" />,
    title: "Delivery Across UAE",
    titleAr: "توصيل في جميع أنحاء الإمارات",
  },
  {
    icon: <BadgePercent className="h-10 w-10" />,
    title: "Bulk Value Pricing",
    titleAr: "تسعير القيمة بالجملة",
  },
  {
    icon: <ShieldCheck className="h-10 w-10" />,
    title: "Secure Payment Options",
    titleAr: "خيارات دفع آمنة",
  },
  {
    icon: <Package className="h-10 w-10" />,
    title: "Ready Stock Available",
    titleAr: "المخزون الجاهز متوفر",
  },
  {
    icon: <Puzzle className="h-10 w-10" />,
    title: "All In One Project Solutions",
    titleAr: "حلول المشاريع المتكاملة",
  },
];

function FeatureCard({ f, isAR }: { f: Feature; isAR: boolean }) {
  return (
    <div className="group flex flex-col items-center rounded-3xl border border-slate-100 bg-white px-4 py-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD400]/30 hover:shadow-xl hover:shadow-[#FFD400]/5">
      <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FFD400]/15 text-[#1F3A93] transition-colors duration-300 group-hover:bg-[#1F3A93] group-hover:text-white">
        {f.icon}
      </span>
      <div className="mt-4 h-1 w-8 rounded-full bg-[#FFD400] transition-all duration-300 group-hover:w-12" />
      <span className="mt-4 text-center text-base font-bold text-[#1F3A93]">
        {isAR ? f.titleAr : f.title}
      </span>
    </div>
  );
}

export function FeaturesSection({ locale = "en" }: FeaturesSectionProps) {
  const isAR = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-white py-8 border-b border-slate-100">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#1F3A93]/[0.02]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#FFD400]/[0.05]" />
      </div>
      <div className="mx-auto max-w-[90rem] px-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((f) => (
            <FeatureCard key={f.title} f={f} isAR={isAR} />
          ))}
        </div>
      </div>
    </section>
  );
}
