import { Restaurant } from '@/lib/types';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiYnNhNzE3IiwiYSI6ImNtaG13YnZvczIxcHIybXB1N2E0NnJpcHcifQ.Z-AeF3-pt2ihl2uz71Lvxg';

interface MapboxFeature {
  id: string;
  type: string;
  place_type: string[];
  properties?: {
    category?: string;
    tel?: string;
    [key: string]: any;
  };
  text: string;
  place_name: string;
  center: [number, number]; // [lng, lat]
  context?: Array<{
    id: string;
    text: string;
    short_code?: string;
  }>;
}

interface MapboxSearchResponse {
  type: string;
  features: MapboxFeature[];
  attribution: string;
}

/**
 * Search for restaurants near a location using Mapbox Search API
 * @param location Center point for search
 * @param radiusMeters Search radius in meters (max 50000)
 * @param limit Maximum number of results (max 50)
 */
export async function searchRestaurantsNearLocation(
  location: { lat: number; lng: number },
  radiusMeters: number = 5000,
  limit: number = 50
): Promise<Restaurant[]> {
  try {
    console.log('[MapboxPlaces] Searching restaurants near:', location, 'radius:', radiusMeters);
    
    // Use Mapbox Geocoding API to search for restaurants
    // The v6 forward endpoint requires a specific query string
    const searchTerm = 'restaurant';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchTerm)}.json?proximity=${location.lng},${location.lat}&limit=${Math.min(limit, 10)}&types=poi&access_token=${MAPBOX_TOKEN}`;
    
    console.log('[MapboxPlaces] Fetching from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[MapboxPlaces] API error:', response.status, response.statusText, errorText);
      return [];
    }
    
    const data: MapboxSearchResponse = await response.json();
    console.log('[MapboxPlaces] Received features:', data.features?.length || 0, data);
    
    // Convert Mapbox features to Restaurant objects
    const restaurants: Restaurant[] = (data.features || [])
      .filter(feature => {
        // Only include POI (point of interest) types
        return feature.place_type && feature.place_type.includes('poi');
      })
      .map((feature, index) => {
        const [lng, lat] = feature.center;
        const name = feature.text;
        const address = feature.place_name;
        
        // Extract cuisine type from category or default to the category
        const cuisineType = feature.properties?.category 
          ? [feature.properties.category] 
          : ['Restaurant'];
        
        // Calculate distance from search center
        const distance = calculateDistance(
          location.lat, location.lng,
          lat, lng
        );
        
        // Filter by radius
        if (distance > radiusMeters / 1000) {
          return null;
        }
        
        // Create a Restaurant object
        const restaurant: Restaurant = {
          id: `mapbox-${feature.id}`,
          name,
          address,
          coordinates: { lat, lng },
          cuisineType,
          priceRange: {
            min: 10,
            max: 30,
          },
          attributes: {
            quietness: 50,
            serviceSpeed: 'medium' as const,
            atmosphere: 'casual' as const,
            privateBooths: false,
            walkableDistance: distance < 1,
            idealMeetingTypes: ['casual-checkin', 'social-lunch'],
          },
          rating: {
            average: 0,
            count: 0,
          },
          phone: feature.properties?.tel || undefined,
          createdAt: new Date(),
        };
        
        return restaurant;
      })
      .filter((r): r is Restaurant => r !== null);
    
    console.log('[MapboxPlaces] Converted to restaurants:', restaurants.length);
    return restaurants;
  } catch (error) {
    console.error('[MapboxPlaces] Error searching restaurants:', error);
    return [];
  }
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in kilometers
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

/**
 * Get restaurant details from Mapbox (if available)
 * Note: Mapbox Geocoding API has limited POI details
 */
export async function getRestaurantDetails(mapboxId: string): Promise<Partial<Restaurant> | null> {
  try {
    const url = `https://api.mapbox.com/search/geocode/v6/retrieve/${mapboxId}?access_token=${MAPBOX_TOKEN}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    const feature = data.features?.[0];
    
    if (!feature) {
      return null;
    }
    
    const [lng, lat] = feature.center;
    
    return {
      name: feature.properties.name || feature.text,
      address: feature.place_name,
      coordinates: { lat, lng },
      phone: feature.properties.tel || undefined,
    };
  } catch (error) {
    console.error('[MapboxPlaces] Error fetching details:', error);
    return null;
  }
}

