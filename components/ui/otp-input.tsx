import * as React from 'react';
import { cn } from '../../lib/utils';

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  onComplete?: (val: string) => void;
  error?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function OTPInput({
  length = 6,
  value = '',
  onChange,
  onComplete,
  error,
  disabled = false,
  isLoading = false,
  className,
}: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Array of single digit chars
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const char = e.target.value.slice(-1).replace(/[^0-9]/g, '');
    const newDigits = [...digits];
    newDigits[index] = char;
    const nextValue = newDigits.join('');
    onChange(nextValue);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (nextValue.length === length && onComplete) {
      onComplete(nextValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    const targetIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[targetIndex]?.focus();
    if (pasted.length === length && onComplete) {
      onComplete(pasted);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-2 sm:gap-3" onPaste={handlePaste}>
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digits[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={disabled || isLoading}
            className={cn(
              'h-[50px] w-[44px] sm:w-[50px] text-center font-mono text-xl font-bold rounded-[8px] border border-[#E3E7ED] bg-white text-[#0B2545] num transition-all duration-180 ease-out focus-visible:outline-2 focus-visible:outline-[#0F8B8D] focus-visible:outline-offset-2 disabled:bg-[#EEF1F5] disabled:opacity-60',
              error && 'border-[#C53030] focus-visible:outline-[#C53030]',
              digits[index] && 'border-[#0F8B8D] bg-[#F7F8FA]'
            )}
          />
        ))}
      </div>

      {error && <p className="text-xs font-medium text-[#C53030]">{error}</p>}
      {isLoading && <p className="text-xs text-[#0F8B8D]">Đang xác thực mã OTP...</p>}
    </div>
  );
}
