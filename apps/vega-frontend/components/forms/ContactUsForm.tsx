"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface ContactUsFormProps {
  isAR: boolean;
}

export function ContactUsForm({ isAR }: ContactUsFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          companyName: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          location: "Website Contact Form",
          status: "new",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", company: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-emerald-500" />
        <h3 className="mb-2 text-lg font-bold text-[#1F3A93]">
          {isAR ? "تم الإرسال بنجاح" : "Submitted Successfully"}
        </h3>
        <p className="max-w-md text-sm text-slate-500">
          {isAR
            ? "شكراً لتواصلك معنا. سنتصل بك قريباً."
            : "Thank you for reaching out. We will contact you soon."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
            {isAR ? "الاسم الكامل *" : "Full Name *"}
          </label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
            placeholder={isAR ? "محمد أحمد" : "John Doe"}
            className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
            {isAR ? "الشركة" : "Company"}
          </label>
          <input
            name="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData((s) => ({ ...s, company: e.target.value }))}
            placeholder={isAR ? "اسم الشركة" : "Company name"}
            className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
            {isAR ? "البريد الإلكتروني *" : "Email *"}
          </label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((s) => ({ ...s, email: e.target.value }))}
            placeholder="you@company.com"
            className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
            {isAR ? "الهاتف *" : "Phone *"}
          </label>
          <input
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData((s) => ({ ...s, phone: e.target.value }))}
            placeholder="+971 5X XXX XXXX"
            className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#1F3A93]">
          {isAR ? "الرسالة" : "Message"}
        </label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData((s) => ({ ...s, message: e.target.value }))}
          placeholder={isAR ? "أخبرنا بما تحتاجه..." : "Tell us what you need..."}
          className="flex w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1F3A93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F3A93]/10 transition-all resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-rose-500">
          {isAR ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="pill-btn-yellow w-full text-sm group mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send
          className={`inline h-4 w-4 transition-transform duration-300 ${
            isAR ? "ms-2 group-hover:-translate-x-0.5" : "me-2 group-hover:translate-x-0.5"
          }`}
        />
        {status === "submitting"
          ? isAR ? "جاري الإرسال..." : "Submitting..."
          : isAR ? "إرسال الاستفسار" : "Submit Enquiry"}
      </button>
    </form>
  );
}
