import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
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

  return (
    <main className="pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-6 block text-sm text-slate-400">Reach Us</span>
          <h1 className="section-heading text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Get in touch with Vega for product enquiries, quotes, and support. Our team is ready to assist you.
          </p>
        </div>

        <div className="grid gap-20 lg:grid-cols-2">
          <div className="space-y-12">
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
              <div key={card.title} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{card.title}</h3>
                {card.lines.map((l) => (
                  <p key={l} className="text-base text-slate-500 leading-relaxed">{l}</p>
                ))}
                {card.cta && (
                  <a href={card.cta.href} target="_blank" className="mt-3 inline-flex items-center text-sm font-semibold text-vega-blue hover:underline">
                    {card.cta.text}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-1">Send Enquiry</h3>
            <p className="text-base text-slate-500 mb-10 leading-relaxed">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
            <form action={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Name</label>
                  <input name="name" type="text" placeholder="Full name" required className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Company</label>
                  <input name="company" type="text" placeholder="Company name" className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Email</label>
                  <input name="email" type="email" placeholder="you@company.com" required className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600">Phone</label>
                  <input name="phone" type="tel" placeholder="+971 5X XXX XXXX" required className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600">Message</label>
                <textarea name="message" placeholder="Tell us what you need..." rows={4} className="flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
              </div>
              <button type="submit" className="pill-btn-yellow w-full text-sm group">
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
