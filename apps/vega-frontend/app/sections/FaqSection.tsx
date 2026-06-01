"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-gray-50/50">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Support</div>
          <h2 className="section-heading">Common Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="text-base font-semibold text-gray-900">{faq.q}</span>
                <ChevronDown className={`ml-4 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="border-t border-gray-50 px-5 py-4 text-base text-gray-500 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
