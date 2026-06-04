"use client";

import Image from "next/image";

interface CollageImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CollageImage({ src, alt, className = "" }: CollageImageProps) {
  return (
    <div
      className={`group relative h-full w-full overflow-hidden bg-slate-100 ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none select-none"
        draggable={false}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-vega-blue/0 transition-colors duration-500 group-hover:bg-vega-blue/10" />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
    </div>
  );
}
