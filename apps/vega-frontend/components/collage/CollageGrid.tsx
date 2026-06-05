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
      <div className="relative h-full rounded-2xl overflow-hidden shadow-elevated">
        <CollageImage src={images[0]} alt={title} />
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="relative h-full rounded-2xl overflow-hidden shadow-elevated">
          <CollageImage src={images[0]} alt={title} />
        </div>
        <div className="relative h-full rounded-2xl overflow-hidden shadow-elevated">
          <CollageImage src={images[1]} alt={title} />
        </div>
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid grid-cols-12 gap-2 h-full">
        <div className="col-span-7 relative h-full rounded-2xl overflow-hidden shadow-elevated">
          <CollageImage src={images[0]} alt={title} />
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-subtle">
            <span className="text-xs font-bold text-vega-blue uppercase tracking-wider">
              {isAR ? "مجموعة" : "Collection"}
            </span>
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-2 h-full">
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-elevated min-h-0">
            <CollageImage src={images[1]} alt={title} />
          </div>
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-elevated min-h-0">
            <CollageImage src={images[2]} alt={title} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-2 h-full">
      <div className="col-span-7 relative h-full rounded-2xl overflow-hidden shadow-elevated">
        <CollageImage src={images[0]} alt={title} />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-subtle">
          <span className="text-xs font-bold text-vega-blue uppercase tracking-wider">
            {isAR ? "مجموعة" : "Collection"}
          </span>
        </div>
      </div>
      <div className="col-span-5 flex flex-col gap-2 h-full">
        {images.slice(1, 3).map((src, i) => (
          <div key={i} className="relative flex-1 rounded-2xl overflow-hidden shadow-card min-h-0">
            <CollageImage src={src} alt={title} />
          </div>
        ))}
      </div>
    </div>
  );
}
