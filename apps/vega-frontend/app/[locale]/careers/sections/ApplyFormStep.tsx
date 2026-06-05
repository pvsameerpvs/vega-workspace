"use client";

import { useRef, useState } from "react";
import { X, Upload, FileText, Loader2, Send } from "lucide-react";
import { uploadCv } from "@/lib/api";

interface ApplyFormStepProps {
  jobTitle: string;
  jobTitleAr?: string;
  isAR: boolean;
  onSubmit: (data: {
    fullName: string;
    email: string;
    phone: string;
    experience: string;
    message: string;
    cvUrl: string;
  }) => void;
  isSubmitting: boolean;
  error: string;
  setError: (e: string) => void;
}

export function ApplyFormStep({ jobTitle, jobTitleAr, isAR, onSubmit, isSubmitting, error, setError }: ApplyFormStepProps) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", experience: "", message: "" });
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setError("");
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      setError(isAR ? "حجم الملف يجب أن يكون أقل من 10 ميجابايت" : "File must be under 10MB");
      return;
    }
    if (f.type !== "application/pdf" && !f.name.endsWith(".pdf")) {
      setError(isAR ? "يجب رفع ملف PDF فقط" : "Only PDF files are allowed");
      return;
    }
    setFile(f);
    setFileName(f.name);
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim()) {
      setError(isAR ? "الرجاء ملء جميع الحقول المطلوبة" : "Please fill all required fields");
      return;
    }
    setError("");
    let cvUrl = "";
    if (file) {
      setUploading(true);
      try {
        const uploadRes = await uploadCv(file);
        cvUrl = uploadRes.publicUrl;
      } catch (e: any) {
        setError(e.message || (isAR ? "فشل رفع السيرة الذاتية" : "Failed to upload CV"));
        setUploading(false);
        return;
      }
      setUploading(false);
    }
    onSubmit({ ...form, cvUrl });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl bg-[#FFD400]/10 p-4">
        <p className="text-sm font-semibold text-[#1F3A93]">
          {isAR ? "تقدم لوظيفة:" : "Applying for:"} <span className="font-bold">{isAR && jobTitleAr ? jobTitleAr : jobTitle}</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">{isAR ? "الاسم الكامل *" : "Full Name *"}</label>
          <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-[#1F3A93] focus:bg-white focus:ring-2 focus:ring-[#1F3A93]/10" placeholder={isAR ? "أدخل اسمك" : "Enter your name"} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">{isAR ? "البريد الإلكتروني *" : "Email *"}</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-[#1F3A93] focus:bg-white focus:ring-2 focus:ring-[#1F3A93]/10" placeholder="your@email.com" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">{isAR ? "رقم الهاتف *" : "Phone *"}</label>
          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-[#1F3A93] focus:bg-white focus:ring-2 focus:ring-[#1F3A93]/10" placeholder="+971 50 000 0000" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700">{isAR ? "الخبرة" : "Experience"}</label>
          <input value={form.experience} onChange={(e) => update("experience", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-[#1F3A93] focus:bg-white focus:ring-2 focus:ring-[#1F3A93]/10" placeholder={isAR ? "مثال: 3 سنوات" : "e.g. 3 years"} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold text-slate-700">{isAR ? "رسالة تغطية (اختياري)" : "Cover Message (Optional)"}</label>
        <textarea rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-[#1F3A93] focus:bg-white focus:ring-2 focus:ring-[#1F3A93]/10" placeholder={isAR ? "أخبرنا لماذا أنت المرشح المثالي..." : "Tell us why you are a great fit..."} />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold text-slate-700">{isAR ? "السيرة الذاتية (PDF)" : "Resume (PDF)"}</label>
        <div onClick={() => fileRef.current?.click()} className="group cursor-pointer rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition-all hover:border-[#FFD400] hover:bg-[#FFD400]/5">
          <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleFile} />
          {fileName ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="h-6 w-6 text-[#1F3A93]" />
              <span className="text-sm font-semibold text-slate-700">{fileName}</span>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); setFileName(""); }} className="rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFD400]/10 text-[#FFD400] transition-transform group-hover:scale-110">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-slate-700">{isAR ? "اضغط لرفع السيرة الذاتية" : "Click to upload resume"}</p>
              <p className="text-xs text-slate-400">PDF only, max 10MB</p>
            </div>
          )}
        </div>
      </div>

      {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

      <button onClick={handleSubmit} disabled={isSubmitting || uploading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F3A93] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#152a6e] hover:shadow-lg disabled:opacity-50">
        {isSubmitting || uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {isAR ? "جاري الإرسال..." : "Submitting..."}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {isAR ? "إرسال الطلب" : "Submit Application"}
          </>
        )}
      </button>
    </div>
  );
}
