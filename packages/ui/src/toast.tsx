"use client";

import * as React from "react";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

interface ToastContextType {
  toast: (props: Omit<ToastProps, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback((props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...props }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex w-full max-w-sm rounded-lg border p-4 shadow-lg ${
              t.variant === "destructive" ? "border-red-200 bg-red-50" : "bg-white"
            }`}
          >
            <div className="flex-1">
              {t.title && <p className={`font-medium ${t.variant === "destructive" ? "text-red-800" : ""}`}>{t.title}</p>}
              {t.description && <p className={`text-sm ${t.variant === "destructive" ? "text-red-600" : "text-gray-600"}`}>{t.description}</p>}
            </div>
            <button onClick={() => dismiss(t.id)} className="ml-4 text-sm text-gray-400 hover:text-gray-600">
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export const Toast = ({ toast, onDismiss }: { toast: ToastProps; onDismiss: (id: string) => void }) => {
  return (
    <div className={`pointer-events-auto flex w-full max-w-sm rounded-lg border p-4 shadow-lg ${
      toast.variant === "destructive" ? "border-red-200 bg-red-50" : "bg-white"
    }`}>
      <div className="flex-1">
        {toast.title && <p className={`font-medium ${toast.variant === "destructive" ? "text-red-800" : ""}`}>{toast.title}</p>}
        {toast.description && <p className={`text-sm ${toast.variant === "destructive" ? "text-red-600" : "text-gray-600"}`}>{toast.description}</p>}
      </div>
      <button onClick={() => onDismiss(toast.id)} className="ml-4 text-sm text-gray-400 hover:text-gray-600">
        Dismiss
      </button>
    </div>
  );
};

export const Toaster = () => {
  return null;
};
