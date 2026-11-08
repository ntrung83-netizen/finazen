import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getClientFirebaseConfig } from './env';

const config = getClientFirebaseConfig();

export const firebaseApp: FirebaseApp = !getApps().length
  ? initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
    })
  : getApp();

export const auth: Auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Firestore client instance attached to the dedicated project database.
 */
export const db: Firestore = getFirestore(firebaseApp, config.firestoreDatabaseId);

export default firebaseApp;
