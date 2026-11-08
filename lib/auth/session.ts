import { adminAuth } from '../firebase/admin';
import type { UserRole, SessionPayload } from './types';

export const SESSION_COOKIE_NAME = '__session';
export const ADMIN_COOKIE_NAME = '__admin_session';

// 5 days in milliseconds
export const SESSION_EXPIRATION_MS = 60 * 60 * 24 * 5 * 1000;

export interface CookieOptions {
  name: string;
  value: string;
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax' | 'strict';
  path: string;
}

/**
 * Creates a verified Firebase session cookie from an ID token.
 * Admin session cookies are set to SameSite=Strict; standard users to SameSite=Lax.
 */
export async function createSessionCookieFromIdToken(
  idToken: string,
  role: UserRole = 'user'
): Promise<CookieOptions> {
  const expiresIn = SESSION_EXPIRATION_MS;
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

  const isAdmin = role === 'admin';
  return {
    name: isAdmin ? ADMIN_COOKIE_NAME : SESSION_COOKIE_NAME,
    value: sessionCookie,
    maxAge: expiresIn / 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: isAdmin ? 'strict' : 'lax',
    path: '/',
  };
}

/**
 * Verifies the incoming session cookie with checkRevoked flag.
 */
export async function verifyServerSessionCookie(
  cookieValue: string
): Promise<SessionPayload | null> {
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(cookieValue, true);
    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email,
      role: (decodedClaims.role as UserRole) || 'user',
      emailVerified: Boolean(decodedClaims.email_verified),
      exp: decodedClaims.exp,
    };
  } catch (error) {
    console.error('Session cookie verification failed:', error);
    return null;
  }
}
