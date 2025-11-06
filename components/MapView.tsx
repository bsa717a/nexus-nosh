import { useMemo } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl';
import { useState } from 'react';
import { RestaurantRecommendation } from '@/lib/types';
import { MapPin, Star } from 'lucide-react';

interface MapViewProps {
  recommendations: RestaurantRecommendation[];
  center?: { lat: number; lng: number };
  height?: string;
}

export default function MapView({ recommendations, center, height = '400px' }: MapViewProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantRecommendation | null>(null);

  // Debug logging
  console.log('[MapView] Received recommendations:', recommendations.length, recommendations);

  // Default center to Saint George, Utah if not provided
  const defaultCenter = { lat: 37.0965, lng: -113.5684 };
  const mapCenter = center || defaultCenter;

  // Get color based on match type
  const getMarkerColor = (matchType: RestaurantRecommendation['matchType']) => {
    switch (matchType) {
      case 'personal-favorite':
        return '#ea580c'; // orange-600
      case 'friend-recommendation':
        return '#3b82f6'; // blue-500
      case 'smart-match':
        return '#10b981'; // green-500
      case 'trending':
        return '#8b5cf6'; // purple-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  if (!token) {
    return (
      <div className="w-full bg-white border rounded-xl flex items-center justify-center text-gray-600" style={{ height }}>
        <div className="p-4 text-center">
          <div className="font-semibold mb-1">Mapbox token missing</div>
          <div className="text-sm">
            Add <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> to your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file
          </div>
          <div className="text-xs mt-2 text-gray-500">
            Get a free token at{' '}
            <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              mapbox.com
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="w-full bg-gray-50 border rounded-xl flex items-center justify-center text-gray-600" style={{ height }}>
        <div className="p-4 text-center">
          <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <div className="text-sm font-semibold mb-2">No restaurants to display</div>
          <div className="text-xs text-gray-500 mb-3">
            {recommendations.length === 0 ? 'Restaurants need to be seeded first.' : 'No recommendations available.'}
          </div>
          <a
            href="/admin/seed-restaurants"
            className="text-xs text-orange-600 hover:underline"
          >
            Go to Seed Restaurants →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border" style={{ height }}>
      <Map
        initialViewState={{
          latitude: mapCenter.lat,
          longitude: mapCenter.lng,
          zoom: 13,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={token}
      >
        <NavigationControl position="top-left" />
        
        {recommendations.map((rec) => {
          const color = getMarkerColor(rec.matchType);
          return (
            <Marker
              key={rec.restaurant.id}
              latitude={rec.restaurant.coordinates.lat}
              longitude={rec.restaurant.coordinates.lng}
              anchor="bottom"
              onClick={() => setSelectedRestaurant(rec)}
            >
              <div
                className="cursor-pointer transform hover:scale-110 transition-transform"
                style={{ color }}
              >
                <MapPin className="w-8 h-8 fill-current" />
              </div>
            </Marker>
          );
        })}

        {selectedRestaurant && (
          <Popup
            latitude={selectedRestaurant.restaurant.coordinates.lat}
            longitude={selectedRestaurant.restaurant.coordinates.lng}
            anchor="bottom"
            onClose={() => setSelectedRestaurant(null)}
            closeButton={true}
            closeOnClick={false}
            className="mapbox-popup"
          >
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-gray-800 mb-1">
                {selectedRestaurant.restaurant.name}
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                <Star className="w-4 h-4 fill-yellow-500" />
                <span className="text-sm font-medium">
                  {selectedRestaurant.restaurant.rating.average.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">
                  ({selectedRestaurant.restaurant.rating.count})
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                {selectedRestaurant.restaurant.address}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedRestaurant.restaurant.cuisineType.slice(0, 2).map((cuisine) => (
                  <span
                    key={cuisine}
                    className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                ${selectedRestaurant.restaurant.priceRange.min} - ${selectedRestaurant.restaurant.priceRange.max}
              </div>
              {selectedRestaurant.reasons.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    {selectedRestaurant.reasons[0]}
                  </p>
                </div>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
