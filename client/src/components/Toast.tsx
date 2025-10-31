import { useEffect, useState } from 'react';
import { useToast, Toast as ToastType } from '../contexts/ToastContext';

const toastStyles = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-500',
    text: 'text-green-800 dark:text-green-200',
    icon: '✓',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-500',
    text: 'text-red-800 dark:text-red-200',
    icon: '✕',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-500',
    text: 'text-yellow-800 dark:text-yellow-200',
    icon: '⚠',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-500',
    text: 'text-blue-800 dark:text-blue-200',
    icon: 'ℹ',
  },
};

function ToastItem({ toast }: { toast: ToastType }) {
  const { dismissToast } = useToast();
  const [isExiting, setIsExiting] = useState(false);
  const style = toastStyles[toast.type];

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      dismissToast(toast.id);
    }, 300); // Match animation duration
  };

  return (
    <div
      className={`
        ${style.bg} ${style.border} ${style.text}
        border-l-4 rounded-lg shadow-lg p-4 mb-3
        transform transition-all duration-300 ease-out
        ${isExiting 
          ? 'translate-x-full opacity-0' 
          : 'translate-x-0 opacity-100 animate-slide-in-right'
        }
        hover:shadow-xl
      `}
      role="alert"
    >
      <div className="flex items-start">
        {/* Icon */}
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-lg font-bold">
          {style.icon}
        </div>

        {/* Content */}
        <div className="ml-3 flex-1">
          <p className="font-semibold text-sm">{toast.message}</p>
          {toast.description && (
            <p className="mt-1 text-sm opacity-90">{toast.description}</p>
          )}

          {/* Progress bar */}
          {toast.progress !== undefined && (
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-current transition-all duration-300"
                style={{ width: `${toast.progress}%` }}
              />
            </div>
          )}

          {/* Action button */}
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                handleDismiss();
              }}
              className="mt-2 text-sm font-semibold underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Dismiss button */}
        {toast.dismissible && (
          <button
            onClick={handleDismiss}
            className="ml-3 flex-shrink-0 inline-flex text-lg hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded transition-opacity"
            aria-label="Dismiss"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-20 right-4 z-50 max-w-sm w-full pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
}

/**
 * Hook for showing toast with progress for async operations
 */
export function useAsyncToast() {
  const { showToast, updateToast, dismissToast } = useToast();

  const showAsyncToast = async <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ): Promise<T> => {
    const toastId = showToast({
      type: 'info',
      message: messages.loading,
      duration: 0,
      dismissible: false,
      progress: 0,
    });

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 90) {
        updateToast(toastId, { progress });
      }
    }, 200);

    try {
      const result = await promise;
      clearInterval(interval);
      
      updateToast(toastId, {
        type: 'success',
        message: typeof messages.success === 'function' 
          ? messages.success(result) 
          : messages.success,
        progress: 100,
        dismissible: true,
        duration: 5000,
      });

      return result;
    } catch (error) {
      clearInterval(interval);
      
      updateToast(toastId, {
        type: 'error',
        message: typeof messages.error === 'function' 
          ? messages.error(error) 
          : messages.error,
        progress: undefined,
        dismissible: true,
        duration: 7000,
      });

      throw error;
    }
  };

  return { showAsyncToast };
}
