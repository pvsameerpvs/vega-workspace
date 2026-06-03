"use client";

import { useState } from "react";

interface AdminLanguageToggleProps {
  value: "en" | "ar";
  onChange: (lang: "en" | "ar") => void;
}

export function AdminLanguageToggle({ value, onChange }: AdminLanguageToggleProps) {
  const isAR = value === "ar";

  return (
    <div className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 p-1 h-8">
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`relative z-10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
          !isAR ? "bg-white text-[#1F3A93] shadow-sm" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => onChange("ar")}
        className={`relative z-10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
          isAR ? "bg-white text-[#1F3A93] shadow-sm" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        العربية
      </button>
    </div>
  );
}
