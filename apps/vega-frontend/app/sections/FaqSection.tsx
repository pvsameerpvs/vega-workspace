"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-6 block text-sm text-slate-400">Support</span>
          <h2 className="section-heading text-4xl md:text-5xl">Common Questions</h2>
        </div>
        <div className="space-y-0">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-slate-100">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left transition-colors hover:bg-slate-50/50"
              >
                <span className="text-base font-semibold text-slate-900 pr-4">{faq.q}</span>
                <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${openIndex === i ? 'bg-vega-yellow text-vega-blue rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <div className="text-base text-slate-500 leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
