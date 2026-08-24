import { FileText } from "lucide-react";
import type { Product } from "@/lib/types";
import type { LandingContent } from "./types";
import type { LandingProductGroup } from "./data";
import { LandingHero } from "./LandingHero";
import { LandingSectionHeader } from "./LandingSectionHeader";
import { LandingQuoteForm } from "./LandingQuoteForm";
import { LandingProducts } from "./LandingProducts";
import { LandingCategories } from "./LandingCategories";
import { LandingFeatureGrid } from "./LandingFeatureGrid";
import { LandingApplications } from "./LandingApplications";
import { LandingSteps } from "./LandingSteps";
import { LandingUseCases } from "./LandingUseCases";
import { LandingInspiration } from "./LandingInspiration";
import { LandingTrust } from "./LandingTrust";
import { LandingFaq } from "./LandingFaq";
import { LandingFinalCta } from "./LandingFinalCta";
import { LandingStickyCta } from "./LandingStickyCta";

export const TRUST_MICROCOPY =
  "Fast Response • Bulk Orders • Custom Requirements • Commercial Supply";
export const TRUST_MICROCOPY_AR =
  "استجابة سريعة • طلبات بالجملة • متطلبات مخصصة • توريد تجاري";

interface LandingPageProps {
  content: LandingContent;
  products: Product[];
  locale: string;
  formProducts?: Product[];
  groups?: LandingProductGroup[];
}

export function LandingPage({ content, products, locale, formProducts, groups }: LandingPageProps) {
  const isAR = locale === "ar";
  const base = `/${locale}${content.path}`;
  const quoteHref = `${base}#quote`;
  const productsHref = `${base}#products`;
  const heroImage = products.find((p) => p.image)?.image || "";
  const options = (formProducts && formProducts.length > 0 ? formProducts : products).map((p) => ({
    name: p.name,
    sku: p.sku,
  }));

  return (
    <main className="pb-20 md:pb-0">
      <LandingHero
        hero={content.hero}
        image={heroImage}
        isAR={isAR}
        quoteHref={quoteHref}
        productsHref={productsHref}
        trustMicrocopy={isAR ? TRUST_MICROCOPY_AR : TRUST_MICROCOPY}
      />

      {content.sections.map((section) => {
        switch (section) {
          case "quote":
            return (
              <section key={section} id="quote" className="scroll-mt-32 md:scroll-mt-40 border-y border-slate-100 bg-white py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4">
                  <div className="grid items-start gap-8 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                      <LandingSectionHeader heading={content.quote} isAR={isAR} align="start" />
                      <p className="flex items-start gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-500">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-vega-yellow" />
                        {content.quote.note}
                      </p>
                    </div>
                    <div className="lg:col-span-3">
                      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card md:p-8">
                        <LandingQuoteForm
                          isAR={isAR}
                          category={content.categoryName}
                          path={content.path}
                          productOptions={options}
                          formId="lp-quick-form"
                          compact
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );

          case "products":
            return (
              <LandingProducts
                key={section}
                heading={content.products}
                groups={groups}
                products={products}
                isAR={isAR}
                getQuoteLabel={content.products.getQuote}
                viewDetailsLabel={content.products.viewDetails}
                emptyText={content.products.emptyText}
              />
            );

          case "categories":
            return content.categories ? (
              <LandingCategories key={section} heading={content.categories} items={content.categories.items} isAR={isAR} />
            ) : null;

          case "benefits":
            return content.benefits ? (
              <LandingFeatureGrid key={section} heading={content.benefits} items={content.benefits.items} isAR={isAR} />
            ) : null;

          case "applications":
            return content.applications ? (
              <LandingApplications key={section} heading={content.applications} items={content.applications.items} isAR={isAR} />
            ) : null;

          case "whyUs":
            return content.whyUs ? (
              <LandingFeatureGrid key={section} heading={content.whyUs} items={content.whyUs.items} isAR={isAR} tone="dark" />
            ) : null;

          case "steps":
            return content.steps ? (
              <LandingSteps key={section} heading={content.steps} items={content.steps.items} isAR={isAR} />
            ) : null;

          case "useCases":
            return content.useCases ? (
              <LandingUseCases
                key={section}
                heading={content.useCases}
                items={content.useCases.items}
                images={products.map((p) => p.image)}
                isAR={isAR}
              />
            ) : null;

          case "inspiration":
            return content.inspiration ? (
              <LandingInspiration
                key={section}
                eyebrow={content.inspiration.eyebrow}
                title={content.inspiration.title}
                subtitle={content.inspiration.subtitle}
                image={content.inspiration.image}
                imageAlt={content.inspiration.imageAlt}
                text={content.inspiration.text}
                isAR={isAR}
              />
            ) : null;

          case "trust":
            return (
              <LandingTrust key={section} heading={content.trust} items={content.trust.items} isAR={isAR} />
            );

          case "faq":
            return <LandingFaq key={section} heading={content.faq} items={content.faq.items} isAR={isAR} />;

          case "final":
            return (
              <LandingFinalCta
                key={section}
                eyebrow={content.finalCta.eyebrow}
                title={content.finalCta.title}
                subtitle={content.finalCta.subtitle}
                primary={content.finalCta.primary}
                secondary={content.finalCta.secondary}
                note={content.finalCta.note}
                isAR={isAR}
                path={content.path}
                categoryName={content.categoryName}
                products={products}
                formProducts={formProducts}
                contactHref={`/${locale}/contact-us`}
              />
            );

          default:
            return null;
        }
      })}

      <LandingStickyCta
        quoteLabel={isAR ? "اطلب عرض سعر" : "Get a Quote"}
        callLabel={isAR ? "اتصال" : "Call"}
        quoteHref={quoteHref}
      />
    </main>
  );
}