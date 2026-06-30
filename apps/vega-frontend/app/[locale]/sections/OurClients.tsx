"use client";

import Image from "next/image";

const LOGOS = Array.from({ length: 31 }, (_, i) => ({
  src: `/images/our-clients/logo${i + 1}.jpeg`,
  alt: `Client ${i + 1}`,
}));

interface OurClientsProps {
  locale?: string;
}

export function OurClients({ locale = "en" }: OurClientsProps) {
  const isAR = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-gradient-subtle py-16">
      <div className="mx-auto max-w-[90rem] px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#FFD400]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#1F3A93]">
            {isAR ? "عملاؤنا" : "Our Clients"}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#1F3A93] sm:text-4xl">
            {isAR ? "من نثق بهم" : "Trusted By"}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500">
            {isAR
              ? "نفخر بخدمة أفضل الشركات والمؤسسات في جميع أنحاء الإمارات"
              : "Proud to serve leading companies and institutions across the UAE"}
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#FFD400]" />
        </div>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex animate-marquee gap-20">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="flex h-20 w-44 flex-shrink-0 items-center justify-center grayscale transition-all duration-500 hover:grayscale-0"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={176}
                  height={80}
                  className="h-full w-full object-contain"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
