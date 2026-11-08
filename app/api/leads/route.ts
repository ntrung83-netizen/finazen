import { NextRequest, NextResponse } from 'next/server';
import { advisoryLeadSchema } from '../../../lib/validation/lead';
import { adminDb } from '../../../lib/firebase/admin';
import { verifyServerSessionCookie, SESSION_COOKIE_NAME } from '../../../lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod input validation
    const parsed = advisoryLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dữ liệu đầu vào không hợp lệ', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 2. Strict PDP Law No. 91/2025/QH15 check
    if (!data.consent.explicitConsent) {
      return NextResponse.json(
        { error: 'Bắt buộc phải có sự đồng thuận rõ ràng theo Luật số 91/2025/QH15.' },
        { status: 403 }
      );
    }

    // 3. Extract caller session if available
    const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = sessionCookie ? await verifyServerSessionCookie(sessionCookie) : null;

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const auditId = `aud_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // 4. Atomic transaction / batch via Admin SDK:
    // Write lead document + immutable consent log
    const batch = adminDb.batch();

    const consentLogRef = adminDb.collection('consent_logs').doc(auditId);
    batch.set(consentLogRef, {
      id: auditId,
      userId: session?.uid || null,
      leadId,
      ipAddress: clientIp,
      userAgent,
      purpose: data.consent.purpose,
      consentType: 'LEAD_FORWARDING',
      granted: true,
      partnerIds: data.consent.selectedPartnerIds,
      lawReference: 'Luật số 91/2025/QH15 & Nghị định 356/2025/NĐ-CP',
      timestamp: new Date().toISOString(),
    });

    const leadRef = adminDb.collection('leads').doc(leadId);
    batch.set(leadRef, {
      id: leadId,
      userId: session?.uid || null,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      province: data.province,
      productType: data.productType,
      requestedAmount: data.requestedAmount,
      monthlyIncome: data.monthlyIncome || null,
      partnerId: data.targetPartnerId,
      consentAuditId: auditId,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      leadId,
      auditId,
      message: 'Yêu cầu tư vấn đã được ghi nhận và chuyển tiếp an toàn theo Luật số 91/2025/QH15.',
    });
  } catch (error: any) {
    console.error('Lead submission route error:', error);
    return NextResponse.json(
      { error: error.message || 'Không thể ghi nhận yêu cầu tư vấn' },
      { status: 500 }
    );
  }
}
