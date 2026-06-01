"use client";

import { ImgHTMLAttributes } from "react";

interface ProtectedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function ProtectedImage({ className, ...props }: ProtectedImageProps) {
  return (
    <img
      {...props}
      className={className}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
