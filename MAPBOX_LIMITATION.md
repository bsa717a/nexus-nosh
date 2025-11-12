# Mapbox Places API Limitation

## The Problem

Mapbox's **Geocoding API** (v5) is designed primarily for **geocoding addresses** and **searching for known place names**, not for discovering nearby points of interest (POIs) like restaurants.

When searching for generic terms like "restaurant" with `types=poi`, the API returns **0 results** because:
1. It expects specific place names (e.g., "Olive Garden", "McDonald's")
2. The `poi` type is meant for named points of interest, not categories
3. There's no category-based filtering (like "food", "restaurants")

## What We Tried

```typescript
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?proximity=-113.5684,37.0965&limit=10&types=poi&access_token=${MAPBOX_TOKEN}`;
```

This returns 0 features because "restaurant" is not a specific place name.

## The Solution: Use Google Places API or Yelp

For discovering nearby restaurants and POIs, you need an API specifically designed for this:

### Option 1: Google Places API (Recommended)
- **Best for**: Rich restaurant data with reviews, ratings, photos, hours
- **Cost**: $17 per 1,000 requests (Nearby Search)
- **Free Tier**: $200/month credit (~11,700 requests)
- **Data**: Reviews, ratings, photos, hours, menus, price level

### Option 2: Yelp Fusion API
- **Best for**: Reviews, ratings, business details
- **Cost**: Free for up to 5,000 requests/day
- **Data**: Reviews, ratings, photos, hours, price level, categories

### Option 3: Foursquare Places API
- **Best for**: POI data with recommendations
- **Cost**: Free tier available
- **Data**: Categories, tips, hours, photos

## Implementation Plan

### Using Google Places API

1. **Get API Key**
   - Go to: https://console.cloud.google.com/
   - Enable "Places API"
   - Create credentials (API Key with HTTP referrer restrictions)

2. **Install Client Library**
   ```bash
   npm install @googlemaps/google-maps-services-js
   ```

3. **Create Service** (`lib/services/google/placesService.ts`)
   ```typescript
   import { Client } from "@googlemaps/google-maps-services-js";

   const client = new Client({});

   export async function searchRestaurantsNearby(
     location: { lat: number; lng: number },
     radiusMeters: number = 5000
   ) {
     const response = await client.placesNearby({
       params: {
         location,
         radius: radiusMeters,
         type: 'restaurant',
         key: process.env.GOOGLE_PLACES_API_KEY!,
       },
     });

     return response.data.results.map(place => ({
       id: `google-${place.place_id}`,
       name: place.name,
       address: place.vicinity,
       coordinates: {
         lat: place.geometry.location.lat,
         lng: place.geometry.location.lng,
       },
       cuisineType: place.types,
       rating: {
         average: place.rating || 0,
         count: place.user_ratings_total || 0,
       },
       priceRange: {
         min: (place.price_level || 1) * 10,
         max: (place.price_level || 1) * 15,
       },
       // ... map other fields
     }));
   }
   ```

4. **Add to Dashboard**
   - Replace `searchRestaurantsNearLocation` with Google Places call
   - Update environment variables

### Using Yelp Fusion API

1. **Get API Key**
   - Go to: https://www.yelp.com/developers
   - Create an app
   - Copy your API Key

2. **Create Service** (`lib/services/yelp/yelpService.ts`)
   ```typescript
   export async function searchYelpRestaurants(
     location: { lat: number; lng: number },
     radiusMeters: number = 5000
   ) {
     const response = await fetch(
       `https://api.yelp.com/v3/businesses/search?latitude=${location.lat}&longitude=${location.lng}&radius=${radiusMeters}&categories=restaurants&limit=50`,
       {
         headers: {
           'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
         },
       }
     );

     const data = await response.json();
     
     return data.businesses.map(business => ({
       id: `yelp-${business.id}`,
       name: business.name,
       address: business.location.display_address.join(', '),
       coordinates: {
         lat: business.coordinates.latitude,
         lng: business.coordinates.longitude,
       },
       cuisineType: business.categories.map(c => c.title),
       rating: {
         average: business.rating,
         count: business.review_count,
       },
       priceRange: {
         min: (business.price?.length || 1) * 10,
         max: (business.price?.length || 1) * 15,
       },
       phone: business.phone,
       imageUrl: business.image_url,
       // ... map other fields
     }));
   }
   ```

## Current Status

The Mapbox integration is **technically complete** but returns **0 results** because Mapbox Geocoding API doesn't support category-based POI discovery.

**Next Steps:**
1. Choose Google Places API (best data) or Yelp (free tier)
2. Get API keys
3. Replace `mapboxPlacesService.ts` with chosen service
4. Update environment variables
5. Test with real data

## Mapbox Alternatives for the Future

If you still want to use Mapbox for mapping (which is excellent), consider:
- **Mapbox Search Box API**: More advanced search capabilities (still in beta)
- **Hybrid approach**: Use Google/Yelp for data, Mapbox for map display
- **Custom POI dataset**: Upload your own restaurant data to Mapbox as a tileset

## Cost Comparison (per 1,000 requests)

| Service | Cost | Free Tier | Data Quality |
|---------|------|-----------|--------------|
| Google Places | $17 | $200/month | ⭐⭐⭐⭐⭐ |
| Yelp Fusion | Free | 5,000/day | ⭐⭐⭐⭐ |
| Foursquare | Varies | Limited | ⭐⭐⭐ |
| Mapbox Geocoding | $0.50 | 100,000/month | ⭐⭐ (for POI) |

## Recommendation

**Use Google Places API** for the best restaurant data, then display results on your existing Mapbox map. This gives you:
- Rich restaurant data (reviews, ratings, photos, hours)
- Beautiful Mapbox map display
- Best of both worlds

Would you like me to implement the Google Places API integration?

