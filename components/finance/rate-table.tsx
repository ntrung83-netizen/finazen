import * as React from 'react';
import { cn } from '../../lib/utils';
import { formatPercent, formatVnd } from '../../lib/finance/formatters';
import { ArrowUpDown, ArrowUp, ArrowDown, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { EmptyState } from '../ui/empty-state';

export interface RateTableItem {
  id: string;
  bankName: string;
  bankCode: string;
  productName: string;
  nominalRate: number;
  promoTerm: string;
  postRate: number;
  maxLtv: string;
  maxTenure: string;
  monthlyEstimate: number;
  isBest?: boolean;
}

export interface RateTableProps {
  items: RateTableItem[];
  onRequestAdvice?: (id: string) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

type SortField = 'rate' | 'postRate' | 'monthlyEstimate';
type SortOrder = 'asc' | 'desc';

export function RateTable({
  items,
  onRequestAdvice,
  isLoading = false,
  error,
  className,
}: RateTableProps) {
  const [sortField, setSortField] = React.useState<SortField>('rate');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      let valA = a.nominalRate;
      let valB = b.nominalRate;
      if (sortField === 'postRate') {
        valA = a.postRate;
        valB = b.postRate;
      } else if (sortField === 'monthlyEstimate') {
        valA = a.monthlyEstimate;
        valB = b.monthlyEstimate;
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [items, sortField, sortOrder]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full rounded-[8px]" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-[8px]" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center border border-[#C53030]/40 rounded-[8px] bg-[#FDEEEE]/30 space-y-3">
        <AlertCircle className="w-8 h-8 text-[#C53030] mx-auto" />
        <h4 className="text-sm font-bold text-[#0B2545]">Không thể tải bảng lãi suất</h4>
        <p className="text-xs text-[#5B6576]">{error}</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <EmptyState title="Chưa có gói lãi suất phù hợp" description="Vui lòng thử điều chỉnh bộ lọc tìm kiếm." />;
  }

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-[#A3ACB9] shrink-0" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-[#0F8B8D] shrink-0" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-[#0F8B8D] shrink-0" />
    );
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop & Tablet Table (Hidden under 600px) */}
      <div className="hidden min-[600px]:block rounded-[8px] border border-[#E3E7ED] bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-left text-xs border-collapse">
            {/* Sticky Header */}
            <thead className="sticky top-0 z-10 bg-[#F7F8FA] border-b border-[#E3E7ED] shadow-2xs">
              <tr>
                <th className="py-3 px-4 font-bold text-[#5B6576] uppercase tracking-wider">Ngân hàng</th>
                <th className="py-3 px-4 font-bold text-[#5B6576] uppercase tracking-wider">Gói sản phẩm</th>
                <th
                  onClick={() => handleSort('rate')}
                  className="py-3 px-4 font-bold text-[#5B6576] uppercase tracking-wider cursor-pointer hover:text-[#0B2545] select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Lãi suất ưu đãi</span>
                    {renderSortIcon('rate')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('postRate')}
                  className="py-3 px-4 font-bold text-[#5B6576] uppercase tracking-wider cursor-pointer hover:text-[#0B2545] select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Sau ưu đãi</span>
                    {renderSortIcon('postRate')}
                  </div>
                </th>
                <th className="py-3 px-4 font-bold text-[#5B6576] uppercase tracking-wider">Tỷ lệ vay</th>
                <th
                  onClick={() => handleSort('monthlyEstimate')}
                  className="py-3 px-4 font-bold text-[#5B6576] uppercase tracking-wider cursor-pointer hover:text-[#0B2545] select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Ước tính/tháng</span>
                    {renderSortIcon('monthlyEstimate')}
                  </div>
                </th>
                <th className="py-3 px-4 text-right font-bold text-[#5B6576] uppercase tracking-wider">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E7ED]">
              {sortedItems.map((item) => (
                <tr
                  key={item.id}
                  className={cn(
                    'hover:bg-[#F7F8FA]/80 transition-colors',
                    // Best value row highlighted with a gold left border (#C9A227)
                    item.isBest && 'border-l-4 border-l-[#C9A227] bg-[#FDF9EA]/30'
                  )}
                >
                  <td className="py-3.5 px-4 font-bold text-[#0B2545]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-[6px] border border-[#E3E7ED] bg-white flex items-center justify-center font-mono font-bold text-[11px] text-[#0B2545]">
                        {item.bankCode.slice(0, 3)}
                      </div>
                      <span>{item.bankName}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#1F2933]">
                    <span className="font-semibold block">{item.productName}</span>
                    <span className="text-[11px] text-[#5B6576]">{item.maxTenure}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-mono num">
                      <span className="text-sm font-bold text-[#0B2545]">{formatPercent(item.nominalRate)}</span>
                      <span className="text-[11px] bg-[#E6F5F5] text-[#085658] px-1.5 py-0.5 rounded-[4px]">
                        {item.promoTerm}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono num text-[#5B6576]">
                    ~{formatPercent(item.postRate)}
                  </td>
                  <td className="py-3.5 px-4 font-mono num text-[#1F2933]">{item.maxLtv}</td>
                  <td className="py-3.5 px-4 font-mono num font-bold text-[#0B2545]">
                    {formatVnd(item.monthlyEstimate)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onRequestAdvice?.(item.id)}
                      className="text-xs"
                    >
                      Tư vấn
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Transform (Visible under 600px per requirement) */}
      <div className="min-[600px]:hidden space-y-3">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              'rounded-[8px] border border-[#E3E7ED] bg-white p-4 space-y-3 shadow-2xs',
              item.isBest && 'border-l-4 border-l-[#C9A227] bg-[#FDF9EA]/20'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[6px] border border-[#E3E7ED] bg-white flex items-center justify-center font-mono font-bold text-xs text-[#0B2545]">
                  {item.bankCode.slice(0, 3)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B2545]">{item.bankName}</h4>
                  <p className="text-[11px] text-[#5B6576]">{item.productName}</p>
                </div>
              </div>
              {item.isBest && (
                <span className="text-[10px] font-bold text-[#8F6C0E] bg-[#FDF9EA] px-2 py-0.5 rounded-full border border-[#C9A227]">
                  Tối ưu nhất
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#E3E7ED] text-xs">
              <div>
                <span className="text-[10px] text-[#5B6576] block">Lãi ưu đãi</span>
                <span className="font-mono num font-bold text-sm text-[#0B2545]">
                  {formatPercent(item.nominalRate)}{' '}
                  <span className="text-[10px] font-normal text-[#5B6576]">({item.promoTerm})</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#5B6576] block">Ước tính/tháng</span>
                <span className="font-mono num font-bold text-sm text-[#0F8B8D]">
                  {formatVnd(item.monthlyEstimate)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#5B6576] font-mono">
                Vay tối đa {item.maxLtv} • {item.maxTenure}
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onRequestAdvice?.(item.id)}
                className="text-xs px-4"
              >
                Đăng ký tư vấn
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
