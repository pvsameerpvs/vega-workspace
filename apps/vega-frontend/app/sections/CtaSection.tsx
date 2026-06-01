import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-32 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="mb-6 block text-sm text-slate-400">Start Today</span>
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
          Need Bulk Supply for<br />Your Project?
        </h2>
        <p className="mx-auto max-w-lg text-lg text-slate-500 leading-relaxed">
          Share your requirement with Vega and our team will assist you with
          product options, availability, delivery, and installation support.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/contact-us" className="group inline-flex items-center gap-2 rounded-full bg-vega-yellow px-8 py-4 text-sm font-bold text-vega-blue shadow-yellow transition-all duration-300 hover:bg-vega-yellow-dark hover:-translate-y-0.5 font-heading">
            Request a Quote <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="/catalog" className="inline-flex items-center rounded-full border border-slate-200 px-8 py-4 text-sm font-semibold text-slate-600 transition-all duration-300 hover:bg-slate-50 font-heading">
            Download Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
