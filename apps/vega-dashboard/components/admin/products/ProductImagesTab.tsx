"use client";

import { ImageUpload } from "@/components/admin/ImageUpload";
import { MultiImageUpload } from "@/components/admin/MultiImageUpload";

interface ProductImagesTabProps {
  form: any;
  update: (key: string, value: any) => void;
}

export function ProductImagesTab({ form, update }: ProductImagesTabProps) {
  return (
    <div className="space-y-4">
      <ImageUpload value={form.mainImage || form.image || ""} onChange={(url) => update("mainImage", url)} folder="products" label="Main Image" />
      <MultiImageUpload
        value={Array.isArray(form.gallery) ? form.gallery : form.gallery ? [form.gallery] : []}
        onChange={(urls) => update("gallery", urls)}
        folder="products"
        label="Gallery Images"
      />
    </div>
  );
}
