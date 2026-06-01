import { Metadata } from "next";
import { ArrowRight, MapPin, Phone, Mail, Warehouse, Linkedin } from "lucide-react";
import { ProtectedImage } from "@/components/ProtectedImage";
import Link from "next/link";
import { TEAM } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us | Vega UAE",
  description: "Learn about Vega, a trusted supplier of camp furniture, barriers, and industrial supplies across the UAE.",
};

export default function AboutUsPage() {
  return (
    <main className="pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="label-line mb-4">Company</div>
          <h1 className="section-heading">About Us</h1>
          <p className="mt-4 text-base text-slate-500 max-w-2xl leading-relaxed">
            Vega is a leading B2B supplier of camp furniture, metal barriers, queue barriers, office furniture, and industrial supplies across the United Arab Emirates.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 mb-20">
          <div className="space-y-5">
            <p className="text-base text-slate-600 leading-relaxed">
              With over 15 years of experience and a 10,000+ sq ft warehouse facility, we serve construction companies, labor camps, facilities management firms, and government entities with reliable, durable products.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Our product range includes bunk beds, single beds, mattresses, lockers, dining furniture, plastic furniture, gas burners, flag poles, crowd control barriers, and office furniture.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We believe that good furniture should be easy to source and reliable to use. For this reason, we work with the best manufacturers to create products suitable for businesses across the UAE.
            </p>
            <Link href="/products" className="pill-btn-yellow group inline-flex mt-2">
              Explore Products <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="img-rounded aspect-[4/3] bg-slate-100 shadow-elevated overflow-hidden">
            <ProtectedImage
              src="/images/gallery/warehouse-interior.jpg"
              alt="Vega Warehouse"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-20 grid grid-cols-2 gap-6 border-t border-slate-100 pt-12 md:grid-cols-4">
          {[
            { value: "15+", label: "Years of experience" },
            { value: "10,000+", label: "sq ft warehouse" },
            { value: "1,500+", label: "Satisfied customers" },
            { value: "300+", label: "Products in stock" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="stat-number mb-1">{stat.value}</div>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <div className="label-line mb-4 justify-center">Our People</div>
            <h2 className="section-heading">Meet the Team</h2>
            <p className="mt-4 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              The dedicated professionals behind Vega's success.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <div key={member.name} className="modern-card p-6 text-center group animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-slate-50 border border-slate-100 shadow-subtle">
                  <ProtectedImage
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-bold text-vega-blue">{member.name}</h3>
                <p className="text-sm font-bold text-vega-yellow">{member.designation}</p>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{member.bio}</p>
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

        {/* Contact Cards */}
        <div className="mb-4 text-center">
          <div className="label-line mb-4 justify-center">Reach Us</div>
          <h2 className="section-heading mb-12">Get in Touch</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, title: "Phone", lines: ["+971 56 735 1095", "+971 56 931 0575"], color: "bg-vega-blue/10 text-vega-blue" },
            { icon: Mail, title: "Email", lines: ["Sales@thevegauae.com"], color: "bg-vega-blue/10 text-vega-blue" },
            { icon: MapPin, title: "Office", lines: ["Dubai, UAE"], color: "bg-vega-blue/10 text-vega-blue" },
            { icon: Warehouse, title: "Warehouse", lines: ["Sharjah, UAE"], color: "bg-vega-blue/10 text-vega-blue" },
          ].map((card, i) => (
            <div key={card.title} className="modern-card p-6 text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-vega-blue mb-1">{card.title}</h3>
              {card.lines.map((l) => (
                <p key={l} className="text-sm text-slate-500">{l}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
