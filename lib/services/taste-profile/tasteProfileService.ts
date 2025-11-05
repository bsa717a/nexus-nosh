import { db, isFirebaseConfigured } from '@/lib/firebase/config';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { TasteProfile, Rating } from '@/lib/types';

const TASTE_PROFILES_COLLECTION = 'tasteProfiles';
const RATINGS_COLLECTION = 'ratings';

/**
 * Get or create a taste profile for a user
 */
export async function getTasteProfile(userId: string): Promise<TasteProfile | null> {
  if (!isFirebaseConfigured || !db) {
    console.warn('Firebase not configured. Returning default profile.');
    return {
      userId,
      preferences: {
        quietness: 50,
        serviceQuality: 50,
        healthiness: 50,
        value: 50,
        atmosphere: 50,
        cuisineTypes: [],
        priceRange: { min: 10, max: 100 },
      },
      learningData: {
        totalRatings: 0,
        averageRating: 0,
        lastUpdated: new Date(),
      },
    };
  }
  
  try {
    const profileRef = doc(db, TASTE_PROFILES_COLLECTION, userId);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      return profileSnap.data() as TasteProfile;
    }
    
    // Create default profile if doesn't exist
    const defaultProfile: TasteProfile = {
      userId,
      preferences: {
        quietness: 50,
        serviceQuality: 50,
        healthiness: 50,
        value: 50,
        atmosphere: 50,
        cuisineTypes: [],
        priceRange: { min: 10, max: 100 },
      },
      learningData: {
        totalRatings: 0,
        averageRating: 0,
        lastUpdated: new Date(),
      },
    };
    
    await setDoc(profileRef, defaultProfile);
    return defaultProfile;
  } catch (error) {
    console.error('Error getting taste profile:', error);
    return null;
  }
}

/**
 * Update taste profile based on new rating
 */
export async function updateTasteProfileFromRating(
  userId: string, 
  rating: Rating
): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn('Firebase not configured. Cannot update taste profile.');
    return;
  }
  
  try {
    const profile = await getTasteProfile(userId);
    if (!profile) return;

    // Fetch restaurant data to get attributes
    const restaurantRef = doc(db, 'restaurants', rating.restaurantId);
    const restaurantSnap = await getDoc(restaurantRef);
    
    if (!restaurantSnap.exists()) return;
    
    const restaurant = restaurantSnap.data();
    const attributes = restaurant.attributes;
    
    // Calculate weighted updates (simple learning algorithm)
    const learningRate = 0.1;
    const ratingWeight = (rating.rating - 3) / 2; // Normalize to -1 to 1
    
    const updatedPreferences = {
      quietness: Math.max(0, Math.min(100, 
        profile.preferences.quietness + ratingWeight * learningRate * (attributes.quietness - profile.preferences.quietness)
      )),
      serviceQuality: Math.max(0, Math.min(100,
        profile.preferences.serviceQuality + ratingWeight * learningRate * 20
      )),
      healthiness: Math.max(0, Math.min(100,
        profile.preferences.healthiness + ratingWeight * learningRate * 10
      )),
      value: Math.max(0, Math.min(100,
        profile.preferences.value + ratingWeight * learningRate * 15
      )),
      atmosphere: Math.max(0, Math.min(100,
        profile.preferences.atmosphere + ratingWeight * learningRate * (attributes.atmosphere === 'upscale' ? 30 : 10)
      )),
    };

    // Update cuisine types
    const cuisineTypes = [...new Set([
      ...profile.preferences.cuisineTypes,
      ...restaurant.cuisineType || []
    ])];

    // Update learning data
    const totalRatings = profile.learningData.totalRatings + 1;
    const averageRating = (
      (profile.learningData.averageRating * profile.learningData.totalRatings) + rating.rating
    ) / totalRatings;

    const profileRef = doc(db, TASTE_PROFILES_COLLECTION, userId);
    await updateDoc(profileRef, {
      preferences: {
        ...profile.preferences,
        ...updatedPreferences,
        cuisineTypes,
      },
      learningData: {
        totalRatings,
        averageRating,
        lastUpdated: new Date(),
      },
    });
  } catch (error) {
    console.error('Error updating taste profile:', error);
  }
}

/**
 * Calculate overlap score between two users' taste profiles
 */
export async function calculateOverlapScore(
  userId1: string, 
  userId2: string
): Promise<number> {
  if (!isFirebaseConfigured || !db) {
    return 0;
  }
  
  try {
    const [profile1, profile2] = await Promise.all([
      getTasteProfile(userId1),
      getTasteProfile(userId2),
    ]);

    if (!profile1 || !profile2) return 0;

    // Calculate preference similarity
    const pref1 = profile1.preferences;
    const pref2 = profile2.preferences;
    
    const quietnessDiff = Math.abs(pref1.quietness - pref2.quietness);
    const serviceDiff = Math.abs(pref1.serviceQuality - pref2.serviceQuality);
    const healthDiff = Math.abs(pref1.healthiness - pref2.healthiness);
    const valueDiff = Math.abs(pref1.value - pref2.value);
    const atmosphereDiff = Math.abs(pref1.atmosphere - pref2.atmosphere);

    const preferenceScore = 100 - (
      (quietnessDiff + serviceDiff + healthDiff + valueDiff + atmosphereDiff) / 5
    );

    // Calculate cuisine type overlap
    const commonCuisines = pref1.cuisineTypes.filter(c => 
      pref2.cuisineTypes.includes(c)
    ).length;
    const totalCuisines = new Set([
      ...pref1.cuisineTypes,
      ...pref2.cuisineTypes
    ]).size;
    const cuisineScore = totalCuisines > 0 ? (commonCuisines / totalCuisines) * 100 : 50;

    // Weighted average
    return (preferenceScore * 0.7 + cuisineScore * 0.3);
  } catch (error) {
    console.error('Error calculating overlap score:', error);
    return 0;
  }
}
