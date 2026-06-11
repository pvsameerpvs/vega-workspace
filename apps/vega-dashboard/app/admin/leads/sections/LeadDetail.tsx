import { Dialog, DialogContent, DialogTitle } from "@vega/ui";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Mail, Phone, MapPin, Link, Calendar } from "lucide-react";

interface LeadDetailProps {
  lead: any;
  onClose: () => void;
}

export function LeadDetail({ lead, onClose }: LeadDetailProps) {
  if (!lead) return null;

  return (
    <Dialog open={!!lead} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogTitle className="text-lg font-bold text-slate-900">Lead Details</DialogTitle>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-slate-900">{lead.name}</p>
              <p className="text-sm text-slate-500">{lead.companyName}</p>
            </div>
            <StatusBadge status={lead.status} />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="h-4 w-4 text-slate-400" />
              {lead.email}
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="h-4 w-4 text-slate-400" />
              {lead.phone}
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4 text-slate-400" />
              {lead.location}
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="h-4 w-4 text-slate-400" />
              {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "N/A"}
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-500 mb-1">Product</p>
            <p className="text-sm font-medium text-slate-900">{lead.productName}</p>
            <p className="text-xs text-slate-400">SKU: {lead.sku || "N/A"} &middot; Quantity: {lead.quantity}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 mb-1">Message</p>
            <p className="text-sm text-slate-700 leading-relaxed">{lead.message}</p>
          </div>

          {lead.sourcePage && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link className="h-3 w-3" />
              Source: {lead.sourcePage}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
