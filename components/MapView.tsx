import { useMemo } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';

type Restaurant = { name: string; lat: number; lng: number; note?: string; kind?: 'favorite'|'friend'|'match' };

export default function MapView({ restaurants, center }: { restaurants: Restaurant[]; center: {lat:number,lng:number} }) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const markers = useMemo(() => restaurants, [restaurants]);

  if (!token) {
    return (
      <div className="w-full h-72 bg-white border rounded-xl flex items-center justify-center text-gray-600">
        <div className="p-4 text-center">
          <div className="font-semibold mb-1">Mapbox token missing</div>
          <div className="text-sm">Create <code>.env.local</code> with <code>NEXT_PUBLIC_MAPBOX_TOKEN=&lt;your_token&gt;</code></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-72 overflow-hidden rounded-xl border">
      <Map
        initialViewState={{ latitude: center.lat, longitude: center.lng, zoom: 12 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={token}
      >
        <NavigationControl position="top-left" />
        {markers.map((m) => (
          <Marker key={m.name} latitude={m.lat} longitude={m.lng} anchor="bottom">
            <div title={`${m.name} — ${m.note ?? ''}`} className={
              m.kind === 'favorite' ? 'text-orange-600' : m.kind === 'friend' ? 'text-blue-600' : 'text-green-700'
            }>
              ●
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
