export type UserRole = 'user' | 'advisor' | 'partner' | 'admin';

export interface FinazenUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  pdpConsentGiven: boolean;
  pdpConsentTimestamp?: string;
  createdAt: string;
}

export interface SessionPayload {
  uid: string;
  email?: string;
  role: UserRole;
  emailVerified: boolean;
  exp: number;
}
