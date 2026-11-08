import { z } from 'zod';

export const loanCalculatorSchema = z.object({
  loanAmount: z
    .number()
    .min(10_000_000, 'Số tiền vay tối thiểu là 10.000.000 ₫')
    .max(50_000_000_000, 'Số tiền vay tối đa là 50.000.000.000 ₫'),
  loanTermMonths: z
    .number()
    .int('Thời gian vay phải là số nguyên')
    .min(3, 'Thời gian vay tối thiểu 3 tháng')
    .max(420, 'Thời gian vay tối đa 35 năm (420 tháng)'),
  annualInterestRate: z
    .number()
    .min(0.5, 'Lãi suất tối thiểu 0,5%/năm')
    .max(45, 'Lãi suất tối đa 45%/năm'),
  preferentialPeriodMonths: z
    .number()
    .int()
    .min(0)
    .max(60)
    .default(0),
  postPreferentialRate: z
    .number()
    .min(0.5)
    .max(45)
    .optional(),
  amortizationMethod: z
    .enum(['REDUCING_BALANCE', 'FLAT_RATE'])
    .default('REDUCING_BALANCE'),
});

export type LoanCalculatorInput = z.infer<typeof loanCalculatorSchema>;

export const savingsCalculatorSchema = z.object({
  depositAmount: z
    .number()
    .min(1_000_000, 'Số tiền gửi tối thiểu 1.000.000 ₫'),
  termMonths: z
    .number()
    .int()
    .min(1, 'Kỳ hạn tối thiểu 1 tháng')
    .max(60, 'Kỳ hạn tối đa 60 tháng'),
  interestRateAnnual: z
    .number()
    .min(0.1)
    .max(18),
  payoutFrequency: z
    .enum(['END_OF_TERM', 'MONTHLY', 'QUARTERLY'])
    .default('END_OF_TERM'),
});

export type SavingsCalculatorInput = z.infer<typeof savingsCalculatorSchema>;
