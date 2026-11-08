import * as React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  isLoading?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, helperText, error, isLoading, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-[#5B6576] tracking-wide"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled || isLoading}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'flex h-[44px] w-full appearance-none rounded-[8px] border border-[#E3E7ED] bg-white px-3.5 py-2 pr-10 text-sm text-[#1F2933] transition-all duration-180 ease-out focus-visible:outline-2 focus-visible:outline-[#0F8B8D] focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-[#EEF1F5] disabled:opacity-60 cursor-pointer',
              error && 'border-[#C53030] focus-visible:outline-[#C53030]',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 flex items-center pointer-events-none text-[#5B6576]">
            {isLoading ? (
              <svg
                className="animate-spin h-4 w-4 text-[#0F8B8D]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <ChevronDown className="w-4 h-4 text-[#5B6576]" />
            )}
          </div>
        </div>

        {error ? (
          <p id={errorId} className="text-xs font-medium text-[#C53030]">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-[#5B6576]">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = 'Select';
