import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'rounded';
}

export function Skeleton({ className, variant = 'rounded', ...props }: SkeletonProps) {
  const variants = {
    rectangular: 'rounded-none',
    rounded: 'rounded-[8px]',
    circular: 'rounded-full',
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-[#EEF1F5] border border-[#E3E7ED]/50',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
