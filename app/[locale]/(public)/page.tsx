import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';
import { CurrencyDisplay } from '../../../components/finance/currency-display';
import { RateBadge } from '../../../components/finance/rate-badge';
import { PartnerBadge } from '../../../components/finance/partner-badge';
import { DisclaimerBanner } from '../../../components/finance/disclaimer-banner';
import { HomeFaqAndTestimonials } from '../../../components/finance/home-faq-and-testimonials';
import { Building2, Landmark, ShieldCheck, Calculator, ArrowRight, CheckCircle2, TrendingDown } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 max-w-4xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isEn ? 'Independent & Transparent Financial Comparison' : 'So sánh độc lập & minh bạch dữ liệu tài chính'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {isEn
            ? 'Compare Bank Rates & Request Verified Advisory in Vietnam'
            : 'So sánh Lãi suất Ngân hàng & Kết nối Tư vấn Độc lập tại Việt Nam'}
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? 'Compare home loans, car loans, savings rates, and insurance across licensed Vietnamese institutions. Consented advisory leads forwarded in full compliance with Vietnam PDP Law No. 91/2025/QH15.'
            : 'Tra cứu lãi suất vay mua nhà, vay tiêu dùng, gửi tiết kiệm và bảo hiểm từ các ngân hàng và tổ chức tài chính uy tín. Chuyển tiếp tư vấn với sự đồng thuận minh bạch theo Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Link
            href={`/${locale}/loans`}
            className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-colors flex items-center gap-2"
          >
            <span>{isEn ? 'Compare Loan Rates' : 'So sánh gói vay'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/savings`}
            className="px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors"
          >
            {isEn ? 'Savings Deposit Rates' : 'Lãi suất tiết kiệm'}
          </Link>
          <Link
            href={`/${locale}/calculators`}
            className="px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4 text-emerald-700" />
            <span>{isEn ? 'Loan Calculator' : 'Bảng tính lãi'}</span>
          </Link>
        </div>
      </section>

      {/* Featured Rate Highlights (Server Rendered) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEn ? 'Market Rate Benchmark (November 2026)' : 'Lãi suất Thị trường Tiêu biểu (Tháng 11/2026)'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEn ? 'Aggregated from public announcements of commercial banks' : 'Tổng hợp từ biểu lãi suất công bố của các ngân hàng thương mại'}
            </p>
          </div>
          <Link href={`/${locale}/loans`} className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1">
            <span>{isEn ? 'View all 28 institutions' : 'Xem toàn bộ 28 tổ chức'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <PartnerBadge name="Vietcombank" shortCode="VCB" type="STATE_OWNED_BANK" />
                <RateBadge rate={5.8} periodText="Ưu đãi 12T" />
              </div>
              <CardTitle className="text-base pt-3">
                {isEn ? 'Home Purchase Loan' : 'Gói Vay Mua Nhà An Gia'}
              </CardTitle>
              <CardDescription>
                {isEn ? 'Max LTV 75%, tenure up to 35 years' : 'Hạn mức đến 75% giá trị, thời hạn tối đa 35 năm'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="text-xs text-slate-500 flex justify-between">
                <span>Ước tính trả góp (Vay 1,5 tỷ / 20 năm):</span>
              </div>
              <CurrencyDisplay amount={13500000} suffix="/tháng" highlight />
              <div className="pt-2">
                <Link
                  href={`/${locale}/loans`}
                  className="w-full text-center block text-xs font-semibold py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                >
                  {isEn ? 'Compare Details' : 'Xem chi tiết & điều kiện'}
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <PartnerBadge name="Techcombank" shortCode="TCB" type="COMMERCIAL_BANK" />
                <RateBadge rate={6.2} periodText="Cố định 24T" />
              </div>
              <CardTitle className="text-base pt-3">
                {isEn ? 'Prime Home Loan' : 'Vay Mua Bất Động Sản Linh Hoạt'}
              </CardTitle>
              <CardDescription>
                {isEn ? 'Flexible principal grace period up to 24 months' : 'Ân hạn nợ gốc tối đa 24 tháng, giải ngân nhanh'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="text-xs text-slate-500 flex justify-between">
                <span>Ước tính trả góp (Vay 2,0 tỷ / 25 năm):</span>
              </div>
              <CurrencyDisplay amount={17000000} suffix="/tháng" highlight />
              <div className="pt-2">
                <Link
                  href={`/${locale}/loans`}
                  className="w-full text-center block text-xs font-semibold py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                >
                  {isEn ? 'Compare Details' : 'Xem chi tiết & điều kiện'}
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <PartnerBadge name="MB Bank" shortCode="MBB" type="COMMERCIAL_BANK" />
                <RateBadge rate={5.9} periodText="Ưu đãi 18T" />
              </div>
              <CardTitle className="text-base pt-3">
                {isEn ? 'Automobile Purchase Credit' : 'Vay Mua Xe Ô Tô MB'}
              </CardTitle>
              <CardDescription>
                {isEn ? 'Finance up to 80% car value, tenure up to 8 years' : 'Hỗ trợ đến 80% giá trị xe, thời hạn vay 8 năm'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="text-xs text-slate-500 flex justify-between">
                <span>Ước tính trả góp (Vay 600 triệu / 5 năm):</span>
              </div>
              <CurrencyDisplay amount={12950000} suffix="/tháng" highlight />
              <div className="pt-2">
                <Link
                  href={`/${locale}/loans`}
                  className="w-full text-center block text-xs font-semibold py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                >
                  {isEn ? 'Compare Details' : 'Xem chi tiết & điều kiện'}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust & Legal Compliance Pillars */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {isEn ? 'Finazen Trust & Legal Operating Framework' : 'Nguyên tắc Hoạt động & Pháp lý Tín nhiệm tại Finazen'}
          </h3>
          <p className="text-xs text-slate-500">
            {isEn ? 'Built for strict compliance with Vietnamese financial and data privacy laws' : 'Thiết kế theo chuẩn mực bảo vệ dữ liệu và chuẩn an toàn thông tin tài chính'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">
              {isEn ? 'Independent Comparator' : 'Nền tảng So sánh Độc lập'}
            </h4>
            <p className="leading-relaxed">
              Finazen không đại diện độc quyền cho bất kỳ ngân hàng nào. Dữ liệu lãi suất được đối soát khách quan, giúp người dùng lựa chọn gói tài chính tối ưu nhất.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">
              {isEn ? 'Strict PDP Law 91/2025/QH15' : 'Tuân thủ Luật số 91/2025/QH15'}
            </h4>
            <p className="leading-relaxed">
              Hộp kiểm đồng thuận mặc định KHÔNG chọn trước. Thông tin của Quý khách chỉ được chuyển tiếp đúng đối tác được chỉ định với bằng chứng kiểm toán mã hoá.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">
              {isEn ? 'Bank-Grade Data Security' : 'An toàn Dữ liệu Chuẩn Ngân hàng'}
            </h4>
            <p className="leading-relaxed">
              Mọi ghi nhận dữ liệu nhạy cảm được bảo vệ qua Firebase Admin SDK trên máy chủ, phiên làm việc qua httpOnly cookie và từ chối truy cập trực tiếp từ client.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion FAQ on Law 91/2025/QH15 & Loan Workflow, plus Seeded User Testimonials */}
      <HomeFaqAndTestimonials locale={locale === 'en' ? 'en' : 'vi'} />

      {/* Institutional Disclaimer */}
      <DisclaimerBanner lang={isEn ? 'en' : 'vi'} />
    </div>
  );
}
