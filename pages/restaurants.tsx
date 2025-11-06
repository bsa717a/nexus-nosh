import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, MapPin, Star, DollarSign, Clock } from 'lucide-react';
import { getAllRestaurants } from '@/lib/services/restaurants/restaurantService';
import { Restaurant } from '@/lib/types';
import ProtectedRoute from '@/components/ProtectedRoute';

function RestaurantsPageContent() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurants();
  }, []);

  async function loadRestaurants() {
    setLoading(true);
    try {
      const data = await getAllRestaurants(100);
      setRestaurants(data);
    } catch (error) {
      console.error('Error loading restaurants:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Restaurants - Nexus Nosh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Browse all restaurants in Nexus Nosh" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">All Restaurants</h1>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading restaurants...</p>
            </div>
          ) : restaurants.length === 0 ? (
            <Card className="shadow-md rounded-2xl p-8">
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600 mb-4">No restaurants found.</p>
                  <p className="text-gray-500 mb-6">
                    Restaurants need to be seeded first. Go to the admin page to seed restaurant data.
                  </p>
                  <Link href="/admin/seed-restaurants">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Seed Restaurants
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                Showing {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-yellow-500" />
                            <span className="text-sm font-medium">{restaurant.rating.average.toFixed(1)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="truncate">{restaurant.address}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {restaurant.cuisineType.slice(0, 3).map((cuisine) => (
                            <span
                              key={cuisine}
                              className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                            >
                              {cuisine}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>
                              ${restaurant.priceRange.min} - ${restaurant.priceRange.max}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="capitalize">{restaurant.attributes.serviceSpeed}</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500">
                          <p>Quietness: {restaurant.attributes.quietness}/100</p>
                          <p className="capitalize">Atmosphere: {restaurant.attributes.atmosphere}</p>
                          {restaurant.attributes.privateBooths && (
                            <p className="text-green-600">✓ Private booths available</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function RestaurantsPage() {
  return (
    <ProtectedRoute>
      <RestaurantsPageContent />
    </ProtectedRoute>
  );
}

