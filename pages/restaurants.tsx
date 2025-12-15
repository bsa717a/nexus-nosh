import { useState, useEffect, Fragment, useRef, useMemo, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Star, DollarSign, Clock, List, Grid, Navigation, Trash2, Loader2, Camera, Plus, X, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import { getAllRestaurants } from '@/lib/services/restaurants/restaurantService';
import { searchMapboxRestaurants, geocodeZipCode } from '@/lib/services/mapbox/mapboxSearchService';
import { Restaurant, UserRestaurantState, JournalEntry } from '@/lib/types';
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

  // Journal State
  const [editingJournalEntry, setEditingJournalEntry] = useState<Record<string, Partial<JournalEntry> | null>>({});
  const [journalUploadStates, setJournalUploadStates] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  // Journal Functions
  const handleStartJournalEntry = (restaurantId: string) => {
    setEditingJournalEntry(prev => ({
      ...prev,
      [restaurantId]: {
        date: new Date(),
        notes: '',
        photos: [],
        rating: getState(restaurantId).personalRating || 0
      }
    }));
  };

  const handleCancelJournalEntry = (restaurantId: string) => {
    setEditingJournalEntry(prev => {
      const next = { ...prev };
      delete next[restaurantId];
      return next;
    });
  };

  const handleSaveJournalEntry = async (restaurantId: string) => {
    const draft = editingJournalEntry[restaurantId];
    if (!draft || !user) return;

    const entries = getState(restaurantId).journalEntries || [];

    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      date: draft.date || new Date(),
      notes: draft.notes || '',
      photos: draft.photos || [],
      rating: draft.rating,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newEntries = [newEntry, ...entries];

    await persistStateChanges(restaurantId, { journalEntries: newEntries });

    // Also update global rating if this is the newest rating
    if (draft.rating && (!getState(restaurantId).personalRating || newEntries.length === 1)) {
      await persistStateChanges(restaurantId, { personalRating: draft.rating });
    }

    handleCancelJournalEntry(restaurantId);
  };

  const handleDeleteJournalEntry = async (restaurantId: string, entryId: string) => {
    if (!confirm('Are you sure you want to delete this journal entry?')) return;

    const entries = getState(restaurantId).journalEntries || [];
    const newEntries = entries.filter(e => e.id !== entryId);
    await persistStateChanges(restaurantId, { journalEntries: newEntries });
  };

  const handleJournalImageUpload = async (restaurantId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setJournalUploadStates(prev => ({ ...prev, [restaurantId]: true }));

    try {
      const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              const MAX_WIDTH = 800;
              const MAX_HEIGHT = 800;
              if (width > height) {
                if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
              } else {
                if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              if (!ctx) { reject(new Error('Canvas context failed')); return; }
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        });
      };

      const base64 = await resizeImage(file);
      if (base64.length > 700000) throw new Error("Image too large");

      setEditingJournalEntry(prev => {
        const current = prev[restaurantId] || {};
        return {
          ...prev,
          [restaurantId]: {
            ...current,
            photos: [base64, ...(current.photos || [])]
          }
        };
      });
    } catch (err) {
      console.error("Journal upload error", err);
      alert("Failed to attach image");
    } finally {
      setJournalUploadStates(prev => ({ ...prev, [restaurantId]: false }));
    }
  };

  // Helper to safely convert Firestore timestamps or strings to Date
  const safeDate = (date: any): Date => {
    if (!date) return new Date();
    if (date instanceof Date) return date;
    // Check for Firestore Timestamp-like object (seconds/nanoseconds) or method
    if (typeof date.toDate === 'function') return date.toDate();
    if (date.seconds !== undefined) return new Date(date.seconds * 1000);
    return new Date(date);
  };

  function renderDetails(restaurant: Restaurant) {
    const state = getState(restaurant.id);
    const saving = savingStates[restaurant.id];
    const effectiveRating = state.personalRating;
    const isEditing = !!editingJournalEntry[restaurant.id];
    const currentDraft = editingJournalEntry[restaurant.id];

    return (
      <div className="mt-4 space-y-6 rounded-xl bg-orange-50/60 p-5 border border-orange-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 text-sm text-gray-700 pb-4 border-b border-orange-200/50">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={state.wantToGo}
                onChange={(event) =>
                  persistStateChanges(restaurant.id, { wantToGo: event.target.checked })
                }
                className="h-4 w-4 rounded border border-orange-300 bg-white text-orange-500 accent-orange-500 focus:ring-orange-500 focus:ring-offset-1 cursor-pointer"
              />
              <span className="group-hover:text-orange-700 transition-colors">I want to go</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={state.hasBeen}
                onChange={(event) =>
                  persistStateChanges(restaurant.id, { hasBeen: event.target.checked })
                }
                className="h-4 w-4 rounded border border-orange-300 bg-white text-orange-500 accent-orange-500 focus:ring-orange-500 focus:ring-offset-1 cursor-pointer"
              />
              <span className="group-hover:text-orange-700 transition-colors">I have been there</span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <label className="font-medium text-gray-800">Global Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(restaurant.id, value)}
                  className={`transition p-0.5 ${(effectiveRating ?? 0) >= value
                    ? 'text-yellow-500'
                    : 'text-gray-300 hover:text-yellow-400'
                    }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Journal Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="p-1.5 bg-orange-100 rounded-lg text-orange-600">
                <Edit3 className="w-4 h-4" />
              </span>
              My Journal
            </h3>
            {!isEditing && (
              <Button
                onClick={() => handleStartJournalEntry(restaurant.id)}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Entry
              </Button>
            )}
          </div>

          {/* New Entry Form - Compact Layout */}
          <AnimatePresence>
            {isEditing && currentDraft && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-xl border border-orange-300 p-3 shadow-sm mb-4 ring-1 ring-orange-100">
                  <div className="flex gap-4 items-start">
                    {/* Left: Date Picker (Styled as date square) */}
                    <div className="relative flex-shrink-0 group cursor-pointer">
                      <div className="p-2 bg-orange-50 group-hover:bg-orange-100 transition-colors rounded-lg text-orange-600 font-bold text-center w-[52px] leading-tight border border-transparent group-hover:border-orange-200">
                        <span className="block text-[10px] uppercase text-orange-400">
                          {safeDate(currentDraft.date).toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="text-lg">
                          {safeDate(currentDraft.date).getDate()}
                        </span>
                      </div>
                      <input
                        type="date"
                        value={safeDate(currentDraft.date).toISOString().split('T')[0]}
                        onChange={(e) => setEditingJournalEntry(prev => ({
                          ...prev,
                          [restaurant.id]: { ...(prev[restaurant.id] || {}), date: new Date(e.target.value) }
                        }))}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        title="Change Date"
                      />
                    </div>

                    {/* Middle: Notes Input */}
                    <div className="flex-1 min-w-0">
                      <textarea
                        value={currentDraft.notes || ''}
                        onChange={(e) => setEditingJournalEntry(prev => ({
                          ...prev,
                          [restaurant.id]: { ...(prev[restaurant.id] || {}), notes: e.target.value }
                        }))}
                        placeholder="Write your notes here..."
                        className="w-full text-sm text-gray-700 placeholder:text-gray-400 border-0 p-0 focus:ring-0 resize-none bg-transparent leading-relaxed h-[88px]"
                        autoFocus
                      />
                    </div>

                    {/* Right: Rating & Photos */}
                    <div className="flex-shrink-0 flex flex-col items-end gap-3 w-[140px]">
                      {/* Rating Input */}
                      <div className="flex text-gray-200 gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setEditingJournalEntry(prev => ({
                              ...prev,
                              [restaurant.id]: { ...(prev[restaurant.id] || {}), rating: star }
                            }))}
                            className={`focus:outline-none transition-transform active:scale-90 ${(currentDraft.rating || 0) >= star ? 'text-yellow-400' : 'hover:text-yellow-200'
                              }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${(currentDraft.rating || 0) >= star ? 'fill-current' : ''}`} />
                          </button>
                        ))}
                      </div>

                      {/* Photos Input */}
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {currentDraft.photos?.map((photo, idx) => (
                          <div key={idx} className="relative w-10 h-10 rounded-md overflow-hidden group border border-gray-100">
                            <img src={photo} alt="Draft" className="w-full h-full object-cover" />
                            <button
                              onClick={() => setEditingJournalEntry(prev => {
                                const current = prev[restaurant.id];
                                if (!current) return prev;
                                return {
                                  ...prev,
                                  [restaurant.id]: {
                                    ...current,
                                    photos: current.photos?.filter((_, i) => i !== idx)
                                  }
                                };
                              })}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            >
                              <X className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        ))}
                        <label className={`flex items-center justify-center w-10 h-10 border border-dashed border-gray-300 rounded-md cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors ${journalUploadStates[restaurant.id] ? 'opacity-50 pointer-events-none' : ''}`}>
                          {journalUploadStates[restaurant.id] ? <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> : <Camera className="w-4 h-4 text-gray-400" />}
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleJournalImageUpload(restaurant.id, e)} />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Footer: Save/Cancel Actions */}
                  <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-100/50">
                    <button
                      onClick={() => handleCancelJournalEntry(restaurant.id)}
                      className="text-xs font-medium text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveJournalEntry(restaurant.id)}
                      className="text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-full shadow-sm transition-colors"
                    >
                      Save Entry
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Journal Entries List */}
          <div className="space-y-3">
            {state.journalEntries && state.journalEntries.length > 0 ? (
              state.journalEntries.map((entry) => (
                <div key={entry.id} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex gap-4 items-start">
                    {/* Left: Date */}
                    <div className="flex-shrink-0 p-2 bg-orange-50 rounded-lg text-orange-600 font-bold text-center w-[52px] leading-tight">
                      <span className="block text-[10px] uppercase text-orange-400">
                        {safeDate(entry.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-lg">
                        {safeDate(entry.date).getDate()}
                      </span>
                    </div>

                    {/* Middle: Content */}
                    <div className="flex-1 min-w-0 py-0.5">
                      {/* Header: Rating (Right aligned) */}
                      {entry.rating && (
                        <div className="flex justify-end mb-1">
                          <div className="flex text-yellow-400 gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < entry.rating! ? 'fill-current' : 'text-gray-200'}`} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Main Content Row: Notes (Left) | Photos (Right) */}
                      <div className="flex gap-3 items-start">
                        {/* Notes */}
                        <div className="flex-1 min-w-0">
                          {entry.notes ? (
                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                              {entry.notes}
                            </p>
                          ) : (
                            <span className="text-gray-400 text-sm italic">No notes</span>
                          )}
                        </div>

                        {/* Photos */}
                        {entry.photos && entry.photos.length > 0 && (
                          <div className="flex-shrink-0 flex flex-wrap gap-2 max-w-[120px] justify-end">
                            {entry.photos.map((photo, idx) => (
                              <div key={idx} className="relative w-12 h-12 rounded-md overflow-hidden border border-gray-100 cursor-pointer hover:opacity-90 active:scale-95 transition-all" onClick={() => setSelectedImage(photo)}>
                                <img src={photo} alt={`Journal ${idx}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex-shrink-0 pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDeleteJournalEntry(restaurant.id, entry.id)}
                        className="text-gray-300 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-gray-400">
                  <Edit3 className="w-6 h-6" />
                </div>
                <p className="text-gray-500 font-medium">No journal entries yet</p>
                <p className="text-gray-400 text-sm">Record your first visit experience!</p>
              </div>
            )}
          </div>

          {/* Legacy Notes Section (Only if exists and not converted) */}
          {(state.notes || (state.userUploadedPhotos && state.userUploadedPhotos.length > 0)) && (
            <div className="mt-8 pt-6 border-t border-orange-200/50">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Historical Notes
              </h4>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 opacity-75 hover:opacity-100 transition-opacity">
                {state.notes && <p className="text-sm text-gray-600 italic mb-3">"{state.notes}"</p>}
                {state.userUploadedPhotos && state.userUploadedPhotos.length > 0 && (
                  <div className="flex gap-2">
                    {state.userUploadedPhotos.map((photo, idx) => (
                      <img key={idx} src={photo} alt="Legacy" className="w-16 h-16 object-cover rounded-lg border border-gray-200" onClick={() => setSelectedImage(photo)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
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
        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Enlarged view"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${isListView ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${isListView ? 'translate-x-5' : 'translate-x-1'
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

