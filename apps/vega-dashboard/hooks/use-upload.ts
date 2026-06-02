"use client";

import { useCallback } from "react";
import { api } from "@/lib/api";

export function useUpload() {
  const upload = useCallback(async (file: File, folder = "uploads") => {
    const result = await api.uploadFile(file, folder);
    if (!result.publicUrl) {
      throw new Error("Upload succeeded but no public URL was returned");
    }
    return result.publicUrl;
  }, []);

  return { upload };
}
