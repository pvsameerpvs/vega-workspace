"use client";

import { useState, useRef, useEffect } from "react";
import { useToast } from "@vega/ui";
import { useUpload } from "@/hooks/use-upload";
import { Upload, X, FileText } from "lucide-react";

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  accept?: string;
}

export function FileUpload({ value, onChange, folder = "uploads", label = "File", accept = "application/pdf" }: FileUploadProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload } = useUpload();

  useEffect(() => {
    if (value) {
      try {
        const url = new URL(value);
        const name = url.pathname.split("/").pop();
        setFileName(name || "File uploaded");
      } catch {
        setFileName("File uploaded");
      }
    } else {
      setFileName("");
    }
  }, [value]);

  const handleFile = async (file: File) => {
    setUploading(true);
    setFileName(file.name);
    try {
      const url = await upload(file, folder);
      onChange(url);
    } catch (e) {
      toast({ title: "Upload failed", description: "Please try again.", variant: "destructive" });
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
    setFileName("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const hasFile = !!value;

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
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        {hasFile ? (
          <div className="relative flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm">
            <FileText className="h-8 w-8 text-red-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-slate-900">{fileName || "File uploaded"}</p>
              <p className="text-xs text-slate-400 truncate max-w-[200px]">{value}</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); clear(); }}
              className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <Upload className="h-8 w-8" />
            <span className="text-xs font-medium">{uploading ? "Uploading..." : "Click or drag file here"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
