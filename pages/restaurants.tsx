import { useState, useEffect, Fragment, useRef, useMemo, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Star, DollarSign, Clock, List, Grid, Navigation } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { getAllRestaurants } from '@/lib/services/restaurants/restaurantService';
import { searchMapboxRestaurants, geocodeZipCode } from '@/lib/services/mapbox/mapboxSearchService';
import { Restaurant, UserRestaurantState } from '@/lib/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth/useAuth';
import { getUserSettings, updateViewPreferences } from '@/lib/services/user-settings/userSettingsService';
import {
  getUserRestaurantStates,
  upsertUserRestaurantState,
} from '@/lib/services/restaurants/userRestaurantStateService';
import AddToListButton from '@/components/AddToListButton';
import MapView, { MapViewHandle } from '@/components/MapView';

function RestaurantsPageContent() {
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [mapboxRestaurants, setMapboxRestaurants] = useState<Restaurant[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>();
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | undefined>();
  const [visibleRestaurants, setVisibleRestaurants] = useState<Restaurant[]>([]);
  const [lastFetchedCenter, setLastFetchedCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingMapbox, setLoadingMapbox] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isListView, setIsListView] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [userRestaurantStates, setUserRestaurantStates] = useState<Record<string, UserRestaurantState>>({});
  const [expandedRestaurants, setExpandedRestaurants] = useState<Record<string, boolean>>({});
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
  const [statusFilter, setStatusFilter] = useState<'all' | 'wantToGo' | 'hasBeen'>('all');
  const [zipFilter, setZipFilter] = useState('');

  const { user } = useAuth();
  const isAuthenticated = Boolean(user);
  const noteSaveTimeouts = useRef<Record<string, NodeJS.Timeout>>({});
  const mapRef = useRef<MapViewHandle>(null);
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const zipGeocodeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      Object.values(noteSaveTimeouts.current).forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('[Restaurants] Error getting location:', error);
          // Fallback to Saint George, Utah
          setUserLocation({ lat: 37.0965, lng: -113.5684 });
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 300000, // Cache for 5 minutes
        }
      );
    } else {
      // Fallback to Saint George, Utah
      setUserLocation({ lat: 37.0965, lng: -113.5684 });
    }
  }, []);

  useEffect(() => {
    if (userLocation !== undefined) {
      setMapCenter(userLocation);
      loadRestaurants();
    }
  }, [userLocation]);

  // Update map center when userLocation changes
  useEffect(() => {
    if (userLocation) {
      setMapCenter(userLocation);
    }
  }, [userLocation]);

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

  // Handle map center changes - fetch new restaurants when map moves significantly
  const handleMapCenterChange = useCallback(async (newCenter: { lat: number; lng: number }) => {
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
        const mapboxRests = await searchMapboxRestaurants(newCenter, 10000, 50);
        setMapboxRestaurants(prev => {
          // Merge new restaurants with existing ones, avoiding duplicates by ID
          const existingIds = new Set(prev.map(r => r.id));
          const newRests = mapboxRests.filter(r => !existingIds.has(r.id));
          return [...prev, ...newRests];
        });
        setLastFetchedCenter(newCenter);
      } catch (error) {
        console.error('[Restaurants] Error loading Mapbox restaurants for new area:', error);
      } finally {
        setLoadingMapbox(false);
      }
    }, 500); // 500ms debounce
  }, [lastFetchedCenter]);

  // Handle map bounds change - update visible restaurants list
  const handleBoundsChange = useCallback((visible: Restaurant[]) => {
    setVisibleRestaurants(visible);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      if (zipGeocodeTimeoutRef.current) {
        clearTimeout(zipGeocodeTimeoutRef.current);
      }
    };
  }, []);

  // Combine database and Mapbox restaurants (similar to Dashboard)
  const combinedRestaurants = useMemo(() => {
    const restaurantMap = new Map<string, Restaurant>();
    
    // First add database restaurants
    allRestaurants.forEach(restaurant => {
      if (restaurant?.name && restaurant?.coordinates?.lat && restaurant?.coordinates?.lng) {
        const key = `${restaurant.name.toLowerCase()}-${restaurant.coordinates.lat.toFixed(4)}-${restaurant.coordinates.lng.toFixed(4)}`;
        restaurantMap.set(key, { ...restaurant, source: 'database' as const });
      }
    });
    
    // Then add/override with Mapbox restaurants (prefer fresh data)
    mapboxRestaurants.forEach(mapboxRest => {
      if (mapboxRest?.name && mapboxRest?.coordinates?.lat && mapboxRest?.coordinates?.lng) {
        const key = `${mapboxRest.name.toLowerCase()}-${mapboxRest.coordinates.lat.toFixed(4)}-${mapboxRest.coordinates.lng.toFixed(4)}`;
        const existing = restaurantMap.get(key);
        
        if (existing) {
          // Merge: Keep Mapbox name/address/coords, but preserve DB enrichments
          restaurantMap.set(key, {
            ...existing,
            id: mapboxRest.id,
            name: mapboxRest.name,
            address: mapboxRest.address,
            coordinates: mapboxRest.coordinates,
            source: 'mapbox' as const,
          });
        } else {
          // New restaurant from Mapbox
          restaurantMap.set(key, mapboxRest);
        }
      }
    });
    
    return Array.from(restaurantMap.values());
  }, [allRestaurants, mapboxRestaurants]);

  // Use visible restaurants from map if available, otherwise use all combined restaurants
  const restaurantsToFilter = useMemo(() => {
    // If map has visible restaurants (user has interacted with map), use those
    // Otherwise use all combined restaurants
    return visibleRestaurants.length > 0 ? visibleRestaurants : combinedRestaurants;
  }, [visibleRestaurants, combinedRestaurants]);

  const filteredRestaurants = useMemo(() => {
    const trimmedZip = zipFilter.trim().toLowerCase();

    return restaurantsToFilter.filter((restaurant) => {
      const state = userRestaurantStates[restaurant.id];

      if (statusFilter === 'wantToGo' && !state?.wantToGo) {
        return false;
      }

      if (statusFilter === 'hasBeen' && !state?.hasBeen) {
        return false;
      }

      if (trimmedZip) {
        const addressMatch = restaurant?.address?.toLowerCase().includes(trimmedZip);
        if (!addressMatch) {
          return false;
        }
      }

      return true;
    });
  }, [restaurantsToFilter, userRestaurantStates, statusFilter, zipFilter]);

  useEffect(() => {
    async function loadViewPreference() {
      if (!user) {
        setIsListView(false);
        setPreferencesLoaded(true);
        return;
      }

      try {
        const settings = await getUserSettings(user.uid);
        const listPreference = settings?.viewPreferences?.restaurantsListView ?? false;
        setIsListView(listPreference);
      } catch (error) {
        console.warn('Could not load view preferences, defaulting to cards view', error);
      } finally {
        setPreferencesLoaded(true);
      }
    }

    loadViewPreference();
  }, [user]);

  function getMapsLink(address: string) {
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  function openInMaps(address: string) {
    const url = getMapsLink(address);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  function createDefaultState(restaurantId: string): UserRestaurantState {
    if (!user) {
      throw new Error('User must be authenticated to use restaurant state');
    }
    return {
      userId: user.uid,
      restaurantId,
      wantToGo: false,
      hasBeen: false,
      personalRating: undefined,
      notes: '',
      updatedAt: new Date(),
    };
  }

  function getState(restaurantId: string): UserRestaurantState {
    return userRestaurantStates[restaurantId] || (user ? createDefaultState(restaurantId) : {
      userId: '',
      restaurantId,
      wantToGo: false,
      hasBeen: false,
      updatedAt: new Date(),
    } as UserRestaurantState);
  }

  function updateLocalState(restaurantId: string, updates: Partial<UserRestaurantState>) {
    setUserRestaurantStates((prev) => {
      const current = prev[restaurantId] || (user ? createDefaultState(restaurantId) : undefined);
      if (!current) return prev;
      return {
        ...prev,
        [restaurantId]: {
          ...current,
          ...updates,
          updatedAt: new Date(),
        },
      };
    });
  }

  async function persistStateChanges(
    restaurantId: string,
    updates: Partial<Omit<UserRestaurantState, 'userId' | 'restaurantId' | 'updatedAt'>>
  ) {
    if (!user) return;

    const previous = userRestaurantStates[restaurantId];
    updateLocalState(restaurantId, updates);
    setSavingStates((prev) => ({ ...prev, [restaurantId]: true }));

    try {
      await upsertUserRestaurantState(user.uid, restaurantId, updates);
    } catch (error) {
      console.error('[Restaurants] Failed to save restaurant state:', error);
      if (previous) {
        setUserRestaurantStates((prevStates) => ({
          ...prevStates,
          [restaurantId]: previous,
        }));
      }
    } finally {
      setSavingStates((prev) => ({ ...prev, [restaurantId]: false }));
    }
  }

  useEffect(() => {
    async function loadUserStates() {
      if (!user) {
        setUserRestaurantStates({});
        return;
      }

      const states = await getUserRestaurantStates(user.uid);
      setUserRestaurantStates(states);
    }

    loadUserStates();
  }, [user]);

  function toggleExpanded(restaurantId: string) {
    setExpandedRestaurants((prev) => ({
      ...prev,
      [restaurantId]: !prev[restaurantId],
    }));
  }

  function handleRatingClick(restaurantId: string, rating: number) {
    updateLocalState(restaurantId, { personalRating: rating });
    persistStateChanges(restaurantId, { personalRating: rating });
  }

  function renderDetails(restaurant: Restaurant) {
    const state = getState(restaurant.id);
    const saving = savingStates[restaurant.id];
    const currentDraftNotes = draftNotes[restaurant.id];
    const effectiveRating = state.personalRating;

    return (
      <div className="mt-4 space-y-4 rounded-xl bg-orange-50/60 p-4 border border-orange-100">
        <div className="flex flex-wrap gap-6 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.wantToGo}
              onChange={(event) =>
                persistStateChanges(restaurant.id, { wantToGo: event.target.checked })
              }
              className="h-4 w-4 rounded border border-orange-300 bg-white text-orange-500 accent-orange-500 focus:ring-orange-500 focus:ring-offset-1"
            />
            <span>I want to go</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={state.hasBeen}
              onChange={(event) =>
                persistStateChanges(restaurant.id, { hasBeen: event.target.checked })
              }
              className="h-4 w-4 rounded border border-orange-300 bg-white text-orange-500 accent-orange-500 focus:ring-orange-500 focus:ring-offset-1"
            />
            <span>I have been there</span>
          </label>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm text-gray-700">
          <label className="md:w-60 font-medium text-gray-800">My personal rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingClick(restaurant.id, value)}
                className={`transition ${
                  (effectiveRating ?? 0) >= value
                    ? 'text-yellow-500'
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                <Star className="w-6 h-6" />
              </button>
            ))}
            {effectiveRating ? (
              <span className="text-sm text-gray-600">{effectiveRating.toFixed(1)}</span>
            ) : (
              <span className="text-xs text-gray-500">Click to rate</span>
            )}
          </div>
        </div>

        <div className="flex flex-col text-sm text-gray-700">
          <label className="font-medium text-gray-800 mb-1">Personal notes</label>
          <textarea
            value={currentDraftNotes ?? state.notes ?? ''}
            onChange={(event) => {
              const value = event.target.value;
              setDraftNotes((prev) => ({ ...prev, [restaurant.id]: value }));
              updateLocalState(restaurant.id, { notes: value });

              if (noteSaveTimeouts.current[restaurant.id]) {
                clearTimeout(noteSaveTimeouts.current[restaurant.id]);
              }

              noteSaveTimeouts.current[restaurant.id] = setTimeout(() => {
                persistStateChanges(restaurant.id, { notes: value });
                delete noteSaveTimeouts.current[restaurant.id];
              }, 800);
            }}
            onBlur={() => {
              const noteValue = draftNotes[restaurant.id] ?? state.notes ?? '';
              if (noteSaveTimeouts.current[restaurant.id]) {
                clearTimeout(noteSaveTimeouts.current[restaurant.id]);
                delete noteSaveTimeouts.current[restaurant.id];
              }
              persistStateChanges(restaurant.id, { notes: noteValue });
            }}
            rows={3}
            placeholder="Add your thoughts, meal ideas, or who you'd like to bring."
            className="w-full rounded-lg border border-orange-200 px-3 py-2 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-300 bg-orange-500 text-white placeholder:text-orange-100"
          />
        </div>

        {!isAuthenticated && (
          <span className="text-xs text-gray-500">Sign in to save your notes and rating.</span>
        )}

        {saving && <p className="text-xs text-orange-500">Saving…</p>}
      </div>
    );
  }

  async function loadRestaurants() {
    if (userLocation === undefined) {
      console.log('[Restaurants] Waiting for user location...');
      return;
    }
    
    console.log('[Restaurants] Loading restaurants for location:', userLocation);
    setLoading(true);
    try {
      // Load database restaurants
      const dbRestaurants = await getAllRestaurants(100);
      console.log('[Restaurants] Loaded database restaurants:', dbRestaurants.length);
      setAllRestaurants(dbRestaurants);

      // Load Mapbox restaurants based on user location
      const mapboxRests = await searchMapboxRestaurants(userLocation, 10000, 50);
      console.log('[Restaurants] Loaded Mapbox restaurants:', mapboxRests.length);
      setMapboxRestaurants(mapboxRests);
    } catch (error) {
      console.error('[Restaurants] Error loading restaurants:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Restaurants - Nexus Nosh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Browse all restaurants in Nexus Nosh" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Restaurants</h1>
            <p className="text-gray-600">Browse and rate your favorite spots</p>
          </header>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
                className="rounded-full border border-orange-200 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-300"
              >
                <option value="all">All</option>
                <option value="wantToGo">I want to go</option>
                <option value="hasBeen">I have been there</option>
              </select>

              <div className="flex items-center rounded-full border border-orange-200 bg-white px-3 py-2 text-sm text-gray-600 shadow-sm focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-300">
                <label htmlFor="zip-filter" className="mr-2 text-gray-500">
                  ZIP
                </label>
                <input
                  id="zip-filter"
                  type="text"
                  value={zipFilter}
                  onChange={(event) => setZipFilter(event.target.value)}
                  placeholder="e.g. 84770"
                  className="w-24 border-none bg-transparent p-0 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={async () => {
                  const nextValue = !isListView;
                  setIsListView(nextValue);

                  if (user) {
                    try {
                      await updateViewPreferences(user.uid, {
                        restaurantsListView: nextValue,
                      });
                    } catch (error) {
                      console.error('Failed to save view preference:', error);
                    }
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-600 shadow-sm transition hover:border-orange-300 hover:bg-orange-50"
                disabled={!preferencesLoaded}
              >
                {isListView ? (
                  <>
                    <Grid className="w-4 h-4" />
                    Boxes view
                  </>
                ) : (
                  <>
                    <List className="w-4 h-4" />
                    List view
                  </>
                )}
                <span
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
                    isListView ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                      isListView ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </span>
              </button>
          </div>

          {/* Map Section */}
          {mapCenter && (
            <Card className="shadow-md rounded-2xl overflow-hidden mb-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Explore Restaurants</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
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
                              console.error('Error getting location:', error);
                            }
                          );
                        }
                      }}
                      className="rounded-lg border-gray-200"
                    >
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative h-[400px]">
                  <MapView 
                    ref={mapRef}
                    restaurants={combinedRestaurants}
                    center={mapCenter}
                    height="100%"
                    onBoundsChange={handleBoundsChange}
                    onCenterChange={handleMapCenterChange}
                  />
                  {loadingMapbox && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/95 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-10">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
                      <span className="text-sm font-medium text-gray-600">Finding restaurants...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading restaurants...</p>
            </div>
          ) : combinedRestaurants.length === 0 ? (
            <Card className="shadow-md rounded-2xl p-8">
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 mb-4">No restaurants found.</p>
                  <p className="text-gray-500 mb-6">
                    {loading ? 'Loading restaurants...' : 'No restaurants found in your area. Try moving the map or adjusting your location.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                Showing {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
              </div>

              {filteredRestaurants.length === 0 ? (
                <Card className="shadow-md rounded-2xl p-8">
                  <CardContent>
                    <div className="text-center py-6">
                      <p className="text-gray-600">No restaurants match your filters.</p>
                      {(statusFilter !== 'all' || zipFilter.trim()) && (
                        <button
                          type="button"
                          onClick={() => {
                            setStatusFilter('all');
                            setZipFilter('');
                          }}
                          className="mt-4 text-sm text-orange-600 hover:underline"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : isListView ? (
                <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
                  <table className="min-w-full divide-y divide-orange-100">
                    <thead className="bg-orange-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Rating
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Address
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Quietness
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Atmosphere
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-50">
                      {filteredRestaurants.map((restaurant) => (
                        <Fragment key={restaurant.id}>
                        <tr className="hover:bg-orange-50 transition">
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleExpanded(restaurant.id)}
                                className="text-left text-orange-600 hover:underline"
                              >
                                {restaurant.name}
                              </button>
                              <AddToListButton restaurantId={restaurant.id} restaurant={restaurant} size="sm" />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {restaurant.rating?.average !== undefined ? (
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-yellow-500" />
                                <span>{restaurant.rating.average.toFixed(1)}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <button
                              type="button"
                              onClick={() => openInMaps(restaurant.address)}
                              className="text-left text-orange-600 hover:underline"
                            >
                              {restaurant.address}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {restaurant.cuisineType.slice(0, 3).join(', ') || '—'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {restaurant.attributes?.quietness ?? 'N/A'}/100
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                            {restaurant.attributes?.atmosphere ?? 'N/A'}
                          </td>
                        </tr>
                        {expandedRestaurants[restaurant.id] && (
                          <tr className="bg-orange-50/50">
                            <td colSpan={6} className="px-4 py-4">
                              {renderDetails(restaurant)}
                            </td>
                          </tr>
                        )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <Card key={restaurant.id} className="shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <button
                              type="button"
                              onClick={() => toggleExpanded(restaurant.id)}
                              className="text-left text-xl font-semibold text-orange-600 hover:underline flex-1"
                            >
                              {restaurant.name}
                            </button>
                            <div className="flex items-center gap-2">
                              {restaurant.rating?.average !== undefined && (
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <Star className="w-4 h-4 fill-yellow-500" />
                                  <span className="text-sm font-medium">{restaurant.rating.average.toFixed(1)}</span>
                                </div>
                              )}
                              <AddToListButton restaurantId={restaurant.id} restaurant={restaurant} size="sm" />
                            </div>
                          </div>
                          
                          <div className="flex items-center text-gray-600 text-sm mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            <button
                              type="button"
                              onClick={() => openInMaps(restaurant.address)}
                              className="truncate text-left text-orange-600 hover:underline"
                            >
                              {restaurant.address}
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {restaurant.cuisineType.slice(0, 3).map((cuisine) => (
                              <span
                                key={cuisine}
                                className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                              >
                                {cuisine}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              <span>
                                {restaurant.priceRange ? `$${restaurant.priceRange.min} - $${restaurant.priceRange.max}` : 'N/A'}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span className="capitalize">{restaurant.attributes?.serviceSpeed ?? 'N/A'}</span>
                            </div>
                          </div>

                          {restaurant.attributes && (
                            <div className="text-xs text-gray-500">
                              <p>Quietness: {restaurant.attributes.quietness ?? 'N/A'}/100</p>
                              <p className="capitalize">Atmosphere: {restaurant.attributes.atmosphere ?? 'N/A'}</p>
                              {restaurant.attributes.privateBooths && (
                                <p className="text-green-600">✓ Private booths available</p>
                              )}
                            </div>
                          )}

                          {expandedRestaurants[restaurant.id] && renderDetails(restaurant)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <BottomNav />
    </>
  );
}

export default function RestaurantsPage() {
  return (
    <ProtectedRoute>
      <RestaurantsPageContent />
    </ProtectedRoute>
  );
}

