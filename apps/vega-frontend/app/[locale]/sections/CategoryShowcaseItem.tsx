import Link from "next/link";
import { CollageGrid } from "@/components/collage";
import { getCategoryUrl } from "@/lib/url";
import { generateWhatsAppLink } from "@vega/utils";

interface CategoryShowcaseItemProps {
  item: any;
  index: number;
  locale: string;
  isAR: boolean;
}

const PHONE = "971567351095";

export function CategoryShowcaseItem({ item, index, locale, isAR }: CategoryShowcaseItemProps) {
  const isEven = index % 2 === 0;
  const title = isAR && item.titleAr ? item.titleAr : item.title || "";
  const desc = isAR && item.descriptionAr ? item.descriptionAr : item.description || "";
  const imgs = [item.image1, item.image2, item.image3, item.image4].filter(Boolean) as string[];
  const msg = `Hello Vega, I am interested in your ${title} category. Please share more details.`;

  const imageOrder = isAR
    ? isEven ? "lg:order-2" : "lg:order-1"
    : isEven ? "lg:order-1" : "lg:order-2";

  const contentOrder = isAR
    ? isEven ? "lg:order-1" : "lg:order-2"
    : isEven ? "lg:order-2" : "lg:order-1";

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index > 0 ? "mt-24 lg:mt-32" : ""}`}>
      <div className={imageOrder}>
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-vega-yellow/20 blur-2xl" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-vega-blue/10 blur-2xl" />
          <CollageGrid images={imgs} title={title} isAR={isAR} />
        </div>
      </div>

      <div className={`${contentOrder} flex flex-col`}>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-vega-yellow" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-vega-blue/60">
            {isAR
              ? `فئة ${String(index + 1).padStart(2, "0")}`
              : `Category ${String(index + 1).padStart(2, "0")}`}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 font-display leading-[1.15] tracking-tight mb-6">
          {title}
        </h3>

        <div className="w-16 h-1 bg-vega-yellow rounded-full mb-6" />

        <p className="text-slate-500 leading-[1.8] text-base md:text-lg mb-10 max-w-md">
          {desc || (isAR
            ? "استكشف مجموعتنا المتميزة من المنتجات المصممة بعناية لتلبية احتياجات عملك."
            : "Explore our premium collection of products, carefully curated to meet your business needs with exceptional quality.")}
        </p>

        <div className="flex flex-wrap gap-4 mt-auto">
          <a
            href={generateWhatsAppLink(PHONE, msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 border-2 border-vega-blue text-vega-blue font-semibold rounded-full hover:bg-vega-blue hover:text-white transition-all duration-500 shadow-blue hover:shadow-lg hover:-translate-y-0.5"
          >
            <span className="text-sm">{isAR ? "استفسر الآن" : "Enquire Now"}</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
          <Link
            href={getCategoryUrl(item.categorySlug || "", locale)}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-vega-yellow text-vega-blue font-semibold rounded-full hover:bg-vega-yellow-dark transition-all duration-500 shadow-yellow hover:shadow-lg hover:-translate-y-0.5"
          >
            <span className="text-sm">{isAR ? "اكتشف المجموعة" : "Explore Collection"}</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
