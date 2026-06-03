import { Metadata } from "next";
import { ArrowRight, MapPin, Phone, Mail, Warehouse, Linkedin } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import Link from "next/link";
import { getTeam, getCounters, mapTeamToFrontend } from "@/lib/api";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "About Us | Vega UAE",
  description: "Learn about Vega, a trusted supplier of camp furniture, barriers, and industrial supplies across the UAE.",
};

export default async function AboutUsPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  const [team, counters] = await Promise.all([getTeam(), getCounters()]);
  const mappedTeam = (team || []).map(mapTeamToFrontend).filter(Boolean) as any[];
  const mappedCounters = counters.filter(Boolean);

  const stats = mappedCounters.length > 0
    ? mappedCounters.slice(0, 4).map((c: any) => ({
        value: c.value || c.label,
        label: isAR && c.labelAr ? c.labelAr : c.label || c.labelAr,
      }))
    : [
        { value: "15+", label: isAR ? "سنوات من الخبرة" : "Years of experience" },
        { value: "10,000+", label: isAR ? "قدم مربع مستودع" : "sq ft warehouse" },
        { value: "1,500+", label: isAR ? "عميل راضٍ" : "Satisfied customers" },
        { value: "300+", label: isAR ? "منتج في المخزون" : "Products in stock" },
      ];

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20">
          <span className="mb-6 block text-sm text-slate-400">{isAR ? "الشركة" : "Company"}</span>
          <h1 className="section-heading text-4xl md:text-5xl">{isAR ? "من نحن" : "About Us"}</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl leading-relaxed">
            {isAR
              ? "فيجا هي مورد رائد B2B للأثاث المخيمات، والحواجز المعدنية، وحواجز الطوابير، والأثاث المكتبي، والمستلزمات الصناعية في جميع أنحاء الإمارات العربية المتحدة."
              : "Vega is a leading B2B supplier of camp furniture, metal barriers, queue barriers, office furniture, and industrial supplies across the United Arab Emirates."}
          </p>
        </div>

        <div className="grid gap-20 lg:grid-cols-2 mb-24">
          <div className="space-y-6">
            <p className="text-lg text-slate-500 leading-relaxed">
              {isAR
                ? "بخبرة تزيد عن 15 عاماً ومنشأة مستودع تزيد مساحتها عن 10,000 قدم مربع، نخدم شركات البناء، ومخيمات العمال، وشركات إدارة المرافق، والجهات الحكومية بمنتجات موثوقة ومتينة."
                : "With over 15 years of experience and a 10,000+ sq ft warehouse facility, we serve construction companies, labor camps, facilities management firms, and government entities with reliable, durable products."}
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              {isAR
                ? "تشمل مجموعة منتجاتنا أسرة بطابقين، وأسرة مفردة، ومراتب، وخزائن، وأثاث طعام، وأثاث بلاستيكي، ومواقد غاز، وأعمدة أعلام، وحواجز التحكم في الحشود، والأثاث المكتبي."
                : "Our product range includes bunk beds, single beds, mattresses, lockers, dining furniture, plastic furniture, gas burners, flag poles, crowd control barriers, and office furniture."}
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              {isAR
                ? "نؤمن بأن الأثاث الجيد يجب أن يكون سهل المصدر وموثوقاً في الاستخدام. لهذا السبب، نعمل مع أفضل المصنعين لإنشاء منتجات مناسبة للشركات في جميع أنحاء الإمارات."
                : "We believe that good furniture should be easy to source and reliable to use. For this reason, we work with the best manufacturers to create products suitable for businesses across the UAE."}
            </p>
            <Link href={l("/products")} className="inline-flex items-center gap-2 text-sm font-semibold text-vega-blue hover:underline transition-all mt-4">
              {isAR ? "استكشف المنتجات" : "Explore Products"} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="img-rounded aspect-[4/3] bg-slate-100 overflow-hidden">
            <ProtectedImage
              src="/images/gallery/warehouse-interior.jpg"
              alt="Vega Warehouse"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        <div className="mb-24 grid grid-cols-2 gap-12 border-t border-slate-100 pt-20 md:grid-cols-4">
          {stats.map((stat: any, i: number) => (
            <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="stat-number mb-2 text-3xl md:text-4xl tabular-nums">{stat.value}</div>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-24">
          <div className="mb-16 text-center">
            <span className="mb-6 block text-sm text-slate-400">{isAR ? "فريقنا" : "Our People"}</span>
            <h2 className="section-heading text-4xl md:text-5xl">{isAR ? "تعرف على الفريق" : "Meet the Team"}</h2>
            <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {isAR ? "المحترفون المكرسون وراء نجاح فيجا." : "The dedicated professionals behind Vega's success."}
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {mappedTeam.map((member: any, i: number) => (
              <div key={member.name} className="text-center group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full bg-slate-100">
                  <ProtectedImage
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{isAR && member.nameAr ? member.nameAr : member.name}</h3>
                <p className="text-sm font-semibold text-vega-yellow mt-1">{isAR && member.designationAr ? member.designationAr : member.designation}</p>
                <p className="mt-4 text-base text-slate-500 leading-relaxed">{isAR && member.bioAr ? member.bioAr : member.bio}</p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-vega-blue transition-colors">
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedIn && (
                    <a href={member.linkedIn} target="_blank" className="text-slate-400 hover:text-vega-blue transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 text-center">
          <span className="mb-6 block text-sm text-slate-400">{isAR ? "تواصل معنا" : "Reach Us"}</span>
          <h2 className="section-heading mb-16 text-4xl md:text-5xl">{isAR ? "تواصل معنا" : "Get in Touch"}</h2>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, title: isAR ? "الهاتف" : "Phone", lines: ["+971 56 735 1095", "+971 56 931 0575"], color: "text-slate-400" },
            { icon: Mail, title: isAR ? "البريد" : "Email", lines: ["Sales@thevegauae.com"], color: "text-slate-400" },
            { icon: MapPin, title: isAR ? "المكتب" : "Office", lines: ["Dubai, UAE"], color: "text-slate-400" },
            { icon: Warehouse, title: isAR ? "المستودع" : "Warehouse", lines: ["Sharjah, UAE"], color: "text-slate-400" },
          ].map((card, i) => (
            <div key={card.title} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{card.title}</h3>
              <div className="space-y-1" dir="ltr">
                {card.lines.map((l) => (
                  <p key={l} className="text-base text-slate-500">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
