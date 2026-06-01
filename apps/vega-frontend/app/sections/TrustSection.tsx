"use client";

import { ShieldCheck, Truck, Users } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-6 block text-sm text-slate-400">Our Promise</span>
          <h2 className="section-heading text-4xl md:text-5xl">Trusted. Reliable. Delivered.</h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Trusted Supplier",
              desc: "Serving UAE businesses since 2009 with verified quality and on-time delivery.",
            },
            {
              icon: Truck,
              title: "Our Fleet",
              desc: "2 trucks, vans, SUVs, and 4 sedans with a professional delivery team ready to serve across all emirates.",
            },
            {
              icon: Users,
              title: "Our Team",
              desc: "A dedicated team of 15 to 20 professionals committed to delivering excellence in every order.",
            },
          ].map((card, i) => (
            <div key={card.title} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">{card.title}</h3>
              <p className="text-base text-slate-500 leading-relaxed max-w-sm mx-auto">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-2">
          <div className="img-rounded aspect-[16/9] overflow-hidden bg-slate-100">
            <img src="/images/gallery/delivery-fleet.jpg" alt="Vega Fleet" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          </div>
          <div className="img-rounded aspect-[16/9] overflow-hidden bg-slate-100">
            <img src="/images/gallery/vega-team.jpg" alt="Vega Team" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" draggable={false} onContextMenu={(e) => e.preventDefault()} />
          </div>
        </div>
      </div>
    </section>
  );
}
