import Link from "next/link";
import { Mail, Phone, MapPin, CreditCard, Banknote, FileText, CheckCircle, Star, Truck, RefreshCw, Shield, Headphones } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white/60">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Subscribe to our Newsletter</h3>
            <p className="text-xs text-white/40 mt-1">Be the first to know about new arrivals, deals & promotions.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input type="email" placeholder="Enter your email" className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#FFD400] w-full md:w-64" />
            <button className="rounded-full bg-[#FFD400] px-5 py-2 text-sm font-bold text-[#1F3A93] hover:bg-white transition-all">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-white">VEGA</span>
              <Star className="h-4 w-4 fill-[#FFD400] text-[#FFD400]" />
            </div>
            <p className="text-xs leading-relaxed text-white/40 mb-4">Reliable furniture, barriers, and camp supply solutions for businesses across the UAE since 2009.</p>
            <div className="flex gap-2 flex-wrap">
              {["Facebook", "Instagram", "LinkedIn", "WhatsApp"].map((s) => (
                <a key={s} href={`https://www.${s.toLowerCase()}.com/vegauae`} target="_blank" rel="noreferrer" className="text-xs text-white/40 hover:text-[#FFD400] transition-colors">{s}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-white/25">Products</div>
            <ul className="space-y-2">
              {PRODUCT_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}><Link href={`/products/${cat.slug}`} className="text-xs text-white/50 hover:text-[#FFD400] transition-colors">{cat.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-white/25">Company</div>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blog", "Gallery", "Catalog", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}><Link href={`/${item.toLowerCase().replace(/ /g, "-")}`} className="text-xs text-white/50 hover:text-[#FFD400] transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-white/25">Services</div>
            <ul className="space-y-2">
              {["Bulk Orders", "Custom Branding", "Installation", "Delivery", "Rental", "Returns"].map((item) => (
                <li key={item}><span className="text-xs text-white/50">{item}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-white/25">Contact</div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-xs text-white/50"><Mail className="h-3 w-3 text-[#FFD400]" /> Sales@thevegauae.com</li>
              <li className="flex items-center gap-2 text-xs text-white/50"><Phone className="h-3 w-3 text-[#FFD400]" /> +971 56 735 1095</li>
              <li className="flex items-center gap-2 text-xs text-white/50"><MapPin className="h-3 w-3 text-[#FFD400]" /> Dubai, UAE</li>
            </ul>
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-white/25">Payments</div>
            <div className="flex flex-wrap gap-2">
              {[{ icon: Banknote, label: "Cash" }, { icon: CreditCard, label: "Card" }, { icon: FileText, label: "Cheque" }, { icon: CheckCircle, label: "Link" }].map((p) => (
                <span key={p.label} className="inline-flex items-center gap-1 rounded bg-white/5 border border-white/10 px-2 py-1 text-[10px] text-white/50"><p.icon className="h-3 w-3 text-[#FFD400]" /> {p.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8">
          {[{ icon: Truck, label: "Free Delivery", desc: "Across UAE" }, { icon: RefreshCw, label: "Easy Returns", desc: "15 days policy" }, { icon: Shield, label: "Secure Payment", desc: "100% secure" }, { icon: Headphones, label: "Customer Support", desc: "9 AM - 6 PM" }].map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <b.icon className="h-5 w-5 text-[#FFD400]" />
              <div>
                <div className="text-xs font-bold text-white">{b.label}</div>
                <div className="text-[10px] text-white/40">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="text-[10px] text-white/25">&copy; {new Date().getFullYear()} Vega UAE. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/contact-us" className="rounded-full bg-[#FFD400] px-5 py-2 text-xs font-bold text-[#1F3A93] hover:bg-white transition-all">Request a Quote</Link>
            <Link href="/catalog" className="rounded-full border border-white/20 px-5 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all">View Catalog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
