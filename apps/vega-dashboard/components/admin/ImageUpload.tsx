"use client";

import { useState, useRef } from "react";
import { api } from "@/lib/api";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
}

export function ImageUpload({ value, onChange, label, folder = "showcases" }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    setLoading(true);
    try {
      const res = await api.uploadFile(file, folder);
      onChange(res.publicUrl);
    } catch (e) {
      console.error("Upload failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {label && <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>}
      <div className="relative h-24 w-full rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
        {value ? (
          <div className="relative h-full w-full">
            <img
              src={value}
              alt="Preview"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              className="h-full w-full object-cover select-none pointer-events-none"
            />
            <button
              onClick={() => onChange("")}
              className="absolute top-1 right-1 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] text-white hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border border-slate-300 border-t-vega-blue" />
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Upload image</span>
              </>
            )}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
