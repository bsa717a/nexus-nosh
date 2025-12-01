import { getFirebaseDb, getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/config';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { Restaurant } from '@/lib/types';

const USER_LISTS_COLLECTION = 'userLists';

export interface UserListEntry {
  userId: string;
  restaurantId: string; // Format: "mapbox-{mapboxId}" or other restaurant ID
  addedAt: Date;
  // Store basic restaurant info so we don't need to fetch from Mapbox every time
  restaurantName?: string;
  restaurantAddress?: string;
  restaurantCoordinates?: {
    lat: number;
    lng: number;
  };
  restaurantCuisineType?: string[];
}

/**
 * Get all restaurant IDs in a user's list
 */
export async function getUserListIds(userId: string): Promise<string[]> {
  if (!isFirebaseConfigured) {
    console.warn('[getUserListIds] Firebase not configured. Returning empty array.');
    return [];
  }

  const db = getFirebaseDb();
  if (!db) {
    return [];
  }

  try {
    const listQuery = query(
      collection(db, USER_LISTS_COLLECTION),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(listQuery);
    const restaurantIds = snapshot.docs.map((docSnap) => {
      const data = docSnap.data() as UserListEntry;
      return data.restaurantId;
    });
    return restaurantIds;
  } catch (error) {
    console.error('[getUserListIds] Failed to fetch list:', error);
    return [];
  }
}

/**
 * Get all restaurants in a user's list
 * Uses stored restaurant data if available, otherwise fetches from Mapbox
 */
export async function getUserListRestaurants(userId: string): Promise<Restaurant[]> {
  if (!isFirebaseConfigured) {
    console.warn('[getUserListRestaurants] Firebase not configured. Returning empty array.');
    return [];
  }

  const db = getFirebaseDb();
  if (!db) {
    return [];
  }

  try {
    const listQuery = query(
      collection(db, USER_LISTS_COLLECTION),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(listQuery);
    
    const restaurants: Restaurant[] = [];
    
    // Process each list entry
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() as UserListEntry;
      const restaurantId = data.restaurantId;
      
      // If we have stored restaurant data, use it
      if (data.restaurantName && data.restaurantAddress && data.restaurantCoordinates && data.restaurantCuisineType) {
        restaurants.push({
          id: restaurantId,
          name: data.restaurantName,
          address: data.restaurantAddress,
          coordinates: data.restaurantCoordinates,
          cuisineType: data.restaurantCuisineType,
          source: restaurantId.startsWith('mapbox-') ? 'mapbox' as const : 'database' as const,
        });
      } else {
        // Skip entries without stored data
        // Old entries added before we started storing restaurant data cannot be fetched
        // due to Mapbox API limitations (session token required for Search Box API,
        // CORS issues with Geocoding API v6). Users can re-add restaurants if needed.
        console.warn('[getUserListRestaurants] Skipping restaurant without stored data:', restaurantId);
      }
    }
    
    return restaurants;
  } catch (error) {
    console.error('[getUserListRestaurants] Failed to fetch list:', error);
    return [];
  }
}

/**
 * Add a restaurant to user's list
 */
export async function addRestaurantToList(
  userId: string,
  restaurantId: string,
  restaurantData?: {
    name?: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
    cuisineType?: string[];
  }
): Promise<void> {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured');
  }

  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser || auth.currentUser.uid !== userId) {
    throw new Error('User must be authenticated to add restaurants to list');
  }

  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Database not initialized');
  }

  const listEntryRef = doc(db, USER_LISTS_COLLECTION, `${userId}_${restaurantId}`);

  const entryData: any = {
    userId,
    restaurantId,
    addedAt: Timestamp.now(),
  };

  // Store restaurant data if provided
  if (restaurantData) {
    if (restaurantData.name) entryData.restaurantName = restaurantData.name;
    if (restaurantData.address) entryData.restaurantAddress = restaurantData.address;
    if (restaurantData.coordinates) entryData.restaurantCoordinates = restaurantData.coordinates;
    if (restaurantData.cuisineType) entryData.restaurantCuisineType = restaurantData.cuisineType;
  }

  await setDoc(
    listEntryRef,
    entryData,
    { merge: true }
  );
}

/**
 * Remove a restaurant from user's list
 */
export async function removeRestaurantFromList(
  userId: string,
  restaurantId: string
): Promise<void> {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured');
  }

  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser || auth.currentUser.uid !== userId) {
    throw new Error('User must be authenticated to remove restaurants from list');
  }

  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Database not initialized');
  }

  const listEntryRef = doc(db, USER_LISTS_COLLECTION, `${userId}_${restaurantId}`);
  await deleteDoc(listEntryRef);
}

/**
 * Check if a restaurant is in user's list
 */
export async function isRestaurantInList(
  userId: string,
  restaurantId: string
): Promise<boolean> {
  const restaurantIds = await getUserListIds(userId);
  return restaurantIds.includes(restaurantId);
}

