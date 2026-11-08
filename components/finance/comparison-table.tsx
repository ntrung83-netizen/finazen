import * as React from 'react';
import { cn } from '../../lib/utils';
import { formatPercent, formatVnd } from '../../lib/finance/formatters';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { EmptyState } from '../ui/empty-state';
import { X, Check } from 'lucide-react';

export interface ComparisonProduct {
  id: string;
  bankName: string;
  bankCode: string;
  productName: string;
  nominalRate: number;
  promoPeriod: string;
  floatingRate: number;
  maxLtv: string;
  maxTenure: string;
  prepaymentPenalty: string;
  monthlyEstimate: number;
  requiredIncome: string;
  processingTime: string;
  isBest?: boolean;
}

export interface ComparisonTableProps {
  products: ComparisonProduct[];
  onRemoveProduct?: (id: string) => void;
  onRequestAdvice?: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function ComparisonTable({
  products,
  onRemoveProduct,
  onRequestAdvice,
  isLoading = false,
  className,
}: ComparisonTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-14 w-full rounded-[8px]" />
        <Skeleton className="h-96 w-full rounded-[8px]" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="Chưa có sản phẩm nào được chọn để so sánh"
        description="Vui lòng chọn tối đa 3 gói vay từ danh sách để so sánh chi tiết các điều kiện và lãi suất."
      />
    );
  }

  // Cap at 3 columns per requirement
  const displayProducts = products.slice(0, 3);

  const rows = [
    {
      label: 'Lãi suất ưu đãi',
      render: (p: ComparisonProduct) => (
        <div className="font-mono num">
          <span className="text-base font-extrabold text-[#0B2545]">{formatPercent(p.nominalRate)}</span>
          <span className="text-xs text-[#5B6576] block">({p.promoPeriod})</span>
        </div>
      ),
    },
    {
      label: 'Lãi sau ưu đãi',
      render: (p: ComparisonProduct) => (
        <span className="font-mono num text-xs font-semibold text-[#5B6576]">
          ~{formatPercent(p.floatingRate)}/năm
        </span>
      ),
    },
    {
      label: 'Ước tính trả góp/tháng',
      render: (p: ComparisonProduct) => (
        <span className="font-mono num text-sm font-bold text-[#0F8B8D]">
          {formatVnd(p.monthlyEstimate)}
        </span>
      ),
    },
    {
      label: 'Tỷ lệ vay tối đa (LTV)',
      render: (p: ComparisonProduct) => (
        <span className="font-mono num text-xs font-semibold">{p.maxLtv}</span>
      ),
    },
    {
      label: 'Thời hạn vay tối đa',
      render: (p: ComparisonProduct) => <span className="text-xs text-[#1F2933]">{p.maxTenure}</span>,
    },
    {
      label: 'Phí trả nợ trước hạn',
      render: (p: ComparisonProduct) => (
        <span className="text-xs text-[#5B6576]">{p.prepaymentPenalty}</span>
      ),
    },
    {
      label: 'Yêu cầu thu nhập tối thiểu',
      render: (p: ComparisonProduct) => (
        <span className="text-xs text-[#1F2933] font-medium">{p.requiredIncome}</span>
      ),
    },
    {
      label: 'Thời gian phê duyệt',
      render: (p: ComparisonProduct) => (
        <span className="text-xs text-[#5B6576]">{p.processingTime}</span>
      ),
    },
  ];

  return (
    <div className={cn('w-full rounded-[8px] border border-[#E3E7ED] bg-white overflow-hidden shadow-2xs', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F7F8FA] border-b border-[#E3E7ED]">
              <th className="py-4 px-4 w-1/4 text-xs font-bold text-[#5B6576] uppercase tracking-wider">
                Tiêu chí so sánh ({displayProducts.length}/3)
              </th>
              {displayProducts.map((p) => (
                <th
                  key={p.id}
                  className={cn(
                    'py-4 px-4 font-bold text-[#0B2545] align-top relative',
                    p.isBest && 'border-t-2 border-t-[#C9A227] bg-[#FDF9EA]/30'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#EEF1F5] text-[#0B2545]">
                          {p.bankCode}
                        </span>
                        <span className="text-xs text-[#5B6576]">{p.bankName}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0B2545] leading-snug">{p.productName}</h4>
                      {p.isBest && (
                        <Badge variant="bestRate" icon className="mt-1">
                          Ưu đãi nhất
                        </Badge>
                      )}
                    </div>
                    {onRemoveProduct && (
                      <button
                        type="button"
                        onClick={() => onRemoveProduct(p.id)}
                        className="text-[#A3ACB9] hover:text-[#C53030] cursor-pointer"
                        aria-label="Xoá khỏi so sánh"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E7ED]">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#F7F8FA]/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-[#5B6576] bg-[#F7F8FA]/30">{row.label}</td>
                {displayProducts.map((p) => (
                  <td key={p.id} className="py-3 px-4">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
            {/* Action Row */}
            <tr className="bg-[#F7F8FA]/40">
              <td className="py-4 px-4 font-bold text-[#5B6576]">Đăng ký tư vấn</td>
              {displayProducts.map((p) => (
                <td key={p.id} className="py-4 px-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onRequestAdvice?.(p.id)}
                    className="w-full text-xs font-bold"
                  >
                    Đăng ký gói này
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
