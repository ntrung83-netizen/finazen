import * as React from 'react';
import { cn } from '../../lib/utils';
import { Info } from 'lucide-react';

export interface DisclosureBoxProps {
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'neutral' | 'info' | 'warning';
  className?: string;
}

export function DisclosureBox({
  title,
  children,
  icon,
  variant = 'neutral',
  className,
}: DisclosureBoxProps) {
  const variants = {
    neutral: 'bg-[#F7F8FA] border-[#E3E7ED] text-[#5B6576]',
    info: 'bg-[#EBF4FB] border-[#D9DEE5] text-[#2B6CB0]',
    warning: 'bg-[#FEF7EB] border-[#D9DEE5] text-[#B7791F]',
  };

  return (
    <div
      role="note"
      className={cn(
        'rounded-[8px] border p-4 text-xs leading-relaxed flex items-start gap-3 transition-colors',
        variants[variant],
        className
      )}
    >
      <div className="shrink-0 mt-0.5">
        {icon || <Info className="w-4 h-4 text-[#5B6576]" />}
      </div>
      <div className="space-y-1 flex-1">
        {title && <h5 className="font-semibold text-[#0B2545]">{title}</h5>}
        <div className="text-xs text-[#5B6576] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
