"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AboutCtaProps {
  isAR: boolean;
  locale: string;
}

export function AboutCta({ isAR, locale }: AboutCtaProps) {
  const l = (path: string) => `/${locale}${path}`;

  return (
    <section className="relative overflow-hidden bg-[#1F3A93] py-24">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#FFD400]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            {isAR
              ? "هل أنت جاهز للبدء مع فيجا؟"
              : "Ready to Partner with Vega?"}
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            {isAR
              ? "تواصل مع فريق المبيعات لدينا للحصول على عرض سعر مخصص لمشروعك."
              : "Reach out to our sales team for a tailored quote for your project."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={l("/contact-us")}
              className="pill-btn-yellow inline-flex items-center gap-2"
            >
              {isAR ? "اطلب عرض سعر" : "Request a Quote"}
              <ArrowRight
                className={`h-4 w-4 ${isAR ? "rotate-180 order-first" : ""}`}
              />
            </Link>
            <Link
              href={l("/products")}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              {isAR ? "استكشف المنتجات" : "Explore Products"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
