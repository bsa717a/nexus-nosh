import { db, isFirebaseConfigured } from '@/lib/firebase/config';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  limit,
  orderBy,
  getDoc,
  doc
} from 'firebase/firestore';
import { 
  Restaurant, 
  RestaurantRecommendation, 
  TasteProfile, 
  MeetingType 
} from '@/lib/types';
import { getTasteProfile, calculateOverlapScore } from '../taste-profile/tasteProfileService';

const RESTAURANTS_COLLECTION = 'restaurants';
const RATINGS_COLLECTION = 'ratings';
const FRIEND_RECOMMENDATIONS_COLLECTION = 'friendRecommendations';

/**
 * Get personalized restaurant recommendations for a user
 */
export async function getPersonalizedRecommendations(
  userId: string,
  userLocation?: { lat: number; lng: number },
  meetingType?: MeetingType,
  limitCount: number = 20
): Promise<RestaurantRecommendation[]> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[getPersonalizedRecommendations] Firebase not configured. Returning empty recommendations.');
    return [];
  }
  
  try {
    console.log('[getPersonalizedRecommendations] Starting for user:', userId);
    const profile = await getTasteProfile(userId);
    console.log('[getPersonalizedRecommendations] Profile:', profile);
    
    // Create default profile if none exists
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
    
    const activeProfile = profile || defaultProfile;
    console.log('[getPersonalizedRecommendations] Using profile:', activeProfile);

    // Get user's past ratings to identify favorites
    let favoriteRestaurantIds: string[] = [];
    try {
      const ratingsQuery = query(
        collection(db, RATINGS_COLLECTION),
        where('userId', '==', userId),
        orderBy('rating', 'desc'),
        limit(10)
      );
      const ratingsSnapshot = await getDocs(ratingsQuery);
      favoriteRestaurantIds = ratingsSnapshot.docs
        .filter(doc => doc.data().rating >= 4)
        .map(doc => doc.data().restaurantId);
    } catch (error) {
      console.warn('[getPersonalizedRecommendations] Could not fetch ratings (may need index):', error);
      // Continue without ratings
    }

    // Get friend recommendations
    let friendRecommendedIds: string[] = [];
    try {
      const friendRecsQuery = query(
        collection(db, FRIEND_RECOMMENDATIONS_COLLECTION),
        where('toUserId', '==', userId)
      );
      const friendRecsSnapshot = await getDocs(friendRecsQuery);
      friendRecommendedIds = friendRecsSnapshot.docs.map(doc => doc.data().restaurantId);
    } catch (error) {
      console.warn('[getPersonalizedRecommendations] Could not fetch friend recommendations:', error);
      // Continue without friend recommendations
    }

    // Get all restaurants (in production, you'd add geolocation filtering)
    console.log('[getPersonalizedRecommendations] Fetching restaurants from Firestore...');
    const restaurantsQuery = query(
      collection(db, RESTAURANTS_COLLECTION),
      limit(100)
    );
    const restaurantsSnapshot = await getDocs(restaurantsQuery);
    console.log('[getPersonalizedRecommendations] Found', restaurantsSnapshot.docs.length, 'restaurants');
    const restaurants = restaurantsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Restaurant[];
    console.log('[getPersonalizedRecommendations] Restaurants:', restaurants.map(r => r.name));

    // Score and rank restaurants
    const recommendations: RestaurantRecommendation[] = restaurants.map(restaurant => {
      let score = 0;
      const reasons: string[] = [];
      let matchType: RestaurantRecommendation['matchType'] = 'smart-match';

      // Check if it's a favorite
      if (favoriteRestaurantIds.includes(restaurant.id)) {
        score += 50;
        reasons.push('One of your favorites');
        matchType = 'personal-favorite';
      }

      // Check if friend recommended
      if (friendRecommendedIds.includes(restaurant.id)) {
        score += 40;
        reasons.push('Recommended by friends');
        matchType = 'friend-recommendation';
      }

      // Taste profile matching
      const pref = activeProfile.preferences;
      const attr = restaurant.attributes;

      // Quietness match
      const quietnessDiff = Math.abs(pref.quietness - attr.quietness);
      if (quietnessDiff < 20) {
        score += 15;
        reasons.push('Matches your preference for quietness');
      }

      // Price range match
      const avgPrice = (restaurant.priceRange.min + restaurant.priceRange.max) / 2;
      if (avgPrice >= pref.priceRange.min && avgPrice <= pref.priceRange.max) {
        score += 10;
        reasons.push('Within your price range');
      }

      // Cuisine type match
      const hasPreferredCuisine = restaurant.cuisineType.some(c => 
        pref.cuisineTypes.includes(c)
      );
      if (hasPreferredCuisine) {
        score += 10;
        reasons.push('Matches your cuisine preferences');
      }

      // Meeting type match
      if (meetingType && restaurant.attributes.idealMeetingTypes.includes(meetingType)) {
        score += 20;
        reasons.push(`Perfect for ${meetingType.replace('-', ' ')}`);
      }

      // Location proximity (if user location provided)
      if (userLocation) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          restaurant.coordinates.lat,
          restaurant.coordinates.lng
        );
        if (distance < 1) { // Within 1km
          score += 15;
          reasons.push('Very close to you');
        } else if (distance < 5) { // Within 5km
          score += 10;
          reasons.push('Nearby');
        }
      }

      // Rating boost
      if (restaurant.rating.average >= 4) {
        score += 10;
        reasons.push('Highly rated');
      }

      // Ensure at least one reason
      if (reasons.length === 0) {
        reasons.push('Great option in St. George');
        score += 5; // Base score for all restaurants
      }

      return {
        restaurant,
        score,
        reasons: reasons.slice(0, 3), // Top 3 reasons
        matchType,
      };
    });

    // Sort by score and return top recommendations
    const sorted = recommendations
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, limitCount);
    console.log('[getPersonalizedRecommendations] Returning', sorted.length, 'recommendations');
    return sorted;
  } catch (error) {
    console.error('[getPersonalizedRecommendations] Error getting recommendations:', error);
    return [];
  }
}

