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
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-16 text-center">
          <div className="label-line mb-4 justify-center">Get in Touch</div>
          <h2 className="section-heading">Request a Quote</h2>
          <p className="mt-4 text-gray-500">
            Tell us what you need and our team will reply within 24 hours
          </p>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-gray-50/50 p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center py-12 text-center">
              <CheckCircle className="mb-4 h-10 w-10 text-green-500" />
              <h3 className="text-lg font-medium text-gray-900">Thank you!</h3>
              <p className="mt-2 text-sm text-gray-500">We will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-medium text-gray-400 uppercase">Name</Label>
                  <Input id="name" placeholder="Full name" required className="rounded-xl border-gray-200 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-xs font-medium text-gray-400 uppercase">Company</Label>
                  <Input id="company" placeholder="Company name" required className="rounded-xl border-gray-200 bg-white" />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-medium text-gray-400 uppercase">Email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" required className="rounded-xl border-gray-200 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-medium text-gray-400 uppercase">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+971 5X XXX XXXX" required className="rounded-xl border-gray-200 bg-white" />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-xs font-medium text-gray-400 uppercase">Category</Label>
                  <select id="category" className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" required>
                    <option value="">Select</option>
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-xs font-medium text-gray-400 uppercase">Quantity</Label>
                  <Input id="quantity" placeholder="e.g. 50 units" required className="rounded-xl border-gray-200 bg-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs font-medium text-gray-400 uppercase">Message</Label>
                <Textarea id="message" placeholder="Any requirements..." rows={3} className="rounded-xl border-gray-200 bg-white" />
              </div>
              <button type="submit" className="pill-btn-primary w-full">
                <Send className="mr-2 inline h-4 w-4" />
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
