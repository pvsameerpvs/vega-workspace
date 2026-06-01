"use client";

import { ShieldCheck, Truck, Users } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <div className="label-line mb-4 justify-center">Our Promise</div>
          <h2 className="section-heading">Trusted. Reliable. Delivered.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Trusted Supplier",
              desc: "Serving UAE businesses since 2009 with verified quality and on-time delivery.",
              badge: "Verified Partner",
              badgeColor: "bg-vega-blue text-white",
            },
            {
              icon: Truck,
              title: "Our Fleet",
              desc: "2 trucks, vans, SUVs, and 4 sedans with a professional delivery team ready to serve across all emirates.",
              fleet: true,
            },
            {
              icon: Users,
              title: "Our Team",
              desc: "A dedicated team of 15 to 20 professionals committed to delivering excellence in every order.",
              badge: "15–20 Members",
              badgeColor: "bg-slate-100 text-slate-700",
            },
          ].map((card, i) => (
            <div key={card.title} className="modern-card p-8 text-center group animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-vega-blue/10 text-vega-blue transition-all duration-300 group-hover:bg-vega-blue group-hover:text-white shadow-subtle">
                <card.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-vega-blue">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">{card.desc}</p>
              {card.badge && (
                <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold ${card.badgeColor}`}>
                  {card.badge}
                </span>
              )}
              {card.fleet && (
                <div className="grid grid-cols-3 gap-2">
                  {["Trucks", "Vans", "Sedans"].map((f) => (
                    <div key={f} className="rounded-xl bg-slate-50 py-3 text-sm font-semibold text-vega-blue border border-slate-100">{f}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="img-rounded aspect-[16/9] overflow-hidden bg-slate-100 shadow-elevated">
            <img src="/images/gallery/delivery-fleet.jpg" alt="Vega Fleet" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          </div>
          <div className="img-rounded aspect-[16/9] overflow-hidden bg-slate-100 shadow-elevated">
            <img src="/images/gallery/vega-team.jpg" alt="Vega Team" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          </div>
        </div>
      </div>
    </section>
  );
}
