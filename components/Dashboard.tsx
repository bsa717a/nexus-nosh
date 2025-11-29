import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Star, Users, Filter, Clock, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { Restaurant, RestaurantRecommendation } from '@/lib/types';
import { getPersonalizedRecommendations } from '@/lib/services/recommendations/recommendationService';
import { getTasteProfile } from '@/lib/services/taste-profile/tasteProfileService';
import { getAllRestaurants } from '@/lib/services/restaurants/restaurantService';
import { searchMapboxRestaurants } from '@/lib/services/mapbox/mapboxSearchService';
import { useAuth } from '@/lib/auth/useAuth';
import MapView, { MapViewHandle } from '@/components/MapView';

interface DashboardProps {
  userId: string;
  userLocation?: { lat: number; lng: number };
  userName?: string;
}

export default function Dashboard({ userId, userLocation, userName = 'Derek' }: DashboardProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const mapRef = useRef<MapViewHandle>(null);
  const [recommendations, setRecommendations] = useState<RestaurantRecommendation[]>([]);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [mapboxRestaurants, setMapboxRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [tasteProfile, setTasteProfile] = useState<any>(null);
  const [zipFilter, setZipFilter] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | undefined>(userLocation);
  const [showMapboxData, setShowMapboxData] = useState(true);
  const [visibleRestaurants, setVisibleRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    loadData();
  }, [userId, userLocation]);

  // Update map center when userLocation changes
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

  // Removed excessive debug logging that could cause performance issues

  async function loadData() {
    setLoading(true);
    try {
      const [recs, profile, restaurants] = await Promise.all([
        getPersonalizedRecommendations(userId, userLocation),
        getTasteProfile(userId),
        getAllRestaurants(100),
      ]);
      setRecommendations(recs);
      setTasteProfile(profile);
      setAllRestaurants(restaurants);

      // Load Mapbox restaurants if user location is available
      if (userLocation) {
        const mapboxRests = await searchMapboxRestaurants(userLocation, 10000, 25);
        setMapboxRestaurants(mapboxRests);
      }
    } catch (error) {
      console.error('[Dashboard] Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

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
  const combinedRestaurants = useMemo(() => {
    if (!showMapboxData) {
      return allRestaurants;
    }
    
    // Use Mapbox as primary source, deduplicate by matching name+location
    const restaurantMap = new Map<string, Restaurant>();
    
    // First add database restaurants (may have user enrichments)
    allRestaurants.forEach(restaurant => {
      const key = `${restaurant.name.toLowerCase()}-${restaurant.coordinates.lat.toFixed(4)}-${restaurant.coordinates.lng.toFixed(4)}`;
      restaurantMap.set(key, { ...restaurant, source: 'database' as const });
    });
    
    // Then add/override with Mapbox restaurants (prefer fresh data for name/address)
    mapboxRestaurants.forEach(mapboxRest => {
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
    });
    
    const restaurants = Array.from(restaurantMap.values());
    return restaurants;
  }, [allRestaurants, mapboxRestaurants, showMapboxData]);

  // Filter and sort restaurants
  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = combinedRestaurants;

    // Apply ZIP code filter if active
    if (zipFilter.trim()) {
      filtered = filtered.filter(r => r.address.includes(zipFilter.trim()));
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
  }, [combinedRestaurants, zipFilter, userLocation]);

  // Prepare taste data for radar chart
  const tasteData = tasteProfile ? [
    { trait: 'Quiet', score: tasteProfile.preferences.quietness },
    { trait: 'Speed', score: 70 }, // Service speed - could be derived from preferences
    { trait: 'Service', score: tasteProfile.preferences.serviceQuality },
    { trait: 'Healthy', score: tasteProfile.preferences.healthiness },
    { trait: 'Impress', score: tasteProfile.preferences.atmosphere },
    { trait: 'Value', score: tasteProfile.preferences.value },
  ] : [
    { trait: 'Quiet', score: 85 },
    { trait: 'Speed', score: 70 },
    { trait: 'Service', score: 90 },
    { trait: 'Healthy', score: 65 },
    { trait: 'Impress', score: 88 },
    { trait: 'Value', score: 75 },
  ];

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
    .map(rec => ({
      ...rec,
      // Add small random boost based on daily seed for variety (±5%)
      adjustedScore: (rec.matchScore || rec.score || 0) + ((getDailySeed() % rec.restaurant.name.length) - 2.5)
    }))
    .sort((a, b) => b.adjustedScore - a.adjustedScore)
    .slice(0, 3);

  // Friend recommendations
  const friendPicks = recommendations
    .filter(r => r.matchType === 'friend-recommendation')
    .slice(0, 1);

  // Personal preference match (not in top 3)
  const personalMatch = recommendations
    .filter(r => r.matchType === 'smart-match' || r.matchType === 'personal-favorite')
    .filter(r => !topPicks.find(tp => tp.restaurant.id === r.restaurant.id))
    .slice(0, 1)[0];

  // Nearby picks for map section - get top 3 unique restaurants (different from top picks)
  const nearbyPicksSet = new Set(topPicks.map(tp => tp.restaurant.id));
  const nearbyPicks = recommendations
    .filter(r => !nearbyPicksSet.has(r.restaurant.id))
    .slice(0, 3);
  
  // Get match type icon/color
  const getMatchIcon = (matchType: string) => {
    switch (matchType) {
      case 'personal-favorite':
        return { icon: Star, color: 'text-orange-500', fillColor: 'fill-orange-500' };
      case 'friend-recommendation':
        return { icon: Users, color: 'text-blue-500', fillColor: 'fill-blue-500' };
      case 'smart-match':
        return { icon: Star, color: 'text-green-500', fillColor: 'fill-green-500' };
      case 'trending':
        return { icon: Star, color: 'text-purple-500', fillColor: 'fill-purple-500' };
      default:
        return { icon: Star, color: 'text-yellow-500', fillColor: 'fill-yellow-500' };
    }
  };

  // Handle restaurant card click - focus on map
  const handleRestaurantClick = (restaurantId: string) => {
    if (mapRef.current) {
      mapRef.current.focusRestaurant(restaurantId);
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

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-orange-50 to-white min-h-screen pb-24">
      <header className="text-center relative">
        <div className="absolute top-0 right-0">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                await signOut();
                router.push('/login');
              } catch (error) {
                console.error('Error signing out:', error);
              }
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Sign Out
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">Nexus Nosh</h1>
        <p className="text-gray-600">Smart lunch pairings for business and pleasure</p>
      </header>

      {/* Welcome / Home Screen */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-3">Welcome Back, {userName}!</h2>
            <p className="text-gray-500 mb-4">Here are your top lunch spots today:</p>
            {loading ? (
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded-xl border p-3 bg-gray-100 animate-pulse h-20" />
                ))}
              </div>
            ) : topPicks.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {topPicks.map((rec, index) => {
                  const matchIcon = getMatchIcon(rec.matchType);
                  const IconComponent = matchIcon.icon;
                  return (
                    <Card key={`${rec.restaurant.id}-${index}`} className="rounded-xl shadow-sm border p-3 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">{rec.restaurant.name}</span>
                        <IconComponent className={`w-4 h-4 ${matchIcon.color} ${matchIcon.fillColor}`} />
                      </div>
                      <p className="text-gray-500 text-xs mb-1">
                        {rec.restaurant.cuisineType.slice(0, 2).join(' • ')}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rec.restaurant.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs mb-2 flex items-start hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                        <span>{rec.restaurant.address}</span>
                      </a>
                      <p className="text-gray-600 text-sm font-medium">
                        {rec.reasons[0] || 'Great match for your preferences'}
                      </p>
                      {rec.matchScore && (
                        <div className="mt-2 text-xs text-gray-400">
                          Match: {Math.round(rec.matchScore)}%
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">No recommendations yet!</p>
                <p className="text-sm">Rate some restaurants to get personalized suggestions.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.section>

      {/* Recommendations & Social Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Smart Recommendations</h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Personal Preference Match */}
              {personalMatch ? (
                <Card className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 mr-2 text-orange-500 fill-orange-500" />
                    <span className="font-semibold text-gray-800">{personalMatch.restaurant.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {personalMatch.restaurant.cuisineType.slice(0, 2).join(' • ')}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalMatch.restaurant.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs mb-2 flex items-start hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                    <span>{personalMatch.restaurant.address}</span>
                  </a>
                  <p className="text-sm text-gray-600 font-medium mt-2">
                    {personalMatch.reasons[0] || 'Great match for your preferences'}
                  </p>
                  {personalMatch.matchScore && (
                    <div className="mt-2 text-xs text-gray-400">
                      Match: {Math.round(personalMatch.matchScore)}%
                    </div>
                  )}
                </Card>
              ) : (
                <Card className="p-4 border rounded-xl bg-gray-50">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 mr-2 text-orange-500" />
                    <span className="font-semibold text-gray-600">Personal Match</span>
                  </div>
                  <p className="text-sm text-gray-500">Rate more restaurants to get personalized matches</p>
                </Card>
              )}

              {/* Friend Pick */}
              {friendPicks.length > 0 ? (
                <Card className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 mr-2 text-blue-500 fill-blue-500" />
                    <span className="font-semibold text-gray-800">{friendPicks[0].restaurant.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {friendPicks[0].restaurant.cuisineType.slice(0, 2).join(' • ')}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(friendPicks[0].restaurant.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs mb-2 flex items-start hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                    <span>{friendPicks[0].restaurant.address}</span>
                  </a>
                  <p className="text-sm text-gray-600 font-medium mt-2">
                    {friendPicks[0].friendRecommendations && friendPicks[0].friendRecommendations.length > 0
                      ? `${friendPicks[0].friendRecommendations[0].userName} recommends this`
                      : 'Recommended by friends'}
                  </p>
                </Card>
              ) : (
                <Card className="p-4 border rounded-xl bg-gray-50">
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="font-semibold text-gray-600">Friend Picks</span>
                  </div>
                  <p className="text-sm text-gray-500">Connect with friends to see their favorite spots</p>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Map / Nearby Picks */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Map — Nearby Picks</h2>
              <div className="flex gap-2">
                <Button
                  variant={showMapboxData ? "solid" : "outline"}
                  size="sm"
                  onClick={() => setShowMapboxData(!showMapboxData)}
                  className={showMapboxData ? "bg-orange-500 hover:bg-orange-600 text-white" : ""}
                >
                  {showMapboxData ? "All Restaurants" : "My Restaurants"}
                </Button>
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={zipFilter}
                  onChange={(e) => setZipFilter(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-24"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleNearMeClick}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Near Me
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-[1fr_280px] gap-3">
              <div className="rounded-xl overflow-hidden h-[600px]">
                <MapView 
                  ref={mapRef}
                  restaurants={filteredAndSortedRestaurants}
                  center={mapCenter || { lat: 37.0965, lng: -113.5684 }}
                  height="100%"
                  onBoundsChange={setVisibleRestaurants}
                />
              </div>
              <div className="max-h-[600px] overflow-y-auto space-y-2 pr-2">
                {visibleRestaurants.length > 0 ? (
                  visibleRestaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      onClick={() => handleRestaurantClick(restaurant.id)}
                    >
                    <Card 
                      className="p-3 border rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <p className="font-semibold text-gray-800 text-sm">{restaurant.name}</p>
                      <p className="text-xs text-gray-500 mb-1">
                        {restaurant.cuisineType[0] || 'Restaurant'}
                        {restaurant.attributes?.atmosphere && ` • ${restaurant.attributes.atmosphere}`}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs flex items-start hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{restaurant.address}</span>
                      </a>
                    </Card>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No restaurants visible in map</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Calendar / Meeting Mode */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
              <Clock className="w-4 h-4 text-gray-500" />
            </div>
            <div className="space-y-3">
              <Card className="p-3 border rounded-xl bg-orange-50">
                <p className="font-semibold">Lunch with Tim and Jessica</p>
                <p className="text-sm text-gray-500">Suggested: Painted Pony (mutual favorite)</p>
              </Card>
              <Card className="p-3 border rounded-xl bg-blue-50">
                <p className="font-semibold">Investor Meetup</p>
                <p className="text-sm text-gray-500">Suggestion: Wood Ash Rye — quiet and upscale</p>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* AI Taste Profile */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Taste Profile</h2>
              <span className="text-sm text-gray-500">Learned from your ratings & notes</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={tasteData} cx="50%" cy="50%" outerRadius="80%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="trait" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar 
                      name="You" 
                      dataKey="score" 
                      stroke="#fb923c" 
                      fill="#fb923c" 
                      fillOpacity={0.3} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  • You favor <span className="font-semibold">quiet</span> spaces and high{' '}
                  <span className="font-semibold">service</span>.
                </p>
                <p>
                  • Try more <span className="font-semibold">healthy</span> options similar to your favorites.
                </p>
                <p>
                  • Friends lean slightly higher on <span className="font-semibold">value</span> — consider overlap picks.
                </p>
                <div className="pt-2">
                  <Button variant="outline" size="sm">Compare with Friends</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

               {/* Action Bar */}
               <div className="fixed bottom-6 inset-x-0 flex justify-center z-50 gap-4">
                 <Link href="/profile">
                   <Button
                     className="rounded-full shadow-lg px-6 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white"
                   >
                     <User className="w-5 h-5 mr-2" />
                     Profile
                   </Button>
                 </Link>
                 <Link href="/restaurants">
                   <Button 
                     className="rounded-full shadow-lg px-6 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white"
                   >
                     <MapPin className="w-5 h-5 mr-2" />
                     Restaurants
                   </Button>
                 </Link>
                 <Button className="rounded-full shadow-lg px-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white">
                   + Add Restaurant
                 </Button>
               </div>
    </div>
  );
}
