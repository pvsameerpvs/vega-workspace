import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Vega UAE",
  description: "Get in touch with Vega for product enquiries, quotes, and support.",
};

export default function ContactPage() {
  return (
    <main className="pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Reach Us</div>
          <h1 className="section-heading">Contact Us</h1>
          <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Get in touch with Vega for product enquiries, quotes, and support. Our team is ready to assist you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-5">
            {[
              {
                icon: Phone,
                title: "Mobile & WhatsApp",
                lines: ["+971 56 735 1095", "+971 56 931 0575"],
                cta: { text: "Chat on WhatsApp", href: "https://wa.me/971567351095" },
              },
              {
                icon: Mail,
                title: "Email",
                lines: ["Sales@thevegauae.com", "admin@thevegauae.com"],
              },
              {
                icon: MapPin,
                title: "Office",
                lines: ["M01-410, Corridor 14, Mezzanine Floor,", "Unique World Business Centre,", "Karama, Dubai, UAE"],
              },
              {
                icon: Clock,
                title: "Warehouse",
                lines: ["Warehouse 12, Block 6,", "BMG Logistic Park,", "Sharjah Industrial Area 18, UAE"],
              },
            ].map((card, i) => (
              <div key={card.title} className="modern-card p-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-blue/10 text-vega-blue">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-vega-blue mb-2">{card.title}</h3>
                {card.lines.map((l) => (
                  <p key={l} className="text-sm text-slate-500 leading-relaxed">{l}</p>
                ))}
                {card.cta && (
                  <a href={card.cta.href} target="_blank" className="mt-3 inline-flex items-center text-sm font-bold text-vega-blue hover:underline">
                    {card.cta.text}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 md:p-10 shadow-card">
            <h3 className="text-xl font-bold text-vega-blue mb-1">Send Enquiry</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
            <form className="space-y-5" action="#">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-vega-blue uppercase tracking-wider">Name</label>
                  <input type="text" placeholder="Full name" required className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-vega-blue uppercase tracking-wider">Company</label>
                  <input type="text" placeholder="Company name" className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-vega-blue uppercase tracking-wider">Email</label>
                  <input type="email" placeholder="you@company.com" required className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-vega-blue uppercase tracking-wider">Phone</label>
                  <input type="tel" placeholder="+971 5X XXX XXXX" required className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-vega-blue uppercase tracking-wider">Message</label>
                <textarea placeholder="Tell us what you need..." rows={4} className="flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
              </div>
              <button type="submit" className="pill-btn-yellow w-full group">
                <Send className="mr-2 inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
