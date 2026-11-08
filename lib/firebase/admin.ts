import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth as AdminAuth } from 'firebase-admin/auth';
import { getFirestore, Firestore as AdminFirestore } from 'firebase-admin/firestore';
import { getServerFirebaseConfig } from './env';

// Enforce server-only execution guard
if (typeof window !== 'undefined') {
  throw new Error('Firebase Admin SDK cannot and must not be loaded in browser context.');
}

const config = getServerFirebaseConfig();

let adminApp: App;

if (!getApps().length) {
  if (config.clientEmail && config.privateKey) {
    adminApp = initializeApp({
      credential: cert({
        projectId: config.projectId,
        clientEmail: config.clientEmail,
        privateKey: config.privateKey,
      }),
      projectId: config.projectId,
    });
  } else {
    // Standard Cloud Run / Google Application Default Credentials (ADC)
    adminApp = initializeApp({
      projectId: config.projectId,
    });
  }
} else {
  adminApp = getApps()[0]!;
}

export const adminAuth: AdminAuth = getAuth(adminApp);

export const adminDb: AdminFirestore =
  config.databaseId && config.databaseId !== '(default)'
    ? getFirestore(adminApp, config.databaseId)
    : getFirestore(adminApp);

export { adminApp };
