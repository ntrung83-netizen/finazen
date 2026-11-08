'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card';
import { CurrencyDisplay } from '../../../../components/finance/currency-display';
import { RateBadge } from '../../../../components/finance/rate-badge';
import { DisclaimerBanner } from '../../../../components/finance/disclaimer-banner';
import { calculateReducingBalanceSchedule } from '../../../../lib/finance/formatters';
import { Calculator, ArrowRight, Table as TableIcon } from 'lucide-react';

export default function CalculatorsPage() {
  const [loanAmount, setLoanAmount] = useState<number>(1_500_000_000);
  const [termMonths, setTermMonths] = useState<number>(240); // 20 years
  const [preferentialRate, setPreferentialRate] = useState<number>(5.8);
  const [preferentialMonths, setPreferentialMonths] = useState<number>(12);
  const [postRate, setPostRate] = useState<number>(9.5);

  const result = calculateReducingBalanceSchedule(
    loanAmount,
    termMonths,
    preferentialRate,
    preferentialMonths,
    postRate
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          Công cụ Tính Lãi Vay & Lịch Trả Nợ Ngân hàng
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Tính toán chính xác theo phương thức Dư nợ giảm dần chuẩn nghiệp vụ ngân hàng Việt Nam.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-5 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-700" />
                Thông số Khoản Vay
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Số tiền vay</span>
                  <CurrencyDisplay amount={loanAmount} size="sm" />
                </div>
                <input
                  type="range"
                  min={100_000_000}
                  max={10_000_000_000}
                  step={50_000_000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Thời gian vay</span>
                  <span className="font-mono">{termMonths} tháng ({Math.round(termMonths / 12)} năm)</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={420}
                  step={12}
                  value={termMonths}
                  onChange={(e) => setTermMonths(Number(e.target.value))}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block">Lãi ưu đãi (%/năm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={preferentialRate}
                    onChange={(e) => setPreferentialRate(Number(e.target.value))}
                    className="mt-1 h-9 w-full rounded-md border border-slate-300 px-2.5 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block">Thời gian ưu đãi (tháng)</label>
                  <input
                    type="number"
                    value={preferentialMonths}
                    onChange={(e) => setPreferentialMonths(Number(e.target.value))}
                    className="mt-1 h-9 w-full rounded-md border border-slate-300 px-2.5 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block">Lãi suất thả nổi sau ưu đãi (%/năm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={postRate}
                  onChange={(e) => setPostRate(Number(e.target.value))}
                  className="mt-1 h-9 w-full rounded-md border border-slate-300 px-2.5 text-xs font-mono"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Output Summary */}
        <div className="lg:col-span-7 space-y-5">
          <Card className="bg-slate-900 text-white border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wider text-slate-400">
                Ước tính Nghĩa vụ Trả nợ (Tháng đầu tiên)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tabular-nums">
                  <CurrencyDisplay amount={result.firstMonthPayment} size="xl" className="text-emerald-400" />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Bao gồm: Gốc hàng tháng ({Math.round(loanAmount / termMonths).toLocaleString('vi-VN')} ₫) + Lãi tháng đầu ({Math.round(loanAmount * (preferentialRate / 100 / 12)).toLocaleString('vi-VN')} ₫)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Tổng tiền lãi phải trả:</span>
                  <CurrencyDisplay amount={result.totalInterest} size="md" className="text-white" />
                </div>
                <div>
                  <span className="text-slate-400 block">Tổng gốc và lãi cả kỳ:</span>
                  <CurrencyDisplay amount={result.totalPayment} size="md" className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
}
