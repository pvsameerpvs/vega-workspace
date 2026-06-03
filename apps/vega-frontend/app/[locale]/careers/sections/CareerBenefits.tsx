import { Briefcase, Clock, MapPin, HeartHandshake, Trophy, Users } from "lucide-react";

interface CareerBenefitsProps {
  locale?: string;
}

export function CareerBenefits({ locale = "en" }: CareerBenefitsProps) {
  const isAR = locale === "ar";
  const benefits = [
    {
      icon: Briefcase,
      title: isAR ? "النمو الوظيفي" : "Career Growth",
      desc: isAR ? "ابنِ مسيرتك المهنية مع شركة سريعة النمو. نحن نرقى من الداخل ونستثمر في تطويرك." : "Build your career with a fast-growing company. We promote from within and invest in your development.",
      color: "text-[#1F3A93]",
      bg: "bg-[#1F3A93]/10",
    },
    {
      icon: Clock,
      title: isAR ? "توازن العمل والحياة" : "Work-Life Balance",
      desc: isAR ? "نحن نقدر فريقنا ونعزز بيئة عمل صحية بساعات عمل مرنة وسياسات عادلة." : "We value our team and promote a healthy work environment with flexible hours and fair policies.",
      color: "text-[#FFD400]",
      bg: "bg-[#FFD400]/10",
    },
    {
      icon: MapPin,
      title: isAR ? "الوجود في الإمارات" : "UAE Presence",
      desc: isAR ? "اعمل في دبي والشارقة مع فريق ديناميكي. متاح أدوار مكتبية ومستودعية." : "Work across Dubai and Sharjah with a dynamic team. Both office and warehouse roles available.",
      color: "text-[#1F3A93]",
      bg: "bg-[#1F3A93]/10",
    },
    {
      icon: HeartHandshake,
      title: isAR ? "ثقافة داعمة" : "Supportive Culture",
      desc: isAR ? "انضم إلى فريق يقدر التعاون والاحترام والتواصل المفتوح على كل المستويات." : "Join a team that values collaboration, respect, and open communication at every level.",
      color: "text-[#FFD400]",
      bg: "bg-[#FFD400]/10",
    },
    {
      icon: Trophy,
      title: isAR ? "رواتب تنافسية" : "Competitive Pay",
      desc: isAR ? "نقدم رواتب تنافسية في السوق، ومكافآت الأداء، وعمولة لأدوار المبيعات." : "We offer market-competitive salaries, performance bonuses, and commission for sales roles.",
      color: "text-[#1F3A93]",
      bg: "bg-[#1F3A93]/10",
    },
    {
      icon: Users,
      title: isAR ? "فريق متنوع" : "Diverse Team",
      desc: isAR ? "اعمل إلى جانب محترفين من خلفيات متنوعة في بيئة متعددة الثقافات." : "Work alongside professionals from diverse backgrounds in a multicultural environment.",
      color: "text-[#FFD400]",
      bg: "bg-[#FFD400]/10",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {benefits.map((card, i) => (
        <div
          key={card.title}
          className="modern-card p-7 animate-fade-in-up group"
          style={{ animationDelay: `${i * 0.06}s` }}
        >
          <div
            className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${card.bg} ${card.color} transition-transform duration-300 group-hover:scale-110`}
          >
            <card.icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-[#1F3A93] mb-2">
            {card.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {card.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
