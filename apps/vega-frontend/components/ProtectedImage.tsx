"use client";

import { useState } from "react";
import Image from "next/image";

interface ProtectedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}

export function ProtectedImage({ className, alt, src, priority, quality = 90 }: ProtectedImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`${className} flex items-center justify-center bg-slate-50 text-slate-300`}>
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      className={className}
      draggable={false}
      priority={priority}
      quality={quality}
      loading={priority ? undefined : "lazy"}
      onError={() => setError(true)}
      unoptimized={src.startsWith("data:")}
    />
  );
}
