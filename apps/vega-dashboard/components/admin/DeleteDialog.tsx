"use client";

import { useState } from "react";
import { Button } from "@vega/ui";
import { Dialog, DialogContent, DialogTitle } from "@vega/ui";
import { AlertTriangle } from "lucide-react";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function DeleteDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
}: DeleteDialogProps) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          {title}
        </DialogTitle>
        <p className="text-sm text-slate-500">{description}</p>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
