import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Unit tests validating Firestore Security Rules
 * Verifies ABAC invariants, zero-trust deny-by-default, and Law 91/2025/QH15 PII vault isolation.
 */
describe('Firestore Security Rules Hardening', () => {
  const rulesPath = path.resolve(process.cwd(), 'firestore.rules');
  const rulesContent = fs.readFileSync(rulesPath, 'utf8');

  it('enforces default deny catch-all at root', () => {
    expect(rulesContent).toContain('match /{document=**}');
    expect(rulesContent).toContain('allow read, write: if false;');
  });

  it('guarantees lead and PII vault collections are strictly inaccessible from client SDK', () => {
    // leads collection
    expect(rulesContent).toMatch(/match \/leads\/\{leadId\}\s*\{\s*allow read, write: if false;\s*\}/);
    // leadPii collection
    expect(rulesContent).toMatch(/match \/leadPii\/\{leadId\}\s*\{\s*allow read, write: if false;\s*\}/);
    // auditLogs collection
    expect(rulesContent).toMatch(/match \/auditLogs\/\{logId\}\s*\{\s*allow read, write: if false;\s*\}/);
    // partnerIntegrations collection
    expect(rulesContent).toMatch(/match \/partnerIntegrations\/\{partnerId\}\s*\{\s*allow read, write: if false;\s*\}/);
    // private settings
    expect(rulesContent).toMatch(/match \/settings\/private\s*\{\s*allow read, write: if false;\s*\}/);
  });

  it('protects user document from client role escalation and phoneVerified tampering', () => {
    expect(rulesContent).toContain("!request.resource.data.keys().hasAny(['role', 'phoneVerified', 'deletedAt'])");
  });

  it('enforces review constraints (phoneVerified, pending status, ID convention, size limits)', () => {
    // ID naming convention
    expect(rulesContent).toContain("reviewId == request.resource.data.offerId + '_' + request.auth.uid");
    // pending status forced on create
    expect(rulesContent).toContain("request.resource.data.status == 'pending'");
    // body length minimum and maximum
    expect(rulesContent).toContain('request.resource.data.body.size() >= 20');
    expect(rulesContent).toContain('request.resource.data.body.size() <= 2000');
    // phoneVerified requirement
    expect(rulesContent).toContain('get(/databases/$(database)/documents/users/$(request.auth.uid)).data.phoneVerified == true');
  });

  it('enforces public read strictly on published or active state', () => {
    expect(rulesContent).toContain("resource.data.isActive == true");
    expect(rulesContent).toContain("resource.data.status == 'published'");
    expect(rulesContent).toContain("resource.data.status == 'approved'");
  });
});
