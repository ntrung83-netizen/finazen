import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    // Touch targets >= 44px for standard and large
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-[8px] transition-all duration-180 ease-out focus-visible:outline-2 focus-visible:outline-[#0F8B8D] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

    const variants = {
      // Action Teal (#0F8B8D) is reserved for primary CTAs only
      primary:
        'bg-[#0F8B8D] hover:bg-[#0B6E70] text-white shadow-xs active:bg-[#085658] border border-transparent',
      // Navy (#0B2545) is for secondary actions
      secondary:
        'bg-[#0B2545] hover:bg-[#13315C] text-white shadow-xs active:bg-[#071930] border border-transparent',
      // 1px #E3E7ED border-first elevation
      outline:
        'border border-[#E3E7ED] bg-white hover:bg-[#F7F8FA] hover:border-[#D9DEE5] text-[#1F2933] active:bg-[#EEF1F5]',
      ghost:
        'hover:bg-[#EEF1F5] text-[#1F2933] active:bg-[#D9DEE5] border border-transparent',
      danger:
        'bg-[#C53030] hover:bg-[#9B2C2C] text-white shadow-xs border border-transparent',
    };

    const sizes = {
      sm: 'h-[36px] min-w-[36px] px-3 text-xs',
      md: 'h-[44px] min-w-[44px] px-5 text-sm font-semibold', // standard 44px touch target
      lg: 'h-[50px] min-w-[44px] px-6 text-base font-bold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
