"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface ContactUsFormProps {
  isAR: boolean;
  location?: string;
}

export function ContactUsForm({ isAR, location = "Website Contact Form" }: ContactUsFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submittedName, setSubmittedName] = useState("");
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
          location: location || "Website Contact Form",
          status: "new",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setSubmittedName(formData.name);
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
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="mb-3 text-xl font-bold text-[#1F3A93]">
          {isAR ? "شكراً لك" : "Thank You"}
          {!isAR && submittedName && <span className="text-[#FFD400]">, {submittedName}</span>}
          {isAR && submittedName && <span className="text-[#FFD400]">، {submittedName}</span>}
        </h3>
        <div className="mx-auto max-w-md space-y-2">
          <p className="text-sm leading-relaxed text-slate-600">
            {isAR
              ? "نقدر لك تواصلك معنا. تم إرسال رسالتك بنجاح، وسيتواصل معك فريقنا قريباً."
              : "We appreciate you taking the time to contact us. Your message has been sent successfully, and our executives will contact you shortly."}
          </p>
        </div>
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
