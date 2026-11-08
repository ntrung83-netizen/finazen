import * as React from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PartnerBadgeProps {
  name: string;
  shortCode: string;
  type?: 'COMMERCIAL_BANK' | 'STATE_OWNED_BANK' | 'FOREIGN_BANK' | 'INSURER';
  verified?: boolean;
  className?: string;
}

export function PartnerBadge({
  name,
  shortCode,
  type = 'COMMERCIAL_BANK',
  verified = true,
  className,
}: PartnerBadgeProps) {
  const typeLabels = {
    STATE_OWNED_BANK: 'Ngân hàng TMCP Nhà nước',
    COMMERCIAL_BANK: 'Ngân hàng TMCP',
    FOREIGN_BANK: 'Ngân hàng Nước ngoài / Liên doanh',
    INSURER: 'Doanh nghiệp Bảo hiểm',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-colors',
        className
      )}
    >
      <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs font-mono">
        {shortCode.slice(0, 3)}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-slate-900">{name}</span>
          {verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-label="Đối tác được cấp phép" />}
        </div>
        <span className="text-[10px] text-slate-500">{typeLabels[type]}</span>
      </div>
    </div>
  );
}
