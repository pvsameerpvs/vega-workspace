"use client";

import { useState } from "react";
import { FormDialog } from "@/components/admin/FormDialog";

interface LeadCreateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
}

export function LeadCreateDialog({ open, onClose, onSubmit, loading }: LeadCreateDialogProps) {
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    productName: "",
    sku: "",
    quantity: "",
    location: "",
    message: "",
    status: "new",
    sourcePage: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await onSubmit(form);
    setForm({
      name: "",
      companyName: "",
      email: "",
      phone: "",
      productName: "",
      sku: "",
      quantity: "",
      location: "",
      message: "",
      status: "new",
      sourcePage: "",
    });
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="Add Lead"
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Add Lead"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Name *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Company</label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Product Name</label>
          <input
            type="text"
            value={form.productName}
            onChange={(e) => update("productName", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">SKU</label>
          <input
            type="text"
            value={form.sku}
            onChange={(e) => update("sku", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Quantity</label>
          <input
            type="text"
            value={form.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-700">Message</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none resize-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Status</label>
          <select
            value={form.status}
            onChange={(e) => update("status", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quotation_sent">Quotation Sent</option>
            <option value="follow_up_required">Follow Up Required</option>
            <option value="closed">Closed</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Source Page</label>
          <input
            type="text"
            value={form.sourcePage}
            onChange={(e) => update("sourcePage", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-vega-blue focus:outline-none"
          />
        </div>
      </div>
    </FormDialog>
  );
}
