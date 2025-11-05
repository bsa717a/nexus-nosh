'use client';

import { useState, useEffect } from 'react';
import { RestaurantRecommendation } from '@/lib/types';
import { getPersonalizedRecommendations } from '@/lib/services/recommendations/recommendationService';
import RestaurantCard from './RestaurantCard';

interface DashboardProps {
  userId: string;
  userLocation?: { lat: number; lng: number };
}

export default function Dashboard({ userId, userLocation }: DashboardProps) {
  const [recommendations, setRecommendations] = useState<RestaurantRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'favorites' | 'recommended' | 'smart-match'>('all');

  useEffect(() => {
    loadRecommendations();
  }, [userId, userLocation]);

  async function loadRecommendations() {
    setLoading(true);
    try {
      const recs = await getPersonalizedRecommendations(userId, userLocation);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredRecommendations = selectedFilter === 'all'
    ? recommendations
    : recommendations.filter(rec => rec.matchType === selectedFilter);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome to Nexus Nosh
        </h1>
        <p className="text-gray-600">
          Discover your perfect dining spot for every occasion
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {[
          { id: 'all', label: 'All' },
          { id: 'personal-favorite', label: 'Favorites' },
          { id: 'friend-recommendation', label: 'Friend Picks' },
          { id: 'smart-match', label: 'Smart Matches' },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id as any)}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedFilter === filter.id || 
              (filter.id === 'personal-favorite' && selectedFilter === 'favorites') ||
              (filter.id === 'friend-recommendation' && selectedFilter === 'recommended')
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Recommendations Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg" />
          ))}
        </div>
      ) : filteredRecommendations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No recommendations found. Start rating restaurants to get personalized suggestions!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((rec) => (
            <RestaurantCard key={rec.restaurant.id} recommendation={rec} />
          ))}
        </div>
      )}
    </div>
  );
}
