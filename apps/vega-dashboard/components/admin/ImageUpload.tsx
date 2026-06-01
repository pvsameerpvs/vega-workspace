"use client";

import { useState, useRef } from "react";
import { Button } from "@vega/ui";
import { useUpload } from "@/hooks/use-upload";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({ value, onChange, folder = "uploads", label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload } = useUpload();

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const url = await upload(file, folder);
      setPreview(url);
      onChange(url);
    } catch (e) {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clear = () => {
    setPreview("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 transition-colors hover:border-vega-blue hover:bg-slate-100"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="h-32 w-auto rounded-lg object-cover" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); clear(); }}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <Upload className="h-8 w-8" />
            <span className="text-xs font-medium">{uploading ? "Uploading..." : "Click or drag image here"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
