# Finazen (Vietnam) — Architecture & Scaffold Reference

Finazen is an independent personal-finance comparison and advisory-lead platform built for Vietnam. It enables Vietnamese consumers and small business households to compare loan packages (home, car, consumer, credit card, business household), savings deposit interest rates, and insurance policies across licensed Vietnamese commercial banks and insurers. Finazen connects consented leads with partner institutions.

> **CRITICAL LEGAL NOTICE:** Finazen is **NOT a bank, credit institution, or insurance company**. Finazen does not issue credit, hold consumer deposits, or underwrite insurance.

---

## 1. Non-Negotiable Architectural Principles

### 1.1 Stack & Deployment
- **Framework:** Next.js App Router with TypeScript in `strict` mode.
- **Styling:** Tailwind CSS with Plus Jakarta Sans and JetBrains Mono for tabular numbers (`tnum` / `font-feature-settings: "tnum" 1`).
- **Components:** Accessible, bank-grade shadcn/ui-style primitives with zero-pill discipline and high data density.
- **Backend & Database:** Firebase Authentication + Cloud Firestore. All sensitive mutations are handled **server-side only via Firebase Admin SDK**.
- **Deploy Target:** Google Cloud Run.

### 1.2 Multi-Language Strategy (`next-intl`)
- **Vietnamese (`vi`):** Default locale at the root URL (`/`).
- **English (`en`):** Available under `/en`.
- **Localization Files:** Stored strictly in `/messages/vi.json` and `/messages/en.json`. No hard-coded strings in components.

### 1.3 Personal Data Protection Compliance (Vietnam)
Strict adherence to:
1. **Law on Personal Data Protection No. 91/2025/QH15**
2. **Government Decree No. 356/2025/NĐ-CP**

- **Explicit, Unticked-by-Default Consent:** All consent checkboxes (`PdpConsentCheckbox`) are unchecked by default.
- **Purpose Limitation:** Customer PII is strictly limited to the purpose of advisory referral for the designated partner institution.
- **Data-Subject Rights Portal:** Self-service portal at `app/[locale]/(account)` for:
  - Access & export of stored personal data (`GET /api/account/export`)
  - Rectification of incorrect phone, email, income
  - Deletion of non-statutory records
  - Instant withdrawal of consent
- **Immutable Audit Trail:** Stored in `/consent_logs/{logId}` with timestamp, client IP, user agent, and legal basis.
- **Retention Limits:** Strict 12-month retention lifecycle for advisory inquiries.

### 1.4 Security & Session Architecture
- **Deny-by-Default Firestore Security Rules:** The client SDK cannot write directly to `leads`, `consent_logs`, `admins`, `partners`, or `products`.
- **Server Route Handlers:** All mutations go through `app/api/*` using Firebase Admin SDK after verifying session credentials and RBAC roles.
- **No Tokens in LocalStorage:** Firebase ID tokens are exchanged for **httpOnly, Secure, SameSite=Lax** session cookies (and `SameSite=Strict` for administrative consoles).

### 1.5 Vietnamese Financial Formatting Standards
- **Currency:** Dot for thousands separator, space before symbol: `1.500.000.000 ₫`.
- **Interest Rates:** Comma for decimal separator: `5,8%/năm`.
- **Dates:** `dd/mm/yyyy`.
- **Tabular Figures:** Always apply `font-variant-numeric: tabular-nums` to financial data columns.

---

## 2. Directory Structure

