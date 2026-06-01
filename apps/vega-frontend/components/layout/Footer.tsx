import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, CreditCard, Banknote, FileText, CheckCircle } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Social */}
          <div>
            <div className="mb-4 text-xl font-semibold text-white">VEGA</div>
            <p className="text-base leading-relaxed text-white/40">
              Reliable furniture, barriers, and camp supply solutions for businesses across the UAE since 2009.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.facebook.com/vegauae" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors text-base">Facebook</a>
              <a href="https://www.instagram.com/vegauae" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors text-base">Instagram</a>
              <a href="https://www.linkedin.com/company/vegauae" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors text-base">LinkedIn</a>
              <a href="https://wa.me/971567351095" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors text-base">WhatsApp</a>
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-white/30">Products</div>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products/${cat.slug}`} className="group inline-flex items-center gap-1 text-base text-white/50 hover:text-white transition-colors">
                    {cat.name} <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-white/30">Company</div>
            <ul className="space-y-2">
              {["Home", "About Us", "Careers", "Blog", "Gallery", "Catalog", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="group inline-flex items-center gap-1 text-base text-white/50 hover:text-white transition-colors">
                    {item} <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Payment */}
          <div>
            <div className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-white/30">Contact</div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-base text-white/50">
                <Mail className="h-4 w-4" /> Sales@thevegauae.com
              </li>
              <li className="flex items-center gap-2 text-base text-white/50">
                <Phone className="h-4 w-4" /> +971 56 735 1095
              </li>
              <li className="flex items-center gap-2 text-base text-white/50">
                <Phone className="h-4 w-4" /> +971 56 931 0575
              </li>
              <li className="flex items-center gap-2 text-base text-white/50">
                <MapPin className="h-4 w-4" /> UAE, Dubai
              </li>
            </ul>

            <div className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-white/30">Payment Options</div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-sm text-white/60">
                <Banknote className="h-4 w-4" /> Cash
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-sm text-white/60">
                <CreditCard className="h-4 w-4" /> Bank Transfer
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-sm text-white/60">
                <FileText className="h-4 w-4" /> Cheque
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-sm text-white/60">
                <CheckCircle className="h-4 w-4" /> Payment Link
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <div className="flex flex-wrap gap-3">
            <Link href="/contact-us" className="rounded-full bg-vega-yellow px-5 py-2 text-base font-medium text-gray-900 hover:bg-vega-yellow/90 transition-colors">
              Request a Quote
            </Link>
            <Link href="/catalog" className="rounded-full border border-white/30 px-5 py-2 text-base text-white hover:bg-white hover:text-gray-900 transition-all">
              View our Catalog
            </Link>
          </div>
          <div className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} Vega UAE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
