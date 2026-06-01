"use client";

import { useCallback } from "react";
import { api } from "@/lib/api";

export function useUpload() {
  const upload = useCallback(async (file: File, folder = "uploads") => {
    const { uploadUrl, publicUrl } = await api.getPresignedUrl(file.name, folder);
    const res = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type || "application/octet-stream" },
    });
    if (!res.ok) throw new Error("Upload failed");
    return publicUrl;
  }, []);

  return { upload };
}
