import Link from "next/link";
import { ProtectedImage } from "@/components/ui/ProtectedImage";

const items = [
  { name: "Camp Furniture", image: "/images/banners/camp-furniture.jpg", href: "/products/camp-furniture" },
  { name: "Office Furniture", image: "/images/banners/office-furniture.jpg", href: "/products/office-furniture" },
  { name: "Queue Barriers", image: "/images/banners/queue-barriers.jpg", href: "/products/queue-barriers" },
  { name: "Hospitality", image: "/images/banners/hospitality.jpg", href: "/products/hospitality" },
  { name: "Metal Barriers", image: "/images/banners/metal-barriers.jpg", href: "/products/metal-barriers" },
];

export function SpotlightSection() {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-xl font-bold text-slate-900 mb-8 font-display">In the Spotlight</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link href={items[0].href} className="group relative col-span-2 md:col-span-2 row-span-2 overflow-hidden rounded-2xl aspect-[4/3]">
            <ProtectedImage src={items[0].image} alt={items[0].name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full bg-[#FFD400] px-4 py-1.5 text-xs font-bold text-[#1F3A93]">{items[0].name}</span>
          </Link>
          {items.slice(1).map((item) => (
            <Link key={item.name} href={item.href} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
              <ProtectedImage src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-[#FFD400] px-4 py-1.5 text-xs font-bold text-[#1F3A93]">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
