import { useState } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { seedRestaurants } from '@/lib/services/restaurants/seedRestaurants';

export default function SeedRestaurantsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    count?: number;
  } | null>(null);

  const handleSeed = async (force: boolean = false) => {
    setLoading(true);
    setResult(null);

    try {
      const result = await seedRestaurants(force);
      setResult(result);
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Seed Restaurants - Nexus Nosh Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg rounded-2xl p-6">
            <CardContent>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Seed Restaurant Data
              </h1>
              
              <p className="text-gray-600 mb-6">
                This will add sample restaurant data to Firestore. The data includes
                14 restaurants in St. George, Utah with various cuisine types, price ranges, and meeting types.
              </p>

              {result && (
                <div
                  className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                    result.success
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <XCircle className="w-5 h-5" />
                  )}
                  <div>
                    <p className="font-semibold">{result.success ? 'Success!' : 'Error'}</p>
                    <p className="text-sm">{result.message}</p>
                    {result.count && (
                      <p className="text-sm mt-1">Added {result.count} restaurants</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={() => handleSeed(false)}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Seeding...
                    </>
                  ) : (
                    'Seed Restaurants'
                  )}
                </Button>

                <Button
                  onClick={() => handleSeed(true)}
                  disabled={loading}
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Seeding...
                    </>
                  ) : (
                    'Force Seed (Overwrite)'
                  )}
                </Button>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="font-semibold text-gray-800 mb-2">What gets seeded:</h2>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>14 restaurants in St. George, Utah</li>
                  <li>Various cuisine types (American, Italian, Japanese, Thai, Mexican, etc.)</li>
                  <li>Different price ranges ($7-$110 per person)</li>
                  <li>Various atmosphere types (casual, upscale, energetic, intimate)</li>
                  <li>Meeting type compatibility (investor-lunch, client-meeting, team-meeting, etc.)</li>
                  <li>Ratings and reviews</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

