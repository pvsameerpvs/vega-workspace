"use client";

import { useState } from "react";
import { X, ChevronLeft } from "lucide-react";
import { submitApplication } from "@/lib/api";
import { JobDetailsStep } from "./JobDetailsStep";
import { ApplyFormStep } from "./ApplyFormStep";
import { SuccessStep } from "./SuccessStep";

interface CareerItem {
  slug: string;
  id?: number;
  title: string;
  titleAr?: string;
  department: string;
  location: string;
  type: string;
  description: string;
  descriptionAr?: string;
  requirements?: string;
  requirementsAr?: string;
  experience?: string;
  salaryRange?: string;
}

interface ApplyDialogProps {
  job: CareerItem;
  locale?: string;
  open: boolean;
  onClose: () => void;
}

export function ApplyDialog({ job, locale = "en", open, onClose }: ApplyDialogProps) {
  const isAR = locale === "ar";
  const [step, setStep] = useState<"details" | "form" | "success">("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (data: {
    fullName: string;
    email: string;
    phone: string;
    experience: string;
    message: string;
    cvUrl: string;
  }) => {
    setIsSubmitting(true);
    setError("");
    try {
      await submitApplication({
        careerId: job.id || 0,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        position: job.title,
        experience: data.experience,
        message: data.message,
        cvUrl: data.cvUrl,
      });
      setStep("success");
    } catch (e: any) {
      setError(e.message || (isAR ? "فشل الإرسال" : "Failed to submit. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl ${isAR ? "text-right" : "text-left"}`} dir={isAR ? "rtl" : "ltr"}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/80 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            {step !== "details" && (
              <button onClick={() => setStep("details")} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                <ChevronLeft className={`h-5 w-5 ${isAR ? "rotate-180" : ""}`} />
              </button>
            )}
            <h3 className="text-lg font-bold text-[#1F3A93]">
              {step === "details" && (isAR ? "تفاصيل الوظيفة" : "Job Details")}
              {step === "form" && (isAR ? "تقديم طلب" : "Apply for this Role")}
              {step === "success" && (isAR ? "تم الإرسال!" : "Application Sent!")}
            </h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          {step === "details" && <JobDetailsStep job={job} isAR={isAR} onNext={() => setStep("form")} />}
          {step === "form" && (
            <ApplyFormStep
              jobTitle={job.title}
              jobTitleAr={job.titleAr}
              isAR={isAR}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              error={error}
              setError={setError}
            />
          )}
          {step === "success" && <SuccessStep isAR={isAR} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}
