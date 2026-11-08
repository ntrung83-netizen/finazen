import React from 'react';
import Link from 'next/link';
import { DisclaimerBanner } from '../../../components/finance/disclaimer-banner';
import { ShieldCheck, ChevronRight, Globe, User } from 'lucide-react';

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Compliance Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              {isEn ? 'Vietnam PDP Law No. 91/2025/QH15 Compliant' : 'Tuân thủ Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 hidden sm:inline">
              {isEn ? 'Consented advisory lead forwarding' : 'Chỉ chuyển tiếp dữ liệu khi có sự đồng thuận rõ ràng'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              <Link
                href="/"
                className={`hover:text-white transition-colors ${!isEn ? 'text-white font-bold' : ''}`}
              >
                VIE
              </Link>
              <span>/</span>
              <Link
                href="/en"
                className={`hover:text-white transition-colors ${isEn ? 'text-white font-bold' : ''}`}
              >
                ENG
              </Link>
            </div>
            <Link
              href={`/${locale}/account`}
              className="hover:text-white text-slate-300 flex items-center gap-1 font-medium transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isEn ? 'My Account' : 'Tài khoản'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={isEn ? '/en' : '/'} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold text-lg tracking-tight">
                F
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  FINAZEN
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 tracking-wider uppercase">
                  Vietnam Financial Intel
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
              <Link href={`/${locale}/loans`} className="hover:text-emerald-700 transition-colors">
                {isEn ? 'Loans & Mortgages' : 'Gói vay'}
              </Link>
              <Link href={`/${locale}/savings`} className="hover:text-emerald-700 transition-colors">
                {isEn ? 'Savings Deposits' : 'Gửi tiết kiệm'}
              </Link>
              <Link href={`/${locale}/insurance`} className="hover:text-emerald-700 transition-colors">
                {isEn ? 'Insurance' : 'Bảo hiểm'}
              </Link>
              <Link href={`/${locale}/calculators`} className="hover:text-emerald-700 transition-colors">
                {isEn ? 'Calculators' : 'Công cụ tính'}
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/loans`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>{isEn ? 'Compare Rates' : 'So sánh ngay'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mandatory Non-Bank Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <DisclaimerBanner compact lang={isEn ? 'en' : 'vi'} />
      </div>

      {/* Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Institutional Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
                  F
                </div>
                <span className="font-extrabold text-white text-base">FINAZEN</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs max-w-md">
                {isEn
                  ? 'Finazen is an independent personal-finance comparison and advisory-lead platform in Vietnam. Finazen is NOT a bank, credit institution, or insurer. All consented leads are routed securely to licensed partner institutions under Vietnam PDP Law No. 91/2025/QH15.'
                  : 'Finazen là nền tảng so sánh tài chính cá nhân và kết nối tư vấn độc lập tại Việt Nam. Finazen KHÔNG PHẢI là ngân hàng hay công ty bảo hiểm. Mọi yêu cầu tư vấn chỉ được chuyển tiếp khi có sự đồng thuận rõ ràng theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-semibold">{isEn ? 'Products' : 'Sản phẩm'}</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link href={`/${locale}/loans`} className="hover:text-white">{isEn ? 'Home Loans' : 'Vay mua nhà'}</Link></li>
                <li><Link href={`/${locale}/loans`} className="hover:text-white">{isEn ? 'Car Loans' : 'Vay mua ô tô'}</Link></li>
                <li><Link href={`/${locale}/loans`} className="hover:text-white">{isEn ? 'Consumer Credit' : 'Vay tiêu dùng'}</Link></li>
                <li><Link href={`/${locale}/savings`} className="hover:text-white">{isEn ? 'Savings Deposits' : 'Gửi tiết kiệm'}</Link></li>
                <li><Link href={`/${locale}/insurance`} className="hover:text-white">{isEn ? 'Insurance Policies' : 'Bảo hiểm nhân thọ & phi nhân thọ'}</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-semibold">{isEn ? 'Legal & Privacy' : 'Pháp lý & Quyền riêng tư'}</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><span className="text-emerald-400">{isEn ? 'Law No. 91/2025/QH15' : 'Luật số 91/2025/QH15'}</span></li>
                <li><span>{isEn ? 'Decree 356/2025/ND-CP' : 'Nghị định 356/2025/NĐ-CP'}</span></li>
                <li><Link href={`/${locale}/account`} className="hover:text-white">{isEn ? 'Data Subject Rights Portal' : 'Cổng thực thi quyền dữ liệu'}</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} Finazen Vietnam. Bản quyền đã được bảo lưu.</p>
            <p>Phiên bản kiến trúc nền tảng 1.0 (Cloud Run + Next.js App Router)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
