import { Eye, EyeOff } from "lucide-react";

interface SectionToggleProps {
  name: string;
  desc: string;
  active: boolean;
  onToggle: () => void;
}

export function SectionToggle({ name, desc, active, onToggle }: SectionToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
        active ? "border-vega-blue/30 bg-vega-blue/5" : "border-slate-200 bg-slate-50/50 opacity-60"
      }`}
    >
      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
        active ? "bg-vega-blue text-white" : "bg-slate-200 text-slate-400"
      }`}>
        {active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${active ? "text-slate-900" : "text-slate-500"}`}>{name}</p>
        <p className="text-xs text-slate-400 truncate">{desc}</p>
      </div>
    </button>
  );
}
