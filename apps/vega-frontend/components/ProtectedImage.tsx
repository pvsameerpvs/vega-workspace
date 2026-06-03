"use client";

import { ImgHTMLAttributes } from "react";

interface ProtectedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ProtectedImage({ className, alt, ...props }: ProtectedImageProps) {
  return (
    <img
      {...props}
      alt={alt}
      className={className}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
