import * as React from 'react';
import { formatPercent } from '../../lib/finance/formatters';
import { cn } from '../../lib/utils';

export interface RateBadgeProps {
  rate: number;
  periodText?: string;
  isFloating?: boolean;
  className?: string;
}

export function RateBadge({ rate, periodText, isFloating = false, className }: RateBadgeProps) {
  return (
    <div
      data-tabular-num="true"
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono tabular-nums text-xs',
        isFloating
          ? 'bg-slate-50 border-slate-200 text-slate-700'
          : 'bg-emerald-50/90 border-emerald-200 text-emerald-800 font-semibold',
        className
      )}
    >
      <span className="text-sm font-bold tracking-tight">{formatPercent(rate)}</span>
      <span className="text-[11px] font-sans text-slate-500 font-normal">/năm</span>
      {periodText && (
        <span className="ml-1 text-[10px] font-sans bg-white/80 border border-slate-200 px-1 py-0.5 rounded text-slate-600">
          {periodText}
        </span>
      )}
    </div>
  );
}
