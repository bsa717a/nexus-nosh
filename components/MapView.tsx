import { useMemo, useState, useRef, useImperativeHandle, forwardRef, useEffect, useCallback } from 'react';
import Map, { Marker, NavigationControl, Popup, MapRef } from 'react-map-gl';
import { RestaurantRecommendation, Restaurant } from '@/lib/types';
import { MapPin, Star, Navigation } from 'lucide-react';
import AddToListButton from '@/components/AddToListButton';

interface MapViewProps {
  recommendations?: RestaurantRecommendation[];
  restaurants?: Restaurant[];
  center?: { lat: number; lng: number };
  userLocation?: { lat: number; lng: number };
  myListIds?: Set<string>;
  friendsListIds?: Set<string>;
  height?: string;
  onRestaurantSelect?: (restaurant: Restaurant) => void;
  onBoundsChange?: (visibleRestaurants: Restaurant[]) => void;
  onCenterChange?: (center: { lat: number; lng: number }) => void;
}

export interface MapViewHandle {
  focusRestaurant: (restaurantId: string) => void;
}

const MapView = forwardRef<MapViewHandle, MapViewProps>(({ 
  recommendations = [], 
  restaurants = [], 
  center,
  userLocation,
  myListIds = new Set(),
  friendsListIds = new Set(),
  height = '400px',
  onRestaurantSelect,
  onBoundsChange,
  onCenterChange
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

  // Use a ref to store the latest displayItems so handleMapMove doesn't need to be recreated
  const displayItemsRef = useRef(displayItems);
  useEffect(() => {
    displayItemsRef.current = displayItems;
  }, [displayItems]);

  // Use a ref to store the latest onBoundsChange callback
  const onBoundsChangeRef = useRef(onBoundsChange);
  useEffect(() => {
    onBoundsChangeRef.current = onBoundsChange;
  }, [onBoundsChange]);

  // Use a ref to store the latest onCenterChange callback
  const onCenterChangeRef = useRef(onCenterChange);
  useEffect(() => {
    onCenterChangeRef.current = onCenterChange;
  }, [onCenterChange]);

  // Handle map bounds change to update visible restaurants
  // Use a stable callback that reads from refs to avoid infinite loops
  const handleMapMove = useCallback(() => {
    if (!mapRef.current) {
      return;
    }

    const map = mapRef.current.getMap();
    const bounds = map.getBounds();
    const mapCenter = map.getCenter();
    
    // Check if bounds is available
    if (!bounds) {
      return;
    }

    // Notify parent of new center for loading restaurants in new area
    if (onCenterChangeRef.current && mapCenter) {
      onCenterChangeRef.current({ lat: mapCenter.lat, lng: mapCenter.lng });
    }

    // Filter restaurants that are within the visible bounds using the ref
    if (onBoundsChangeRef.current) {
      const visibleRestaurants = displayItemsRef.current
        .filter(item => {
          const { lat, lng } = item.restaurant.coordinates;
          const isVisible = bounds.contains([lng, lat]);
          return isVisible;
        })
        .map(item => item.restaurant);

      onBoundsChangeRef.current(visibleRestaurants);
    }
  }, []); // Empty dependency array - function is stable and reads from refs

  // Hide POI labels when map loads
  const onMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (map) {
      // Hide all POI labels (points of interest)
      const style = map.getStyle();
      if (style && style.layers) {
        style.layers.forEach((layer: any) => {
          // Hide POI labels and icons
          if (layer.id.includes('poi-label') || 
              layer.id.includes('poi') || 
              layer.id.includes('place-label')) {
            map.setLayoutProperty(layer.id, 'visibility', 'none');
          }
        });
      }

      // Initialize the visible restaurants list on map load (only if onBoundsChange is provided)
      // Use a small delay to ensure map is fully initialized
      setTimeout(() => {
        if (onBoundsChangeRef.current && displayItemsRef.current.length > 0) {
          handleMapMove();
        }
      }, 100);
    }
  }, [handleMapMove]); // Only depend on handleMapMove which is stable

  // Default center to Saint George, Utah if not provided
  const defaultCenter = { lat: 37.0965, lng: -113.5684 };
  const mapCenter = center || defaultCenter;

  // Fly to new center when the center prop changes
  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.flyTo({
        center: [center.lng, center.lat],
        zoom: 13,
        duration: 1500,
      });
    }
  }, [center?.lat, center?.lng]);

  // Expose method to focus on a restaurant
  useImperativeHandle(ref, () => ({
    focusRestaurant: (restaurantId: string) => {
      const item = displayItems.find(i => i.restaurant.id === restaurantId);
      
      if (item && mapRef.current) {
        // Fly to the restaurant location
        mapRef.current.flyTo({
          center: [item.restaurant.coordinates.lng, item.restaurant.coordinates.lat],
          zoom: 15,
          duration: 1000,
        });
        // Show the popup
        setSelectedRestaurant(item.restaurant);
      }
    }
  }), [displayItems]);

  // Get color based on list membership and match type
  const getMarkerColor = (matchType: string, restaurant: Restaurant) => {
    // Priority 1: In My List (warm coral)
    if (myListIds.has(restaurant.id)) {
      return '#f97316'; // orange-500 - My List (soft coral)
    }
    
    // Priority 2: In Friends' Lists (soft teal)
    if (friendsListIds.has(restaurant.id)) {
      return '#14b8a6'; // teal-500 - Friends' List
    }
    
    // Priority 3: Match type based coloring
    switch (matchType) {
      case 'personal-favorite':
        return '#fb923c'; // orange-400
      case 'friend-recommendation':
        return '#5eead4'; // teal-300
      case 'smart-match':
        return '#86efac'; // green-300
      case 'trending':
        return '#c4b5fd'; // violet-300
      case 'all-restaurants':
      default:
        return '#a1a1aa'; // zinc-400 - Regular restaurants (soft gray)
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
        onLoad={onMapLoad}
        onMoveEnd={handleMapMove}
        onZoomEnd={handleMapMove}
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
                title={item.restaurant.name}
              >
                <MapPin className="w-8 h-8 fill-current" />
            </div>
          </Marker>
          );
        })}

        {/* User Location Pin */}
        {userLocation && (
          <Marker
            latitude={userLocation.lat}
            longitude={userLocation.lng}
            anchor="center"
          >
            <div className="relative" title="You are here">
              {/* Pulsing outer ring */}
              <div className="absolute inset-0 w-8 h-8 bg-blue-400/30 rounded-full animate-ping" />
              {/* Solid inner circle */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="w-5 h-5 bg-blue-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <Navigation className="w-3 h-3 text-white" style={{ transform: 'rotate(45deg)' }} />
                </div>
              </div>
            </div>
          </Marker>
        )}

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
                <div className="ml-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  <AddToListButton restaurantId={selectedRestaurant.id} restaurant={selectedRestaurant} size="sm" />
                </div>
              </div>
              {selectedRestaurant.rating?.average !== undefined && selectedRestaurant.rating.average > 0 && (
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <Star className="w-4 h-4 fill-yellow-500" />
                  <span className="text-sm font-medium">
                    {selectedRestaurant.rating.average.toFixed(1)}
                  </span>
                  {selectedRestaurant.rating.count !== undefined && selectedRestaurant.rating.count > 0 && (
                    <span className="text-xs text-gray-500">
                      ({selectedRestaurant.rating.count})
                    </span>
                  )}
                </div>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRestaurant.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-orange-600 hover:text-orange-700 hover:underline mb-2 block"
              >
                {selectedRestaurant.address}
              </a>
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedRestaurant.cuisineType && Array.isArray(selectedRestaurant.cuisineType) && selectedRestaurant.cuisineType.slice(0, 2).map((cuisine) => (
                  <span
                    key={cuisine}
                    className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
              {selectedRestaurant.priceRange && (
                <div className="text-xs text-gray-500">
                  ${selectedRestaurant.priceRange.min} - ${selectedRestaurant.priceRange.max}
                </div>
              )}
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
        {userLocation && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#60a5fa', borderRadius: '50%', marginRight: '6px', border: '2px solid white', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
            <span style={{ color: '#6b7280' }}>You</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
          <MapPin style={{ width: '14px', height: '14px', color: '#f97316', marginRight: '4px' }} />
          <span style={{ color: '#6b7280' }}>My List</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
          <MapPin style={{ width: '14px', height: '14px', color: '#14b8a6', marginRight: '4px' }} />
          <span style={{ color: '#6b7280' }}>Friend&apos;s List</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MapPin style={{ width: '14px', height: '14px', color: '#a1a1aa', marginRight: '4px' }} />
          <span style={{ color: '#6b7280' }}>Other</span>
        </div>
      </div>
    </div>
  );
});

MapView.displayName = 'MapView';

export default MapView;
