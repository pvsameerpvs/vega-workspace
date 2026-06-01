import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28 bg-gradient-dark">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-vega-blue/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-vega-yellow/10 blur-3xl" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="label-line mb-4 justify-center">
          <span className="text-vega-yellow">Start Today</span>
        </div>
        <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight tracking-tight mb-5">
          Need Bulk Supply for<br />Your Project?
        </h2>
        <p className="mx-auto max-w-lg text-base text-white/50 leading-relaxed">
          Share your requirement with Vega and our team will assist you with
          product options, availability, delivery, and installation support.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/contact-us" className="group inline-flex items-center gap-2 rounded-full bg-vega-yellow px-7 py-3.5 text-sm font-bold text-vega-blue shadow-yellow transition-all duration-300 hover:bg-vega-yellow-dark hover:shadow-lg hover:-translate-y-0.5 font-heading">
            Request a Quote <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="/catalog" className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:text-white font-heading">
            Download Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
