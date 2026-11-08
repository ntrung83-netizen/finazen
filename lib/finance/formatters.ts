/**
 * Bank-grade Vietnamese financial formatting helpers.
 * Standards:
 * - Currency: dot for thousands separator, space before currency symbol: 1.500.000.000 ₫
 * - Rate / Percentage: comma for decimal separator: 5,8%
 * - Date: dd/mm/yyyy
 */

export function formatVnd(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0 ₫';
  }
  const rounded = Math.round(amount);
  // Vietnamese style formatting: dot for thousands separator
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(rounded);

  return `${formatted} ₫`;
}

export function formatPercent(rate: number, maxDecimals: number = 2): string {
  if (isNaN(rate) || rate === null || rate === undefined) {
    return '0%';
  }
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: maxDecimals,
  }).format(rate);

  return `${formatted}%`;
}

export function formatVnDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export interface AmortizationMonth {
  month: number;
  beginningBalance: number;
  principalPayment: number;
  interestPayment: number;
  totalMonthlyPayment: number;
  endingBalance: number;
}

/**
 * Calculates loan schedule using the Reducing Balance method (Dư nợ giảm dần).
 */
export function calculateReducingBalanceSchedule(
  principal: number,
  termMonths: number,
  annualRate: number,
  preferentialMonths: number = 0,
  postPreferentialAnnualRate?: number
): {
  schedule: AmortizationMonth[];
  firstMonthPayment: number;
  maxMonthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
} {
  const schedule: AmortizationMonth[] = [];
  const monthlyPrincipal = principal / termMonths;
  let remaining = principal;
  let totalInterest = 0;

  for (let m = 1; m <= termMonths; m++) {
    const activeRate =
      preferentialMonths > 0 && m > preferentialMonths && postPreferentialAnnualRate
        ? postPreferentialAnnualRate
        : annualRate;

    const monthlyRate = activeRate / 100 / 12;
    const interest = remaining * monthlyRate;
    const totalMonth = monthlyPrincipal + interest;
    const ending = Math.max(0, remaining - monthlyPrincipal);

    schedule.push({
      month: m,
      beginningBalance: remaining,
      principalPayment: monthlyPrincipal,
      interestPayment: interest,
      totalMonthlyPayment: totalMonth,
      endingBalance: ending,
    });

    totalInterest += interest;
    remaining = ending;
  }

  const firstMonthPayment = schedule[0]?.totalMonthlyPayment || 0;
  const maxMonthlyPayment = Math.max(...schedule.map((s) => s.totalMonthlyPayment), 0);

  return {
    schedule,
    firstMonthPayment,
    maxMonthlyPayment,
    totalInterest,
    totalPayment: principal + totalInterest,
  };
}
