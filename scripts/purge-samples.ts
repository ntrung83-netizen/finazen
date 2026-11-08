/**
 * Finazen Sample Data Purge Script
 * Safely removes all records flagged with `isSample: true` before production go-live.
 * Recursively cleans up subcollections (rateHistory, offerStats shards).
 */

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Read configuration
const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

let app: App;
if (!getApps().length) {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (clientEmail && privateKey) {
    app = initializeApp({
      credential: cert({
        projectId: config.projectId,
        clientEmail,
        privateKey,
      }),
      projectId: config.projectId,
    });
  } else {
    // Cloud Run ADC
    app = initializeApp({
      projectId: config.projectId,
    });
  }
} else {
  app = getApps()[0];
}

const db = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

async function purgeCollection(collectionName: string) {
  console.log(`Checking collection '${collectionName}' for sample records...`);
  const snapshot = await db.collection(collectionName).where('isSample', '==', true).get();

  if (snapshot.empty) {
    console.log(`No sample documents found in '${collectionName}'.`);
    return;
  }

  console.log(`Found ${snapshot.size} sample documents in '${collectionName}'. Purging...`);
  const batch = db.batch();

  for (const doc of snapshot.docs) {
    // If purging offers, also delete subcollections (rateHistory) and associated offerStats shards
    if (collectionName === 'offers') {
      const historySnapshot = await doc.ref.collection('rateHistory').get();
      for (const hDoc of historySnapshot.docs) {
        batch.delete(hDoc.ref);
      }

      const shardsSnapshot = await db.collection('offerStats').doc(doc.id).collection('shards').get();
      for (const sDoc of shardsSnapshot.docs) {
        batch.delete(sDoc.ref);
      }
      batch.delete(db.collection('offerStats').doc(doc.id));
    }

    batch.delete(doc.ref);
  }

  await batch.commit();
  console.log(`✅ Cleaned up ${snapshot.size} sample records from '${collectionName}'.`);
}

async function main() {
  console.log('🧹 Initiating Finazen sample data purge...');
  const collectionsToPurge = ['offers', 'partners', 'articles', 'authors'];

  for (const coll of collectionsToPurge) {
    await purgeCollection(coll);
  }

  console.log('✨ All sample data has been successfully purged. Database is ready for live production data!');
}

main().catch(err => {
  if (err?.code === 7 || err?.message?.includes('PERMISSION_DENIED')) {
    console.warn('\n⚠️  Cloud Firestore Admin write permission was denied.');
    console.warn('   In Google Cloud Run or GCP environments, Application Default Credentials (ADC) authenticate automatically.');
    console.warn('   For local execution, supply FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in your .env or run with:');
    console.warn('   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json npm run purge\n');
    process.exit(0);
  } else {
    console.error('❌ Error during purge:', err);
    process.exit(1);
  }
});
