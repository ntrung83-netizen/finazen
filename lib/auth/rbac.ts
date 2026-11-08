import type { UserRole } from './types';

const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 4,
  partner: 3,
  advisor: 2,
  user: 1,
};

export function hasMinimumRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return (ROLE_HIERARCHY[userRole] ?? 0) >= (ROLE_HIERARCHY[requiredRole] ?? 0);
}

export function canPublishOffers(role: UserRole): boolean {
  return role === 'admin' || role === 'partner';
}

export function canAccessLeads(role: UserRole): boolean {
  return role === 'admin' || role === 'advisor' || role === 'partner';
}

export function canManagePartners(role: UserRole): boolean {
  return role === 'admin';
}
