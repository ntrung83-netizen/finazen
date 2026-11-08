import * as React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DisclaimerBannerProps {
  compact?: boolean;
  className?: string;
  lang?: 'vi' | 'en';
}

/**
 * Mandatory compliance banner:
 * "Finazen is NOT a bank or insurer."
 */
export function DisclaimerBanner({ compact = false, className, lang = 'vi' }: DisclaimerBannerProps) {
  const isEn = lang === 'en';

  if (compact) {
    return (
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-amber-900 text-[11px] leading-tight',
          className
        )}
      >
        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        <p>
          {isEn ? (
            <span>
              <strong>Regulatory Notice:</strong> Finazen is an independent comparison platform, not a bank or insurer. Consented advisory leads are forwarded to licensed partners.
            </span>
          ) : (
            <span>
              <strong>Lưu ý pháp lý:</strong> Finazen là nền tảng so sánh độc lập, không phải là ngân hàng hay tổ chức bảo hiểm. Dữ liệu tư vấn chỉ được chuyển tiếp khi có sự đồng thuận của Quý khách.
            </span>
          )}
        </p>
      </div>
    );
  }

  return (
    <div
      role="note"
      className={cn(
        'rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-950 flex items-start gap-3.5 shadow-xs',
        className
      )}
    >
      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
      <div className="space-y-1">
        <h4 className="font-semibold text-amber-900">
          {isEn ? 'Finazen Institutional Disclaimer' : 'Tuyên bố Độc lập & Giới hạn Pháp lý'}
        </h4>
        <p className="leading-relaxed text-amber-800/95">
          {isEn
            ? 'Finazen is NOT a bank, credit institution, or insurance company. We do not provide credit directly, hold deposits, or underwrite insurance policies. All rates and fees displayed are compiled for comparative reference; final approval, actual rates, and contract underwriting remain under the exclusive authority of our licensed partner institutions.'
            : 'Finazen KHÔNG PHẢI là ngân hàng, tổ chức tín dụng hay doanh nghiệp bảo hiểm. Chúng tôi không cấp tín dụng, không huy động tiền gửi và không phát hành hợp đồng bảo hiểm. Mọi thông tin lãi suất và điều kiện được tổng hợp nhằm mục đích so sánh độc lập; quyết định phê duyệt và điều khoản hợp đồng thuộc thẩm quyền của các tổ chức đối tác được cấp phép.'}
        </p>
      </div>
    </div>
  );
}
