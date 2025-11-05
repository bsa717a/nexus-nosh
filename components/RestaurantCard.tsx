'use client';

import { RestaurantRecommendation } from '@/lib/types';

interface RestaurantCardProps {
  recommendation: RestaurantRecommendation;
}

export default function RestaurantCard({ recommendation }: RestaurantCardProps) {
  const { restaurant, score, reasons, matchType } = recommendation;

  const getMatchTypeColor = () => {
    switch (matchType) {
      case 'personal-favorite':
        return 'bg-purple-100 text-purple-800';
      case 'friend-recommendation':
        return 'bg-green-100 text-green-800';
      case 'smart-match':
        return 'bg-blue-100 text-blue-800';
      case 'trending':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchTypeLabel = () => {
    switch (matchType) {
      case 'personal-favorite':
        return 'Favorite';
      case 'friend-recommendation':
        return 'Friend Pick';
      case 'smart-match':
        return 'Smart Match';
      case 'trending':
        return 'Trending';
      default:
        return 'Recommended';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        {restaurant.imageUrl ? (
          <img 
            src={restaurant.imageUrl} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-white text-4xl font-bold">
            {restaurant.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {restaurant.name}
            </h3>
            <p className="text-sm text-gray-500">{restaurant.address}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchTypeColor()}`}>
            {getMatchTypeLabel()}
          </span>
        </div>

        {/* Rating and Score */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm font-medium text-gray-700">
              {restaurant.rating.average.toFixed(1)}
            </span>
            <span className="ml-1 text-xs text-gray-500">
              ({restaurant.rating.count})
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Match: <span className="font-semibold text-blue-600">{score}%</span>
          </div>
        </div>

        {/* Cuisine Types */}
        <div className="flex flex-wrap gap-2 mb-3">
          {restaurant.cuisineType.slice(0, 3).map((cuisine, idx) => (
            <span 
              key={idx}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
            >
              {cuisine}
            </span>
          ))}
        </div>

        {/* Reasons */}
        {reasons.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-2">Why we think you'll love it:</p>
            <ul className="space-y-1">
              {reasons.map((reason, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start">
                  <span className="text-blue-500 mr-1">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Attributes */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
          <span>
            {restaurant.attributes.serviceSpeed} service
          </span>
          <span>
            {restaurant.attributes.privateBooths ? '✓ Private booths' : ''}
          </span>
          <span>
            ${restaurant.priceRange.min}-${restaurant.priceRange.max}
          </span>
        </div>
      </div>
    </div>
  );
}