```text
├── app/
│   ├── [locale]/
│   │   ├── (public)/          # Public SSR/SSG pages
│   │   │   ├── layout.tsx     # Header, nav, disclaimer banner, footer
│   │   │   ├── page.tsx       # Comparison hero & market rate benchmarks
│   │   │   ├── loans/         # Home, car, consumer, card comparisons
│   │   │   ├── savings/       # Term deposit rates matrix (1M - 24M)
│   │   │   ├── insurance/     # Life, health, motor, property insurance
│   │   │   └── calculators/   # Reducing-balance loan payment scheduler
│   │   ├── (account)/         # User account & data-subject rights portal
│   │   │   └── page.tsx       # Data export, consent revocation, deletion
│   │   └── layout.tsx         # Root locale layout with AuthProvider
│   ├── admin/                 # High-security administration console
│   │   └── page.tsx           # Audit logs monitor, partner directory
│   └── api/                   # Server Route Handlers (Firebase Admin SDK)
│       ├── auth/session/      # Session cookie creation & revocation
│       └── leads/             # Consented lead creation + PDP audit log
├── components/
│   ├── ui/                    # Accessible shadcn-style UI primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── pdp-consent-checkbox.tsx
│   └── finance/               # Domain-specific financial components
│       ├── currency-display.tsx  # Tabular number formatter (1.500.000.000 ₫)
│       ├── rate-badge.tsx        # Nominal vs floating rate display (5,8%)
│       ├── disclaimer-banner.tsx # Institutional disclaimer (NOT a bank)
│       └── partner-badge.tsx     # Licensed Vietnamese institutions
├── lib/
│   ├── firebase/
│   │   ├── env.ts             # Zod-typed environment schema (client & server)
│   │   ├── client.ts          # Client Firebase App, Auth, Firestore
│   │   └── admin.ts           # Server-only Firebase Admin App, Auth, DB
│   ├── auth/
│   │   ├── types.ts           # Roles (user, advisor, partner, admin)
│   │   ├── session.ts         # Session cookie helpers (Lax/Strict)
│   │   ├── rbac.ts            # Permission hierarchy
│   │   └── context.tsx        # Client AuthProvider & Google Sign-In
│   ├── validation/
│   │   ├── pdp.ts             # Law No. 91/2025/QH15 & Decree 356 schemas
│   │   ├── lead.ts            # Advisory lead input validation
│   │   └── finance.ts         # Loan & savings calculation schemas
│   ├── finance/
│   │   └── formatters.ts      # Vnd/Percent/Date & reducing-balance logic
│   └── utils.ts               # clsx + twMerge helper
├── messages/
│   ├── vi.json                # Vietnamese strings (default)
│   └── en.json                # English strings (/en)
├── firebase-applet-config.json # Auto-provisioned Firebase configuration
├── firebase-blueprint.json    # Firestore Intermediate Representation (IR)
├── firestore.rules            # Deny-by-default security rules
└── package.json
```

---

## 3. Environment Variables Specification (Typed via Zod)

All environment variables are validated at runtime in `lib/firebase/env.ts` using Zod schemas (`clientEnvSchema` and `serverEnvSchema`).

### 3.1 Client Variables (Vite / Next.js Public)

| Variable | Type | Description | Fallback |
| :--- | :--- | :--- | :--- |
| `VITE_FIREBASE_API_KEY` | `string` | Firebase Web API Key | `firebase-applet-config.json` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `string` | Firebase Auth Domain | `firebase-applet-config.json` |
| `VITE_FIREBASE_PROJECT_ID` | `string` | Google Cloud Project ID | `firebase-applet-config.json` |
| `VITE_FIREBASE_DATABASE_ID`| `string` | Firestore Database Instance | `firebase-applet-config.json` |
| `VITE_FIREBASE_APP_ID` | `string` | Firebase App ID | `firebase-applet-config.json` |
| `VITE_FIREBASE_STORAGE_BUCKET`| `string` | Cloud Storage Bucket | `firebase-applet-config.json` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID`| `string` | FCM Sender ID | `firebase-applet-config.json` |

### 3.2 Server Variables (Cloud Run / Node.js)

| Variable | Type | Description |
| :--- | :--- | :--- |
| `FIREBASE_PROJECT_ID` | `string` | GCP Project ID for Firebase Admin SDK (defaults to ADC) |
| `FIREBASE_CLIENT_EMAIL` | `string (email)` | Optional Service Account Email |
| `FIREBASE_PRIVATE_KEY` | `string` | Optional Service Account PEM Private Key |
| `SESSION_SECRET` | `string` | Salt / secret for session cookie verification |
| `NODE_ENV` | `string` | `production` enables `Secure` flag on cookies |

---

## 4. Verification & Testing Strategy

- **Type Safety:** Run `npm run lint` (`tsc --noEmit`).
- **Compilation:** `npm run build`.
- **Unit Tests (Vitest):**
  - Loan amortization formulas (reducing balance vs flat rate).
  - Vietnamese formatters (`formatVnd`, `formatPercent`, `formatVnDate`).
  - Zod PDP consent validation (must reject `explicitConsent: false`).
- **E2E Smoke Tests (Playwright):**
  - Verify Vietnamese is served at `/` and English at `/en`.
  - Verify consent checkbox is unchecked by default.
  - Verify session cookie security flags (`httpOnly`, `SameSite`).
