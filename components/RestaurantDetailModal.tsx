import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Restaurant } from '@/lib/types';
import { X, Globe, MapPin, Star, Utensils, UtensilsCrossed, CheckCircle, Clock, Sparkles, Users, Briefcase, Heart, Volume2 } from 'lucide-react';
import { Button } from './ui/Button';
import AddToListButton from './AddToListButton';

interface RestaurantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant | null;
}

export default function RestaurantDetailModal({ isOpen, onClose, restaurant }: RestaurantDetailModalProps) {
  const [aiData, setAiData] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Reset state when restaurant changes
  useEffect(() => {
    if (isOpen && restaurant) {
      if (restaurant.aiSummary) {
        setAiData(restaurant.aiSummary);
        setLoadingAi(false);
      } else {
        setAiData(null);
        fetchAiSummary(restaurant);
      }
    }
  }, [isOpen, restaurant]);

  const fetchAiSummary = async (restaurant: Restaurant) => {
    setLoadingAi(true);
    try {
      const response = await fetch('/api/enrich-restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantName: restaurant.name,
          restaurantAddress: restaurant.address,
          restaurantId: restaurant.id
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiData(data);
      }
    } catch (error) {
      console.error('Failed to fetch AI summary', error);
    } finally {
      setLoadingAi(false);
    }
  };

  if (!restaurant) return null;

  const priceSymbol = restaurant.priceRange
    ? '$'.repeat(Math.ceil(restaurant.priceRange.max / 30))
    : (aiData?.priceBucket || '$$');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Header Image */}
              <div className="h-24 bg-gradient-to-br from-orange-400 to-rose-500 relative shrink-0">
                {restaurant.imageUrl ? (
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-blue-100 flex items-center justify-center">
                      <UtensilsCrossed className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Scrollable Area */}
              <div className="overflow-y-auto flex-1 p-6 md:p-8 custom-scrollbar">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-3xl font-bold text-gray-900">{restaurant.name}</h2>
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-gray-900">{restaurant.rating?.average?.toFixed(1) || 'New'}</span>
                    {restaurant.rating?.count && (
                      <span className="text-sm text-gray-500">({restaurant.rating.count})</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {restaurant.cuisineType.map((cuisine) => (
                    <span key={cuisine} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {cuisine}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    {priceSymbol}
                  </span>
                </div>

                {/* AI Insight Section */}
                <div className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-indigo-100 px-2 py-1 rounded-bl-lg text-[10px] font-bold text-indigo-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI RESEARCH
                  </div>

                  {loadingAi ? (
                    <div className="flex items-center gap-3 py-4">
                      <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-indigo-600 font-medium text-sm">Analyzing reviews & vibe...</span>
                    </div>
                  ) : aiData ? (
                    <div className="space-y-4">
                      <p className="text-indigo-900 font-medium text-lg leading-snug">
                        "{aiData.vibeDescription}"
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/60 rounded-xl p-3">
                          <div className="text-xs text-indigo-500 font-bold uppercase mb-1">Popular Dishes</div>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {aiData.popularDishes?.slice(0, 3).map((dish: string) => (
                              <li key={dish} className="flex items-start gap-1.5">
                                <span className="text-indigo-400 mt-1">•</span>
                                {dish}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <Volume2 className="w-4 h-4" />
                              <span>Quietness</span>
                            </div>
                            <span className={`font-bold ${aiData.quietness > 70 ? 'text-green-600' : aiData.quietness < 40 ? 'text-red-500' : 'text-yellow-600'}`}>
                              {aiData.quietness}%
                            </span>
                          </div>

                          <div className="flex gap-2">
                            {aiData.goodForBusiness && (
                              <div className="flex-1 bg-white/60 rounded-lg p-2 flex justify-center" title="Good for Business">
                                <Briefcase className="w-4 h-4 text-blue-600" />
                              </div>
                            )}
                            {aiData.goodForDates && (
                              <div className="flex-1 bg-white/60 rounded-lg p-2 flex justify-center" title="Good for Dates">
                                <Heart className="w-4 h-4 text-rose-500" />
                              </div>
                            )}
                            {aiData.goodForGroups && (
                              <div className="flex-1 bg-white/60 rounded-lg p-2 flex justify-center" title="Good for Groups">
                                <Users className="w-4 h-4 text-orange-500" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">AI insights unavailable for this location.</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      {(restaurant.website || aiData?.websiteUrl || aiData?.menuUrl) && (
                        <a
                          href={aiData?.menuUrl || aiData?.websiteUrl || restaurant.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full"
                        >
                          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white gap-2">
                            <Globe className="w-4 h-4" />
                            {(aiData?.menuUrl) ? 'View Menu' : 'Visit Website'}
                          </Button>
                        </a>
                      )}

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full gap-2">
                          <MapPin className="w-4 h-4" />
                          Get Directions
                        </Button>
                      </a>

                      <div className="w-full flex justify-center">
                        <AddToListButton restaurantId={restaurant.id} restaurant={restaurant} showLabel={true} className="w-full justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 border-0" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-3">Details</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                        <p>{restaurant.address}</p>
                      </div>
                      {restaurant.attributes && (
                        <>
                          {restaurant.attributes.atmosphere && (
                            <div className="flex items-center gap-3">
                              <div className="w-4 flex justify-center"><span className="text-gray-400">•</span></div>
                              <span className="capitalize">Atmosphere: {restaurant.attributes.atmosphere}</span>
                            </div>
                          )}
                          {restaurant.attributes.serviceSpeed && (
                            <div className="flex items-center gap-3">
                              <div className="w-4 flex justify-center"><Clock className="w-4 h-4 text-gray-400" /></div>
                              <span className="capitalize">Service: {restaurant.attributes.serviceSpeed}</span>
                            </div>
                          )}
                          {restaurant.attributes.privateBooths && (
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>Private Booths Available</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

