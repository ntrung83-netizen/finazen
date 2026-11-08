import { NextRequest, NextResponse } from 'next/server';
import { createSessionCookieFromIdToken, SESSION_COOKIE_NAME, ADMIN_COOKIE_NAME } from '../../../../lib/auth/session';
import { adminAuth } from '../../../../lib/firebase/admin';
import type { UserRole } from '../../../../lib/auth/types';

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken || typeof idToken !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid idToken' }, { status: 400 });
    }

    // Verify token to check for custom claims / role
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const role: UserRole = (decodedToken.role as UserRole) || 'user';

    const cookieOptions = await createSessionCookieFromIdToken(idToken, role);

    const res = NextResponse.json({ success: true, role });
    res.cookies.set({
      name: cookieOptions.name,
      value: cookieOptions.value,
      maxAge: cookieOptions.maxAge,
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      path: cookieOptions.path,
    });

    return res;
  } catch (error: any) {
    console.error('Session creation route error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create session' }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(SESSION_COOKIE_NAME);
  res.cookies.delete(ADMIN_COOKIE_NAME);
  return res;
}
