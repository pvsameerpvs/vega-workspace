"use client";

import { Phone } from "lucide-react";
import { track } from "@/lib/tracking";

export function LandingStickyCta({
  quoteLabel,
  callLabel,
  quoteHref,
}: {
  quoteLabel: string;
  callLabel: string;
  quoteHref: string;
}) {
  return (
    <div className="lp-sticky-bar fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-sm md:hidden">
      <div className="flex items-center gap-3">
        <a
          href="tel:+97143548999"
          onClick={() => track("lp_phone_click", { label: "sticky_call" })}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 text-vega-blue"
          aria-label={callLabel}
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={quoteHref}
          onClick={() => track("lp_sticky_quote", { label: "get_quote" })}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-vega-yellow text-sm font-bold text-vega-blue shadow-md"
        >
          {quoteLabel}
        </a>
      </div>
    </div>
  );
}