import { Metadata } from "next";
import { Mail, MapPin, Clock, Phone, ArrowRight, Link2, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ContactUsForm } from "@/components/forms/ContactUsForm";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

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
    <main className="pt-36 pb-32">
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
          <div className="flex items-center gap-2">
            {[
              { name: "WhatsApp", href: `https://wa.me/971567351095?text=${encodeURIComponent("https://www.thevegauae.com/" + locale + "/contact-us")}`, icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
              { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://www.thevegauae.com/" + locale + "/contact-us")}`, icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://www.thevegauae.com/" + locale + "/contact-us")}`, icon: "M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              { name: "X", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Contact Vega UAE for furniture, barriers & camp supplies")}&url=${encodeURIComponent("https://www.thevegauae.com/" + locale + "/contact-us")}`, icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            ].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-[#1F3A93] hover:text-white transition-all">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon} /></svg>
                {s.name}
              </a>
            ))}
            <button
              onClick={() => { navigator.clipboard.writeText("https://www.thevegauae.com/" + locale + "/contact-us"); }}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-[#FFD400] hover:text-[#1F3A93] transition-all"
            >
              <Link2 className="h-3.5 w-3.5" />
              {isAR ? "نسخ الرابط" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
