import { z } from 'zod';
import { pdpConsentSchema } from './pdp';

// Vietnamese mobile phone number regex (03x, 05x, 07x, 08x, 09x, or +84...)
const VIETNAM_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

export const advisoryLeadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ và tên không vượt quá 100 ký tự'),
  phoneNumber: z
    .string()
    .trim()
    .regex(VIETNAM_PHONE_REGEX, 'Số điện thoại không hợp lệ (ví dụ: 0912345678 hoặc +84912345678)'),
  email: z
    .string()
    .trim()
    .email('Địa chỉ email không hợp lệ')
    .max(120),
  province: z
    .string()
    .min(2, 'Vui lòng chọn Tỉnh/Thành phố'),
  productType: z.enum([
    'HOME_LOAN',
    'CAR_LOAN',
    'CONSUMER_LOAN',
    'CREDIT_CARD',
    'BUSINESS_LOAN',
    'SAVINGS',
    'LIFE_INSURANCE',
    'HEALTH_INSURANCE',
  ]),
  requestedAmount: z
    .number()
    .positive('Số tiền yêu cầu phải lớn hơn 0')
    .max(100_000_000_000, 'Số tiền vượt quá giới hạn tối đa'),
  monthlyIncome: z
    .number()
    .nonnegative('Thu nhập hàng tháng không thể âm')
    .optional(),
  targetPartnerId: z
    .string()
    .min(1, 'Vui lòng chọn tổ chức đối tác'),
  consent: pdpConsentSchema,
});

export type AdvisoryLeadInput = z.infer<typeof advisoryLeadSchema>;
