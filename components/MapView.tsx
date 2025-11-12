import { useMemo, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import Map, { Marker, NavigationControl, Popup, MapRef } from 'react-map-gl';
import { RestaurantRecommendation, Restaurant } from '@/lib/types';
import { MapPin, Star } from 'lucide-react';

interface MapViewProps {
  recommendations?: RestaurantRecommendation[];
  restaurants?: Restaurant[];
  center?: { lat: number; lng: number };
  height?: string;
  onRestaurantSelect?: (restaurant: Restaurant) => void;
}

export interface MapViewHandle {
  focusRestaurant: (restaurantId: string) => void;
}

const MapView = forwardRef<MapViewHandle, MapViewProps>(({ 
  recommendations = [], 
  restaurants = [], 
  center, 
  height = '400px',
  onRestaurantSelect 
}, ref) => {
  // Mapbox token with fallback (public token, safe to include)
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiYnNhNzE3IiwiYSI6ImNtaG13YnZvczIxcHIybXB1N2E0NnJpcHcifQ.Z-AeF3-pt2ihl2uz71Lvxg';
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const mapRef = useRef<MapRef>(null);

  // Convert restaurants to display format if provided
  const displayItems = useMemo(() => {
    if (recommendations.length > 0) {
      return recommendations;
    }
    // Convert plain restaurants to recommendation format for display
    return restaurants.map(restaurant => ({
      restaurant,
      matchScore: 0,
      matchType: 'all-restaurants' as const,
      reasons: [],
      friendRecommendations: [],
    }));
  }, [recommendations, restaurants]);

  // Debug logging
  console.log('[MapView] Display items:', displayItems.length, displayItems);

  // Default center to Saint George, Utah if not provided
  const defaultCenter = { lat: 37.0965, lng: -113.5684 };
  const mapCenter = center || defaultCenter;

  // Expose method to focus on a restaurant
  useImperativeHandle(ref, () => ({
    focusRestaurant: (restaurantId: string) => {
      console.log('[MapView] focusRestaurant called with ID:', restaurantId);
      console.log('[MapView] displayItems:', displayItems.length);
      const item = displayItems.find(i => i.restaurant.id === restaurantId);
      console.log('[MapView] Found item:', item);
      console.log('[MapView] mapRef.current:', mapRef.current);
      
      if (item && mapRef.current) {
        console.log('[MapView] Flying to:', item.restaurant.coordinates);
        // Fly to the restaurant location
        mapRef.current.flyTo({
          center: [item.restaurant.coordinates.lng, item.restaurant.coordinates.lat],
          zoom: 15,
          duration: 1000,
        });
        // Show the popup
        setSelectedRestaurant(item.restaurant);
      } else {
        console.error('[MapView] Could not focus - item or mapRef missing');
      }
    }
  }));

  // Get color based on match type - gray for all restaurants, color for personalized
  const getMarkerColor = (matchType: string, restaurant: Restaurant) => {
    // Check if this is a Mapbox restaurant (starts with "mapbox-")
    const isMapboxRestaurant = restaurant.id.startsWith('mapbox-');
    
    switch (matchType) {
      case 'personal-favorite':
        return '#ea580c'; // orange-600
      case 'friend-recommendation':
        return '#3b82f6'; // blue-500
      case 'smart-match':
        return '#10b981'; // green-500
      case 'trending':
        return '#8b5cf6'; // purple-500
      case 'all-restaurants':
        // Different colors for Mapbox vs. database restaurants
        return isMapboxRestaurant ? '#10b981' : '#fb923c'; // green-500 for Mapbox, orange-400 for database
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

  // Always show the map, even if no restaurants match filters
  // The empty state will be shown inside the map if truly no restaurants exist

  return (
    <div className="w-full overflow-hidden rounded-xl border" style={{ height }}>
      <Map
        ref={mapRef}
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
        
        {/* Show message overlay if no restaurants match filters */}
        {displayItems.length === 0 && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 1,
            textAlign: 'center'
          }}>
            <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <div className="text-sm font-semibold text-gray-800 mb-1">No restaurants found</div>
            <div className="text-xs text-gray-500">
              Try adjusting your filters or location
            </div>
          </div>
        )}
        
        {displayItems.map((item) => {
          const color = getMarkerColor(item.matchType, item.restaurant);
          return (
            <Marker
              key={item.restaurant.id}
              latitude={item.restaurant.coordinates.lat}
              longitude={item.restaurant.coordinates.lng}
              anchor="bottom"
              onClick={() => setSelectedRestaurant(item.restaurant)}
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
            latitude={selectedRestaurant.coordinates.lat}
            longitude={selectedRestaurant.coordinates.lng}
            anchor="bottom"
            onClose={() => setSelectedRestaurant(null)}
            closeButton={true}
            closeOnClick={false}
            className="mapbox-popup"
          >
            <div className="p-2 min-w-[200px]">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-gray-800 flex-1">
                  {selectedRestaurant.name}
                </h3>
                {selectedRestaurant.id.startsWith('mapbox-') && (
                  <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full whitespace-nowrap">
                    Mapbox
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                <Star className="w-4 h-4 fill-yellow-500" />
                <span className="text-sm font-medium">
                  {selectedRestaurant.rating.average.toFixed(1)}
                </span>
                <span className="text-xs text-gray-500">
                  ({selectedRestaurant.rating.count})
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                {selectedRestaurant.address}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedRestaurant.cuisineType.slice(0, 2).map((cuisine) => (
                  <span
                    key={cuisine}
                    className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                ${selectedRestaurant.priceRange.min} - ${selectedRestaurant.priceRange.max}
              </div>
            </div>
          </Popup>
        )}
      </Map>
      
      {/* Legend for marker colors */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        background: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontSize: '11px',
        zIndex: 1,
      }}>
        <div style={{ fontWeight: 600, marginBottom: '4px', color: '#374151' }}>Legend</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
          <MapPin style={{ width: '14px', height: '14px', color: '#10b981', marginRight: '4px' }} />
          <span style={{ color: '#6b7280' }}>Mapbox</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MapPin style={{ width: '14px', height: '14px', color: '#fb923c', marginRight: '4px' }} />
          <span style={{ color: '#6b7280' }}>Database</span>
        </div>
      </div>
    </div>
  );
});

MapView.displayName = 'MapView';

export default MapView;
