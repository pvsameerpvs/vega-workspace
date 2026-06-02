import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
interface FooterProps {
  categories?: { id: string; name: string; slug: string }[];
}

export function Footer({ categories = [] }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white/50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/images/logo/logo.jpeg"
              alt="Vega Logo"
              className="h-16 w-auto rounded-md object-contain mb-4"
            />
            <p className="text-sm leading-relaxed text-white/40">
              Reliable furniture, barriers, and camp supply solutions for businesses across the UAE since 2009.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products/${cat.slug}`} className="text-sm hover:text-[#FFD400] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Gallery", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm hover:text-[#FFD400] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-[#FFD400]" />
                Sales@thevegauae.com
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-[#FFD400]" />
                +971 56 735 1095
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-[#FFD400]" />
                Dubai, UAE
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-white/30">
            &copy; {year} Vega UAE. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/contact-us" className="rounded-full bg-[#FFD400] px-5 py-2 text-xs font-bold text-[#1F3A93] hover:bg-white transition-all">
              Request a Quote
            </Link>
            <Link href="/catalog" className="rounded-full border border-white/20 px-5 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all">
              View Catalog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
