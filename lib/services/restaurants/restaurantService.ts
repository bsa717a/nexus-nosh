import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore';
import { Restaurant } from '@/lib/types';

const RESTAURANTS_COLLECTION = 'restaurants';

/**
 * Get a single restaurant by ID
 */
export async function getRestaurant(restaurantId: string): Promise<Restaurant | null> {
  const db = getFirebaseDb();
  if (!isFirebaseConfigured || !db) {
    console.error('Firebase not configured or DB not initialized!');
    return null;
  }

  try {
    const restaurantRef = doc(db, RESTAURANTS_COLLECTION, restaurantId);
    const restaurantSnap = await getDoc(restaurantRef);

    if (restaurantSnap.exists()) {
      return {
        id: restaurantSnap.id,
        ...restaurantSnap.data(),
      } as Restaurant;
    }

    return null;
  } catch (error) {
    console.error('Error getting restaurant:', error);
    return null;
  }
}

/**
 * Get multiple restaurants by IDs
 */
export async function getRestaurantsByIds(restaurantIds: string[]): Promise<Restaurant[]> {
  if (!isFirebaseConfigured || !db || restaurantIds.length === 0) {
    return [];
  }

  try {
    const restaurants = await Promise.all(
      restaurantIds.map(id => getRestaurant(id))
    );

    return restaurants.filter((r): r is Restaurant => r !== null);
  } catch (error) {
    console.error('Error getting restaurants by IDs:', error);
    return [];
  }
}

/**
 * Get all restaurants (with optional filtering)
 */
export async function getAllRestaurants(
  limitCount: number = 100,
  cuisineType?: string
): Promise<Restaurant[]> {
  const db = getFirebaseDb();
  if (!isFirebaseConfigured || !db) {
    console.error('[restaurantService] Firebase not configured or DB not initialized!');
    return [];
  }

  try {
    console.log('[restaurantService] Fetching all restaurants, limit:', limitCount);
    let restaurantsQuery;
    
    if (cuisineType) {
      restaurantsQuery = query(
        collection(db, RESTAURANTS_COLLECTION),
        where('cuisineType', 'array-contains', cuisineType),
        limit(limitCount)
      );
    } else {
      restaurantsQuery = query(
        collection(db, RESTAURANTS_COLLECTION),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(restaurantsQuery);
    const restaurants = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Restaurant[];
    
    console.log('[restaurantService] Fetched restaurants:', restaurants.length, restaurants);
    return restaurants;
  } catch (error) {
    console.error('[restaurantService] Error getting restaurants:', error);
    return [];
  }
}

/**
 * Get restaurants by cuisine type
 */
export async function getRestaurantsByCuisine(
  cuisineType: string,
  limitCount: number = 20
): Promise<Restaurant[]> {
  return getAllRestaurants(limitCount, cuisineType);
}

/**
 * Get restaurants near a location (within radius)
 */
export async function getRestaurantsNearLocation(
  location: { lat: number; lng: number },
  radiusKm: number = 5,
  limitCount: number = 20
): Promise<Restaurant[]> {
  const db = getFirebaseDb();
  if (!db) {
    return [];
  }
  
  // For now, return all restaurants
  // In production, you'd use geohash or geospatial queries
  const allRestaurants = await getAllRestaurants(limitCount);
  
  // Filter by distance
  return allRestaurants.filter(restaurant => {
    const distance = calculateDistance(
      location.lat,
      location.lng,
      restaurant.coordinates.lat,
      restaurant.coordinates.lng
    );
    return distance <= radiusKm;
  });
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

