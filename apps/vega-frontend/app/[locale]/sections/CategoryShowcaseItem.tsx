"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  const imgs = [item.image1, item.image2, item.image3].filter(Boolean) as string[];
  const msg = `Hello Vega, I am interested in your ${title} category. Please share more details.`;

  // Visual layout: even index = content on right, odd = content on left
  const isContentOnRight = isEven;

  // RTL flips horizontal alignment: start=right, end=left
  // LTR: start=left, end=right
  const contentAlign = isContentOnRight
    ? (isAR ? "lg:items-start" : "lg:items-end") + " lg:text-right"
    : (isAR ? "lg:items-end" : "lg:items-start") + " lg:text-left";

  const buttonJustify = isContentOnRight
    ? (isAR ? "lg:justify-start" : "lg:justify-end")
    : (isAR ? "lg:justify-end" : "lg:justify-start");

  const badgeRow = isContentOnRight
    ? "lg:flex-row-reverse"
    : "";

  const buttonRow = isContentOnRight ? "flex-row" : "flex-row-reverse";
  const hoverDir = isContentOnRight ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5";
  const arrowPath = isContentOnRight ? "M17 8l4 4m0 0l-4 4m4-4H3" : "M7 8l-4 4m0 0l4 4m-4-4h18";

  const imageOrder = isAR
    ? isEven ? "lg:order-2" : "lg:order-1"
    : isEven ? "lg:order-1" : "lg:order-2";

  const contentOrder = isAR
    ? isEven ? "lg:order-1" : "lg:order-2"
    : isEven ? "lg:order-2" : "lg:order-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
    >
      <motion.div
        initial={{ opacity: 0, x: isContentOnRight ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className={imageOrder}
      >
        <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[300px]">
          <div className="absolute -top-3 -left-3 w-20 h-20 rounded-full bg-vega-yellow/20 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-vega-blue/10 blur-2xl pointer-events-none" />
          <CollageGrid images={imgs} title={title} isAR={isAR} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isContentOnRight ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className={contentOrder}
      >
        <div className={`flex flex-col ${contentAlign}`}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 font-display leading-tight tracking-tight mb-3">
            {title}
          </h3>

          <div className="w-16 h-1 bg-vega-yellow rounded-full mb-4" />

          <p className="text-slate-500 leading-[1.7] text-sm md:text-base mb-5 max-w-md line-clamp-2 font-display">
            {desc || (isAR
              ? "استكشف مجموعتنا المتميزة من المنتجات المصممة بعناية لتلبية احتياجات عملك."
              : "Explore our premium collection of products, carefully curated to meet your business needs with exceptional quality.")}
          </p>

          <div className={`flex flex-wrap gap-3 ${buttonJustify}`}>
            <a
              href={generateWhatsAppLink(PHONE, msg)}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 border-2 border-vega-blue text-vega-blue font-semibold rounded-full hover:bg-vega-blue hover:text-white transition-all duration-500 shadow-blue hover:shadow-lg hover:-translate-y-0.5 ${buttonRow}`}
            >
              <span className="text-sm">{isAR ? "استفسر الآن" : "Enquire Now"}</span>
              <svg className={`h-4 w-4 transition-transform duration-300 ${hoverDir}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
            <Link
              href={getCategoryUrl(item.categorySlug || "", locale)}
              className={`group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 bg-vega-yellow text-vega-blue font-semibold rounded-full hover:bg-vega-yellow-dark transition-all duration-500 shadow-yellow hover:shadow-lg hover:-translate-y-0.5 ${buttonRow}`}
            >
              <span className="text-sm">{isAR ? "اكتشف المجموعة" : "Explore Collection"}</span>
              <svg className={`h-4 w-4 transition-transform duration-300 ${hoverDir}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={arrowPath} />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
