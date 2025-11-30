import { Restaurant } from '@/lib/types';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiYnNhNzE3IiwiYSI6ImNtaG13YnZvczIxcHIybXB1N2E0NnJpcHcifQ.Z-AeF3-pt2ihl2uz71Lvxg';

interface MapboxFeature {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    name: string;
    name_preferred?: string;
    mapbox_id: string;
    feature_type: string;
    address?: string;
    full_address?: string;
    place_formatted?: string;
    context?: {
      street?: { name: string };
      postcode?: { name: string };
      place?: { name: string };
      region?: { name: string; region_code: string };
      country?: { name: string; country_code: string };
    };
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    maki?: string; // Icon identifier
    poi_category?: string[];
    poi_category_ids?: string[];
  };
}

interface MapboxSearchResponse {
  type: string;
  features: MapboxFeature[];
  attribution: string;
}

/**
 * Search for restaurants near a location using Mapbox Search Box API
 * @param location Center point for search
 * @param radiusMeters Search radius in meters
 * @param limit Maximum number of results (max 25 for Mapbox)
 */
export async function searchMapboxRestaurants(
  location: { lat: number; lng: number },
  radiusMeters: number = 5000,
  limit: number = 25
): Promise<Restaurant[]> {
  try {
    console.log('[MapboxSearch] Searching restaurants near:', location, 'radius:', radiusMeters);
    
    if (!MAPBOX_TOKEN) {
      console.error('[MapboxSearch] No API token found!');
      return [];
    }
    
    // Mapbox Search Box API - Category search for restaurants
    // Documentation: https://docs.mapbox.com/api/search/search-box/
    const proximity = `${location.lng},${location.lat}`;
    const radiusKm = Math.round(radiusMeters / 1000);
    
    // Using the Search Box API with category filter
    // Note: Mapbox limit is max 25
    const url = `https://api.mapbox.com/search/searchbox/v1/category/restaurant?access_token=${MAPBOX_TOKEN}&proximity=${proximity}&limit=${Math.min(limit, 25)}&language=en`;
    
    console.log('[MapboxSearch] Fetching from Mapbox Search Box API...');
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[MapboxSearch] API error:', response.status, response.statusText, errorText);
      return [];
    }
    
    const data: MapboxSearchResponse = await response.json();
    console.log('[MapboxSearch] Received features:', data.features?.length || 0);
    
    // Filter results by distance and convert to Restaurant objects
    const restaurants: Restaurant[] = (data.features || [])
      .map((feature) => {
        try {
          // Calculate distance from search center
          const [lng, lat] = feature.geometry.coordinates;
          const distance = calculateDistance(location.lat, location.lng, lat, lng);
          
          // Skip if outside radius
          if (distance > radiusMeters / 1000) {
            return null;
          }
          
          // Extract address from properties
          const address = feature.properties.full_address || 
                         feature.properties.place_formatted || 
                         feature.properties.address ||
                         `${feature.properties.context?.place?.name || ''}, ${feature.properties.context?.region?.region_code || ''}`.trim();
          
          // Determine cuisine type from POI categories
          const categories = feature.properties.poi_category || [];
          const cuisineType = categories.length > 0 
            ? categories.slice(0, 3) 
            : ['Restaurant'];
          
          // Only store essential data from Mapbox
          // Users and community will enrich with ratings, attributes, etc.
          const restaurant: Restaurant = {
            id: `mapbox-${feature.properties.mapbox_id}`,
            name: feature.properties.name_preferred || feature.properties.name,
            address: address,
            coordinates: {
              lat,
              lng,
            },
            cuisineType,
            source: 'mapbox' as const,
            
            // Optional: Add walkable distance attribute if very close
            attributes: distance < 1 ? {
              walkableDistance: true,
            } : undefined,
          };
          
          return restaurant;
        } catch (error) {
          console.error('[MapboxSearch] Error parsing feature:', error, feature);
          return null;
        }
      })
      .filter((r): r is Restaurant => r !== null);
    
    console.log('[MapboxSearch] Converted to restaurants:', restaurants.length);
    return restaurants;
  } catch (error) {
    console.error('[MapboxSearch] Error searching restaurants:', error);
    return [];
  }
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @returns Distance in kilometers
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
 * Geocode a ZIP code to get its coordinates
 * @param zipCode The ZIP code to geocode
 * @returns Coordinates of the ZIP code center, or null if not found
 */
export async function geocodeZipCode(zipCode: string): Promise<{ lat: number; lng: number } | null> {
  try {
    if (!MAPBOX_TOKEN) {
      console.error('[MapboxSearch] No API token found!');
      return null;
    }

    // Clean up the ZIP code (remove spaces, ensure it's just the code)
    const cleanZip = zipCode.trim();
    if (!cleanZip || cleanZip.length < 3) {
      return null;
    }

    // Use Mapbox Geocoding API to find the ZIP code
    // Adding "USA" to improve accuracy for US ZIP codes
    const query = encodeURIComponent(`${cleanZip} USA`);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?types=postcode&limit=1&access_token=${MAPBOX_TOKEN}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('[MapboxSearch] Geocoding error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    
    if (!data.features || data.features.length === 0) {
      console.warn('[MapboxSearch] No results for ZIP code:', cleanZip);
      return null;
    }

    const feature = data.features[0];
    const [lng, lat] = feature.center;

    return { lat, lng };
  } catch (error) {
    console.error('[MapboxSearch] Error geocoding ZIP code:', error);
    return null;
  }
}

/**
 * Get detailed information about a specific place by Mapbox ID
 * (For future enhancement if needed)
 */
export async function getMapboxPlaceDetails(mapboxId: string): Promise<Partial<Restaurant> | null> {
  try {
    if (!MAPBOX_TOKEN) {
      console.error('[MapboxSearch] No API token found!');
      return null;
    }
    
    const url = `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapboxId}?access_token=${MAPBOX_TOKEN}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data: { features: MapboxFeature[] } = await response.json();
    const feature = data.features[0];
    
    if (!feature) {
      return null;
    }
    
    const [lng, lat] = feature.geometry.coordinates;
    
    return {
      name: feature.properties.name_preferred || feature.properties.name,
      address: feature.properties.full_address || feature.properties.place_formatted || '',
      coordinates: {
        lat,
        lng,
      },
    };
  } catch (error) {
    console.error('[MapboxSearch] Error fetching place details:', error);
    return null;
  }
}

