import * as React from 'react';
import { cn } from '../../lib/utils';
import { formatPercent, formatVnd } from '../../lib/finance/formatters';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { AlertCircle, Check } from 'lucide-react';

export interface KeyFact {
  label: string;
  value: string;
}

export interface RateCardProps {
  id: string;
  bankName: string;
  bankCode: string;
  bankLogoUrl?: string;
  productName: string;
  headlineRate: number; // e.g. 5.8
  qualifier: string; // e.g. "cố định 12 tháng"
  floatingRate?: number; // e.g. 9.5
  keyFacts: [KeyFact, KeyFact, KeyFact]; // 3 key facts
  badges?: { label: string; variant?: 'bestRate' | 'sponsored' | 'updated' | 'sample' }[];
  isBestRate?: boolean;
  isComparing?: boolean;
  onCompareToggle?: (id: string, checked: boolean) => void;
  onRequestAdvice?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

export function RateCard({
  id,
  bankName,
  bankCode,
  bankLogoUrl,
  productName,
  headlineRate,
  qualifier,
  floatingRate,
  keyFacts,
  badges = [],
  isBestRate = false,
  isComparing = false,
  onCompareToggle,
  onRequestAdvice,
  onViewDetails,
  isLoading = false,
  error,
  className,
}: RateCardProps) {
  // Loading skeleton state
  if (isLoading) {
    return (
      <div className="card-elevation rounded-[8px] bg-white p-5 flex flex-col justify-between h-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-[8px]" />
            <div className="space-y-1.5">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-32 h-3" />
            </div>
          </div>
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
        <div className="space-y-2 py-2">
          <Skeleton className="w-28 h-8" />
          <Skeleton className="w-20 h-3" />
        </div>
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E3E7ED]">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 w-24" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="card-elevation rounded-[8px] bg-white p-5 flex flex-col items-center justify-center text-center h-full space-y-3 border-[#C53030]/50">
        <AlertCircle className="w-8 h-8 text-[#C53030]" />
        <h4 className="text-sm font-bold text-[#0B2545]">Không thể tải gói lãi suất</h4>
        <p className="text-xs text-[#5B6576]">{error}</p>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <article
      aria-label={`${bankName} - ${productName}`}
      className={cn(
        'card-elevation rounded-[8px] bg-white p-5 flex flex-col justify-between h-full space-y-4 transition-all duration-180 relative',
        isBestRate && 'border-l-4 border-l-[#C9A227] shadow-sm',
        className
      )}
    >
      {/* Top Header: Bank Logo (40px on white), Bank Name & Badges */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            {/* 40px Bank Logo Container on white */}
            <div className="w-10 h-10 rounded-[8px] border border-[#E3E7ED] bg-white p-1 flex items-center justify-center shrink-0 shadow-2xs">
              {bankLogoUrl ? (
                <img src={bankLogoUrl} alt={bankName} className="w-full h-full object-contain" />
              ) : (
                <span className="font-mono text-xs font-bold text-[#0B2545]">{bankCode.slice(0, 3)}</span>
              )}
            </div>
            <div>
              <span className="text-xs font-semibold text-[#5B6576] block leading-tight">{bankName}</span>
              <h3 className="text-sm font-bold text-[#0B2545] leading-snug line-clamp-1">{productName}</h3>
            </div>
          </div>

          {/* Compare Checkbox */}
          {onCompareToggle && (
            <label className="flex items-center gap-1.5 text-xs text-[#5B6576] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isComparing}
                onChange={(e) => onCompareToggle(id, e.target.checked)}
                className="w-4 h-4 rounded border-[#E3E7ED] text-[#0F8B8D] focus:ring-[#0F8B8D] cursor-pointer"
              />
              <span className="hidden sm:inline">So sánh</span>
            </label>
          )}
        </div>

        {/* Badges strip */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {isBestRate && (
            <Badge variant="bestRate" icon>
              Lãi thấp nhất
            </Badge>
          )}
          {badges.map((b, idx) => (
            <Badge key={idx} variant={b.variant || 'outline'}>
              {b.label}
            </Badge>
          ))}
        </div>

        {/* Hero Number: Headline Rate (32px tabular) */}
        <div className="pt-4 pb-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[32px] font-extrabold font-mono text-[#0B2545] num leading-none tracking-tight">
              {formatPercent(headlineRate)}
            </span>
            <span className="text-xs font-medium text-[#5B6576]">/năm</span>
          </div>
          <p className="text-xs font-semibold text-[#0F8B8D] mt-1">{qualifier}</p>
          {floatingRate && (
            <p className="text-[11px] text-[#5B6576] font-mono mt-0.5">
              Sau ưu đãi: ~{formatPercent(floatingRate)}/năm
            </p>
          )}
        </div>
      </div>

      {/* 3-Column Key Facts Grid */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E3E7ED] text-center bg-[#F7F8FA]/60 rounded-[6px]">
        {keyFacts.map((fact, index) => (
          <div key={index} className="space-y-0.5 px-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#5B6576] block truncate">
              {fact.label}
            </span>
            <span className="text-xs font-bold font-mono text-[#0B2545] num block truncate">
              {fact.value}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons: Primary "Đăng ký tư vấn" (#0F8B8D) & Secondary "Chi tiết" */}
      <div className="flex items-center gap-2 pt-1">
        <Button
          variant="primary"
          size="md"
          onClick={() => onRequestAdvice?.(id)}
          className="flex-1 text-xs sm:text-sm font-bold"
        >
          Đăng ký tư vấn
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={() => onViewDetails?.(id)}
          className="text-xs sm:text-sm font-semibold px-4"
        >
          Chi tiết
        </Button>
      </div>
    </article>
  );
}
