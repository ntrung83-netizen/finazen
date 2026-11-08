import * as React from 'react';
import { cn } from '../../lib/utils';
import { Sparkles, Clock, ShieldAlert, Tag } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'bestRate'
    | 'sponsored'
    | 'updated'
    | 'sample'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'outline';
  icon?: boolean;
}

export function Badge({ className, variant = 'outline', icon = false, children, ...props }: BadgeProps) {
  // Chips use rounded-full per design system token
  const base =
    'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide select-none';

  const variants = {
    // Best Rate: Gold border and dark gold text (contrast 4.6:1)
    bestRate: 'bg-[#FDF9EA] border-[#C9A227] text-[#8F6C0E]',
    // Sponsored: neutral tone
    sponsored: 'bg-[#EEF1F5] border-[#D9DEE5] text-[#5B6576]',
    // Updated: Action teal tone
    updated: 'bg-[#E6F5F5] border-[#0F8B8D] text-[#085658]',
    // Sample: neutral monospace
    sample: 'bg-[#F7F8FA] border-[#D9DEE5] text-[#5B6576] font-mono text-[11px]',
    // Semantics
    success: 'bg-[#EAF7EE] border-[#1E7F4F] text-[#1E7F4F]',
    warning: 'bg-[#FEF7EB] border-[#B7791F] text-[#B7791F]',
    error: 'bg-[#FDEEEE] border-[#C53030] text-[#C53030]',
    info: 'bg-[#EBF4FB] border-[#2B6CB0] text-[#2B6CB0]',
    outline: 'bg-white border-[#E3E7ED] text-[#1F2933]',
  };

  const icons = {
    bestRate: <Sparkles className="w-3 h-3 text-[#C9A227] shrink-0" />,
    updated: <Clock className="w-3 h-3 text-[#0F8B8D] shrink-0" />,
    sample: <Tag className="w-3 h-3 text-[#5B6576] shrink-0" />,
    sponsored: null,
    success: null,
    warning: null,
    error: null,
    info: null,
    outline: null,
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {icon && icons[variant]}
      <span>{children}</span>
    </div>
  );
}
