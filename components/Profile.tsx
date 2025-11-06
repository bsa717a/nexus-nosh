import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, Edit2, Save, X, Settings, Star, MapPin, Users, Clock, LogOut, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { getTasteProfile } from '@/lib/services/taste-profile/tasteProfileService';
import { TasteProfile, User as UserType } from '@/lib/types';
import { useAuth } from '@/lib/auth/useAuth';

interface ProfileProps {
  userId: string;
}

export default function Profile({ userId }: ProfileProps) {
  const { signOut, user } = useAuth();
  const router = useRouter();
  const [tasteProfile, setTasteProfile] = useState<TasteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    displayName: user?.displayName || user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    bio: 'Food enthusiast and business lunch connoisseur',
  });
  const [editForm, setEditForm] = useState(userInfo);

  useEffect(() => {
    if (user) {
      setUserInfo({
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        bio: 'Food enthusiast and business lunch connoisseur',
      });
      setEditForm({
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        bio: 'Food enthusiast and business lunch connoisseur',
      });
    }
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  async function loadProfile() {
    setLoading(true);
    try {
      const profile = await getTasteProfile(userId);
      setTasteProfile(profile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
    // TODO: Save to Firebase
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  // Prepare taste data for radar chart
  const tasteData = tasteProfile ? [
    { trait: 'Quiet', score: tasteProfile.preferences.quietness },
    { trait: 'Service', score: tasteProfile.preferences.serviceQuality },
    { trait: 'Healthy', score: tasteProfile.preferences.healthiness },
    { trait: 'Atmosphere', score: tasteProfile.preferences.atmosphere },
    { trait: 'Value', score: tasteProfile.preferences.value },
  ] : [
    { trait: 'Quiet', score: 85 },
    { trait: 'Service', score: 90 },
    { trait: 'Healthy', score: 65 },
    { trait: 'Atmosphere', score: 88 },
    { trait: 'Value', score: 75 },
  ];

  const stats = tasteProfile?.learningData || {
    totalRatings: 24,
    averageRating: 4.2,
    lastUpdated: new Date(),
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-orange-50 to-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
        <Link href="/settings">
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Link>
      </div>

      {/* User Info Card */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                  {userInfo.displayName.charAt(0).toUpperCase()}
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-gray-700" />
                  </button>
                )}
              </div>

              {/* User Details */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={editForm.displayName}
                        onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold mb-1">{userInfo.displayName}</h2>
                    <p className="text-gray-600 mb-2">{userInfo.email}</p>
                    <p className="text-gray-500 text-sm">{userInfo.bio}</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Stats Cards */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="shadow-md rounded-2xl p-4">
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalRatings}</p>
                  <p className="text-sm text-gray-500">Restaurants Rated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl p-4">
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-500 fill-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                  <p className="text-sm text-gray-500">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl p-4">
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-500">Friends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Taste Profile */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Taste Profile</h2>
              <span className="text-sm text-gray-500">
                Updated {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : 'recently'}
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 h-72">
                {loading ? (
                  <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={tasteData} cx="50%" cy="50%" outerRadius="80%">
                      <PolarGrid />
                      <PolarAngleAxis dataKey="trait" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Preferences"
                        dataKey="score"
                        stroke="#fb923c"
                        fill="#fb923c"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Quietness</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${tasteData[0].score}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{tasteData[0].score}/100</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Service Quality</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${tasteData[1].score}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{tasteData[1].score}/100</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Healthiness</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${tasteData[2].score}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{tasteData[2].score}/100</span>
                </div>
                <Button size="sm" className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                  Edit Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Preferences & Settings */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Price Range</p>
                <p className="text-gray-600">
                  ${tasteProfile?.preferences.priceRange.min || 10} - ${tasteProfile?.preferences.priceRange.max || 100} per person
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Preferred Cuisines</p>
                <div className="flex flex-wrap gap-2">
                  {tasteProfile?.preferences.cuisineTypes && tasteProfile.preferences.cuisineTypes.length > 0 ? (
                    tasteProfile.preferences.cuisineTypes.map((cuisine, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full"
                      >
                        {cuisine}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">No preferences set yet</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Button className="justify-start bg-orange-500 hover:bg-orange-600 text-white">
                <MapPin className="w-4 h-4 mr-2" />
                View My Favorites
              </Button>
              <Button className="justify-start bg-orange-500 hover:bg-orange-600 text-white">
                <Users className="w-4 h-4 mr-2" />
                Manage Friends
              </Button>
              <Button className="justify-start bg-orange-500 hover:bg-orange-600 text-white">
                <Clock className="w-4 h-4 mr-2" />
                My Meetings
              </Button>
              <Button 
                className="justify-start bg-orange-500 hover:bg-orange-600 text-white"
                onClick={async () => {
                  try {
                    await signOut();
                    router.push('/login');
                  } catch (error) {
                    console.error('Error signing out:', error);
                  }
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
