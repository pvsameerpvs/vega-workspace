"use client";

import { motion } from "framer-motion";
import { Shield, Award, Lightbulb, Users } from "lucide-react";

interface AboutValuesProps {
  isAR: boolean;
}

const values = [
  {
    icon: Shield,
    title: "Reliability",
    titleAr: "الموثوقية",
    desc: "We deliver what we promise, on time, every time. Our logistics network is built for consistency.",
    descAr: "نحن نفي بوعودنا في الوقت المحدد، في كل مرة. تم بناء شبكة الخدمات اللوجستية لدينا للاتساق.",
  },
  {
    icon: Award,
    title: "Quality",
    titleAr: "الجودة",
    desc: "Every product in our catalog is vetted for durability and compliance with UAE standards.",
    descAr: "يتم فحص كل منتج في كتالوجنا لضمان المتانة والامتثال لمعايير الإمارات.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    titleAr: "الابتكار",
    desc: "We continuously expand our range and improve our processes to meet evolving market needs.",
    descAr: "نستمر في توسيع نطاقنا وتحسين عملياتنا لتلبية احتياجات السوق المتطورة.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    titleAr: "التركيز على العميل",
    desc: "From inquiry to delivery, our team is dedicated to providing a seamless, personalized experience.",
    descAr: "من الاستفسار إلى التسليم، يكرس فريقنا جهوده لتقديم تجربة سلسة وشخصية.",
  },
];

export function AboutValues({ isAR }: AboutValuesProps) {
  return (
    <section className="py-24 bg-[#f8fafc]" dir={isAR ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 rounded-full bg-[#FFD400]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FFD400]">
            {isAR ? "قيمنا" : "Core Values"}
          </span>
          <h2 className="section-heading">
            {isAR ? "ما يميز فيجا" : "What Defines Vega"}
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {isAR
              ? "المبادئ التي توجه كل قرار نتخذه وكل علاقة نبنيها."
              : "The principles that guide every decision we make and every relationship we build."}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="modern-card p-8 text-center group"
            >
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F3A93] text-[#FFD400] transition-transform duration-300 group-hover:scale-110">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1F3A93] mb-3">
                {isAR ? v.titleAr : v.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {isAR ? v.descAr : v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
