"use client";

import { ToastProvider } from "@vega/ui";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
