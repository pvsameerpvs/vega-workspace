export function getPublicUrl(bucketUrl: string, path: string): string {
  return `${bucketUrl}/${path}`;
}

export function generateFilePath(
  folder: string,
  fileName: string
): string {
  const timestamp = Date.now();
  const sanitized = fileName.replace(/[^a-zA-Z0-9.\-]/g, "_");
  return `${folder}/${timestamp}-${sanitized}`;
}

export function isImageFile(fileName: string): boolean {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  return imageExtensions.some((ext) =>
    fileName.toLowerCase().endsWith(ext)
  );
}

export function isPdfFile(fileName: string): boolean {
  return fileName.toLowerCase().endsWith(".pdf");
}
