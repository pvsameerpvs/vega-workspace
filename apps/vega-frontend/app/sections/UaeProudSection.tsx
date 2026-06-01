import { Flag } from "lucide-react";

export function UaeProudSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-center gap-10 text-center md:flex-row md:gap-16">
          <div className="relative flex items-center justify-center">
            {/* UAE Flag SVG */}
            <svg
              viewBox="0 0 300 150"
              className="relative h-20 w-40 rounded-md shadow-sm md:h-24 md:w-48"
              aria-label="UAE Flag"
            >
              {/* Red vertical stripe */}
              <rect x="0" y="0" width="75" height="150" fill="#00732F" />
              {/* Green horizontal stripe */}
              <rect x="75" y="0" width="225" height="50" fill="#00732F" />
              {/* White horizontal stripe */}
              <rect x="75" y="50" width="225" height="50" fill="#FFFFFF" />
              {/* Black horizontal stripe */}
              <rect x="75" y="100" width="225" height="50" fill="#000000" />
              {/* Red vertical stripe on hoist side */}
              <rect x="0" y="0" width="75" height="150" fill="#FF0000" />
            </svg>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="mb-3 flex items-center gap-2 text-slate-400">
              <Flag className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">Made in UAE</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Proud of <span className="text-vega-yellow">UAE</span>
            </h2>
            <p className="mt-3 max-w-md text-base text-slate-500 leading-relaxed">
              A proudly UAE-based company serving businesses across all seven emirates with quality, reliability, and dedication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
