import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth/useAuth';
import { Restaurant, UserRestaurantState } from '@/lib/types';
import { getFriendProfile, getFriendRestaurants, getFriendRestaurantStates } from '@/lib/services/friends/friendService';
import { Card, CardContent } from '@/components/ui/Card';
import { ArrowLeft, MapPin, Star, Heart, User as UserIcon, Loader2, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FriendProfile {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export default function FriendProfilePage() {
  const router = useRouter();
  const { friendId } = router.query;
  const { user } = useAuth();
  
  const [friend, setFriend] = useState<FriendProfile | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [restaurantStates, setRestaurantStates] = useState<Record<string, UserRestaurantState>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRestaurant, setExpandedRestaurant] = useState<string | null>(null);

  useEffect(() => {
    if (friendId && user) {
      loadFriendData(friendId as string);
    }
  }, [friendId, user]);

  const loadFriendData = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Load friend profile, restaurants, and states in parallel
      const [profile, friendRestaurants, states] = await Promise.all([
        getFriendProfile(id),
        getFriendRestaurants(id),
        getFriendRestaurantStates(id),
      ]);
      
      setFriend(profile);
      setRestaurants(friendRestaurants);
      setRestaurantStates(states);
    } catch (err: any) {
      console.error('Error loading friend data:', err);
      setError(err.message || 'Failed to load friend profile');
    } finally {
      setLoading(false);
    }
  };

  const getState = (restaurantId: string): UserRestaurantState | undefined => {
    return restaurantStates[restaurantId];
  };

  const openInMaps = (address: string) => {
    const query = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-24">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          </div>
          <BottomNav />
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !friend) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-24">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="text-center py-16">
              <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {error || 'Friend not found'}
              </h2>
              <p className="text-gray-500">
                This profile may not be available or you may not have permission to view it.
              </p>
            </div>
          </div>
          <BottomNav />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-24">
        <Head>
          <title>{friend.displayName}&apos;s Restaurants | Nexus Nosh</title>
        </Head>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Friends
          </button>

          {/* Friend Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md p-6 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden">
                {friend.photoURL ? (
                  <img 
                    src={friend.photoURL} 
                    alt={friend.displayName} 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-indigo-600 font-bold text-2xl">
                    {friend.displayName[0].toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{friend.displayName}</h1>
                <p className="text-gray-500">{friend.email}</p>
                <p className="text-sm text-indigo-600 mt-1">
                  {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} saved
                </p>
              </div>
            </div>
          </motion.div>

          {/* Restaurants Section */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500 rounded-xl">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {friend.displayName}&apos;s Restaurants
              </h2>
            </div>

            {restaurants.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  {friend.displayName} hasn&apos;t saved any restaurants yet.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {restaurants.map((restaurant, index) => {
                  const state = getState(restaurant.id);
                  const isExpanded = expandedRestaurant === restaurant.id;
                  const hasDetails = state?.personalRating || state?.notes || state?.hasBeen || state?.wantToGo;
                  
                  return (
                    <motion.div
                      key={restaurant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className={`shadow-sm rounded-xl overflow-hidden transition-all ${
                        isExpanded ? 'shadow-lg ring-2 ring-indigo-200' : 'hover:shadow-md'
                      }`}>
                        <CardContent className="p-0">
                          {/* Clickable Header */}
                          <button
                            onClick={() => setExpandedRestaurant(isExpanded ? null : restaurant.id)}
                            className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 flex-1">
                                {restaurant.name}
                              </h3>
                              <div className="flex items-center gap-2 ml-2">
                                {state?.personalRating && (
                                  <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-4 h-4 fill-yellow-500" />
                                    <span className="text-sm font-medium">{state.personalRating}</span>
                                  </div>
                                )}
                                {state?.notes && (
                                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                                )}
                                {hasDetails && (
                                  isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-gray-400" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  )
                                )}
                              </div>
                            </div>

                            <div className="flex items-center text-gray-500 text-sm mb-2">
                              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                              <span 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openInMaps(restaurant.address);
                                }}
                                className="truncate text-indigo-600 hover:underline cursor-pointer"
                              >
                                {restaurant.address}
                              </span>
                            </div>

                            {restaurant.cuisineType && restaurant.cuisineType.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {restaurant.cuisineType.slice(0, 3).map((cuisine) => (
                                  <span
                                    key={cuisine}
                                    className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full"
                                  >
                                    {cuisine}
                                  </span>
                                ))}
                              </div>
                            )}
                          </button>

                          {/* Expandable Details */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-indigo-50/50">
                                  {/* Rating Stars */}
                                  {state?.personalRating && (
                                    <div className="mb-3">
                                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        {friend.displayName}&apos;s Rating
                                      </p>
                                      <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`w-5 h-5 ${
                                              star <= state.personalRating!
                                                ? 'text-yellow-500 fill-yellow-500'
                                                : 'text-gray-300'
                                            }`}
                                          />
                                        ))}
                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                          {state.personalRating} / 5
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Status Badges */}
                                  {(state?.hasBeen || state?.wantToGo) && (
                                    <div className="flex flex-wrap gap-2 mb-3">
                                      {state?.hasBeen && (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                                          ✓ Has been there
                                        </span>
                                      )}
                                      {state?.wantToGo && (
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                                          ★ Wants to go
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Notes */}
                                  {state?.notes && (
                                    <div>
                                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                        {friend.displayName}&apos;s Notes
                                      </p>
                                      <div className="p-3 bg-white rounded-lg border border-indigo-100">
                                        <p className="text-sm text-gray-700 italic">
                                          &ldquo;{state.notes}&rdquo;
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}

