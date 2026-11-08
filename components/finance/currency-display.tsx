import * as React from 'react';
import { formatVnd } from '../../lib/finance/formatters';
import { cn } from '../../lib/utils';

export interface CurrencyDisplayProps {
  amount: number;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  highlight?: boolean;
}

export function CurrencyDisplay({
  amount,
  suffix,
  size = 'md',
  className,
  highlight = false,
}: CurrencyDisplayProps) {
  const sizes = {
    sm: 'text-sm font-medium',
    md: 'text-base font-semibold',
    lg: 'text-xl font-bold',
    xl: 'text-2xl sm:text-3xl font-extrabold tracking-tight',
  };

  return (
    <span
      data-tabular-num="true"
      className={cn(
        'font-mono tracking-tight tabular-nums select-all inline-flex items-baseline gap-1',
        sizes[size],
        highlight ? 'text-emerald-700' : 'text-slate-900',
        className
      )}
    >
      <span>{formatVnd(amount)}</span>
      {suffix && <span className="text-xs font-normal text-slate-500 font-sans">{suffix}</span>}
    </span>
  );
}
