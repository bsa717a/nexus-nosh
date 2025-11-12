# Mapbox Places Integration

## Overview
This document explains how the app now integrates real restaurant data from Mapbox's Places API.

## What Changed

### 1. New Mapbox Places Service
**File**: `lib/services/mapbox/mapboxPlacesService.ts`

This service fetches real-world restaurant data from Mapbox's Search API (v6):
- Searches for POIs (Points of Interest) near a given location
- Filters results to restaurants, cafes, bars, and food establishments
- Converts Mapbox data to our `Restaurant` type
- Respects a configurable search radius (default 10km, max 50km)

### 2. Dashboard Updates
**File**: `components/Dashboard.tsx`

Enhanced to:
- Load Mapbox restaurants when user location is available
- Combine database restaurants with Mapbox data
- Add a toggle button: "All Restaurants" (includes Mapbox) vs "My Restaurants" (database only)
- Show combined results on the map
- Filter and sort both data sources together

### 3. Map Visual Enhancements
**File**: `components/MapView.tsx`

Improved to:
- Show Mapbox restaurants in **cyan** (#06b6d4) markers
- Show database restaurants in **orange** (#fb923c) markers
- Display a legend in the bottom-right corner
- Add "Mapbox" badge to popups for Mapbox-sourced restaurants
- Maintain existing color-coding for personalized recommendations

## How It Works

### Data Flow
1. **User Location Detection**: Browser geolocation detects user's coordinates (or defaults to Saint George, UT)
2. **Mapbox Search**: Searches for restaurants within 10km radius using Mapbox Search API v6
3. **Data Combination**: Merges Mapbox results with Firebase database restaurants
4. **Map Display**: Shows all restaurants with color-coded markers
5. **Toggle Control**: User can switch between "All Restaurants" (DB + Mapbox) and "My Restaurants" (DB only)

### API Details

**Endpoint**: `https://api.mapbox.com/search/geocode/v6/forward`

**Parameters**:
- `q=restaurant`: Search query
- `proximity={lng},{lat}`: Center point for proximity-based search
- `limit=50`: Maximum results (max 50 per API)
- `types=poi`: Only return Point of Interest results
- `access_token`: Your Mapbox access token

**Response**: GeoJSON with features array containing restaurant data

### Marker Colors

| Color | Hex | Meaning |
|-------|-----|---------|
| 🔵 Cyan | `#06b6d4` | Mapbox POI (real-world data) |
| 🟠 Orange | `#fb923c` | Database restaurant (user-added) |
| 🟠 Dark Orange | `#ea580c` | Personal favorite |
| 🔵 Blue | `#3b82f6` | Friend recommendation |
| 🟢 Green | `#10b981` | Smart match |
| 🟣 Purple | `#8b5cf6` | Trending |

## Restaurant ID Format

To distinguish between data sources:
- **Mapbox restaurants**: ID starts with `mapbox-` (e.g., `mapbox-poi.123456`)
- **Database restaurants**: Standard Firebase document IDs

## User Experience

### Toggle Button
- **"All Restaurants"** (Orange, active): Shows both database and Mapbox restaurants
- **"My Restaurants"** (Outline, inactive): Shows only database restaurants

### Filters
All existing filters (ZIP code, "Near Me", etc.) work with both data sources.

### Clicking Restaurants
- Click a marker to see restaurant details in a popup
- Mapbox restaurants show a "Mapbox" badge in the popup
- Click nearby pick cards to focus the map on that restaurant

## Limitations

### Mapbox Data Limitations
Since we're using the Geocoding/Search API (not a full restaurant API):
- **Limited details**: No ratings, reviews, or photos from Mapbox
- **Generic attributes**: Default values for quietness, atmosphere, etc.
- **No real-time data**: Hours, menus, etc. not available
- **Price range**: Estimated as $10-$30 (generic)

### Better Alternatives (Future)
For more comprehensive restaurant data, consider integrating:
1. **Google Places API**: Rich restaurant data, photos, reviews, ratings
2. **Yelp Fusion API**: Reviews, ratings, hours, photos, menus
3. **Foursquare Places API**: POI data with categories and details

## API Costs

**Mapbox Search API**:
- **Free Tier**: 100,000 requests/month
- **Cost**: $0.50 per 1,000 requests beyond free tier
- **Current usage**: ~1 request per page load (when location available)

## Configuration

### Environment Variables
```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiYnNhNzE3IiwiYSI6ImNtaG13YnZvczIxcHIybXB1N2E0NnJpcHcifQ.Z-AeF3-pt2ihl2uz71Lvxg
```

### Adjusting Search Parameters

In `components/Dashboard.tsx`, line 66:
```typescript
const mapboxRests = await searchRestaurantsNearLocation(
  userLocation,
  10000,  // radius in meters (10km)
  50      // max results
);
```

## Testing

1. **Open the app**: http://localhost:3010
2. **Allow location access** when prompted (or it defaults to Saint George)
3. **Check the map**: Should see cyan (Mapbox) and orange (database) markers
4. **Toggle "All Restaurants"**: Should switch between data sources
5. **Click markers**: Popups should show "Mapbox" badge for Mapbox restaurants
6. **Check console**: Look for `[MapboxPlaces]` and `[Dashboard]` debug logs

## Troubleshooting

### No Mapbox Restaurants Showing
- Check browser console for API errors
- Verify `NEXT_PUBLIC_MAPBOX_TOKEN` is set correctly
- Ensure location permission is granted
- Check if search radius includes any restaurants (try increasing to 20km)

### All Markers Same Color
- Verify marker color logic in `MapView.tsx` line 78-97
- Check that restaurant IDs start with `mapbox-` for Mapbox data

### Performance Issues
- Reduce `limit` parameter (currently 50)
- Reduce search `radiusMeters` (currently 10000)
- Implement debouncing on location updates

## Future Enhancements

1. **Caching**: Cache Mapbox results to reduce API calls
2. **Incremental Loading**: Load restaurants as user pans the map
3. **Rich Data Integration**: Add Google Places or Yelp for better restaurant data
4. **Save Mapbox Restaurants**: Allow users to "claim" Mapbox restaurants and add to database
5. **Search Suggestions**: Use Mapbox Autofill for restaurant search
6. **Categories**: Filter by cuisine type from Mapbox categories

## Related Files

- `lib/services/mapbox/mapboxPlacesService.ts` - Mapbox API integration
- `components/Dashboard.tsx` - Data loading and toggle control
- `components/MapView.tsx` - Map rendering with color-coded markers
- `lib/types/index.ts` - Restaurant type definitions
- `pages/index.tsx` - User location detection

