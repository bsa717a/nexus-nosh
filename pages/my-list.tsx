import { useState, useEffect, Fragment, useRef } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth/useAuth';
import { Restaurant, UserRestaurantState } from '@/lib/types';
import {
  getUserListRestaurants,
  removeRestaurantFromList,
} from '@/lib/services/restaurants/userListService';
import { getUserSettings, updateViewPreferences } from '@/lib/services/user-settings/userSettingsService';
import {
  getUserRestaurantStates,
  upsertUserRestaurantState,
} from '@/lib/services/restaurants/userRestaurantStateService';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heart, MapPin, Star, DollarSign, Clock, List, Grid, Trash2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AddToListButton from '@/components/AddToListButton';

function MyListPageContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const [isListView, setIsListView] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [userRestaurantStates, setUserRestaurantStates] = useState<Record<string, UserRestaurantState>>({});
  const [expandedRestaurants, setExpandedRestaurants] = useState<Record<string, boolean>>({});
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
  const noteSaveTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    return () => {
      Object.values(noteSaveTimeouts.current).forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  useEffect(() => {
    if (user) {
      loadRestaurants();
    } else {
      setLoading(false);
    }
  }, [user]);

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

    if (user) {
      loadViewPreference();
    }
  }, [user]);

  useEffect(() => {
    async function loadUserStates() {
      if (!user) {
        setUserRestaurantStates({});
        return;
      }

      const states = await getUserRestaurantStates(user.uid);
      setUserRestaurantStates(states);
    }

    if (user) {
      loadUserStates();
    }
  }, [user]);

  const loadRestaurants = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      const userRestaurants = await getUserListRestaurants(user.uid);
      setRestaurants(userRestaurants);
    } catch (error: any) {
      console.error('Error loading restaurants:', error);
      setError(error.message || 'Failed to load your list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (restaurantId: string) => {
    if (!user) return;
    
    setRemovingIds((prev) => new Set(prev).add(restaurantId));
    try {
      await removeRestaurantFromList(user.uid, restaurantId);
      setRestaurants((prev) => prev.filter((r) => r.id !== restaurantId));
    } catch (error) {
      console.error('Error removing restaurant:', error);
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(restaurantId);
        return next;
      });
    }
  };

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
      console.error('[MyList] Failed to save restaurant state:', error);
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

        {saving && <p className="text-xs text-orange-500">Saving…</p>}
      </div>
    );
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          </div>
          <BottomNav />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500 rounded-2xl shadow-lg">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">My List</h1>
                  <p className="text-gray-600 mt-1">
                    {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} saved
                  </p>
                </div>
              </div>
              
              {restaurants.length > 0 && (
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
              )}
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-800 text-sm">{error}</p>
              <Button
                onClick={loadRestaurants}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm"
                size="sm"
              >
                Try Again
              </Button>
            </motion.div>
          )}

          {/* Restaurants List */}
          {restaurants.length === 0 && !error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <div className="mb-4">
                <Heart className="w-16 h-16 text-gray-300 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Your list is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Start adding restaurants to your list to save them for later
              </p>
              <Button
                onClick={() => router.push('/')}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Discover Restaurants
              </Button>
            </motion.div>
          ) : restaurants.length > 0 ? (
            <>
              {isListView ? (
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
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-50">
                      {restaurants.map((restaurant) => (
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
                              {restaurant.cuisineType?.slice(0, 3).join(', ') || '—'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {restaurant.attributes?.quietness ?? 'N/A'}/100
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                              {restaurant.attributes?.atmosphere ?? 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <button
                                onClick={() => handleRemove(restaurant.id)}
                                disabled={removingIds.has(restaurant.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                                title="Remove from list"
                              >
                                {removingIds.has(restaurant.id) ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                          {expandedRestaurants[restaurant.id] && (
                            <tr className="bg-orange-50/50">
                              <td colSpan={7} className="px-4 py-4">
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
                  {restaurants.map((restaurant, index) => (
                    <motion.div
                      key={restaurant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
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
                                <button
                                  onClick={() => handleRemove(restaurant.id)}
                                  disabled={removingIds.has(restaurant.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                                  title="Remove from list"
                                >
                                  {removingIds.has(restaurant.id) ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </button>
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
                              {restaurant.cuisineType?.slice(0, 3).map((cuisine) => (
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
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : null}
        </div>
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}

export default function MyListPage() {
  return <MyListPageContent />;
}

