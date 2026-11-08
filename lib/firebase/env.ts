import { z } from 'zod';
import rawConfig from '../../firebase-applet-config.json' with { type: 'json' };

/**
 * Zod schema for client-side Firebase configuration.
 * Validates either environment variables or the auto-generated firebase-applet-config.json.
 */
export const clientEnvSchema = z.object({
  apiKey: z.string().min(1, 'Firebase API Key is required'),
  authDomain: z.string().min(1, 'Firebase Auth Domain is required'),
  projectId: z.string().min(1, 'Firebase Project ID is required'),
  firestoreDatabaseId: z.string().min(1, 'Firestore Database ID is required'),
  storageBucket: z.string().optional(),
  messagingSenderId: z.string().optional(),
  appId: z.string().min(1, 'Firebase App ID is required'),
  measurementId: z.string().optional(),
  oAuthClientId: z.string().optional(),
});

export type ClientFirebaseConfig = z.infer<typeof clientEnvSchema>;

/**
 * Zod schema for server-side Firebase Admin configuration.
 * In Cloud Run, Google Application Default Credentials (ADC) are typically used,
 * but explicit service account parameters are validated if provided.
 */
export const serverEnvSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required for Firebase Admin'),
  clientEmail: z.string().email().optional(),
  privateKey: z.string().optional(),
  databaseId: z.string().optional(),
  sessionCookieSecret: z.string().min(16, 'Session cookie encryption secret must be at least 16 chars').optional(),
});

export type ServerFirebaseConfig = z.infer<typeof serverEnvSchema>;

/**
 * Parse and validate client Firebase configuration.
 * Prioritizes runtime env vars with fallback to firebase-applet-config.json.
 */
export function getClientFirebaseConfig(): ClientFirebaseConfig {
  const candidate = {
    apiKey: (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_API_KEY) || rawConfig.apiKey || '',
    authDomain: (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_AUTH_DOMAIN) || rawConfig.authDomain || '',
    projectId: (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_PROJECT_ID) || rawConfig.projectId || '',
    firestoreDatabaseId: (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_DATABASE_ID) || rawConfig.firestoreDatabaseId || '(default)',
    storageBucket: (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_STORAGE_BUCKET) || rawConfig.storageBucket || '',
    messagingSenderId: (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_MESSAGING_SENDER_ID) || rawConfig.messagingSenderId || '',
    appId: (typeof process !== 'undefined' && process.env?.VITE_FIREBASE_APP_ID) || rawConfig.appId || '',
    measurementId: rawConfig.measurementId || '',
    oAuthClientId: rawConfig.oAuthClientId || '',
  };

  const parsed = clientEnvSchema.safeParse(candidate);
  if (!parsed.success) {
    console.error('Invalid client Firebase configuration:', parsed.error.format());
    throw new Error(`Firebase client configuration validation failed: ${parsed.error.message}`);
  }
  return parsed.data;
}

/**
 * Parse and validate server Firebase Admin configuration.
 */
export function getServerFirebaseConfig(): ServerFirebaseConfig {
  const candidate = {
    projectId: (typeof process !== 'undefined' && (process.env?.FIREBASE_PROJECT_ID || process.env?.GOOGLE_CLOUD_PROJECT)) || rawConfig.projectId || '',
    clientEmail: typeof process !== 'undefined' ? process.env?.FIREBASE_CLIENT_EMAIL : undefined,
    privateKey: typeof process !== 'undefined' ? process.env?.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') : undefined,
    databaseId: (typeof process !== 'undefined' && process.env?.FIREBASE_DATABASE_ID) || rawConfig.firestoreDatabaseId || '(default)',
    sessionCookieSecret: typeof process !== 'undefined' ? (process.env?.SESSION_SECRET || 'finazen_default_secure_session_secret_2026_xyz') : undefined,
  };

  const parsed = serverEnvSchema.safeParse(candidate);
  if (!parsed.success) {
    console.error('Invalid server Firebase configuration:', parsed.error.format());
    throw new Error(`Firebase server configuration validation failed: ${parsed.error.message}`);
  }
  return parsed.data;
}
