import { getFirebaseDb, getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/config';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import { UserRestaurantState } from '@/lib/types';

const USER_RESTAURANTS_COLLECTION = 'userRestaurants';

export async function getUserRestaurantStates(
  userId: string
): Promise<Record<string, UserRestaurantState>> {
  if (!isFirebaseConfigured) {
    console.warn('[getUserRestaurantStates] Firebase not configured. Returning empty map.');
    return {};
  }

  const db = getFirebaseDb();
  const states: Record<string, UserRestaurantState> = {};

  try {
    const statesQuery = query(
      collection(db, USER_RESTAURANTS_COLLECTION),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(statesQuery);
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as UserRestaurantState;
      states[data.restaurantId] = {
        userId: data.userId,
        restaurantId: data.restaurantId,
        wantToGo: data.wantToGo ?? false,
        hasBeen: data.hasBeen ?? false,
        personalRating: data.personalRating,
        notes: data.notes,
        zipCode: data.zipCode,
        userUploadedPhotos: data.userUploadedPhotos,
        journalEntries: data.journalEntries || [],
        updatedAt: data.updatedAt,
      };
    });
  } catch (error) {
    console.error('[getUserRestaurantStates] Failed to fetch states:', error);
  }

  return states;
}

export async function upsertUserRestaurantState(
  userId: string,
  restaurantId: string,
  updates: Partial<Omit<UserRestaurantState, 'userId' | 'restaurantId' | 'updatedAt'>>
): Promise<void> {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured');
  }

  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser || auth.currentUser.uid !== userId) {
    throw new Error('User must be authenticated to save restaurant state');
  }

  const db = getFirebaseDb();
  const stateRef = doc(db, USER_RESTAURANTS_COLLECTION, `${userId}_${restaurantId}`);

  const payload: Partial<UserRestaurantState> = {
    userId,
    restaurantId,
  };

  if (updates.wantToGo !== undefined) {
    payload.wantToGo = updates.wantToGo;
  }

  if (updates.hasBeen !== undefined) {
    payload.hasBeen = updates.hasBeen;
  }

  if (updates.personalRating !== undefined) {
    payload.personalRating = updates.personalRating;
  }

  if (updates.notes !== undefined) {
    payload.notes = updates.notes;
  }

  if (updates.zipCode !== undefined) {
    payload.zipCode = updates.zipCode;
  }

  if (updates.userUploadedPhotos !== undefined) {
    payload.userUploadedPhotos = updates.userUploadedPhotos;
  }

  if (updates.journalEntries !== undefined) {
    payload.journalEntries = updates.journalEntries;
  }

  await setDoc(
    stateRef,
    {
      ...payload,
      updatedAt: new Date(),
    },
    { merge: true }
  );
}

