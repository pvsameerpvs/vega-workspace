import { Button } from "@vega/ui";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function PageHeader({ title, subtitle, actionLabel, onAction }: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actionLabel && onAction && (
        <Button variant="vega" onClick={onAction} className="gap-2">
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
