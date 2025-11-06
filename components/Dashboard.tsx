import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Star, Users, Filter, Clock, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { RestaurantRecommendation } from '@/lib/types';
import { getPersonalizedRecommendations } from '@/lib/services/recommendations/recommendationService';
import { getTasteProfile } from '@/lib/services/taste-profile/tasteProfileService';
import { useAuth } from '@/lib/auth/useAuth';
import MapView from '@/components/MapView';

interface DashboardProps {
  userId: string;
  userLocation?: { lat: number; lng: number };
  userName?: string;
}

export default function Dashboard({ userId, userLocation, userName = 'Derek' }: DashboardProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<RestaurantRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [tasteProfile, setTasteProfile] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, [userId, userLocation]);

  async function loadData() {
    setLoading(true);
    try {
      console.log('[Dashboard] Loading recommendations for user:', userId);
      const [recs, profile] = await Promise.all([
        getPersonalizedRecommendations(userId, userLocation),
        getTasteProfile(userId),
      ]);
      console.log('[Dashboard] Recommendations loaded:', recs.length, recs);
      console.log('[Dashboard] Taste profile loaded:', profile);
      setRecommendations(recs);
      setTasteProfile(profile);
    } catch (error) {
      console.error('[Dashboard] Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  // Prepare taste data for radar chart
  const tasteData = tasteProfile ? [
    { trait: 'Quiet', score: tasteProfile.preferences.quietness },
    { trait: 'Speed', score: 70 }, // Service speed - could be derived from preferences
    { trait: 'Service', score: tasteProfile.preferences.serviceQuality },
    { trait: 'Healthy', score: tasteProfile.preferences.healthiness },
    { trait: 'Impress', score: tasteProfile.preferences.atmosphere },
    { trait: 'Value', score: tasteProfile.preferences.value },
  ] : [
    { trait: 'Quiet', score: 85 },
    { trait: 'Speed', score: 70 },
    { trait: 'Service', score: 90 },
    { trait: 'Healthy', score: 65 },
    { trait: 'Impress', score: 88 },
    { trait: 'Value', score: 75 },
  ];

  // Top picks (favorites)
  const topPicks = recommendations
    .filter(r => r.matchType === 'personal-favorite')
    .slice(0, 3);

  // Friend recommendations
  const friendPicks = recommendations
    .filter(r => r.matchType === 'friend-recommendation')
    .slice(0, 2);

  // Nearby picks for map section
  const nearbyPicks = recommendations.slice(0, 3);

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-orange-50 to-white min-h-screen pb-24">
      <header className="text-center relative">
        <div className="absolute top-0 right-0">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              try {
                await signOut();
                router.push('/login');
              } catch (error) {
                console.error('Error signing out:', error);
              }
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Sign Out
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">Nexus Nosh</h1>
        <p className="text-gray-600">Smart lunch pairings for business and pleasure</p>
      </header>

      {/* Welcome / Home Screen */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-3">Welcome Back, {userName}!</h2>
            <p className="text-gray-500 mb-4">Here are your top lunch spots today:</p>
            {loading ? (
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="rounded-xl border p-3 bg-gray-100 animate-pulse h-20" />
                ))}
              </div>
            ) : topPicks.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {topPicks.map((rec) => (
                  <Card key={rec.restaurant.id} className="rounded-xl shadow-sm border p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{rec.restaurant.name}</span>
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-gray-500 text-sm">
                      {rec.reasons[0] || 'Perfect for business lunches'}
                    </p>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {['Cliffside Restaurant', 'Wood Ash Rye', 'Painted Pony'].map((r) => (
                  <Card key={r} className="rounded-xl shadow-sm border p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{r}</span>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <p className="text-gray-500 text-sm">Perfect for business lunches</p>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.section>

      {/* Recommendations & Social Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Smart Recommendations</h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.length > 0 && recommendations[0] ? (
                <>
                  <Card className="p-3 border rounded-xl">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="font-semibold">{recommendations[0].restaurant.name}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {recommendations[0].reasons[0] || 'Great match for your preferences'}
                    </p>
                  </Card>
                  {friendPicks.length > 0 ? (
                    <Card className="p-3 border rounded-xl">
                      <div className="flex items-center mb-2">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-semibold">Friend Picks</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {friendPicks[0].friendRecommendations?.[0]?.userName || 'Friends'} rated '{friendPicks[0].restaurant.name}' highly
                      </p>
                    </Card>
                  ) : (
                    <Card className="p-3 border rounded-xl">
                      <div className="flex items-center mb-2">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="font-semibold">Friend Picks</span>
                      </div>
                      <p className="text-sm text-gray-500">Machell and Adam both rated 'Farmstead' 9/10</p>
                    </Card>
                  )}
                </>
              ) : (
                <>
                  <Card className="p-3 border rounded-xl">
                    <div className="flex items-center mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="font-semibold">George's Corner</span>
                    </div>
                    <p className="text-sm text-gray-500">Energetic casual spot for quick team lunches</p>
                  </Card>
                  <Card className="p-3 border rounded-xl">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-semibold">Friend Picks</span>
                    </div>
                    <p className="text-sm text-gray-500">Machell and Adam both rated 'Farmstead' 9/10</p>
                  </Card>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Map / Nearby Picks */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Map — Nearby Picks</h2>
              <Button variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-1" />
                Near Me
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 rounded-xl overflow-hidden">
                <MapView 
                  recommendations={recommendations.slice(0, 10)} 
                  center={userLocation || { lat: 37.0965, lng: -113.5684 }}
                  height="400px"
                />
              </div>
              <div className="space-y-3">
                {nearbyPicks.length > 0 ? (
                  nearbyPicks.map((rec) => (
                    <Card key={rec.restaurant.id} className="p-3 border rounded-xl">
                      <p className="font-semibold">{rec.restaurant.name}</p>
                      <p className="text-sm text-gray-500">
                        {rec.restaurant.attributes.atmosphere} • {rec.reasons[0] || 'Recommended'}
                      </p>
                    </Card>
                  ))
                ) : (
                  [
                    { name: 'Cliffside', note: 'Quiet • Impress 9/10' },
                    { name: 'Wood Ash Rye', note: 'Upscale • Service 9/10' },
                    { name: 'Farmstead', note: 'Friend pick • Value 8/10' },
                  ].map((i) => (
                    <Card key={i.name} className="p-3 border rounded-xl">
                      <p className="font-semibold">{i.name}</p>
                      <p className="text-sm text-gray-500">{i.note}</p>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Calendar / Meeting Mode */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
              <Clock className="w-4 h-4 text-gray-500" />
            </div>
            <div className="space-y-3">
              <Card className="p-3 border rounded-xl bg-orange-50">
                <p className="font-semibold">Lunch with Tim and Jessica</p>
                <p className="text-sm text-gray-500">Suggested: Painted Pony (mutual favorite)</p>
              </Card>
              <Card className="p-3 border rounded-xl bg-blue-50">
                <p className="font-semibold">Investor Meetup</p>
                <p className="text-sm text-gray-500">Suggestion: Wood Ash Rye — quiet and upscale</p>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* AI Taste Profile */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Taste Profile</h2>
              <span className="text-sm text-gray-500">Learned from your ratings & notes</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={tasteData} cx="50%" cy="50%" outerRadius="80%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="trait" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar 
                      name="You" 
                      dataKey="score" 
                      stroke="#fb923c" 
                      fill="#fb923c" 
                      fillOpacity={0.3} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  • You favor <span className="font-semibold">quiet</span> spaces and high{' '}
                  <span className="font-semibold">service</span>.
                </p>
                <p>
                  • Try more <span className="font-semibold">healthy</span> options similar to your favorites.
                </p>
                <p>
                  • Friends lean slightly higher on <span className="font-semibold">value</span> — consider overlap picks.
                </p>
                <div className="pt-2">
                  <Button variant="outline" size="sm">Compare with Friends</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

               {/* Action Bar */}
               <div className="fixed bottom-6 inset-x-0 flex justify-center z-10 gap-4">
                 <Link href="/profile">
                   <Button
                     className="rounded-full shadow-lg px-6 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white"
                   >
                     <User className="w-5 h-5 mr-2" />
                     Profile
                   </Button>
                 </Link>
                 <Link href="/restaurants">
                   <Button className="rounded-full shadow-lg px-6 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white">
                     <MapPin className="w-5 h-5 mr-2" />
                     Restaurants
                   </Button>
                 </Link>
                 <Button className="rounded-full shadow-lg px-8 py-6 text-lg bg-orange-500 hover:bg-orange-600 text-white">
                   + Add Restaurant
                 </Button>
               </div>
    </div>
  );
}
