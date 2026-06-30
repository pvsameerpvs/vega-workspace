"use client";

import { Clock, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ContactUsForm } from "@/components/forms/ContactUsForm";

interface ContactFormSectionProps {
  locale?: string;
}

export function ContactFormSection({ locale = "en" }: ContactFormSectionProps) {
  const isAR = locale === "ar";

  return (
    <section className="py-8 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className={`grid gap-12 lg:grid-cols-5 ${isAR ? "direction-rtl" : ""}`}>
          {/* Left / First: Form */}
          <div className="lg:col-span-3">
            <div className="modern-card p-8 md:p-10">
              <div className="mb-8">
                <div className={`mb-3 flex items-center gap-3 ${isAR ? "flex-row-reverse" : ""}`}>
                  <div className="h-px w-6 bg-[#FFD400] shrink-0" />
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
              <ContactUsForm isAR={isAR} location="Homepage Contact Form" />
            </div>
          </div>

          {/* Right / Second: Company Info */}
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
                  <div key={item.day} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{item.day}</span>
                    <span className="font-semibold text-[#1F3A93]">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
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

            {/* Why Choose Us */}
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
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-500">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
