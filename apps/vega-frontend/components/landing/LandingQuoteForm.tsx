"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { track, getTrackingParams } from "@/lib/tracking";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface LandingQuoteFormProps {
  isAR: boolean;
  category: string;
  path: string;
  productOptions: { name: string; sku: string }[];
  formId: string;
  compact?: boolean;
}

const inputClass =
  "flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-vega-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-vega-blue/10";
const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-vega-blue";

export function LandingQuoteForm({
  isAR,
  category,
  path,
  productOptions,
  formId,
  compact = false,
}: LandingQuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [touched, setTouched] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      if (!name) return;
      const select = formRef.current?.querySelector<HTMLSelectElement>('select[name="product"]');
      if (select) select.value = name;
      setStatus("idle");
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener("landing:select-product", handler);
    return () => window.removeEventListener("landing:select-product", handler);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const tracking = getTrackingParams(window.location.search);
    const landingPage = `${window.location.pathname}${window.location.search}`;

    setStatus("submitting");
    track("lp_form_submit", { formId, category });

    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          companyName: String(formData.get("company") || ""),
          phone: String(formData.get("phone") || ""),
          email: String(formData.get("email") || ""),
          productName: String(formData.get("product") || "") || category,
          category,
          quantity: String(formData.get("quantity") || ""),
          message: String(formData.get("message") || ""),
          location: "Landing Page",
          sourcePage: path,
          landingPage,
          status: "new",
          ...tracking,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
      track("lp_form_conversion", { formId, category });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-7 w-7 text-emerald-500" />
        </div>
        <h3 className="mb-2 text-lg font-bold text-vega-blue">
          {isAR ? "تم استلام استفسارك" : "Enquiry Received"}
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-slate-500">
          {isAR
            ? "شكراً لك. سنعاود التواصل معك بخصوص توفر المنتج وتفاصيل عرض السعر."
            : "Thank you. We'll get back to you with product availability and quotation details."}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} id={formId} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>{isAR ? "الاسم الكامل *" : "Full Name *"}</label>
          <input id={`${formId}-name`} name="name" type="text" required className={inputClass} placeholder={isAR ? "محمد أحمد" : "John Doe"} />
        </div>
        <div>
          <label htmlFor={`${formId}-company`} className={labelClass}>{isAR ? "اسم الشركة" : "Company Name"}</label>
          <input id={`${formId}-company`} name="company" type="text" className={inputClass} placeholder={isAR ? "اسم الشركة" : "Company name"} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-phone`} className={labelClass}>{isAR ? "رقم الهاتف *" : "Phone Number *"}</label>
          <input id={`${formId}-phone`} name="phone" type="tel" required className={inputClass} placeholder="+971 5X XXX XXXX" dir="ltr" />
        </div>
        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>{isAR ? "البريد الإلكتروني *" : "Email *"}</label>
          <input id={`${formId}-email`} name="email" type="email" required className={inputClass} placeholder="you@company.com" dir="ltr" />
        </div>
      </div>

      <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : ""}`}>
        <div>
          <label htmlFor={`${formId}-product`} className={labelClass}>{isAR ? "المنتج / المتطلب" : "Product / Requirement"}</label>
          <select id={`${formId}-product`} name="product" className={inputClass} defaultValue="">
            <option value="">{isAR ? "— اختر منتجاً أو متطلباً عاماً —" : "— Select a product or general requirement —"}</option>
            {productOptions.map((p) => (
              <option key={p.sku} value={p.name}>{p.name}</option>
            ))}
            <option value={category}>{isAR ? "متطلب عام / أخرى" : "General requirement / Other"}</option>
          </select>
        </div>
        <div>
          <label htmlFor={`${formId}-quantity`} className={labelClass}>{isAR ? "الكمية" : "Quantity"}</label>
          <input id={`${formId}-quantity`} name="quantity" type="text" className={inputClass} placeholder={isAR ? "مثال: 100 قطعة" : "e.g. 100 units"} />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={labelClass}>{isAR ? "الرسالة" : "Message"}</label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={compact ? 2 : 3}
          className={`${inputClass} resize-none py-3`}
          placeholder={isAR ? "أخبرنا بمتطلبات مشروعك..." : "Tell us about your project requirement..."}
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-rose-500">
          {isAR ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "Something went wrong. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        onFocus={() => {
          if (!touched) {
            setTouched(true);
            track("lp_form_start", { formId });
          }
        }}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-vega-yellow px-6 py-3.5 text-sm font-bold text-vega-blue shadow-md transition-all hover:shadow-lg hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        )}
        {status === "submitting"
          ? isAR ? "جارٍ الإرسال..." : "Submitting..."
          : isAR ? "طلب عرض سعر" : "Request a Quote"}
      </button>
    </form>
  );
}