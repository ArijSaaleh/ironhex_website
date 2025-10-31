import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  progress?: number;
  dismissible?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
  updateToast: (id: string, updates: Partial<Toast>) => void;
  success: (message: string, description?: string, action?: Toast['action']) => string;
  error: (message: string, description?: string, action?: Toast['action']) => string;
  warning: (message: string, description?: string, action?: Toast['action']) => string;
  info: (message: string, description?: string, action?: Toast['action']) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      dismissible: true,
      duration: 5000,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss if duration is set
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, ...updates } : toast))
    );
  }, []);

  const success = useCallback(
    (message: string, description?: string, action?: Toast['action']) => {
      return showToast({ type: 'success', message, description, action });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, description?: string, action?: Toast['action']) => {
      return showToast({ type: 'error', message, description, action, duration: 7000 });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, description?: string, action?: Toast['action']) => {
      return showToast({ type: 'warning', message, description, action });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, description?: string, action?: Toast['action']) => {
      return showToast({ type: 'info', message, description, action });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        updateToast,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
