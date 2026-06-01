import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us | Vega UAE",
  description: "Get in touch with Vega for product enquiries, quotes, and support.",
};

export default function ContactPage() {
  return (
    <main className="pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Reach Us</div>
          <h1 className="section-heading">Contact Us</h1>
          <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto">
            Get in touch with Vega for product enquiries, quotes, and support. Our team is ready to assist you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-blue/10 text-vega-blue">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile & WhatsApp</h3>
              <p className="text-base text-gray-500">+971 56 735 1095</p>
              <p className="text-base text-gray-500">+971 56 931 0575</p>
              <a href="https://wa.me/971567351095" target="_blank" className="mt-3 inline-flex items-center text-base text-vega-blue hover:underline">
                Chat on WhatsApp
              </a>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-blue/10 text-vega-blue">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-base text-gray-500">Sales@thevegauae.com</p>
              <p className="text-base text-gray-500">admin@thevegauae.com</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-blue/10 text-vega-blue">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Office</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                M01-410, Corridor 14, Mezzanine Floor,<br />
                Unique World Business Centre,<br />
                Hamriya A Building, Karama, Dubai, UAE
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-vega-blue/10 text-vega-blue">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Warehouse</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                Warehouse 12, Block 6,<br />
                BMG Logistic Park,<br />
                Sharjah Industrial Area 18, UAE
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-gray-100 bg-gray-50/50 p-8 md:p-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Send Enquiry</h3>
            <p className="text-base text-gray-500 mb-6">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>
            <form className="space-y-5" action="#">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 uppercase">Name</label>
                  <input type="text" placeholder="Full name" required className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 uppercase">Company</label>
                  <input type="text" placeholder="Company name" className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-200" />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 uppercase">Email</label>
                  <input type="email" placeholder="you@company.com" required className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500 uppercase">Phone</label>
                  <input type="tel" placeholder="+971 5X XXX XXXX" required className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-200" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500 uppercase">Message</label>
                <textarea placeholder="Tell us what you need..." rows={4} className="flex w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
              <button type="submit" className="pill-btn-primary w-full">
                <Send className="mr-2 inline h-4 w-4" />
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
