import * as React from 'react';
import { cn } from '../../lib/utils';
import { formatVnd } from '../../lib/finance/formatters';

export interface SliderNumberInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  helperText?: string;
  error?: string;
  unit?: string;
  quickAmounts?: number[];
  disabled?: boolean;
  className?: string;
}

export function SliderNumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 10_000_000,
  helperText,
  error,
  unit = '₫',
  quickAmounts,
  disabled = false,
  className,
}: SliderNumberInputProps) {
  const [displayString, setDisplayString] = React.useState<string>(() => {
    return Math.round(value).toLocaleString('vi-VN');
  });

  // Sync display string when external value changes
  React.useEffect(() => {
    setDisplayString(Math.round(value).toLocaleString('vi-VN'));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (!raw) {
      setDisplayString('');
      return;
    }
    const num = parseInt(raw, 10);
    const clamped = Math.min(Math.max(num, 0), max * 2);
    setDisplayString(clamped.toLocaleString('vi-VN'));
    onChange(Math.min(Math.max(clamped, min), max));
  };

  const handleInputBlur = () => {
    const clamped = Math.min(Math.max(value, min), max);
    setDisplayString(Math.round(clamped).toLocaleString('vi-VN'));
    onChange(clamped);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    onChange(num);
    setDisplayString(Math.round(num).toLocaleString('vi-VN'));
  };

  const sliderPercent = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  return (
    <div className={cn('w-full space-y-2.5', className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#5B6576] tracking-wide">
          {label}
        </label>
        <span className="text-[11px] font-mono text-[#5B6576]">
          {formatVnd(min)} - {formatVnd(max)}
        </span>
      </div>

      {/* Formatted Number Input Box */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={displayString}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={disabled}
          className={cn(
            'flex h-[44px] w-full rounded-[8px] border border-[#E3E7ED] bg-white px-3.5 py-2 pr-10 font-mono text-base font-bold text-[#0B2545] num tracking-tight transition-all duration-180 ease-out focus-visible:outline-2 focus-visible:outline-[#0F8B8D] focus-visible:outline-offset-2 disabled:bg-[#EEF1F5] disabled:opacity-60',
            error && 'border-[#C53030] focus-visible:outline-[#C53030]'
          )}
        />
        <div className="absolute right-3.5 text-xs font-bold text-[#5B6576] pointer-events-none">
          {unit}
        </div>
      </div>

      {/* Slider with styled progress track */}
      <div className="pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          disabled={disabled}
          style={{
            background: `linear-gradient(to right, #0F8B8D 0%, #0F8B8D ${sliderPercent}%, #D9DEE5 ${sliderPercent}%, #D9DEE5 100%)`,
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#0F8B8D] disabled:opacity-50"
        />
      </div>

      {/* Optional Quick Amount Chips */}
      {quickAmounts && quickAmounts.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {
                onChange(amt);
                setDisplayString(Math.round(amt).toLocaleString('vi-VN'));
              }}
              className={cn(
                'text-[11px] font-medium font-mono px-2.5 py-1 rounded-full border transition-all cursor-pointer select-none',
                value === amt
                  ? 'bg-[#E6F5F5] border-[#0F8B8D] text-[#085658] font-bold'
                  : 'bg-white border-[#E3E7ED] text-[#5B6576] hover:bg-[#F7F8FA]'
              )}
            >
              {formatVnd(amt)}
            </button>
          ))}
        </div>
      )}

      {error ? (
        <p className="text-xs font-medium text-[#C53030]">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#5B6576]">{helperText}</p>
      ) : null}
    </div>
  );
}
