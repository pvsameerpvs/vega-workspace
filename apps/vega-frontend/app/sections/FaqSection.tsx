"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-14 text-center">
          <div className="label-line mb-4 justify-center">Support</div>
          <h2 className="section-heading">Common Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-subtle transition-all duration-300 hover:shadow-card">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/50"
              >
                <span className="text-sm font-bold text-vega-blue pr-4">{faq.q}</span>
                <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${openIndex === i ? 'bg-vega-yellow text-vega-blue rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                <div className="border-t border-slate-50 px-5 py-4 text-sm text-slate-500 leading-relaxed">
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
