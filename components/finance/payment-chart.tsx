import * as React from 'react';
import { cn } from '../../lib/utils';
import { formatVnd, formatPercent } from '../../lib/finance/formatters';

export interface PaymentChartProps {
  principal: number;
  totalInterest: number;
  termMonths: number;
  className?: string;
}

export function PaymentChart({
  principal,
  totalInterest,
  termMonths,
  className,
}: PaymentChartProps) {
  const total = principal + totalInterest;
  const principalPercent = total > 0 ? (principal / total) * 100 : 0;
  const interestPercent = total > 0 ? (totalInterest / total) * 100 : 0;

  return (
    <div className={cn('rounded-[8px] border border-[#E3E7ED] bg-white p-5 space-y-5', className)}>
      <div className="flex items-center justify-between border-b border-[#E3E7ED] pb-3">
        <div>
          <h4 className="text-sm font-bold text-[#0B2545]">Cơ cấu Tổng Tiền Thanh toán</h4>
          <p className="text-xs text-[#5B6576]">Thời gian vay: {Math.round(termMonths / 12)} năm ({termMonths} tháng)</p>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-[#5B6576] block">Tổng gốc + lãi:</span>
          <span className="font-mono num font-bold text-base text-[#0B2545]">{formatVnd(total)}</span>
        </div>
      </div>

      {/* Stacked Progress Bar */}
      <div className="space-y-2">
        <div className="h-6 w-full rounded-[6px] overflow-hidden flex bg-[#EEF1F5] p-0.5">
          <div
            style={{ width: `${principalPercent}%` }}
            className="h-full bg-[#0F8B8D] rounded-l-[4px] transition-all duration-300"
            title={`Gốc: ${formatVnd(principal)} (${principalPercent.toFixed(1)}%)`}
          />
          <div
            style={{ width: `${interestPercent}%` }}
            className="h-full bg-[#13315C] rounded-r-[4px] transition-all duration-300"
            title={`Lãi: ${formatVnd(totalInterest)} (${interestPercent.toFixed(1)}%)`}
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 pt-1 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#0F8B8D] mt-0.5 shrink-0" />
            <div>
              <span className="text-[#5B6576] block">Tiền nợ gốc</span>
              <span className="font-mono num font-bold text-sm text-[#0B2545]">
                {formatVnd(principal)}
              </span>
              <span className="text-[11px] font-mono text-[#5B6576] block">
                ({principalPercent.toFixed(1)}%)
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[#13315C] mt-0.5 shrink-0" />
            <div>
              <span className="text-[#5B6576] block">Tổng tiền lãi phải trả</span>
              <span className="font-mono num font-bold text-sm text-[#0B2545]">
                {formatVnd(totalInterest)}
              </span>
              <span className="text-[11px] font-mono text-[#5B6576] block">
                ({interestPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
