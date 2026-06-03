import Link from "next/link";
import { getSpotlightItems } from "@/lib/api";
import { ProtectedImage } from "@/components/ProtectedImage";
import { ArrowRight, Star } from "lucide-react";

export async function SpotlightSection() {
  const items = await getSpotlightItems();
  const list = (Array.isArray(items) ? items : [])
    .filter((i: any) => i.isActive && i.image)
    .sort((a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

  if (list.length === 0) return null;

  const first = list[0];
  const rest = list.slice(1);

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-8 bg-[#FFD400]" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD400]">Featured</span>
        </div>
        <h2 className="section-heading text-3xl md:text-4xl mb-10">In the Spotlight</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* First item — large (2x2 on desktop) */}
          <Link
            href={`/products/${first.link}`}
            className="group relative overflow-hidden rounded-2xl bg-slate-100 lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto"
          >
            <ProtectedImage
              src={first.image}
              alt={first.title || "Spotlight"}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#FFD400] px-3 py-1 text-[10px] font-bold text-[#1F3A93] uppercase tracking-wider">
                <Star className="h-3 w-3" /> Featured
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
                {first.title || "Spotlight"}
              </h3>
              {first.subtitle && (
                <p className="text-sm text-white/70 mb-4 max-w-md">{first.subtitle}</p>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD400] transition-all group-hover:gap-2">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>

          {/* Rest items — small (1x1) */}
          {rest.slice(0, 4).map((item: any) => (
            <Link
              key={item.id}
              href={`/products/${item.link}`}
              className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-square"
            >
              <ProtectedImage
                src={item.image}
                alt={item.title || "Spotlight"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/10 to-transparent transition-opacity group-hover:from-[#1F3A93]/80" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-sm font-bold text-white leading-tight mb-1">
                  {item.title || "Spotlight"}
                </h3>
                {item.subtitle && (
                  <p className="text-xs text-white/60 line-clamp-1">{item.subtitle}</p>
                )}
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-[#FFD400] transition-all group-hover:gap-1.5">
                  View <ArrowRight className="h-2.5 w-2.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
