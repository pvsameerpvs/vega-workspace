import { Badge } from "@vega/ui";

const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" | "vega"; label: string }> = {
  published: { variant: "vega", label: "Published" },
  draft: { variant: "secondary", label: "Draft" },
  archived: { variant: "outline", label: "Archived" },
  new: { variant: "default", label: "New" },
  contacted: { variant: "vega", label: "Contacted" },
  reviewing: { variant: "secondary", label: "Reviewing" },
  shortlisted: { variant: "vega", label: "Shortlisted" },
  interviewed: { variant: "vega", label: "Interviewed" },
  accepted: { variant: "vega", label: "Accepted" },
  rejected: { variant: "destructive", label: "Rejected" },
  quotation_sent: { variant: "secondary", label: "Quotation Sent" },
  follow_up_required: { variant: "outline", label: "Follow Up" },
  closed: { variant: "vega", label: "Closed" },
  lost: { variant: "destructive", label: "Lost" },
  active: { variant: "vega", label: "Active" },
  inactive: { variant: "outline", label: "Inactive" },
  "in stock": { variant: "vega", label: "In Stock" },
  "made to order": { variant: "secondary", label: "Made to Order" },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status.toLowerCase()] || { variant: "outline", label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
