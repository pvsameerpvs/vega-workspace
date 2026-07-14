"use client";

import { motion } from "framer-motion";
import { ProtectedImage } from "@/components/ProtectedImage";

interface AboutStoryProps {
  isAR: boolean;
}

export function AboutStory({ isAR }: AboutStoryProps) {
  return (
    <section className="py-24 md:py-32 bg-white" dir={isAR ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: isAR ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
              <div className="img-rounded relative overflow-hidden shadow-2xl shadow-slate-200/50 mb-4 aspect-video">
                <ProtectedImage
                src="/images/about/about1.jpeg"
                alt="Vega"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="img-rounded relative overflow-hidden shadow-xl shadow-slate-200/50 aspect-[4/3]">
                <ProtectedImage
                  src="/images/about/about2.jpeg"
                  alt="Vega"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="img-rounded relative overflow-hidden shadow-xl shadow-slate-200/50 aspect-[4/3]">
                <ProtectedImage
                  src="/images/about/about3.jpeg"
                  alt="Vega"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: isAR ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block mb-4 rounded-full bg-[#FFD400]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FFD400]">
              {isAR ? "قصتنا" : "Our Story"}
            </span>
            <h2 className="section-heading mb-6">
              {isAR
                ? "خبرة تزيد عن 15 عاماً في الإمارات"
                : "Over 15 Years of Experience in the UAE"}
            </h2>
            <div className="space-y-4 body-muted">
              <p>
                {isAR
                  ? "كانت فيجا ركيزة في قطور التوريد الصناعي والأثاث في الإمارات لأكثر من عقد ونصف. بدءًا من شركة تجارية متواضعة، نمت لنصبح مزود حلول B2B شامل يخدم عمالقة البناء ومخيمات العمال والمنشآت الحكومية."
                  : "Vega has been a cornerstone in the UAE's industrial and furniture supply sector for over a decade and a half. Starting from a modest trading firm, we have grown into a comprehensive B2B solution provider serving construction giants, labor camps, and government facilities."}
              </p>
              <p>
                {isAR
                  ? "يضمن مستودعنا الذي تزيد مساحته عن 10,000 قدم مربع في الشارقة ومكتبنا المخصص في دبي أننا قادرون على تلبية الطلبات بالجملة بسرعة ودقة. نؤمن بأن مصادر المنتجات المتينة والموثوقة يجب ألا تكون أبداً عملية مرهقة."
                  : "Our 10,000+ sq ft warehouse in Sharjah and our dedicated Dubai office ensure that we can fulfill bulk orders with speed and precision. We believe that sourcing durable, reliable products should never be a hassle."}
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-[#f8fafc] p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-[#1F3A93] mb-2">
                  {isAR ? "مهمتنا" : "Our Mission"}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {isAR
                    ? "تقديم منتجات عالية الجودة ومتينة تدعم بنية الإمارات التحتية، مدعومة بخدمة وموثوقية لا تُضاهى."
                    : "To deliver high-quality, durable products that power the infrastructure of the UAE, backed by unmatched service and reliability."}
                </p>
              </div>
              <div className="rounded-2xl bg-[#f8fafc] p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-[#1F3A93] mb-2">
                  {isAR ? "رؤيتنا" : "Our Vision"}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {isAR
                    ? "أن نكون الاسم الأكثر موثوقية في المستلزمات الصناعية ومخيمات الإيواء في منطقة الخليج، معروفين بالجودة والسرعة والنزاهة."
                    : "To be the most trusted name in industrial and camp supplies across the Gulf region, known for quality, speed, and integrity."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
