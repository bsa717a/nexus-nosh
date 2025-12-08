
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Edit2, Save, X, Star, Users, Utensils, Award, TrendingUp, Check, Bell, Lock } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { getTasteProfile, updateTasteProfile } from '@/lib/services/taste-profile/tasteProfileService';
import { getFriends } from '@/lib/services/friends/friendService';
import { getUserRestaurantStates } from '@/lib/services/restaurants/userRestaurantStateService';
import { getUserSettings, updateNotificationSettings } from '@/lib/services/user-settings/userSettingsService';
import { TasteProfile } from '@/lib/types';
import { useAuth } from '@/lib/auth/useAuth';

interface ProfileProps {
  userId: string;
}

export default function Profile({ userId }: ProfileProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [tasteProfile, setTasteProfile] = useState<TasteProfile | null>(null);
  const [friendCount, setFriendCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({
    ratedCount: 0,
    averageRating: 0
  });

  const [userInfo, setUserInfo] = useState({
    displayName: user?.displayName || user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    bio: 'Food enthusiast and business lunch connoisseur',
  });
  const [editForm, setEditForm] = useState(userInfo);

  // Price editing state
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [priceForm, setPriceForm] = useState({ min: 10, max: 100 });

  // Cuisine editing state
  const [isEditingCuisines, setIsEditingCuisines] = useState(false);
  const [cuisineForm, setCuisineForm] = useState<string[]>([]);

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    friendRecommendations: true,
    meetingReminders: true,
  });

  const CUISINE_OPTIONS = [
    'Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian',
    'French', 'Japanese', 'Thai', 'Greek', 'Middle Eastern', 'Korean',
    'Vietnamese', 'BBQ', 'Seafood', 'Vegetarian', 'Vegan', 'Fast Food'
  ];

  useEffect(() => {
    if (user) {
      const initialInfo = {
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        bio: 'Food enthusiast and business lunch connoisseur',
      };
      setUserInfo(initialInfo);
      setEditForm(initialInfo);
    }
  }, [user]);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  async function loadProfile() {
    setLoading(true);
    try {
      const [profile, friends, userStates, userSettings] = await Promise.all([
        getTasteProfile(userId),
        getFriends(userId),
        getUserRestaurantStates(userId),
        getUserSettings(userId)
      ]);

      setTasteProfile(profile);
      if (profile?.preferences?.priceRange) {
        setPriceForm(profile.preferences.priceRange);
      }
      if (profile?.preferences?.cuisineTypes) {
        setCuisineForm(profile.preferences.cuisineTypes);
      }

      if (userSettings?.notifications) {
        setNotificationSettings(userSettings.notifications);
      }

      setFriendCount(friends.filter(f => f.status === 'accepted').length);

      // Calculate real stats from user states
      const ratedStates = Object.values(userStates).filter(
        s => s.personalRating !== undefined && s.personalRating > 0
      );

      const totalRatingValue = ratedStates.reduce((sum, state) => sum + (state.personalRating || 0), 0);
      const avgRating = ratedStates.length > 0 ? totalRatingValue / ratedStates.length : 0;

      setStats({
        ratedCount: ratedStates.length,
        averageRating: avgRating
      });

    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
    // TODO: Save to Firebase for user info
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  const handleSavePrice = async () => {
    if (!user) return;
    try {
      await updateTasteProfile(user.uid, {
        priceRange: priceForm
      });
      setIsEditingPrice(false);
      // Optimistically update local state
      if (tasteProfile) {
        setTasteProfile({
          ...tasteProfile,
          preferences: {
            ...tasteProfile.preferences,
            priceRange: priceForm
          }
        });
      }
    } catch (error) {
      console.error('Failed to save price range', error);
    }
  };

  const handleCuisineToggle = (cuisine: string) => {
    setCuisineForm(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleSaveCuisines = async () => {
    if (!user) return;
    try {
      await updateTasteProfile(user.uid, {
        cuisineTypes: cuisineForm
      });
      setIsEditingCuisines(false);
      // Optimistically update local state
      if (tasteProfile) {
        setTasteProfile({
          ...tasteProfile,
          preferences: {
            ...tasteProfile.preferences,
            cuisineTypes: cuisineForm
          }
        });
      }
    } catch (error) {
      console.error('Failed to save cuisines', error);
    }
  };

  const handleSaveNotifications = async () => {
    if (!user) return;
    try {
      await updateNotificationSettings(user.uid, notificationSettings);
    } catch (error) {
      console.error('Failed to save notification settings', error);
    }
  };

  // Prepare taste data for radar chart with better defaults
  const tasteData = tasteProfile ? [
    { trait: 'Quiet', score: tasteProfile.preferences.quietness },
    { trait: 'Service', score: tasteProfile.preferences.serviceQuality },
    { trait: 'Healthy', score: tasteProfile.preferences.healthiness },
    { trait: 'Atmosphere', score: tasteProfile.preferences.atmosphere },
    { trait: 'Value', score: tasteProfile.preferences.value },
  ] : [
    { trait: 'Quiet', score: 50 },
    { trait: 'Service', score: 50 },
    { trait: 'Healthy', score: 50 },
    { trait: 'Atmosphere', score: 50 },
    { trait: 'Value', score: 50 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pb-24">
      {/* Modern Header Section */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 border-b border-orange-100/50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
          My Profile
        </h1>
      </div>

      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        {/* User Info Card */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-orange-100/50 border border-white">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar with Gradient Ring */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative w-28 h-28 rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center text-orange-600 text-4xl font-bold">
                    {userInfo.displayName.charAt(0).toUpperCase()}
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="absolute bottom-1 right-1 w-8 h-8 bg-white text-gray-600 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-colors border border-gray-100"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* User Details */}
              <div className="flex-1 text-center md:text-left w-full">
                {isEditing ? (
                  <div className="space-y-4 max-w-md mx-auto md:mx-0">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={editForm.displayName}
                        onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Bio
                      </label>
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                      />
                    </div>
                    <div className="flex gap-3 justify-center md:justify-start pt-2">
                      <Button onClick={handleSave} size="sm" className="bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 shadow-lg shadow-orange-500/30 rounded-xl">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button onClick={handleCancel} size="sm" variant="outline" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl border-0">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-gray-900">{userInfo.displayName}</h2>
                    <p className="text-gray-500 font-medium">{userInfo.email}</p>
                    <p className="text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
                      {userInfo.bio}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                      <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                        Foodie
                      </div>
                      <div className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold">
                        Early Adopter
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Rated Count */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600 rounded-xl flex items-center justify-center shadow-inner">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.ratedCount}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Restaurants Rated</p>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-200 text-amber-600 rounded-xl flex items-center justify-center shadow-inner">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Average Rating</p>
            </div>
          </div>

          {/* Friend Count */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-200 text-rose-600 rounded-xl flex items-center justify-center shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{friendCount}</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Friends Connected</p>
            </div>
          </div>
        </motion.section>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Taste Profile */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Taste Profile</h2>
                </div>
                {loading && <div className="animate-spin w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full" />}
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2 aspect-square relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={tasteData} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="trait" tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Preferences"
                        dataKey="score"
                        stroke="#f97316"
                        strokeWidth={3}
                        fill="#fb923c"
                        fillOpacity={0.2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-full md:w-1/2 space-y-5">
                  {[
                    { label: 'Quietness', score: tasteData[0].score, color: 'bg-indigo-500' },
                    { label: 'Service', score: tasteData[1].score, color: 'bg-rose-500' },
                    { label: 'Healthy', score: tasteData[2].score, color: 'bg-emerald-500' },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-gray-700">{item.label}</span>
                        <span className="text-gray-500 font-mono">{Math.round(item.score)}/100</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full rounded-full ${item.color} opacity-80`}
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={() => router.push('/taste-quiz')}
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Take Taste Quiz Again
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Preferences Sidebar */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="p-2 bg-amber-50 rounded-lg">
                  <Star className="w-5 h-5 text-amber-600" />
                </span>
                Preferences
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Price Range</p>
                  {isEditingPrice ? (
                    <div className="p-3 bg-white border border-orange-200 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex gap-2 items-center mb-2">
                        <input
                          type="number"
                          value={priceForm.min}
                          onChange={(e) => setPriceForm({ ...priceForm, min: parseInt(e.target.value) || 0 })}
                          className="w-16 px-2 py-1 border border-gray-200 rounded-lg text-sm text-center"
                          min="0"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          value={priceForm.max}
                          onChange={(e) => setPriceForm({ ...priceForm, max: parseInt(e.target.value) || 0 })}
                          className="w-16 px-2 py-1 border border-gray-200 rounded-lg text-sm text-center"
                          min="0"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setIsEditingPrice(false)}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleSavePrice}
                          className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsEditingPrice(true)}
                      className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-medium cursor-pointer hover:border-orange-200 hover:bg-orange-50 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          ${tasteProfile?.preferences.priceRange.min || 10} - ${tasteProfile?.preferences.priceRange.max || 100}
                          <span className="text-xs text-gray-400 ml-1">per person</span>
                        </span>
                        <Edit2 className="w-3 h-3 text-orange-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Favorite Cuisines</p>
                  {isEditingCuisines ? (
                    <div className="p-3 bg-white border border-orange-200 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex flex-wrap gap-2 mb-3 max-h-48 overflow-y-auto">
                        {CUISINE_OPTIONS.map((cuisine) => (
                          <button
                            key={cuisine}
                            onClick={() => handleCuisineToggle(cuisine)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${cuisineForm.includes(cuisine)
                              ? 'bg-orange-500 text-white hover:bg-orange-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            {cuisine}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 justify-end pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setIsEditingCuisines(false);
                            setCuisineForm(tasteProfile?.preferences.cuisineTypes || []);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleSaveCuisines}
                          className="p-1 text-green-600 hover:text-green-700 rounded-full hover:bg-green-50"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsEditingCuisines(true)}
                      className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:border-orange-200 hover:bg-orange-50 transition-all group min-h-[3rem]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-2 flex-1">
                          {tasteProfile?.preferences.cuisineTypes && tasteProfile.preferences.cuisineTypes.length > 0 ? (
                            tasteProfile.preferences.cuisineTypes.map((cuisine, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-orange-50 text-orange-700 border border-orange-100 rounded-lg font-medium"
                              >
                                {cuisine}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm italic">Click to add cuisines</span>
                          )}
                        </div>
                        <Edit2 className="w-3 h-3 text-orange-300 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="p-6 pt-0 max-w-4xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="font-medium text-gray-700 group-hover:text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => {
                    setNotificationSettings(prev => ({
                      ...prev,
                      emailNotifications: e.target.checked
                    }));
                    handleSaveNotifications();
                  }}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="font-medium text-gray-700 group-hover:text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Get notified on your device</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => {
                    setNotificationSettings(prev => ({
                      ...prev,
                      pushNotifications: e.target.checked
                    }));
                    handleSaveNotifications();
                  }}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="font-medium text-gray-700 group-hover:text-gray-900">Friend Recommendations</p>
                  <p className="text-sm text-gray-500">When friends recommend restaurants</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.friendRecommendations}
                  onChange={(e) => {
                    setNotificationSettings(prev => ({
                      ...prev,
                      friendRecommendations: e.target.checked
                    }));
                    handleSaveNotifications();
                  }}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <div>
                  <p className="font-medium text-gray-700 group-hover:text-gray-900">Meeting Reminders</p>
                  <p className="text-sm text-gray-500">Reminders for upcoming lunches</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.meetingReminders}
                  onChange={(e) => {
                    setNotificationSettings(prev => ({
                      ...prev,
                      meetingReminders: e.target.checked
                    }));
                    handleSaveNotifications();
                  }}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500 cursor-pointer"
                />
              </label>
            </div>
          </div>
        </motion.section>

        {/* Account Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mt-6"
        >
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-red-50 rounded-lg">
                <Lock className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Account</h2>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white justify-start rounded-xl">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button className="w-full justify-start bg-red-500 hover:bg-red-600 text-white rounded-xl">
                Delete Account
              </Button>
            </div>
          </div>
        </motion.section>
      </div>

      <BottomNav />
    </div>
  );
}

