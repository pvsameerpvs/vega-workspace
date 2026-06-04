import { CollageImage } from "./CollageImage";

interface CollageGridProps {
  images: string[];
  title: string;
  isAR?: boolean;
}

export function CollageGrid({ images, title, isAR }: CollageGridProps) {
  const count = images.length;

  if (count === 0) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="relative aspect-[4/3] rounded-2xl bg-slate-100 border border-dashed border-slate-200" />
        ))}
      </div>
    );
  }

  if (count === 1) {
    return (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
        <CollageImage src={images[0]} alt={title} />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated">
          <CollageImage src={images[0]} alt={title} />
        </div>
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated mt-8">
          <CollageImage src={images[1]} alt={title} />
        </div>
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated row-span-2">
          <CollageImage src={images[0]} alt={title} />
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
          <CollageImage src={images[1]} alt={title} />
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elevated">
          <CollageImage src={images[2]} alt={title} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-7 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated">
        <CollageImage src={images[0]} alt={title} />
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-subtle">
          <span className="text-xs font-bold text-vega-blue uppercase tracking-wider">
            {isAR ? "مجموعة" : "Collection"}
          </span>
        </div>
      </div>
      <div className="col-span-5 flex flex-col gap-3">
        {images.slice(1, 4).map((src, i) => (
          <div key={i} className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-card flex-1">
            <CollageImage src={src} alt={title} />
          </div>
        ))}
      </div>
    </div>
  );
}
