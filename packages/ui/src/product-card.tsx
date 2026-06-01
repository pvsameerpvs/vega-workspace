import * as React from "react";
import { cn } from "./utils";
import { Badge } from "./badge";
import { Button } from "./button";

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
          "group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
        )}
      >
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {sku}
            </Badge>
          </div>
          <h3 className="mb-1 text-lg font-semibold text-vega-blue">{title}</h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">{shortSpec}</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={onViewDetails}
            >
              View Details
            </Button>
            <Button
              variant="vega-yellow"
              size="sm"
              className="flex-1"
              onClick={onEnquireWhatsApp}
            >
              Enquire
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
ProductCard.displayName = "ProductCard";

export { ProductCard };
