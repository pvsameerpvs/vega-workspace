"use client";

import { useState } from "react";
import { Input, Label, Textarea } from "@vega/ui";
import { Send, CheckCircle } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export function LeadFormSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-32 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-20 text-center">
          <span className="mb-6 block text-sm text-slate-400">Get in Touch</span>
          <h2 className="section-heading text-4xl md:text-5xl">Request a Quote</h2>
          <p className="mt-4 text-lg text-slate-500">
            Tell us what you need and our team will reply within 24 hours
          </p>
        </div>

        <div>
          {submitted ? (
            <div className="flex flex-col items-center py-20 text-center animate-scale-in">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-vega-yellow/20">
                <CheckCircle className="h-8 w-8 text-vega-yellow" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Thank you!</h3>
              <p className="mt-2 text-base text-slate-500">We will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-slate-600">Name</Label>
                  <Input id="name" placeholder="Full name" required className="rounded-xl border-slate-200 bg-white text-sm focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium text-slate-600">Company</Label>
                  <Input id="company" placeholder="Company name" required className="rounded-xl border-slate-200 bg-white text-sm focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-600">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" required className="rounded-xl border-slate-200 bg-white text-sm focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-slate-600">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+971 5X XXX XXXX" required className="rounded-xl border-slate-200 bg-white text-sm focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-slate-600">Category</Label>
                  <select id="category" className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" required>
                    <option value="">Select</option>
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium text-slate-600">Quantity</Label>
                  <Input id="quantity" placeholder="e.g. 50 units" required className="rounded-xl border-slate-200 bg-white text-sm focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-slate-600">Message</Label>
                <Textarea id="message" placeholder="Any requirements..." rows={3} className="rounded-xl border-slate-200 bg-white text-sm focus:ring-2 focus:ring-vega-blue/20 focus:border-vega-blue transition-all" />
              </div>
              <button type="submit" className="pill-btn-yellow w-full text-sm group">
                <Send className="mr-2 inline h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
