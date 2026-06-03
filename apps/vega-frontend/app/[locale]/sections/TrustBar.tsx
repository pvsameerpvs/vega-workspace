import Image from "next/image";

const features = [
  { image: "/images/trustbar/customers.png", label: "5000+ Customers" },
  { image: "/images/trustbar/uae-delivery.png", label: "UAE Delivery" },
  { image: "/images/trustbar/best-prices.png", label: "Best Prices" },
  { image: "/images/trustbar/secure-payment.png", label: "Secure Payment" },
  { image: "/images/trustbar/easy-returns.png", label: "Easy Returns" },
];

interface TrustBarProps {
  locale?: string;
}

export function TrustBar({ locale = "en" }: TrustBarProps) {
  const isAR = locale === "ar";
  const features = [
    { image: "/images/trustbar/customers.png", label: isAR ? "5000+ عميل" : "5000+ Customers" },
    { image: "/images/trustbar/uae-delivery.png", label: isAR ? "توصيل الإمارات" : "UAE Delivery" },
    { image: "/images/trustbar/best-prices.png", label: isAR ? "أفضل الأسعار" : "Best Prices" },
    { image: "/images/trustbar/secure-payment.png", label: isAR ? "دفع آمن" : "Secure Payment" },
    { image: "/images/trustbar/easy-returns.png", label: isAR ? "إرجاع سهل" : "Easy Returns" },
  ];

  return (
    <section className="bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center gap-4 min-w-[160px] text-center"
            >
              <div className="relative h-20 w-20 lg:h-24 lg:w-24 shrink-0">
                <Image
                  src={f.image}
                  alt={f.label}
                  fill
                  className="object-contain"
                  draggable={false}
                  sizes="96px"
                />
              </div>
              <div className="text-base font-semibold text-slate-900">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
