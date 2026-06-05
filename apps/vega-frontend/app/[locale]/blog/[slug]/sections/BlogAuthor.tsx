"use client";

import { User, Mail, Linkedin } from "lucide-react";

interface BlogAuthorProps {
  author?: string;
  locale?: string;
}

export function BlogAuthor({ author = "Vega Team", locale = "en" }: BlogAuthorProps) {
  const isAR = locale === "ar";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 mt-12 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 rounded-full bg-[#1F3A93] flex items-center justify-center">
          <User className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#1F3A93] mb-1">
            {isAR ? "كتب بواسطة" : "Written by"} {author}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">
            {isAR
              ? "فريق فيجا ملتزم بتقديم رؤى قيمة ومحتوى عالي الجودة حول منتجاتنا وصناعتنا."
              : "The Vega team is committed to providing valuable insights and high-quality content about our products and industry."}
          </p>
          <div className="flex items-center gap-2">
            <a
              href="mailto:info@vega.ae"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-500 hover:bg-[#1F3A93] hover:text-white transition-all"
            >
              <Mail className="h-3 w-3" /> {isAR ? "بريد" : "Email"}
            </a>
            <a
              href="https://www.linkedin.com/company/vega-uae"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-500 hover:bg-[#1F3A93] hover:text-white transition-all"
            >
              <Linkedin className="h-3 w-3" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
