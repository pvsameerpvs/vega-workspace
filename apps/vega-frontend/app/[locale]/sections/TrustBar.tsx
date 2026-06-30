"use client";

import { useState, useEffect, useRef } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  labelAr: string;
}

function AnimatedNumber({ target, duration = 2200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const stats: Stat[] = [
  { value: 5000, suffix: "+", label: "Customers", labelAr: "عميل" },
  { value: 300, suffix: "+", label: "Products in stock", labelAr: "منتج في المخزون" },
  { value: 15, suffix: "+", label: "Years in Business", labelAr: "سنة في العمل" },
  { value: 10000, suffix: "+ sq ft", label: "Storage Facility", labelAr: "مستودع تخزين" },
  { value: 25, suffix: "+", label: "Team Members", labelAr: "فريق العمل" },
];

interface TrustBarProps {
  locale?: string;
}

export function TrustBar({ locale = "en" }: TrustBarProps) {
  const isAR = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-white py-8 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`flex flex-col items-center text-center group ${i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}>
              <div className="relative">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1F3A93] tabular-nums leading-none whitespace-nowrap">
                  <AnimatedNumber target={stat.value} />
                  {stat.suffix}
                </span>
              </div>
              <div className="mt-1.5 sm:mt-2 h-0.5 w-6 sm:w-8 rounded-full bg-[#FFD400]/60 group-hover:w-10 sm:group-hover:w-12 transition-all duration-500" />
              <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm lg:text-base font-semibold text-[#1F3A93]">
                {isAR ? stat.labelAr : stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
