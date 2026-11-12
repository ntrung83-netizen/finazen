import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  doc,
  getDocFromServer,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from './client.ts';
import { handleFirestoreError, OperationType } from './errors.ts';

export interface PaginatedResult<T> {
  items: T[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

/**
 * Validate Firestore connectivity on application boot per Firebase skill guidelines.
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'settings', 'public'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration: Firestore client is offline.');
    }
    return false;
  }
}

export interface FetchOffersOptions {
  category?: 'loan' | 'deposit' | 'insurance' | 'card';
  subcategory?: string;
  partnerId?: string;
  sortBy?: 'rankScore' | 'rate' | 'updatedAt';
  sortDirection?: 'asc' | 'desc';
  pageSize?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}

/**
 * Fetch offers with cursor-based pagination.
 * Scalable for millions of records without offset performance penalties.
 */
export async function fetchOffersPage(options: FetchOffersOptions = {}): Promise<PaginatedResult<DocumentData>> {
  const {
    category,
    subcategory,
    partnerId,
    sortBy = 'rankScore',
    sortDirection = 'desc',
    pageSize = 20,
    lastDoc = null,
  } = options;

  const path = 'offers';
  try {
    const constraints: any[] = [where('status', '==', 'published')];

    if (category) {
      constraints.push(where('category', '==', category));
    }
    if (subcategory) {
      constraints.push(where('subcategory', '==', subcategory));
    }
    if (partnerId) {
      constraints.push(where('partnerId', '==', partnerId));
    }

    constraints.push(orderBy(sortBy, sortDirection));

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    // Request pageSize + 1 to reliably detect hasMore
    constraints.push(limit(pageSize + 1));

    const q = query(collection(db, path), ...constraints);
    const snapshot = await getDocs(q);

    const docs = snapshot.docs;
    const hasMore = docs.length > pageSize;
    const resultDocs = hasMore ? docs.slice(0, pageSize) : docs;
    const newLastDoc = resultDocs.length > 0 ? resultDocs[resultDocs.length - 1] : null;

    return {
      items: resultDocs.map(d => ({ id: d.id, ...d.data() })),
      lastDoc: newLastDoc,
      hasMore,
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export interface FetchArticlesOptions {
  topic?: string;
  pageSize?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}

/**
 * Fetch editorial and educational guides with cursor pagination.
 */
export async function fetchArticlesPage(options: FetchArticlesOptions = {}): Promise<PaginatedResult<DocumentData>> {
  const { topic, pageSize = 20, lastDoc = null } = options;
  const path = 'articles';

  try {
    const constraints: any[] = [where('status', '==', 'published')];

    if (topic) {
      constraints.push(where('topic', '==', topic));
    }

    constraints.push(orderBy('publishedAt', 'desc'));

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    constraints.push(limit(pageSize + 1));

    const q = query(collection(db, path), ...constraints);
    const snapshot = await getDocs(q);

    const docs = snapshot.docs;
    const hasMore = docs.length > pageSize;
    const resultDocs = hasMore ? docs.slice(0, pageSize) : docs;
    const newLastDoc = resultDocs.length > 0 ? resultDocs[resultDocs.length - 1] : null;

    return {
      items: resultDocs.map(d => ({ id: d.id, ...d.data() })),
      lastDoc: newLastDoc,
      hasMore,
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

export interface FetchReviewsOptions {
  offerId: string;
  pageSize?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}

/**
 * Fetch approved customer reviews for a given offer with cursor pagination.
 */
export async function fetchReviewsPage(options: FetchReviewsOptions): Promise<PaginatedResult<DocumentData>> {
  const { offerId, pageSize = 20, lastDoc = null } = options;
  const path = 'reviews';

  try {
    const constraints: any[] = [
      where('offerId', '==', offerId),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc'),
    ];

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    constraints.push(limit(pageSize + 1));

    const q = query(collection(db, path), ...constraints);
    const snapshot = await getDocs(q);

    const docs = snapshot.docs;
    const hasMore = docs.length > pageSize;
    const resultDocs = hasMore ? docs.slice(0, pageSize) : docs;
    const newLastDoc = resultDocs.length > 0 ? resultDocs[resultDocs.length - 1] : null;

    return {
      items: resultDocs.map(d => ({ id: d.id, ...d.data() })),
      lastDoc: newLastDoc,
      hasMore,
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

/**
 * Fetch all active financial partners (banks & insurers) for display and filtering.
 */
export async function fetchActivePartners(): Promise<DocumentData[]> {
  const path = 'partners';
  try {
    const q = query(collection(db, path), where('isActive', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

/**
 * Fetch public site settings (contact, legal registry, PDP compliance policy, hotline).
 */
export async function fetchPublicSettings(): Promise<DocumentData | null> {
  const path = 'settings/public';
  try {
    const docSnap = await getDoc(doc(db, 'settings', 'public'));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}
