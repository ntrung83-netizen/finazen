import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../../components/ui/table';
import { CurrencyDisplay } from '../../../../components/finance/currency-display';
import { RateBadge } from '../../../../components/finance/rate-badge';
import { PartnerBadge } from '../../../../components/finance/partner-badge';
import { DisclaimerBanner } from '../../../../components/finance/disclaimer-banner';
import { Building2, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

export default async function LoansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const loanPackages = [
    {
      bank: 'Vietcombank',
      code: 'VCB',
      type: 'STATE_OWNED_BANK' as const,
      category: 'Vay Mua Nhà',
      nominalRate: 5.8,
      preferentialTerm: '12 tháng',
      postRate: 9.5,
      maxLtv: '75%',
      maxTenure: '35 năm',
      minLoan: 100_000_000,
    },
    {
      bank: 'BIDV',
      code: 'BIDV',
      type: 'STATE_OWNED_BANK' as const,
      category: 'Vay Mua Nhà',
      nominalRate: 5.9,
      preferentialTerm: '18 tháng',
      postRate: 9.8,
      maxLtv: '80%',
      maxTenure: '30 năm',
      minLoan: 100_000_000,
    },
    {
      bank: 'Techcombank',
      code: 'TCB',
      type: 'COMMERCIAL_BANK' as const,
      category: 'Vay Mua Nhà / Đất',
      nominalRate: 6.2,
      preferentialTerm: '24 tháng',
      postRate: 10.2,
      maxLtv: '80%',
      maxTenure: '35 năm',
      minLoan: 200_000_000,
    },
    {
      bank: 'MB Bank',
      code: 'MBB',
      type: 'COMMERCIAL_BANK' as const,
      category: 'Vay Mua Ô Tô',
      nominalRate: 6.5,
      preferentialTerm: '12 tháng',
      postRate: 10.5,
      maxLtv: '85%',
      maxTenure: '8 năm',
      minLoan: 100_000_000,
    },
    {
      bank: 'VPBank',
      code: 'VPB',
      type: 'COMMERCIAL_BANK' as const,
      category: 'Vay Hộ Kinh Doanh',
      nominalRate: 7.2,
      preferentialTerm: '6 tháng',
      postRate: 11.8,
      maxLtv: '70%',
      maxTenure: '10 năm',
      minLoan: 50_000_000,
    },
    {
      bank: 'ACB',
      code: 'ACB',
      type: 'COMMERCIAL_BANK' as const,
      category: 'Vay Tiêu Dùng Tín Chấp',
      nominalRate: 11.5,
      preferentialTerm: 'Cố định',
      postRate: 11.5,
      maxLtv: 'Theo thu nhập',
      maxTenure: '5 năm',
      minLoan: 20_000_000,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {isEn ? 'Compare Loan Interest Rates in Vietnam' : 'So sánh Lãi suất Các Gói Vay tại Việt Nam'}
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          {isEn
            ? 'Transparent comparison of home, car, consumer, and business loans across top commercial banks.'
            : 'Biểu so sánh chi tiết lãi suất vay mua nhà, vay ô tô, tiêu dùng và sản xuất kinh doanh tại các ngân hàng thương mại.'}
        </p>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>{isEn ? 'Bank Loan Products Matrix' : 'Bảng Tổng hợp Gói Vay Ngân hàng'}</CardTitle>
          <CardDescription>
            {isEn
              ? 'All figures adhere to Vietnamese standard formatting. Actual rates subject to partner credit assessment.'
              : 'Định dạng số theo tiêu chuẩn Việt Nam (dấu chấm phân tách hàng nghìn, phẩy cho phần thập phân).'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isEn ? 'Institution' : 'Ngân hàng đối tác'}</TableHead>
                <TableHead>{isEn ? 'Category' : 'Phân loại gói vay'}</TableHead>
                <TableHead>{isEn ? 'Preferential Rate' : 'Lãi suất ưu đãi'}</TableHead>
                <TableHead>{isEn ? 'Post-Promo Rate' : 'Lãi sau ưu đãi'}</TableHead>
                <TableHead>{isEn ? 'Max LTV' : 'Tỷ lệ vay'}</TableHead>
                <TableHead>{isEn ? 'Max Tenure' : 'Thời hạn tối đa'}</TableHead>
                <TableHead className="text-right">{isEn ? 'Action' : 'Thao tác'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanPackages.map((pkg, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <PartnerBadge name={pkg.bank} shortCode={pkg.code} type={pkg.type} />
                  </TableCell>
                  <TableCell className="font-medium text-slate-800 text-xs">{pkg.category}</TableCell>
                  <TableCell>
                    <RateBadge rate={pkg.nominalRate} periodText={pkg.preferentialTerm} />
                  </TableCell>
                  <TableCell>
                    <RateBadge rate={pkg.postRate} isFloating />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{pkg.maxLtv}</TableCell>
                  <TableCell className="text-xs text-slate-600">{pkg.maxTenure}</TableCell>
                  <TableCell className="text-right">
                    <button className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer">
                      {isEn ? 'Request Advice' : 'Đăng ký tư vấn'}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DisclaimerBanner lang={isEn ? 'en' : 'vi'} />
    </div>
  );
}
