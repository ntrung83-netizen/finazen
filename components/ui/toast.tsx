import * as React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const newToast: ToastItem = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      const duration = toast.duration ?? 4500;
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast viewport */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return React.useContext(ToastContext);
}

export function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const configs = {
    success: {
      border: 'border-[#1E7F4F]',
      bg: 'bg-[#EAF7EE]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#1E7F4F] shrink-0" />,
      titleColor: 'text-[#1E7F4F]',
    },
    warning: {
      border: 'border-[#B7791F]',
      bg: 'bg-[#FEF7EB]',
      icon: <AlertTriangle className="w-5 h-5 text-[#B7791F] shrink-0" />,
      titleColor: 'text-[#B7791F]',
    },
    error: {
      border: 'border-[#C53030]',
      bg: 'bg-[#FDEEEE]',
      icon: <AlertCircle className="w-5 h-5 text-[#C53030] shrink-0" />,
      titleColor: 'text-[#C53030]',
    },
    info: {
      border: 'border-[#2B6CB0]',
      bg: 'bg-[#EBF4FB]',
      icon: <Info className="w-5 h-5 text-[#2B6CB0] shrink-0" />,
      titleColor: 'text-[#2B6CB0]',
    },
  };

  const config = configs[toast.type];

  return (
    <div
      role={toast.type === 'error' ? 'alert' : 'status'}
      className={cn(
        'pointer-events-auto rounded-[8px] border p-3.5 shadow-lg flex items-start gap-3 transition-all duration-180 animate-in slide-in-from-bottom-2',
        config.bg,
        config.border
      )}
    >
      {config.icon}
      <div className="flex-1 space-y-0.5">
        <h5 className={cn('text-xs font-bold leading-tight', config.titleColor)}>{toast.title}</h5>
        {toast.message && <p className="text-xs text-[#1F2933] leading-relaxed">{toast.message}</p>}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Đóng thông báo"
        className="text-[#5B6576] hover:text-[#0B2545] cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
