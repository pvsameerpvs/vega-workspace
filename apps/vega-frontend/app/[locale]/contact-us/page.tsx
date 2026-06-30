import { Metadata } from "next";
import { Mail, MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ContactUsForm } from "@/components/forms/ContactUsForm";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { ShareSection } from "./sections/ShareSection";

export const metadata: Metadata = {
  title: "Contact Us | Vega UAE — Furniture, Barriers & Camp Supplies",
  description:
    "Get in touch with Vega UAE for bulk furniture, queue barriers, camp supplies, and industrial product enquiries. Call +971 4 349 8999 or email Sales@thevegauae.com. Quick quotes and fast delivery across UAE.",
  openGraph: {
    title: "Contact Vega UAE | Get a Quote Today",
    description:
      "Reach Vega UAE for bulk furniture, barriers, and camp supply solutions. Call +971 4 349 8999 or WhatsApp +971 56 735 1095. Same-day response.",
  },
};

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  if (!isValidLocale(locale)) notFound();
  const isAR = locale === "ar";
  const l = (path: string) => `/${locale}${path}`;

  const contactCards = [
    {
      icon: WhatsAppIcon,
      iconBg: "bg-[#FFD400]/10",
      iconColor: "text-[#FFD400]",
      title: isAR ? "واتساب" : "WhatsApp",
      lines: ["+971 56 735 1095", "+971 56 931 0575"],
      cta: { text: isAR ? "دردش الآن" : "Chat Now", href: "https://wa.me/971567351095" },
    },
    {
      icon: Phone,
      iconBg: "bg-[#1F3A93]/10",
      iconColor: "text-[#1F3A93]",
      title: isAR ? "الهاتف" : "Phone",
      lines: ["+971 4 349 8999", "+971 56 735 1095", "+971 56 931 0575"],
    },
    {
      icon: Mail,
      iconBg: "bg-[#FFD400]/10",
      iconColor: "text-[#FFD400]",
      title: isAR ? "البريد" : "Email",
      lines: ["Sales@thevegauae.com", "admin@thevegauae.com"],
    },
    {
      icon: MapPin,
      iconBg: "bg-[#1F3A93]/10",
      iconColor: "text-[#1F3A93]",
      title: isAR ? "المكتب" : "Office",
      lines: [
        "M01-410, Corridor 14, Mezzanine Floor",
        "Unique World Business Centre",
        "Karama, Dubai, UAE",
      ],
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.5703954406754!2d55.3086468!3d25.2513908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f677368454be5%3A0x359bb0f780fd275a!2sTHE%20VEGA%20UAE!5e0!3m2!1sen!2sae!4v1782454127893!5m2!1sen!2sae",
    },
    {
      icon: MapPin,
      iconBg: "bg-[#FFD400]/10",
      iconColor: "text-[#FFD400]",
      title: isAR ? "المستودع" : "Warehouse",
      lines: [
        "Warehouse 12, Block 6",
        "BMG Logistic Park",
        "Sharjah Industrial Area 18, UAE",
      ],
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.8987115038076!2d55.5557909!3d25.2403363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef58b52f180d43b%3A0x68812cd985f29ad2!2sTHE%20VEGA%20UAE!5e0!3m2!1sen!2sae!4v1782454200327!5m2!1sen!2sae",
    },
  ];

  return (
    <main className="pt-20 pb-16">
      {/* Hero Header */}
      <div className="mx-auto max-w-7xl px-6 mb-20">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-[#FFD400]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">
            {isAR ? "تواصل معنا" : "Reach Us"}
          </span>
        </div>
        <h1 className="section-heading text-4xl md:text-5xl mb-6">
          {isAR ? "تواصل معنا" : "Contact Us"}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          {isAR
            ? "تواصل مع فيجا للاستفسارات عن المنتجات، والعروض، والدعم. فريقنا جاهز لمساعدتك خلال 24 ساعة."
            : "Get in touch with Vega for product enquiries, quotes, and support. Our team is ready to assist you within 24 hours."}
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="mx-auto max-w-7xl px-6 mb-24 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactCards.slice(0, 3).map((card, i) => (
            <div
              key={card.title}
              className="modern-card p-8 animate-fade-in-up group"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1F3A93] mb-3">
                {card.title}
              </h3>
              <div className="space-y-1" dir="ltr">
                {card.lines.map((line) => (
                  <p key={line} className="text-sm text-slate-500 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              {card.cta && (
                <a
                  href={card.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1F3A93] hover:text-[#FFD400] transition-colors"
                >
                  {card.cta.text}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {contactCards.slice(3).map((card, i) => (
            <div
              key={card.title}
              className="modern-card p-8 animate-fade-in-up group"
              style={{ animationDelay: `${(i + 3) * 0.08}s` }}
            >
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1F3A93] mb-3">
                {card.title}
              </h3>
              <div className="space-y-1" dir="ltr">
                {card.lines.map((line) => (
                  <p key={line} className="text-sm text-slate-500 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              {card.mapSrc && (
                <div className="mt-4 overflow-hidden rounded-xl">
                  <iframe
                    src={card.mapSrc}
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="rounded-xl"
                  />
                </div>
              )}
              {card.cta && (
                <a
                  href={card.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1F3A93] hover:text-[#FFD400] transition-colors"
                >
                  {card.cta.text}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form + Map Info */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form Card */}
          <div className="lg:col-span-3">
            <div className="modern-card p-8 md:p-10">
              <div className="mb-8">
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px w-6 bg-[#FFD400]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">
                    {isAR ? "أرسل استفسار" : "Send Enquiry"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#1F3A93] mb-2">
                  {isAR ? "اطلب عرض سعر" : "Request a Quote"}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {isAR
                    ? "املأ النموذج أدناه وسيعود فريقنا إليك خلال 24 ساعة."
                    : "Fill out the form below and our team will get back to you within 24 hours."}
                </p>
              </div>

              <ContactUsForm isAR={isAR} />
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Hours */}
            <div className="modern-card p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#FFD400]/10 flex items-center justify-center text-[#FFD400]">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1F3A93]">
                  {isAR ? "ساعات العمل" : "Business Hours"}
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { day: isAR ? "الإثنين - الجمعة" : "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
                  { day: isAR ? "السبت" : "Saturday", hours: "9:00 AM - 3:00 PM" },
                  { day: isAR ? "الأحد" : "Sunday", hours: isAR ? "مغلق" : "Closed" },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-slate-500">{item.day}</span>
                    <span className="font-semibold text-[#1F3A93]">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp CTA */}
            <a
              href="https://wa.me/971567351095"
              target="_blank"
              rel="noreferrer"
              className="modern-card p-8 block group hover:bg-[#1F3A93] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#FFD400] flex items-center justify-center text-[#1F3A93] transition-transform duration-300 group-hover:scale-110">
                  <WhatsAppIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1F3A93] group-hover:text-white transition-colors">
                    {isAR ? "دردش على واتساب" : "Chat on WhatsApp"}
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-white/70 transition-colors">
                    {isAR ? "رد سريع خلال دقائق" : "Quick response within minutes"}
                  </p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-[#FFD400] transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>

            {/* Trust Info */}
            <div className="modern-card p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1F3A93] mb-4">
                {isAR ? "لماذا تختارنا" : "Why Choose Us"}
              </h3>
              <ul className="space-y-3">
                {[
                  isAR ? "الطلبات بالجملة والمخصصة مقبولة" : "Bulk & custom orders accepted",
                  isAR ? "التوصيل في جميع أنحاء الإمارات" : "Delivery across all UAE",
                  isAR ? "خدمات التركيب متاحة" : "Installation services available",
                  isAR ? "خبرة تزيد عن 15 عاماً" : "15+ years of experience",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-500"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Share Section */}
      <div className="mx-auto max-w-7xl px-6 mt-20">
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            {isAR ? "شارك هذه الصفحة:" : "Share this page:"}
          </p>
          <ShareSection locale={locale} />
        </div>
      </div>
    </main>
  );
}
