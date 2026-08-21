import { Phone } from "lucide-react";
import { TrackedAnchor } from "./TrackedAnchor";
import { LandingQuoteForm } from "./LandingQuoteForm";
import type { Product } from "@/lib/types";

interface LandingFinalCtaProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
  note: string;
  isAR: boolean;
  path: string;
  categoryName: string;
  products: Product[];
  formProducts?: Product[];
  contactHref: string;
}

export function LandingFinalCta({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  note,
  isAR,
  path,
  categoryName,
  products,
  formProducts,
  contactHref,
}: LandingFinalCtaProps) {
  const options = (formProducts && formProducts.length > 0 ? formProducts : products).map((p) => ({
    name: p.name,
    sku: p.sku,
  }));

  return (
    <section id="final-cta" className="scroll-mt-32 md:scroll-mt-40 bg-gradient-dark py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 pb-4">
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-vega-yellow" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-vega-yellow">{eyebrow}</span>
            <span className="h-px w-8 bg-vega-yellow" />
          </div>
          <h2 className="section-heading text-white">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{subtitle}</p>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="mb-3 text-lg font-bold text-white">
                {isAR ? "تفضل بالتواصل المباشر" : "Prefer to reach us directly?"}
              </h3>
              <div className="space-y-3">
                <TrackedAnchor
                  href="tel:+97143548999"
                  event="lp_phone_click"
                  label="+971 4 349 8999"
                  className="flex items-center justify-center rounded-full bg-vega-yellow px-6 py-3 text-sm font-bold text-vega-blue transition-all hover:brightness-95"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {isAR ? "اتصل" : "Call"} +971 4 349 8999
                </TrackedAnchor>
                <TrackedAnchor
                  href={contactHref}
                  event="lp_final_contact"
                  label={secondary}
                  className="flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  {secondary}
                </TrackedAnchor>
              </div>

              <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-slate-300">
                <li>{isAR ? "• الرد السريع على الاستفسارات" : "• Fast response to enquiries"}</li>
                <li>{isAR ? "• التوفر وعروض الأسعار للكميات" : "• Availability & pricing for quantities"}</li>
                <li>{isAR ? "• متطلبات المشاريع الخاصة" : "• Special project requirements"}</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-6 shadow-elevated md:p-8">
              <h3 className="mb-1 text-lg font-bold text-vega-blue">
                {isAR ? "اطلب عرض سعر" : "Request a Quote"}
              </h3>
              <p className="mb-6 text-sm text-slate-500">{note}</p>
              <LandingQuoteForm
                isAR={isAR}
                category={categoryName}
                path={path}
                productOptions={options}
                formId="lp-final-form"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}