"use client";

import { useState } from "react";
import { Button } from "@vega/ui";
import { Dialog, DialogContent, DialogTitle } from "@vega/ui";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void | Promise<void>;
  submitLabel?: string;
  loading?: boolean;
}

export function FormDialog({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Save",
  loading = false,
}: FormDialogProps) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit();
    } catch (err) {
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-lg font-bold text-slate-900">{title}</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          {children}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting || loading}>
              Cancel
            </Button>
            <Button type="submit" variant="vega" disabled={submitting || loading}>
              {submitting || loading ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
