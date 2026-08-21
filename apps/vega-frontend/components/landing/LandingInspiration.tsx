import { ProtectedImage } from "@/components/ProtectedImage";
import { CheckCircle2 } from "lucide-react";

export function LandingInspiration({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  text,
  isAR,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  text: string;
  isAR: boolean;
}) {
  return (
    <section className="scroll-mt-32 md:scroll-mt-40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-elevated">
            <ProtectedImage
              src={image}
              alt={imageAlt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-vega-yellow" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-vega-yellow">{eyebrow}</span>
            </div>
            <h2 className="section-heading">{title}</h2>
            {subtitle && <p className="mt-3 text-base text-slate-500 leading-relaxed">{subtitle}</p>}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-vega-yellow" />
              <p className="text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}