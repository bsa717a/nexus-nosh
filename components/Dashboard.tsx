import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Star, Sparkles, Navigation, ChevronRight } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { motion } from 'framer-motion';
import { Restaurant, RestaurantRecommendation } from '@/lib/types';
import { getPersonalizedRecommendations } from '@/lib/services/recommendations/recommendationService';
import { getTasteProfile } from '@/lib/services/taste-profile/tasteProfileService';
import { getAllRestaurants } from '@/lib/services/restaurants/restaurantService';
import { searchMapboxRestaurants, geocodeZipCode } from '@/lib/services/mapbox/mapboxSearchService';
import MapView, { MapViewHandle } from '@/components/MapView';
import AddToListButton from '@/components/AddToListButton';

interface DashboardProps {
  userId: string;
  userLocation?: { lat: number; lng: number };
  userName?: string;
}

export default function Dashboard({ userId, userLocation, userName = 'Derek' }: DashboardProps) {
  const router = useRouter();
  const mapRef = useRef<MapViewHandle>(null);
  const mapSectionRef = useRef<HTMLElement>(null);
  const [recommendations, setRecommendations] = useState<RestaurantRecommendation[]>([]);
  const [seededRecommendations, setSeededRecommendations] = useState<RestaurantRecommendation[]>([]);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [mapboxRestaurants, setMapboxRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [tasteProfile, setTasteProfile] = useState<any>(null);
  const [zipFilter, setZipFilter] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | undefined>(userLocation);
  const [showMapboxData, setShowMapboxData] = useState(true);
  const [visibleRestaurants, setVisibleRestaurants] = useState<Restaurant[]>([]);
  const [lastFetchedCenter, setLastFetchedCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingMapbox, setLoadingMapbox] = useState(false);
  const [geocodingZip, setGeocodingZip] = useState(false);
  const [focusedRestaurantId, setFocusedRestaurantId] = useState<string | null>(null);
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const zipGeocodeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Removed excessive debug logging that could cause performance issues

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [recs, profile, restaurants] = await Promise.all([
        getPersonalizedRecommendations(userId, userLocation),
        getTasteProfile(userId),
        getAllRestaurants(100),
      ]);
      setRecommendations(recs);
      setSeededRecommendations(recs);
      setTasteProfile(profile);
      setAllRestaurants(restaurants);

      // Load Mapbox restaurants if user location is available
      if (userLocation) {
        const mapboxRests = await searchMapboxRestaurants(userLocation, 10000, 25);
        setMapboxRestaurants(mapboxRests);
        setLastFetchedCenter(userLocation);
      }
    } catch (error) {
      console.error('[Dashboard] Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, userLocation]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Mix seeded recommendations with local Mapbox results for variety
  useEffect(() => {
    if (mapboxRestaurants.length > 0 || seededRecommendations.length > 0) {
      // Convert Mapbox restaurants to recommendations
      const mapboxRecs: RestaurantRecommendation[] = mapboxRestaurants.map(r => ({
        restaurant: r,
        matchScore: 70 + Math.floor(Math.random() * 26), // Random 70-95%
        matchType: 'smart-match',
        reasons: ['Popular in this area', 'Matches your location context']
      }));

      // Combine seeded and mapbox recs
      const combined = [...seededRecommendations, ...mapboxRecs];
      
      // Deduplicate by ID
      const unique = Array.from(new Map(combined.map(item => [item.restaurant.id, item])).values());
      
      // Shuffle to randomize
      const shuffled = unique.sort(() => Math.random() - 0.5);
      
      setRecommendations(shuffled.slice(0, 10));
    }
  }, [mapboxRestaurants, seededRecommendations]);

  // Update map center when userLocation changes
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  // Handle map center changes - fetch new restaurants when map moves significantly
  const handleMapCenterChange = useCallback(async (newCenter: { lat: number; lng: number }) => {
    if (!showMapboxData) return;

    // Calculate distance from last fetched center
    const FETCH_THRESHOLD_KM = 2; // Fetch new data if moved more than 2km
    
    if (lastFetchedCenter) {
      const distance = calculateDistance(
        lastFetchedCenter.lat, lastFetchedCenter.lng,
        newCenter.lat, newCenter.lng
      );
      
      // Don't fetch if we haven't moved far enough
      if (distance < FETCH_THRESHOLD_KM) {
        return;
      }
    }

    // Debounce the API call
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(async () => {
      setLoadingMapbox(true);
      try {
        const mapboxRests = await searchMapboxRestaurants(newCenter, 10000, 25);
        setMapboxRestaurants(prev => {
          // Merge new restaurants with existing ones, avoiding duplicates by ID
          const existingIds = new Set(prev.map(r => r.id));
          const newRests = mapboxRests.filter(r => !existingIds.has(r.id));
          return [...prev, ...newRests];
        });
        setLastFetchedCenter(newCenter);
      } catch (error) {
        console.error('[Dashboard] Error loading Mapbox restaurants for new area:', error);
      } finally {
        setLoadingMapbox(false);
      }
    }, 500); // 500ms debounce
  }, [showMapboxData, lastFetchedCenter]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, []);

  // Helper function to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Combine database and Mapbox restaurants
  // Strategy: Prefer Mapbox data for name/address (live data), but merge with DB enrichments
  // Also include restaurants from recommendations to ensure they're always available on the map
  const combinedRestaurants = useMemo(() => {
    // Use Mapbox as primary source, deduplicate by matching name+location
    const restaurantMap = new Map<string, Restaurant>();
    
    // First add database restaurants (may have user enrichments)
    allRestaurants.forEach(restaurant => {
      // Validate required fields before processing
      if (restaurant?.name && restaurant?.coordinates?.lat && restaurant?.coordinates?.lng) {
        const key = `${restaurant.name.toLowerCase()}-${restaurant.coordinates.lat.toFixed(4)}-${restaurant.coordinates.lng.toFixed(4)}`;
        restaurantMap.set(key, { ...restaurant, source: 'database' as const });
      }
    });
    
    // Add restaurants from recommendations (ensure they're always available)
    recommendations.forEach(rec => {
      const restaurant = rec?.restaurant;
      // Validate required fields before processing
      if (restaurant?.name && restaurant?.coordinates?.lat && restaurant?.coordinates?.lng) {
        const key = `${restaurant.name.toLowerCase()}-${restaurant.coordinates.lat.toFixed(4)}-${restaurant.coordinates.lng.toFixed(4)}`;
        // Only add if not already present (don't override existing data)
        if (!restaurantMap.has(key)) {
          restaurantMap.set(key, restaurant);
        }
      }
    });
    
    // Then add/override with Mapbox restaurants (prefer fresh data for name/address)
    if (showMapboxData) {
      mapboxRestaurants.forEach(mapboxRest => {
        // Validate required fields before processing
        if (mapboxRest?.name && mapboxRest?.coordinates?.lat && mapboxRest?.coordinates?.lng) {
          const key = `${mapboxRest.name.toLowerCase()}-${mapboxRest.coordinates.lat.toFixed(4)}-${mapboxRest.coordinates.lng.toFixed(4)}`;
          const existing = restaurantMap.get(key);
          
          if (existing) {
            // Merge: Keep Mapbox name/address/coords, but preserve DB enrichments
            restaurantMap.set(key, {
              ...existing, // Keep enrichments from DB
              id: mapboxRest.id, // Use Mapbox ID going forward
              name: mapboxRest.name, // Prefer fresh Mapbox name
              address: mapboxRest.address, // Prefer fresh Mapbox address
              coordinates: mapboxRest.coordinates, // Prefer fresh Mapbox coordinates
              source: 'mapbox' as const,
            });
          } else {
            // New restaurant from Mapbox
            restaurantMap.set(key, mapboxRest);
          }
        }
      });
    }
    
    const restaurants = Array.from(restaurantMap.values());
    return restaurants;
  }, [allRestaurants, mapboxRestaurants, showMapboxData, recommendations]);

  // Filter and sort restaurants
  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = combinedRestaurants;

    // Always include the focused restaurant, even if it would be filtered out
    const focusedRestaurant = focusedRestaurantId 
      ? combinedRestaurants.find(r => r.id === focusedRestaurantId)
      : null;

    // Apply ZIP code filter if active
    if (zipFilter.trim()) {
      filtered = filtered.filter(r => r?.address?.includes(zipFilter.trim()));
    }

    // Ensure focused restaurant is included
    if (focusedRestaurant && !filtered.find(r => r.id === focusedRestaurant.id)) {
      filtered = [focusedRestaurant, ...filtered];
    }

    // Sort by distance if user location is available
    if (userLocation && filtered.length > 0) {
      filtered = [...filtered].sort((a, b) => {
        const distA = calculateDistance(
          userLocation.lat, userLocation.lng,
          a.coordinates.lat, a.coordinates.lng
        );
        const distB = calculateDistance(
          userLocation.lat, userLocation.lng,
          b.coordinates.lat, b.coordinates.lng
        );
        return distA - distB;
      });
    }

    return filtered;
  }, [combinedRestaurants, zipFilter, userLocation, focusedRestaurantId]);

  // Top picks - top 3 UNIQUE recommendations with slight randomization for variety
  // Use date as seed so recommendations change daily but stay consistent within the day
  const getDailySeed = () => {
    const today = new Date();
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  };
  
  // Create a Set to track unique restaurant IDs
  const seenIds = new Set<string>();
  const uniqueRecs = recommendations.filter((rec) => {
    if (seenIds.has(rec.restaurant.id)) {
      return false;
    }
    seenIds.add(rec.restaurant.id);
    return true;
  });
  
  const topPicks = uniqueRecs
    .filter(rec => rec?.restaurant?.name) // Filter out any invalid recommendations
    .map(rec => ({
      ...rec,
      // Add small random boost based on daily seed for variety (±5%)
      adjustedScore: (rec.matchScore || rec.score || 0) + ((getDailySeed() % (rec.restaurant.name?.length || 1)) - 2.5)
    }))
    .sort((a, b) => b.adjustedScore - a.adjustedScore)
    .slice(0, 3);

  // Handle restaurant card click - focus on map
  const handleRestaurantClick = (restaurantId: string) => {
    // Find the restaurant from recommendations or all restaurants
    const originalRestaurant = recommendations.find(r => r.restaurant.id === restaurantId)?.restaurant 
      || allRestaurants.find(r => r.id === restaurantId)
      || mapboxRestaurants.find(r => r.id === restaurantId);
    
    if (originalRestaurant) {
      // Scroll map into view
      mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Try to find the matching restaurant in the current map list
      // 1. Exact ID match
      let mapRestaurant = filteredAndSortedRestaurants.find(r => r.id === restaurantId);
      
      // 2. If not found, try coordinate match (handles cases where ID was swapped for Mapbox ID)
      if (!mapRestaurant) {
        mapRestaurant = filteredAndSortedRestaurants.find(r => 
          Math.abs(r.coordinates.lat - originalRestaurant.coordinates.lat) < 0.0001 &&
          Math.abs(r.coordinates.lng - originalRestaurant.coordinates.lng) < 0.0001
        );
      }

      const targetId = mapRestaurant ? mapRestaurant.id : restaurantId;

      if (mapRestaurant && mapRef.current) {
        // If it's visible in the list, focus immediately using the CORRECT ID from the list
        mapRef.current.focusRestaurant(targetId);
        return;
      }

      // If not visible (e.g. filtered out), we need to force it into the list
      setFocusedRestaurantId(targetId);
      
      // Clear ZIP filter if it would hide this restaurant
      if (zipFilter.trim() && !originalRestaurant.address.includes(zipFilter.trim())) {
        setZipFilter('');
      }
      
      // Update map center to the restaurant location
      // The useEffect will handle focusing once the restaurant is in the list
      setMapCenter({
        lat: originalRestaurant.coordinates.lat,
        lng: originalRestaurant.coordinates.lng,
      });
      
      // Clear focused restaurant ID after 10 seconds
      setTimeout(() => {
        setFocusedRestaurantId(null);
      }, 10000);
    }
  };

  // Handle "Near Me" button click
  const handleNearMeClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(newLocation);
        },
        (error) => {
          console.error('[Dashboard] Error getting current location:', error);
          alert('Could not get your location. Please enable location services.');
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  // Handle ZIP code input - geocode and move map to that location
  const handleZipCodeChange = useCallback(async (newZip: string) => {
    setZipFilter(newZip);

    // Clear any pending geocode request
    if (zipGeocodeTimeoutRef.current) {
      clearTimeout(zipGeocodeTimeoutRef.current);
    }

    // Only geocode if it looks like a valid ZIP code (5 digits for US)
    const cleanZip = newZip.trim();
    if (cleanZip.length < 5) {
      return;
    }

    // Debounce the geocoding request
    zipGeocodeTimeoutRef.current = setTimeout(async () => {
      setGeocodingZip(true);
      try {
        const coords = await geocodeZipCode(cleanZip);
        if (coords) {
          // Move map to the ZIP code location
          setMapCenter(coords);
          // Clear existing Mapbox restaurants so new ones load for this area
          setMapboxRestaurants([]);
          setLastFetchedCenter(null);
          // Fetch restaurants for the new location
          setLoadingMapbox(true);
          const mapboxRests = await searchMapboxRestaurants(coords, 10000, 25);
          setMapboxRestaurants(mapboxRests);
          setLastFetchedCenter(coords);
          setLoadingMapbox(false);
        }
      } catch (error) {
        console.error('[Dashboard] Error geocoding ZIP code:', error);
      } finally {
        setGeocodingZip(false);
      }
    }, 600); // 600ms debounce for ZIP code input
  }, []);

  // Cleanup ZIP geocode timeout on unmount
  useEffect(() => {
    return () => {
      if (zipGeocodeTimeoutRef.current) {
        clearTimeout(zipGeocodeTimeoutRef.current);
      }
    };
  }, []);

  // Focus restaurant when it becomes available in the filtered list
  useEffect(() => {
    if (focusedRestaurantId && mapRef.current) {
      // Try exact match first
      let restaurant = filteredAndSortedRestaurants.find(r => r.id === focusedRestaurantId);
      
      // If not found, try to resolve the original restaurant to get coordinates for fuzzy match
      if (!restaurant) {
         const original = recommendations.find(r => r.restaurant.id === focusedRestaurantId)?.restaurant 
           || allRestaurants.find(r => r.id === focusedRestaurantId)
           || mapboxRestaurants.find(r => r.id === focusedRestaurantId);
           
         if (original) {
            restaurant = filteredAndSortedRestaurants.find(r => 
              Math.abs(r.coordinates.lat - original.coordinates.lat) < 0.0001 &&
              Math.abs(r.coordinates.lng - original.coordinates.lng) < 0.0001
            );
         }
      }

      if (restaurant) {
        // Wait a bit for the map to update with new restaurants
        const timeoutId = setTimeout(() => {
          if (mapRef.current) {
            // Use the ID from the found restaurant (might be different from focusedRestaurantId)
            mapRef.current.focusRestaurant(restaurant.id);
          }
        }, 300);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [focusedRestaurantId, filteredAndSortedRestaurants, recommendations, allRestaurants, mapboxRestaurants]);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Get the #1 pick
  const topPick = topPicks[0];

  // Handle surprise me - random pick from recommendations
  const handleSurpriseMe = () => {
    if (recommendations.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(recommendations.length, 10));
      const randomPick = recommendations[randomIndex];
      if (randomPick) {
        handleRestaurantClick(randomPick.restaurant.id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pb-24">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 pb-4 px-6"
      >
        <p className="text-gray-500 text-sm font-medium">{getGreeting()}, {userName}</p>
        <h1 className="text-2xl font-bold text-gray-900">Ready for lunch?</h1>
      </motion.header>

      {/* Hero Section & More Picks Grid */}
      <div className="px-6 mb-6 grid md:grid-cols-2 gap-6">
      {/* Hero Recommendation */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="h-full"
      >
            {loading ? (
          <div className="bg-white rounded-3xl p-6 shadow-lg shadow-orange-100/50 animate-pulse h-full">
            <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="flex gap-3">
              <div className="h-12 bg-gray-200 rounded-xl flex-1"></div>
              <div className="h-12 bg-gray-200 rounded-xl flex-1"></div>
            </div>
          </div>
        ) : topPick ? (
          <div className="bg-white rounded-3xl p-6 shadow-lg shadow-orange-100/50 border border-orange-100/50 h-full flex flex-col justify-between">
            <div>
              {/* Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                TOP PICK
              </span>
              {topPick.matchScore && (
                <span className="text-xs text-gray-400">{Math.round(topPick.matchScore)}% match</span>
              )}
              </div>

            {/* Restaurant Name */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h2 
                onClick={() => topPick?.restaurant?.id && handleRestaurantClick(topPick.restaurant.id)}
                className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-orange-500 transition-colors flex-1"
              >
                {topPick?.restaurant?.name || 'Restaurant'}
              </h2>
              {topPick?.restaurant?.id && (
                <AddToListButton restaurantId={topPick.restaurant.id} restaurant={topPick.restaurant} size="sm" />
              )}
            </div>

            {/* Details */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span>
                {topPick?.restaurant?.cuisineType && Array.isArray(topPick.restaurant.cuisineType) 
                  ? topPick.restaurant.cuisineType.slice(0, 2).join(' • ') 
                  : 'Restaurant'}
              </span>
              {topPick?.restaurant?.priceRange?.max && (
                <>
                  <span>•</span>
                  <span>{'$'.repeat(Math.ceil(topPick.restaurant.priceRange.max / 30))}</span>
                </>
              )}
                      </div>

            {/* Reason */}
            <p className="text-gray-600 mb-5 leading-relaxed">
              {topPick?.reasons?.[0] || 'Perfect match for your taste preferences'}
            </p>
            </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-4">
                <Button 
                  onClick={handleSurpriseMe}
                className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-xl py-3 font-medium shadow-lg shadow-orange-200/50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Surprise Me
              </Button>
                        </div>
              </div>
            ) : (
          <div className="bg-white rounded-3xl p-6 shadow-lg shadow-orange-100/50 text-center h-full flex flex-col justify-center items-center">
            <Sparkles className="w-12 h-12 text-orange-300 mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No recommendations yet</h2>
            <p className="text-gray-500 text-sm mb-4">Explore the map and rate some restaurants to get personalized picks!</p>
            <Button 
              onClick={handleNearMeClick}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Find Nearby
            </Button>
              </div>
            )}
      </motion.section>

        {/* Right Column: More Picks Vertical List */}
      <motion.section 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col h-full"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">More for you</h3>
            <button className="text-orange-500 text-sm font-medium flex items-center hover:text-orange-600">
              See all <ChevronRight className="w-4 h-4" />
            </button>
            </div>
          
          {!loading && topPicks.length > 1 ? (
            <div className="space-y-3 overflow-y-auto max-h-[320px] pr-2 custom-scrollbar">
              {topPicks.slice(1).map((rec, index) => {
                if (!rec?.restaurant?.id || !rec?.restaurant?.name) return null;
                return (
                  <div 
                    key={`${rec.restaurant.id}-${index}`}
                    onClick={() => handleRestaurantClick(rec.restaurant.id)}
                    className="bg-white rounded-2xl p-4 shadow-sm shadow-gray-100/50 border border-gray-100 cursor-pointer hover:shadow-md transition-all flex items-center justify-between group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-800 text-sm truncate mb-0.5 group-hover:text-orange-600 transition-colors">
                        {rec.restaurant.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="truncate max-w-[120px]">
                          {rec.restaurant.cuisineType?.[0] || 'Restaurant'}
                        </span>
                        {rec.matchScore && (
                          <span className="font-medium text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded-full">
                            {Math.round(rec.matchScore)}% match
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <AddToListButton restaurantId={rec.restaurant.id} restaurant={rec.restaurant} size="sm" />
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                    </div>
                  </div>
                );
              })}
                  </div>
          ) : (
            <div className="bg-white/50 rounded-2xl p-8 text-center border border-dashed border-gray-200 flex items-center justify-center h-full">
              <p className="text-gray-400 text-sm">More recommendations will appear here</p>
            </div>
          )}
      </motion.section>
      </div>

      {/* Map Section */}
      <motion.section 
        ref={mapSectionRef}
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="px-6"
      >
        <div className="bg-white rounded-3xl shadow-lg shadow-gray-100/50 overflow-hidden">
          {/* Map Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Explore Nearby</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    type="text"
                  placeholder="ZIP"
                    value={zipFilter}
                    onChange={(e) => handleZipCodeChange(e.target.value)}
                  className="w-20 px-3 py-1.5 text-sm bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {geocodingZip && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <div className="animate-spin rounded-full h-3 w-3 border-2 border-orange-500 border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNearMeClick}
                className="rounded-lg border-gray-200"
              >
                <Navigation className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => setShowMapboxData(!showMapboxData)}
                className={`rounded-lg ${showMapboxData ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {showMapboxData ? 'All' : 'Saved'}
                </Button>
              </div>
            </div>

          {/* Map */}
          <div className="relative h-[400px]">
                <MapView 
                  ref={mapRef}
                  restaurants={filteredAndSortedRestaurants}
                  center={mapCenter || { lat: 37.0965, lng: -113.5684 }}
                  height="100%"
                  onBoundsChange={setVisibleRestaurants}
                  onCenterChange={handleMapCenterChange}
                />
                {loadingMapbox && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
                <span className="text-sm font-medium text-gray-600">Finding restaurants...</span>
                  </div>
                )}
              </div>

          {/* Nearby List */}
          <div className="max-h-[200px] overflow-y-auto">
                {visibleRestaurants.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {visibleRestaurants.slice(0, 5).map((restaurant) => {
                  if (!restaurant?.id || !restaurant?.name) return null;
                  return (
                    <div
                      key={restaurant.id}
                      onClick={() => handleRestaurantClick(restaurant.id)}
                      className="flex items-center justify-between p-4 hover:bg-orange-50/50 cursor-pointer transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{restaurant.name}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {restaurant.cuisineType?.[0] || 'Restaurant'}
                          {restaurant.attributes?.atmosphere && ` • ${restaurant.attributes.atmosphere}`}
                        </p>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <AddToListButton restaurantId={restaurant.id} restaurant={restaurant} size="sm" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">Move the map to discover restaurants</p>
              </div>
            )}
              </div>
            </div>
      </motion.section>

      <BottomNav />
    </div>
  );
}
