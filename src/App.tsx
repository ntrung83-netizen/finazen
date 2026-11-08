/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { StyleguideView } from '../components/styleguide/styleguide-view';
import { ToastProvider, useToast } from '../components/ui/toast';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { RateCard } from '../components/finance/rate-card';
import { RateTable } from '../components/finance/rate-table';
import { ComparisonTable } from '../components/finance/comparison-table';
import { PaymentChart } from '../components/finance/payment-chart';
import { SliderNumberInput } from '../components/ui/slider-number-input';
import { OTPInput } from '../components/ui/otp-input';
import { PdpConsentCheckbox } from '../components/ui/pdp-consent-checkbox';
import { DisclaimerBanner } from '../components/finance/disclaimer-banner';
import { HomeFaqAndTestimonials } from '../components/finance/home-faq-and-testimonials';
import { Dialog } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import {
  ShieldCheck,
  Building2,
  Calculator,
  Lock,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  FileCode,
} from 'lucide-react';

export default function App() {
  return (
    <ToastProvider>
      <MainAppContent />
    </ToastProvider>
  );
}

function MainAppContent() {
  const [locale, setLocale] = useState<'vi' | 'en'>('vi');
  const [activeTab, setActiveTab] = useState<string>('platform');
  const [adviceModalOpen, setAdviceModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedProductTitle, setSelectedProductTitle] = useState('Gói Vay Mua Nhà An Gia (Vietcombank)');

  // Loan slider state
  const [loanAmount, setLoanAmount] = useState<number>(1_800_000_000);

  // OTP state
  const [otpCode, setOtpCode] = useState<string>('7294');

  // Consent checkbox (unticked by default)
  const [consentChecked, setConsentChecked] = useState<boolean>(false);
  const [consentError, setConsentError] = useState<string | undefined>();

  const { addToast } = useToast();

  const handleRequestAdvice = (productName?: string) => {
    if (productName) setSelectedProductTitle(productName);
    setAdviceModalOpen(true);
  };

  const handleAdviceSubmit = () => {
    if (!consentChecked) {
      setConsentError('Quý khách vui lòng tích chọn đồng thuận để tiếp tục (Bắt buộc theo Luật số 91/2025/QH15).');
      return;
    }
    setConsentError(undefined);
    setAdviceModalOpen(false);
    addToast({
      type: 'success',
      title: 'Đã gửi yêu cầu tư vấn thành công',
      message: 'Thông tin được mã hoá và chuyển tiếp đến nhân viên tín dụng. Mã audit đã ghi nhận.',
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#1F2933] flex flex-col font-sans">
      {/* 1. Global Header with Utility Bar, Mega-menu, VI/EN toggle, CTAs, and Mobile Drawer */}
      <Header
        locale={locale}
        onLocaleChange={setLocale}
        onLoginClick={() => setLoginModalOpen(true)}
        onRequestAdviceClick={() => handleRequestAdvice()}
        onNavigate={(path) => {
          if (path === '/styleguide') {
            setActiveTab('styleguide');
          } else {
            setActiveTab('platform');
          }
        }}
      />

      {/* Mandatory Non-Bank Disclaimer Banner */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <DisclaimerBanner lang={locale} />
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Navigation Tabs between Platform Experience and Admin Styleguide */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E3E7ED] pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('platform')}
              className={`px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'platform'
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'bg-white text-[#5B6576] border border-[#E3E7ED] hover:bg-[#F7F8FA]'
              }`}
            >
              Nền tảng So sánh Finazen
            </button>
            <button
              onClick={() => setActiveTab('styleguide')}
              className={`px-4 py-2 rounded-[8px] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'styleguide'
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'bg-white text-[#5B6576] border border-[#E3E7ED] hover:bg-[#F7F8FA]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Hệ thống Thiết kế (/styleguide)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5B6576]">
            <span className="hidden sm:inline">Tuân thủ Luật 91/2025/QH15</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
          </div>
        </div>

        {/* VIEW 1: PLATFORM EXPERIENCE */}
        {activeTab === 'platform' ? (
          <div className="space-y-10">
            {/* Hero Section */}
            <section className="text-center space-y-4 max-w-4xl mx-auto pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F5F5] border border-[#0F8B8D]/30 text-[#085658] text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F8B8D]" />
                <span>Nền tảng so sánh lãi suất độc lập & minh bạch tại Việt Nam</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B2545] leading-tight">
                So sánh Lãi suất Ngân hàng & Kết nối Tư vấn Tín nhiệm
              </h1>
              <p className="text-[#5B6576] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Tra cứu biểu lãi suất vay mua nhà, vay tiêu dùng, gửi tiết kiệm và bảo hiểm từ các tổ chức tài chính hàng đầu. Mọi yêu cầu tư vấn chỉ được chuyển tiếp khi có sự đồng thuận rõ ràng theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleRequestAdvice()}
                  className="font-bold shadow-sm"
                >
                  <span>Nhận tư vấn miễn phí</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setActiveTab('styleguide')}
                >
                  Xem Thư viện Thành phần (/styleguide)
                </Button>
              </div>
            </section>

            {/* Interactive Slider Input Pair Demo */}
            <Card className="border-[#E3E7ED]">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-[#0B2545] flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#0F8B8D]" />
                  Ước tính Nhu cầu Vay vốn & Định dạng Tiền tệ Tức thì (VND Formatting)
                </CardTitle>
                <CardDescription>
                  Gõ trực tiếp hoặc kéo thanh trượt để trải nghiệm đồng bộ số liệu chuẩn định dạng Việt Nam.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <SliderNumberInput
                  label="Số tiền dự kiến vay thế chấp"
                  value={loanAmount}
                  onChange={setLoanAmount}
                  min={100_000_000}
                  max={10_000_000_000}
                  step={50_000_000}
                  quickAmounts={[500_000_000, 1_000_000_000, 1_500_000_000, 2_000_000_000, 3_000_000_000]}
                />
              </CardContent>
            </Card>

            {/* Featured RateCards Grid (Equal Heights) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0B2545]">Gói Vay Mua Nhà Ưu Đãi Tiêu Biểu</h2>
                  <p className="text-xs text-[#5B6576]">Cấu trúc chuẩn RateCard: Logo 40px, số hero 32px tabular, 3 key facts, bằng chiều cao</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                <RateCard
                  id="vcb-1"
                  bankName="Vietcombank"
                  bankCode="VCB"
                  productName="Gói Vay Mua Nhà An Gia"
                  headlineRate={5.8}
                  qualifier="Cố định 12 tháng đầu"
                  floatingRate={9.5}
                  isBestRate={true}
                  keyFacts={[
                    { label: 'Hạn mức vay', value: '75% HĐMB' },
                    { label: 'Thời hạn vay', value: 'Đến 35 năm' },
                    { label: 'Thu nhập yêu cầu', value: '≥ 12 tr/tháng' },
                  ]}
                  badges={[{ label: 'Phổ biến nhất' }]}
                  onRequestAdvice={() => handleRequestAdvice('Gói Vay Mua Nhà An Gia (Vietcombank)')}
                  onViewDetails={() => addToast({ type: 'info', title: 'Chi tiết gói vay', message: 'Hồ sơ pháp lý: HĐMB nhà ở, sổ hồng hoặc tài sản độc lập' })}
                />

                <RateCard
                  id="bidv-1"
                  bankName="BIDV"
                  bankCode="BIDV"
                  productName="Vay Mua Nhà Đô Thị Tiện Nghi"
                  headlineRate={5.9}
                  qualifier="Cố định 18 tháng đầu"
                  floatingRate={9.8}
                  keyFacts={[
                    { label: 'Hạn mức vay', value: '80% HĐMB' },
                    { label: 'Thời hạn vay', value: 'Đến 30 năm' },
                    { label: 'Giải ngân', value: '2 - 3 ngày' },
                  ]}
                  badges={[{ label: 'Ưu đãi dài hạn', variant: 'updated' }]}
                  onRequestAdvice={() => handleRequestAdvice('Vay Mua Nhà Đô Thị Tiện Nghi (BIDV)')}
                  onViewDetails={() => addToast({ type: 'info', title: 'Chi tiết BIDV', message: 'Áp dụng cho khách hàng trả lương qua tài khoản' })}
                />

                <RateCard
                  id="tcb-1"
                  bankName="Techcombank"
                  bankCode="TCB"
                  productName="Vay Bất Động Sản Linh Hoạt"
                  headlineRate={6.2}
                  qualifier="Cố định 24 tháng đầu"
                  floatingRate={10.2}
                  keyFacts={[
                    { label: 'Hạn mức vay', value: '80% HĐMB' },
                    { label: 'Thời hạn vay', value: 'Đến 35 năm' },
                    { label: 'Ân hạn gốc', value: '24 tháng' },
                  ]}
                  badges={[{ label: 'Ân hạn gốc' }]}
                  onRequestAdvice={() => handleRequestAdvice('Vay Bất Động Sản Linh Hoạt (Techcombank)')}
                  onViewDetails={() => addToast({ type: 'info', title: 'Chi tiết Techcombank', message: 'Hỗ trợ định giá online nhanh chóng' })}
                />
              </div>
            </section>

            {/* RateTable Component */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#0B2545]">Bảng Tổng Hợp Lãi Suất (RateTable)</h2>
                  <p className="text-xs text-[#5B6576]">Có thể sắp xếp, header dính (sticky), dòng viền vàng cho gói tốt nhất, tự đổi dạng thẻ dưới 600px</p>
                </div>
              </div>

              <RateTable
                items={[
                  {
                    id: '1',
                    bankName: 'Vietcombank',
                    bankCode: 'VCB',
                    productName: 'Gói Vay Mua Nhà An Gia',
                    nominalRate: 5.8,
                    promoTerm: '12 tháng',
                    postRate: 9.5,
                    maxLtv: '75%',
                    maxTenure: '35 năm',
                    monthlyEstimate: Math.round((loanAmount / (25 * 12)) + (loanAmount * 0.058 / 12)),
                    isBest: true,
                  },
                  {
                    id: '2',
                    bankName: 'BIDV',
                    bankCode: 'BIDV',
                    productName: 'Gói Vay Mua Nhà Đô Thị',
                    nominalRate: 5.9,
                    promoTerm: '18 tháng',
                    postRate: 9.8,
                    maxLtv: '80%',
                    maxTenure: '30 năm',
                    monthlyEstimate: Math.round((loanAmount / (25 * 12)) + (loanAmount * 0.059 / 12)),
                    isBest: false,
                  },
                  {
                    id: '3',
                    bankName: 'Techcombank',
                    bankCode: 'TCB',
                    productName: 'Vay Bất Động Sản Linh Hoạt',
                    nominalRate: 6.2,
                    promoTerm: '24 tháng',
                    postRate: 10.2,
                    maxLtv: '80%',
                    maxTenure: '35 năm',
                    monthlyEstimate: Math.round((loanAmount / (25 * 12)) + (loanAmount * 0.062 / 12)),
                    isBest: false,
                  },
                  {
                    id: '4',
                    bankName: 'MB Bank',
                    bankCode: 'MBB',
                    productName: 'Gói Vay Dream Home MB',
                    nominalRate: 6.5,
                    promoTerm: '12 tháng',
                    postRate: 10.5,
                    maxLtv: '85%',
                    maxTenure: '30 năm',
                    monthlyEstimate: Math.round((loanAmount / (25 * 12)) + (loanAmount * 0.065 / 12)),
                    isBest: false,
                  },
                ]}
                onRequestAdvice={(id) => handleRequestAdvice(`Gói số ${id}`)}
              />
            </section>

            {/* Payment Schedule Distribution Chart */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#0B2545]">Cơ Cấu Trả Nợ Khoản Vay (PaymentChart)</h2>
              <PaymentChart
                principal={loanAmount}
                totalInterest={Math.round(loanAmount * 0.058 * 15 * 0.65)}
                termMonths={240}
              />
            </section>

            {/* Accordion FAQ on Law 91/2025/QH15 & Loan Workflow, plus Seeded User Testimonials */}
            <HomeFaqAndTestimonials
              locale={locale}
              onRequestAdvice={() => handleRequestAdvice()}
            />
          </div>
        ) : (
          /* VIEW 2: COMPREHENSIVE /styleguide */
          <StyleguideView />
        )}
      </main>

      {/* Global Modal for Advisory Request with PDP Law Consent Checkbox */}
      <Dialog
        isOpen={adviceModalOpen}
        onClose={() => setAdviceModalOpen(false)}
        title="Đăng Ký Tư Vấn Tài Chính Miễn Phí"
        description="Thông tin của Quý khách chỉ được chuyển tiếp khi có sự đồng thuận rõ ràng theo Luật số 91/2025/QH15."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setAdviceModalOpen(false)}>
              Huỷ bỏ
            </Button>
            <Button variant="primary" size="sm" onClick={handleAdviceSubmit}>
              Xác nhận gửi hồ sơ
            </Button>
          </>
        }
      >
        <div className="space-y-4 py-2">
          <div className="p-3 bg-[#EEF1F5] rounded-[8px] text-xs">
            <span className="text-[#5B6576] block">Sản phẩm yêu cầu:</span>
            <strong className="text-[#0B2545] text-sm">{selectedProductTitle}</strong>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Họ và tên" defaultValue="Nguyễn Văn An" />
            <Input label="Số điện thoại" defaultValue="0912 345 678" />
          </div>

          <Input label="Địa chỉ Email" defaultValue="an.nguyen@example.com" />

          {/* Strict Law 91/2025/QH15 Consent Checkbox */}
          <PdpConsentCheckbox
            checked={consentChecked}
            onChange={(c) => {
              setConsentChecked(c);
              if (c) setConsentError(undefined);
            }}
            partnerNames={['Vietcombank', 'BIDV']}
            error={consentError}
          />
        </div>
      </Dialog>

      {/* Login Modal */}
      <Dialog
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title="Đăng Nhập Tài Khoản Finazen"
        description="Phiên làm việc bảo mật chuẩn ngân hàng (httpOnly, Secure, SameSite=Lax)."
        footer={
          <Button variant="outline" size="sm" onClick={() => setLoginModalOpen(false)}>
            Đóng
          </Button>
        }
      >
        <div className="py-4 space-y-4 text-center">
          <p className="text-xs text-[#5B6576] max-w-sm mx-auto">
            Đăng nhập bằng tài khoản Google để tra cứu hồ sơ và thực thi các quyền của chủ thể dữ liệu theo Luật số 91/2025/QH15.
          </p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setLoginModalOpen(false);
              addToast({ type: 'success', title: 'Đăng nhập', message: 'Đã xác thực phiên làm việc an toàn' });
            }}
            className="w-full"
          >
            Đăng nhập qua Google Sign-In
          </Button>
        </div>
      </Dialog>

      {/* 2. Global Footer with 4 Link Columns, Greyscale Partner Logos, Social Links, and Legal Strip */}
      <Footer
        onNavigate={(path) => {
          if (path === '/styleguide') {
            setActiveTab('styleguide');
          } else {
            setActiveTab('platform');
          }
        }}
      />
    </div>
  );
}
