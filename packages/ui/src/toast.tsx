import * as React from "react";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const useToast = () => {
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

  return { toasts, toast, dismiss };
};

export const Toast = ({ toast, onDismiss }: { toast: ToastProps; onDismiss: (id: string) => void }) => {
  return (
    <div className="pointer-events-auto flex w-full max-w-sm rounded-lg border bg-white p-4 shadow-lg">
      <div className="flex-1">
        {toast.title && <p className="font-medium">{toast.title}</p>}
        {toast.description && <p className="text-sm text-gray-600">{toast.description}</p>}
      </div>
      <button onClick={() => onDismiss(toast.id)} className="ml-4 text-sm text-gray-400 hover:text-gray-600">
        Dismiss
      </button>
    </div>
  );
};

export const Toaster = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  );
};
