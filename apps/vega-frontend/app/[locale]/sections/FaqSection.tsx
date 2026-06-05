"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { getFaqs, mapFaqToFrontend } from "@/lib/api";

interface FaqSectionProps {
  locale?: string;
}

export function FaqSection({ locale = "en" }: FaqSectionProps) {
  const isAR = locale === "ar";
  const [faqs, setFaqs] = useState<any[]>([]);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    getFaqs().then((data) => {
      const mapped = (data || []).map(mapFaqToFrontend).filter(Boolean) as any[];
      setFaqs(mapped);
    });
  }, []);

  return (
    <section className="py-12 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-center text-xl font-bold text-slate-900 mb-8 font-display">{isAR ? "الأسئلة الشائعة" : "Frequently Asked Questions"}</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-slate-100 bg-white overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3 text-start"
              >
                <span className="text-sm font-semibold text-slate-900">{isAR && faq.qAr ? faq.qAr : faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-4 pb-3 text-xs text-slate-500 leading-relaxed">
                  {isAR && faq.aAr ? faq.aAr : faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
