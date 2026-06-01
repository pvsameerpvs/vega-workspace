"use client";

import { useState } from "react";
import { ImageUpload } from "./ImageUpload";
import { Plus, X } from "lucide-react";

interface MultiImageUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
  label?: string;
}

export function MultiImageUpload({ value = [], onChange, folder = "uploads", label = "Gallery Images" }: MultiImageUploadProps) {
  const [images, setImages] = useState<string[]>(value);

  const updateImage = (index: number, url: string) => {
    const next = [...images];
    next[index] = url;
    setImages(next);
    onChange(next.filter(Boolean));
  };

  const addImage = () => {
    const next = [...images, ""];
    setImages(next);
  };

  const removeImage = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    setImages(next);
    onChange(next.filter(Boolean));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="space-y-3">
        {images.map((img, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-1">
              <ImageUpload
                value={img}
                onChange={(url) => updateImage(index, url)}
                folder={folder}
                label={`Image ${index + 1}`}
              />
            </div>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="mt-6 rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addImage}
        className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        <Plus className="h-3 w-3" /> Add Image
      </button>
    </div>
  );
}
