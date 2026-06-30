"use client";

import { useState } from "react";
import { X, Download } from "lucide-react";
import { submitLead } from "@/lib/api";

interface CatalogDownloadDialogProps {
  catalogName: string;
  catalogCategory: string;
  pdfUrl: string;
  locale?: string;
  open: boolean;
  onClose: () => void;
}

export function CatalogDownloadDialog({
  catalogName,
  catalogCategory,
  pdfUrl,
  locale = "en",
  open,
  onClose,
}: CatalogDownloadDialogProps) {
  const isAR = locale === "ar";
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", companyName: "" });

  if (!open) return null;

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        companyName: form.companyName.trim() || null,
        email: `catalog-${Date.now()}@vega.com`,
        productName: catalogName,
        category: catalogCategory,
        sourcePage: "catalog_download",
        message: `Downloaded catalog: ${catalogName}`,
      });

      setSuccess(true);

      const a = document.createElement("a");
      a.href = pdfUrl;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.click();
      a.remove();

      setTimeout(() => {
        onClose();
        setSuccess(false);
        setForm({ name: "", phone: "", companyName: "" });
      }, 2000);
    } catch (e: any) {
      setError(
        e.message || (isAR ? "فشل الإرسال. حاول مرة أخرى." : "Failed to submit. Please try again.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full max-w-md rounded-2xl bg-white shadow-2xl ${isAR ? "text-right" : "text-left"}`}
        dir={isAR ? "rtl" : "ltr"}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-bold text-vega-blue">
            {isAR ? "تحميل الكتالوج" : "Download Catalog"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          {success ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-lg font-bold text-slate-900">
                {isAR ? "جاري التحميل!" : "Downloading!"}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {isAR ? "سيبدأ التنزيل قريبًا." : "Your download will start shortly."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-slate-500">
                {isAR
                  ? "يرجى إدخال معلوماتك لتنزيل الكتالوج."
                  : "Please enter your details to download the catalog."}
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {isAR ? "الاسم *" : "Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-vega-blue focus:outline-none"
                  placeholder={isAR ? "اسمك" : "Your name"}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {isAR ? "رقم الهاتف *" : "Phone *"}
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-vega-blue focus:outline-none"
                  placeholder={isAR ? "رقم هاتفك" : "Your phone number"}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {isAR ? "اسم الشركة" : "Company Name"}
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-vega-blue focus:outline-none"
                  placeholder={isAR ? "اسم الشركة" : "Your company name"}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  {isAR ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-vega-yellow px-4 py-2.5 text-sm font-bold text-vega-blue transition-all hover:bg-vega-yellow-dark disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  {submitting
                    ? isAR ? "جارٍ..." : "Please wait..."
                    : isAR ? "تحميل" : "Download"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
