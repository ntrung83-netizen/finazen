import { z } from 'zod';

/**
 * Vietnam Law on Personal Data Protection No. 91/2025/QH15 & Decree 356/2025/ND-CP
 * Consent requirements:
 * 1. Must be explicit and voluntary (un-ticked by default)
 * 2. Purpose limitation (only specific financial consultation)
 * 3. Identifiable partner recipient
 * 4. Data-subject rights retention
 */
export const pdpConsentSchema = z.object({
  explicitConsent: z.literal(true, {
    message: 'Quý khách phải chủ động tích chọn đồng thuận xử lý dữ liệu theo Luật số 91/2025/QH15.',
  }),
  purpose: z.enum([
    'LOAN_ADVISORY_FORWARDING',
    'SAVINGS_CONSULTATION',
    'INSURANCE_OFFER_MATCHING',
    'GENERAL_CONSULTATION',
  ]),
  selectedPartnerIds: z.array(z.string().min(1)).min(1, {
    message: 'Vui lòng chọn ít nhất một tổ chức tài chính đối tác nhận thông tin.',
  }),
  clientTimestamp: z.string().datetime(),
});

export type PdpConsentInput = z.infer<typeof pdpConsentSchema>;

/**
 * Data Subject Rights Request Schema (Luật số 91/2025/QH15)
 * Allows users to exercise:
 * - Access: request all stored PII and forwarded lead logs
 * - Rectification: update incorrect phone, email, income
 * - Deletion: delete non-statutory records
 * - Withdrawal: revoke consent for active leads
 */
export const dataSubjectRightsSchema = z.object({
  action: z.enum(['ACCESS', 'RECTIFICATION', 'DELETION', 'WITHDRAWAL_OF_CONSENT']),
  reason: z.string().max(500).optional(),
  contactEmail: z.string().email(),
  requestedAt: z.string().datetime(),
});

export type DataSubjectRightsInput = z.infer<typeof dataSubjectRightsSchema>;
