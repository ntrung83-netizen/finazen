import * as React from 'react';
import { cn } from '../../lib/utils';
import { getFinazenSettings } from '../../lib/settings';
import {
  ShieldCheck,
  Building2,
  Lock,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

export interface FooterProps {
  onNavigate?: (path: string) => void;
  className?: string;
}

export function Footer({ onNavigate, className }: FooterProps) {
  const settings = getFinazenSettings();

  return (
    <footer className={cn('bg-[#0B2545] text-[#D9DEE5] text-xs border-t border-[#13315C] mt-auto', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Partner Logos in Greyscale */}
        <div className="space-y-3 pb-8 border-b border-[#13315C]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A3ACB9]">
              Tổ chức Tín dụng & Bảo hiểm Đối tác Khảo sát
            </span>
            <span className="text-[11px] text-[#A3ACB9]">
              Số liệu công bố công khai theo quy định của NHNN & Bộ Tài chính
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {settings.partnerLogos.map((partner, idx) => (
              <div
                key={idx}
                className="h-12 rounded-[6px] border border-[#13315C] bg-[#0E2442] p-2 flex flex-col items-center justify-center text-center filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-180 cursor-default"
                title={`${partner.name} - ${partner.type}`}
              >
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  {partner.code}
                </span>
                <span className="text-[9px] text-[#A3ACB9] truncate max-w-full">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Link Columns + Brand Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Intro & Social links */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#0F8B8D] flex items-center justify-center text-white font-extrabold text-base shadow-xs">
                F
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                FINAZEN
              </span>
            </div>

            <p className="text-xs text-[#A3ACB9] leading-relaxed max-w-sm">
              Nền tảng so sánh lãi suất và kết nối tư vấn tài chính độc lập hàng đầu tại Việt Nam. Minh bạch, khách quan, không thu phí người dùng.
            </p>

            {/* Social links (Zalo OA, Facebook, LinkedIn) */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#A3ACB9] uppercase tracking-wider block">
                Kênh kết nối chính thức:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={settings.zaloOaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-[4px] bg-[#13315C] text-xs font-bold text-white hover:bg-[#0F8B8D] transition-colors"
                >
                  Zalo OA
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-[4px] bg-[#13315C] text-xs font-bold text-white hover:bg-[#0F8B8D] transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-[4px] bg-[#13315C] text-xs font-bold text-white hover:bg-[#0F8B8D] transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* 4 Link Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {settings.footerColumns.map((col, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <button
                        type="button"
                        onClick={() => onNavigate?.(link.href)}
                        className="text-xs text-[#A3ACB9] hover:text-[#0F8B8D] transition-colors text-left cursor-pointer"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Strip from Settings */}
        <div className="pt-8 border-t border-[#13315C] space-y-4 text-[11px] text-[#A3ACB9] leading-relaxed">
          <div className="space-y-1">
            <p className="font-bold text-white">{settings.companyName}</p>
            <p>{settings.registrationNumber}</p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0F8B8D] shrink-0" />
              <span>Trụ sở chính: {settings.headquartersAddress}</span>
            </p>
          </div>

          {/* Data Protection Statement Citing Law 91/2025/QH15 */}
          <div className="p-3 rounded-[6px] bg-[#0E2442] border border-[#13315C] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cam kết Tuân thủ Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15</span>
            </div>
            <p className="text-[11px] text-[#A3ACB9]">{settings.dataProtectionNotice}</p>
          </div>

          {/* Mandatory Non-Bank / Non-Insurer Disclaimer */}
          <div className="p-3 rounded-[6px] bg-[#071930] border border-[#13315C] text-amber-200/90">
            <p className="font-bold text-amber-400 mb-0.5">Tuyên bố Trách nhiệm Pháp lý Độc lập:</p>
            <p className="text-[10.5px] leading-relaxed text-[#A3ACB9]">
              {settings.institutionalDisclaimer}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#13315C]/80 text-[#5B6576]">
            <p>© {new Date().getFullYear()} Finazen Vietnam JSC. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Bảo mật cấp Ngân hàng</span>
              <span>•</span>
              <span>Dư nợ giảm dần chuẩn nghiệp vụ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
