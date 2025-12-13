import { useMemo, useState, useRef, useImperativeHandle, forwardRef, useEffect, useCallback } from 'react';
import Map, { Marker, NavigationControl, Popup, MapRef } from 'react-map-gl';
import { RestaurantRecommendation, Restaurant } from '@/lib/types';
import { MapPin, Star, Navigation, Heart, User, UtensilsCrossed } from 'lucide-react';
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
  onRestaurantInfoClick?: (restaurant: Restaurant) => void;
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
  onCenterChange,
  onRestaurantInfoClick
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

  // Get marker type based on list membership
  const getMarkerType = (restaurant: Restaurant): 'myList' | 'friendsList' | 'other' => {
    if (myListIds.has(restaurant.id)) {
      return 'myList';
    }
    if (friendsListIds.has(restaurant.id)) {
      return 'friendsList';
    }
    return 'other';
  };

  // Render custom marker based on type
  const renderMarkerIcon = (type: 'myList' | 'friendsList' | 'other') => {
    switch (type) {
      case 'myList':
        // Heart marker for My List - pink/red with white background
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-9 h-9 bg-white rounded-full shadow-lg border-2 border-rose-200 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            </div>
            {/* Little pointer triangle at bottom */}
            <div className="absolute -bottom-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }} />
          </div>
        );
      case 'friendsList':
        // Person marker for Friends' List - teal with white background
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-9 h-9 bg-white rounded-full shadow-lg border-2 border-teal-200 flex items-center justify-center">
              <User className="w-5 h-5 text-teal-500 fill-teal-100" />
            </div>
            {/* Little pointer triangle at bottom */}
            <div className="absolute -bottom-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))' }} />
          </div>
        );
      case 'other':
      default:
        // Utensils marker for other restaurants - blue
        return (
          <div className="relative flex items-center justify-center">
            <div className="w-7 h-7 bg-white/90 rounded-full shadow-md border border-blue-200 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-blue-500" />
            </div>
          </div>
        );
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
          const markerType = getMarkerType(item.restaurant);
          return (
            <Marker
              key={item.restaurant.id}
              latitude={item.restaurant.coordinates.lat}
              longitude={item.restaurant.coordinates.lng}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedRestaurant(item.restaurant);
                mapRef.current?.flyTo({
                  center: [item.restaurant.coordinates.lng, item.restaurant.coordinates.lat],
                  duration: 800,
                  zoom: 15,
                  padding: { top: 250 } // Push content down to leave room for popup above
                });
              }}
            >
              <div
                className="cursor-pointer transform hover:scale-110 transition-transform"
                title={item.restaurant.name}
              >
                {renderMarkerIcon(markerType)}
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
            maxWidth="300px"
          >
            <div className="flex flex-col">
              {/* Header Image or Gradient Bar (Optional, simpler to just use padding) */}
              <div className="p-4 pb-3">
                <div className="flex items-start justify-between gap-3 mr-6"> {/* mr-6 for Close Button space */}
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">
                      {selectedRestaurant.name}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 pt-1">
                    <AddToListButton restaurantId={selectedRestaurant.id} restaurant={selectedRestaurant} size="sm" />
                  </div>
                </div>

                <div className="flex items-start mt-1 text-gray-500 text-sm">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 mr-1 flex-shrink-0 text-gray-400" />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRestaurant.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 hover:underline line-clamp-2 leading-snug"
                  >
                    {selectedRestaurant.address}
                  </a>
                </div>
              </div>

              {/* Tags & Meta */}
              <div className="px-4 pb-3 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {selectedRestaurant.cuisineType && Array.isArray(selectedRestaurant.cuisineType) && selectedRestaurant.cuisineType.slice(0, 3).map((cuisine) => (
                    <span
                      key={cuisine}
                      className="px-2.5 py-1 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100/50 text-orange-700 text-[11px] font-semibold rounded-full shadow-sm"
                    >
                      {cuisine}
                    </span>
                  ))}
                  {selectedRestaurant.priceRange && (
                    <span className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-[11px] font-medium rounded-full flex items-center gap-0.5">
                      <span className="text-gray-400">$</span>
                      {Array(selectedRestaurant.priceRange.max).fill('$').join('').slice(0, 3)}
                    </span>
                  )}
                </div>

                {selectedRestaurant.rating?.average !== undefined && selectedRestaurant.rating.average > 0 && (
                  <div className="flex items-center gap-1.5 p-2 bg-yellow-50/50 rounded-lg border border-yellow-100/50">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${(selectedRestaurant.rating?.average || 0) >= star
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-200'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-700 pt-0.5">
                      {selectedRestaurant.rating.average.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400 pt-0.5">
                      ({selectedRestaurant.rating.count || 0})
                    </span>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-4 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onRestaurantInfoClick) {
                      onRestaurantInfoClick(selectedRestaurant);
                    }
                  }}
                  className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-sm font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
                >
                  More Info
                  <Navigation className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Legend for marker icons */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        background: 'white',
        padding: '10px 14px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontSize: '12px',
        zIndex: 1,
      }}>
        <div style={{ fontWeight: 600, marginBottom: '8px', color: '#374151', fontSize: '13px' }}>Legend</div>
        {userLocation && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ width: '18px', height: '18px', backgroundColor: '#60a5fa', borderRadius: '50%', marginRight: '8px', border: '2px solid white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Navigation style={{ width: '10px', height: '10px', color: 'white', transform: 'rotate(45deg)' }} />
            </div>
            <span style={{ color: '#6b7280' }}>You</span>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', marginRight: '8px', border: '2px solid #fecdd3', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart style={{ width: '10px', height: '10px', color: '#f43f5e', fill: '#f43f5e' }} />
          </div>
          <span style={{ color: '#6b7280' }}>My List</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', marginRight: '8px', border: '2px solid #99f6e4', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User style={{ width: '10px', height: '10px', color: '#14b8a6' }} />
          </div>
          <span style={{ color: '#6b7280' }}>Friend&apos;s List</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', marginRight: '8px', border: '1px solid #bfdbfe', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UtensilsCrossed style={{ width: '10px', height: '10px', color: '#3b82f6' }} />
          </div>
          <span style={{ color: '#6b7280' }}>Other</span>
        </div>
      </div>
    </div>
  );
});

MapView.displayName = 'MapView';

export default MapView;
