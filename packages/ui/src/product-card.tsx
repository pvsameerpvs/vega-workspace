import * as React from "react";
import { cn } from "./utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  sku: string;
  shortSpec: string;
  onViewDetails?: () => void;
  onEnquireWhatsApp?: () => void;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ image, title, sku, shortSpec, onViewDetails, onEnquireWhatsApp }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1"
        )}
      >
        <div className="aspect-square overflow-hidden bg-slate-50 relative">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vega-blue/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
        <div className="p-5">
          <div className="mb-2.5 flex items-center gap-2">
            <Badge variant="outline" className="text-[11px] font-bold tracking-wide text-vega-blue border-vega-blue/20 bg-vega-blue/5">
              {sku}
            </Badge>
          </div>
          <h3 className="mb-1.5 text-lg font-bold text-vega-blue leading-tight group-hover:text-vega-blue-light transition-colors duration-300">
            {title}
          </h3>
          <p className="mb-5 text-sm text-slate-500 line-clamp-2 leading-relaxed">{shortSpec}</p>
          <div className="flex gap-2.5">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 rounded-full border-slate-200 text-vega-blue hover:border-vega-blue hover:bg-vega-blue hover:text-white transition-all duration-300"
              onClick={onViewDetails}
            >
              View Details
            </Button>
            <Button
              variant="vega-yellow"
              size="sm"
              className="flex-1 rounded-full font-bold bg-vega-yellow text-vega-blue hover:bg-vega-yellow-dark"
              onClick={onEnquireWhatsApp}
            >
              Enquire <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
ProductCard.displayName = "ProductCard";

export { ProductCard };
