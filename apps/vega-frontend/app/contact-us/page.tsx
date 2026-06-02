import { Metadata } from "next";
import { Mail, MapPin, Clock, Send, Phone, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { submitLead } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact Us | Vega UAE",
  description: "Get in touch with Vega for product enquiries, quotes, and support.",
};

export default function ContactPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const data = {
      name: formData.get("name") as string,
      companyName: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      location: "Website Contact Form",
      status: "new",
      createdAt: new Date().toISOString(),
    };
    await submitLead(data);
  }

  const contactCards = [
    {
      icon: WhatsAppIcon,
      iconBg: "bg-[#FFD400]/10",
      iconColor: "text-[#FFD400]",
      title: "WhatsApp",
      lines: ["+971 56 735 1095", "+971 56 931 0575"],
      cta: { text: "Chat Now", href: "https://wa.me/971567351095" },
    },
    {
      icon: Phone,
      iconBg: "bg-[#1F3A93]/10",
      iconColor: "text-[#1F3A93]",
      title: "Phone",
      lines: ["+971 56 735 1095", "+971 56 931 0575"],
    },
    {
      icon: Mail,
      iconBg: "bg-[#FFD400]/10",
      iconColor: "text-[#FFD400]",
      title: "Email",
      lines: ["Sales@thevegauae.com", "admin@thevegauae.com"],
    },
    {
      icon: MapPin,
      iconBg: "bg-[#1F3A93]/10",
      iconColor: "text-[#1F3A93]",
      title: "Office",
      lines: [
        "M01-410, Corridor 14, Mezzanine Floor",
        "Unique World Business Centre",
        "Karama, Dubai, UAE",
      ],
    },
    {
      icon: Clock,
      iconBg: "bg-[#FFD400]/10",
      iconColor: "text-[#FFD400]",
      title: "Warehouse",
      lines: [
        "Warehouse 12, Block 6",
        "BMG Logistic Park",
        "Sharjah Industrial Area 18, UAE",
      ],
    },
  ];

  return (
    <main className="pt-36 pb-32">
      {/* Hero Header */}
      <div className="mx-auto max-w-7xl px-6 mb-20">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-[#FFD400]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">
            Reach Us
          </span>
        </div>
        <h1 className="section-heading text-4xl md:text-5xl mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          Get in touch with Vega for product enquiries, quotes, and support.
          Our team is ready to assist you within 24 hours.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="mx-auto max-w-7xl px-6 mb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactCards.map((card, i) => (
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
              <div className="space-y-1">
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
                    Send Enquiry
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#1F3A93] mb-2">
                  Request a Quote
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form action={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
                      Full Name *
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
                      Company
                    </label>
                    <input
                      name="company"
                      type="text"
                      placeholder="Company name"
                      className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
                      Phone *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+971 5X XXX XXXX"
                      required
                      className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us what you need..."
                    rows={5}
                    className="flex w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="pill-btn-yellow w-full text-sm group mt-2"
                >
                  <Send className="mr-2 inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  Submit Enquiry
                </button>
              </form>
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
                  Business Hours
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
                  { day: "Saturday", hours: "9:00 AM - 3:00 PM" },
                  { day: "Sunday", hours: "Closed" },
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
                    Chat on WhatsApp
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-white/70 transition-colors">
                    Quick response within minutes
                  </p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-[#FFD400] transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>

            {/* Trust Info */}
            <div className="modern-card p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1F3A93] mb-4">
                Why Choose Us
              </h3>
              <ul className="space-y-3">
                {[
                  "Bulk & custom orders accepted",
                  "Delivery across all UAE",
                  "Installation services available",
                  "15+ years of experience",
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
    </main>
  );
}
