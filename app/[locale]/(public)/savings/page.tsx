import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../../components/ui/table';
import { RateBadge } from '../../../../components/finance/rate-badge';
import { PartnerBadge } from '../../../../components/finance/partner-badge';
import { DisclaimerBanner } from '../../../../components/finance/disclaimer-banner';

export default async function SavingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === 'en';

  const savingsRates = [
    { bank: 'Vietcombank', code: 'VCB', type: 'STATE_OWNED_BANK' as const, m1: 1.6, m3: 1.9, m6: 2.9, m12: 4.6, m24: 4.7 },
    { bank: 'BIDV', code: 'BIDV', type: 'STATE_OWNED_BANK' as const, m1: 1.7, m3: 2.0, m6: 3.0, m12: 4.7, m24: 4.8 },
    { bank: 'Techcombank', code: 'TCB', type: 'COMMERCIAL_BANK' as const, m1: 2.25, m3: 2.55, m6: 3.65, m12: 4.85, m24: 4.85 },
    { bank: 'MB Bank', code: 'MBB', type: 'COMMERCIAL_BANK' as const, m1: 2.3, m3: 2.6, m6: 3.6, m12: 4.8, m24: 5.6 },
    { bank: 'VPBank', code: 'VPB', type: 'COMMERCIAL_BANK' as const, m1: 2.6, m3: 2.9, m6: 4.2, m12: 5.2, m24: 5.4 },
    { bank: 'ACB', code: 'ACB', type: 'COMMERCIAL_BANK' as const, m1: 2.3, m3: 2.7, m6: 3.7, m12: 4.9, m24: 5.0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {isEn ? 'Term Deposit Savings Rates in Vietnam' : 'Biểu Lãi suất Tiết kiệm Ngân hàng tại Việt Nam'}
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          {isEn
            ? 'Compare annual interest rates across standard tenures (1M, 3M, 6M, 12M, 24M) for personal deposits.'
            : 'So sánh lãi suất tiền gửi tiết kiệm cá nhân tại quầy và trực tuyến theo các kỳ hạn chuẩn.'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEn ? 'Savings Interest Rate Comparison (%/yr)' : 'Bảng Lãi suất Tiền gửi (%/năm)'}</CardTitle>
          <CardDescription>
            {isEn ? 'Lãi trả cuối kỳ, cập nhật theo niêm yết chính thức của các ngân hàng.' : 'Lãi trả cuối kỳ, số liệu tham khảo cập nhật theo biểu niêm yết chính thức.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{isEn ? 'Bank' : 'Ngân hàng'}</TableHead>
                <TableHead className="text-center">1 Tháng</TableHead>
                <TableHead className="text-center">3 Tháng</TableHead>
                <TableHead className="text-center">6 Tháng</TableHead>
                <TableHead className="text-center">12 Tháng</TableHead>
                <TableHead className="text-center">24 Tháng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savingsRates.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <PartnerBadge name={item.bank} shortCode={item.code} type={item.type} />
                  </TableCell>
                  <TableCell className="text-center font-mono font-medium">{item.m1.toFixed(2).replace('.', ',')}%</TableCell>
                  <TableCell className="text-center font-mono font-medium">{item.m3.toFixed(2).replace('.', ',')}%</TableCell>
                  <TableCell className="text-center font-mono font-medium">{item.m6.toFixed(2).replace('.', ',')}%</TableCell>
                  <TableCell className="text-center font-mono font-bold text-emerald-700">{item.m12.toFixed(2).replace('.', ',')}%</TableCell>
                  <TableCell className="text-center font-mono font-bold text-emerald-800">{item.m24.toFixed(2).replace('.', ',')}%</TableCell>
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
