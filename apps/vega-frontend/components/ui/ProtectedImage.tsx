"use client";

interface ProtectedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProtectedImage({ src, alt, className }: ProtectedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
