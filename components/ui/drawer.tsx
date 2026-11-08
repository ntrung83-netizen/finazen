import * as React from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'right' | 'bottom';
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  position = 'right',
  title,
  children,
  footer,
  className,
}: DrawerProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isBottom = position === 'bottom';

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0B2545]/60 backdrop-blur-xs transition-opacity duration-180"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={cn(
          'relative z-10 flex flex-col bg-white border-[#E3E7ED] shadow-2xl transition-transform duration-200 ease-out',
          isBottom
            ? 'mt-auto w-full max-h-[85vh] rounded-t-[16px] border-t p-5 animate-in slide-in-from-bottom'
            : 'ml-auto h-full w-full max-w-md border-l p-6 animate-in slide-in-from-right',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E3E7ED]">
          {title ? (
            <h2 className="text-base font-bold text-[#0B2545]">{title}</h2>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6576] hover:bg-[#EEF1F5] hover:text-[#0B2545] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 text-sm text-[#1F2933] space-y-4">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="pt-3 border-t border-[#E3E7ED] flex items-center justify-end gap-2.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
