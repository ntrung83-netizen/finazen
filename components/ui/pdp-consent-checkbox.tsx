import * as React from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface PdpConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  partnerNames?: string[];
  error?: string;
  className?: string;
}

/**
 * Bank-grade consent checkbox strictly conforming to:
 * - Vietnam Law on Personal Data Protection No. 91/2025/QH15
 * - Decree No. 356/2025/ND-CP
 *
 * Rules:
 * 1. MUST NOT be pre-ticked (unticked-by-default)
 * 2. Explicitly specifies purpose limitation and designated recipient partners
 * 3. Informs data-subject rights and retention limits
 */
export function PdpConsentCheckbox({
  checked,
  onChange,
  partnerNames = ['Tổ chức tín dụng/bảo hiểm được lựa chọn'],
  error,
  className,
}: PdpConsentCheckboxProps) {
  const [expanded, setExpanded] = React.useState(false);
  const id = React.useId();

  return (
    <div
      className={cn(
        'rounded-xl border p-4 bg-slate-50/80 transition-all',
        error ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4.5 w-4.5 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 focus:ring-offset-1 cursor-pointer"
          />
        </div>
        <div className="flex-1 space-y-1">
          <label htmlFor={id} className="text-xs font-semibold text-slate-900 cursor-pointer select-none leading-relaxed">
            Tôi đồng thuận cho Finazen thu thập, xử lý và chuyển tiếp thông tin cá nhân trên đến{' '}
            <span className="text-emerald-800 font-bold">{partnerNames.join(', ')}</span> nhằm mục đích duy nhất là tư vấn sản phẩm tài chính theo yêu cầu này.
          </label>
          <div className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-700" />
              Luật 91/2025/QH15 & NĐ 356/2025/NĐ-CP
            </span>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-0.5 underline cursor-pointer"
            >
              {expanded ? 'Thu gọn điều khoản' : 'Xem chi tiết quyền & thời hạn'}
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-2 animate-in fade-in-50">
          <div className="flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-800">Giới hạn mục đích:</strong> Dữ liệu chỉ dùng để nhân viên tín dụng/tư vấn viên của đối tác được chỉ định liên hệ và đối soát kết quả. Không chia sẻ cho bên thứ ba ngoài danh mục đã đồng thuận.
            </div>
          </div>
          <div>
            <strong className="text-slate-800">Quyền của chủ thể dữ liệu:</strong> Quý khách có quyền truy cập, yêu cầu cải chính, xoá bỏ dữ liệu hoặc rút lại sự đồng thuận này bất kỳ lúc nào tại mục Cài đặt Tài khoản trên Finazen.
          </div>
          <div>
            <strong className="text-slate-800">Thời hạn lưu trữ:</strong> Dữ liệu yêu cầu tư vấn được lưu trữ bảo mật tối đa 12 tháng kể từ ngày phát sinh hoặc theo quy định lưu trữ chứng từ tài chính của Ngân hàng Nhà nước.
          </div>
          <p className="text-[10px] text-slate-500 italic">
            * Finazen thực hiện ghi nhận mã hoá thời điểm, địa chỉ IP và phiên làm việc đồng thuận này làm bằng chứng kiểm toán độc lập.
          </p>
        </div>
      )}

      {error && <p className="mt-2 text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
}
