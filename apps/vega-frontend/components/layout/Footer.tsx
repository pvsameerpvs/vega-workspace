import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, CreditCard, Banknote, FileText, CheckCircle, Star } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-gradient-dark text-white/60 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Social */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">VEGA</span>
              <Star className="h-5 w-5 fill-vega-yellow text-vega-yellow" />
            </div>
            <p className="text-sm leading-relaxed text-white/40 max-w-xs">
              Reliable furniture, barriers, and camp supply solutions for businesses across the UAE since 2009.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { name: "Facebook", href: "https://www.facebook.com/vegauae" },
                { name: "Instagram", href: "https://www.instagram.com/vegauae" },
                { name: "LinkedIn", href: "https://www.linkedin.com/company/vegauae" },
                { name: "WhatsApp", href: "https://wa.me/971567351095" },
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="text-sm text-white/40 hover:text-vega-yellow transition-colors duration-300">
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/25">Products</div>
            <ul className="space-y-2.5">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products/${cat.slug}`} className="group inline-flex items-center gap-1 text-sm text-white/50 hover:text-vega-yellow transition-colors duration-300">
                    {cat.name} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/25">Company</div>
            <ul className="space-y-2.5">
              {["Home", "About Us", "Careers", "Blog", "Gallery", "Catalog", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="group inline-flex items-center gap-1 text-sm text-white/50 hover:text-vega-yellow transition-colors duration-300">
                    {item} <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Payment */}
          <div>
            <div className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/25">Contact</div>
            <ul className="space-y-2.5 mb-8">
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="h-4 w-4 text-vega-yellow" /> Sales@thevegauae.com
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="h-4 w-4 text-vega-yellow" /> +971 56 735 1095
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="h-4 w-4 text-vega-yellow" /> +971 56 931 0575
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-4 w-4 text-vega-yellow" /> Dubai, UAE
              </li>
            </ul>

            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/25">Payment Options</div>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: Banknote, label: "Cash" },
                { icon: CreditCard, label: "Bank Transfer" },
                { icon: FileText, label: "Cheque" },
                { icon: CheckCircle, label: "Payment Link" },
              ].map((p) => (
                <span key={p.label} className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs text-white/50">
                  <p.icon className="h-3.5 w-3.5 text-vega-yellow" /> {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <div className="flex flex-wrap gap-3">
            <Link href="/contact-us" className="rounded-full bg-vega-yellow px-6 py-2.5 text-sm font-bold text-vega-blue hover:bg-vega-yellow-dark transition-all duration-300 hover:-translate-y-0.5 shadow-yellow font-heading">
              Request a Quote
            </Link>
            <Link href="/catalog" className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 font-heading">
              View our Catalog
            </Link>
          </div>
          <div className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Vega UAE. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
