"use client";

import { CheckCircle } from "lucide-react";

interface SuccessStepProps {
  isAR: boolean;
  onClose: () => void;
}

export function SuccessStep({ isAR, onClose }: SuccessStepProps) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD400]/10">
        <CheckCircle className="h-8 w-8 text-[#FFD400]" />
      </div>
      <h3 className="mb-2 text-xl font-bold text-[#1F3A93]">
        {isAR ? "تم إرسال طلبك بنجاح!" : "Application Submitted!"}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500">
        {isAR
          ? "شكراً لاهتمامك. سيتواصل معك فريق الموارد البشرية قريباً."
          : "Thank you for your interest. Our HR team will contact you soon."}
      </p>
      <button
        onClick={onClose}
        className="inline-flex items-center gap-2 rounded-xl bg-[#FFD400] px-6 py-2.5 text-sm font-bold text-[#1F3A93] transition-all hover:bg-white hover:shadow-lg"
      >
        {isAR ? "العودة للوظائف" : "Back to Careers"}
      </button>
    </div>
  );
}
