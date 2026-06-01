import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 text-lg font-semibold text-white">VEGA</div>
            <p className="text-sm leading-relaxed text-white/40">
              Reliable furniture, barriers, and camp supply solutions for businesses across the UAE since 2009.
            </p>
          </div>
          <div>
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-white/30">Products</div>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products/${cat.slug}`} className="group inline-flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors">
                    {cat.name} <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-white/30">Company</div>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Gallery", "Catalog", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="group inline-flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors">
                    {item} <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-white/30">Contact</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="h-3.5 w-3.5" /> Sales@thevegauae.com
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="h-3.5 w-3.5" /> +971 56 735 1095
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="h-3.5 w-3.5" /> +971 56 931 0575
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-3.5 w-3.5" /> UAE, Dubai
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/30">
          &copy; {new Date().getFullYear()} Vega UAE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
