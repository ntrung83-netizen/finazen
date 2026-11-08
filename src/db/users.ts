import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

/**
 * Upsert user profile linked to Firebase Auth UID.
 * Prevents race conditions and synchronizes user authentication state.
 */
export async function getOrCreateUser(uid: string, email: string, displayName?: string) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(displayName ? { displayName } : {}),
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database query failed for getOrCreateUser:', error);
    throw new Error('Database operation failed. Please try again later.', { cause: error });
  }
}

/**
 * Fetch user record by Firebase Auth UID.
 */
export async function getUserByUid(uid: string) {
  try {
    const result = await db.select().from(users).where(eq(users.uid, uid));
    return result[0] || null;
  } catch (error) {
    console.error('Database query failed for getUserByUid:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}
