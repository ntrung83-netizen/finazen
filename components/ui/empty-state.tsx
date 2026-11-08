import * as React from 'react';
import { cn } from '../../lib/utils';
import { Inbox } from 'lucide-react';
import { Button } from './button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-[8px] border border-dashed border-[#D9DEE5] bg-white p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-3',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-[#EEF1F5] flex items-center justify-center text-[#5B6576]">
        {icon || <Inbox className="w-6 h-6 text-[#5B6576]" />}
      </div>

      <div className="space-y-1 max-w-sm">
        <h4 className="text-base font-bold text-[#0B2545]">{title}</h4>
        {description && <p className="text-xs text-[#5B6576] leading-relaxed">{description}</p>}
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