/**
 * Get recommendations for a group meeting (finds restaurants that suit all participants)
 */
export async function getGroupRecommendations(
  userIds: string[],
  meetingType: MeetingType,
  location?: { lat: number; lng: number }
): Promise<RestaurantRecommendation[]> {
  try {
    // Get profiles for all participants
    const profiles = await Promise.all(
      userIds.map(id => getTasteProfile(id))
    );

    const validProfiles = profiles.filter(p => p !== null) as TasteProfile[];
    if (validProfiles.length === 0) return [];

    // Calculate average preferences
    const avgPreferences = {
      quietness: validProfiles.reduce((sum, p) => sum + p.preferences.quietness, 0) / validProfiles.length,
      serviceQuality: validProfiles.reduce((sum, p) => sum + p.preferences.serviceQuality, 0) / validProfiles.length,
      healthiness: validProfiles.reduce((sum, p) => sum + p.preferences.healthiness, 0) / validProfiles.length,
      value: validProfiles.reduce((sum, p) => sum + p.preferences.value, 0) / validProfiles.length,
      atmosphere: validProfiles.reduce((sum, p) => sum + p.preferences.atmosphere, 0) / validProfiles.length,
    };

    // Create a temporary merged profile for scoring
    const mergedProfile: TasteProfile = {
      userId: 'group',
      preferences: {
        ...avgPreferences,
        cuisineTypes: Array.from(new Set(
          validProfiles.flatMap(p => p.preferences.cuisineTypes)
        )),
        priceRange: {
          min: Math.max(...validProfiles.map(p => p.preferences.priceRange.min)),
          max: Math.min(...validProfiles.map(p => p.preferences.priceRange.max)),
        },
      },
      learningData: {
        totalRatings: 0,
        averageRating: 0,
        lastUpdated: new Date(),
      },
    };

    // Use the first user's ID to get recommendations, but we'll score based on group preferences
    const recommendations = await getPersonalizedRecommendations(
      userIds[0],
      location,
      meetingType
    );

    // Re-score based on group preferences
    return recommendations.map(rec => {
      const restaurant = rec.restaurant;
      const pref = mergedProfile.preferences;
      const attr = restaurant.attributes;

      // Additional scoring for group preferences
      let groupScore = 0;
      const reasons = [...rec.reasons];

      // Check if all participants would like it
      const quietnessMatch = Math.abs(pref.quietness - attr.quietness) < 25;
      const priceMatch = (restaurant.priceRange.min + restaurant.priceRange.max) / 2 >= pref.priceRange.min &&
                        (restaurant.priceRange.min + restaurant.priceRange.max) / 2 <= pref.priceRange.max;

      if (quietnessMatch && priceMatch) {
        groupScore += 30;
        reasons.push('Suitable for all participants');
      }

      return {
        ...rec,
        score: rec.score + groupScore,
        reasons: reasons.slice(0, 3),
      };
    }).sort((a, b) => b.score - a.score).slice(0, 10);
  } catch (error) {
    console.error('Error getting group recommendations:', error);
    return [];
  }
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
