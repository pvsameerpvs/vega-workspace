import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-32 bg-gray-900">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="label-line mb-4 justify-center text-white/40">
          <span className="text-white/40">Start Today</span>
        </div>
        <h2 className="text-2xl font-semibold text-white md:text-3xl lg:text-4xl leading-tight">
          Need Bulk Supply for<br />Your Project?
        </h2>
        <p className="mt-5 text-base text-white/60 leading-relaxed max-w-lg mx-auto">
          Share your requirement with Vega and our team will assist you with
          product options, availability, delivery, and installation support.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/contact-us" className="rounded-full border border-white/30 px-7 py-3 text-base font-medium text-white hover:bg-white hover:text-gray-900 transition-all duration-300">
            Request a Quote <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
          <Link href="/catalog" className="rounded-full border border-white/30 px-7 py-3 text-base font-medium text-white hover:bg-white hover:text-gray-900 transition-all duration-300">
            Download Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
