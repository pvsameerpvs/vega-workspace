"use client";

import { useState, useEffect } from "react";

export function FullPageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-white via-slate-50 to-white">
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-[#FFD400]/20" />
              <img
                src="/images/logo/logo.jpeg"
                alt="Vega"
                className="relative h-20 w-auto animate-[gentle-bounce_2s_ease-in-out_infinite] drop-shadow-lg"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="mt-8 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 animate-[dot-bounce_1.4s_ease-in-out_infinite] rounded-full bg-[#1F3A93]" />
              <span className="h-2.5 w-2.5 animate-[dot-bounce_1.4s_ease-in-out_0.2s_infinite] rounded-full bg-[#FFD400]" />
              <span className="h-2.5 w-2.5 animate-[dot-bounce_1.4s_ease-in-out_0.4s_infinite] rounded-full bg-[#1F3A93]" />
            </div>
          </div>
        </div>
      )}
      <div
        className={`transition-all duration-700 ${loading ? "invisible opacity-0" : "visible opacity-100"}`}
      >
        {children}
      </div>
    </>
  );
}
