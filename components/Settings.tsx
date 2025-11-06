import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Save, Bell, Lock, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTasteProfile, updateTasteProfile } from '@/lib/services/taste-profile/tasteProfileService';
import { getUserSettings, updateNotificationSettings } from '@/lib/services/user-settings/userSettingsService';
import { TasteProfile } from '@/lib/types';
import { useAuth } from '@/lib/auth/useAuth';

interface SettingsProps {
  userId: string;
}

const CUISINE_OPTIONS = [
  'Italian', 'Mexican', 'Asian', 'American', 'Mediterranean', 'Indian',
  'French', 'Japanese', 'Thai', 'Greek', 'Middle Eastern', 'Korean',
  'Vietnamese', 'BBQ', 'Seafood', 'Vegetarian', 'Vegan', 'Fast Food'
];

export default function Settings({ userId }: SettingsProps) {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    quietness: 75,
    serviceQuality: 80,
    healthiness: 60,
    value: 70,
    atmosphere: 75,
    cuisineTypes: [] as string[],
    priceRange: {
      min: 10,
      max: 50,
    },
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    friendRecommendations: true,
    meetingReminders: true,
  });

  useEffect(() => {
    loadSettings();
  }, [userId]);

  async function loadSettings() {
    try {
      // Load taste preferences and notification settings in parallel
      const [profile, userSettings] = await Promise.all([
        getTasteProfile(userId),
        getUserSettings(userId),
      ]);

      if (profile) {
        setPreferences({
          quietness: profile.preferences.quietness,
          serviceQuality: profile.preferences.serviceQuality,
          healthiness: profile.preferences.healthiness,
          value: profile.preferences.value,
          atmosphere: profile.preferences.atmosphere,
          cuisineTypes: profile.preferences.cuisineTypes || [],
          priceRange: profile.preferences.priceRange || { min: 10, max: 50 },
        });
      }

      if (userSettings) {
        setNotificationSettings(userSettings.notifications);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // Continue with default values
    }
  }

  async function handleSave() {
    setSaving(true);
    console.log('Starting save to Firebase...', { userId, user: user?.uid, preferences, notificationSettings });
    
    try {
      // Check if user is authenticated
      if (!user) {
        throw new Error('You must be logged in to save settings. Please sign in first.');
      }
      
      if (user.uid !== userId) {
        console.warn('User ID mismatch:', { authUserId: user.uid, propsUserId: userId });
      }
      
      console.log('User authenticated:', user.uid);
      
      // Wait for saves to complete (with timeout)
      const saveResults = await Promise.allSettled([
        updateTasteProfile(userId, preferences),
        updateNotificationSettings(userId, notificationSettings),
      ]);
      
      // Check results
      const failures = saveResults.filter(r => r.status === 'rejected');
      if (failures.length > 0) {
        console.error('Some saves failed:', failures);
        const errorMessages = failures.map(f => f.status === 'rejected' ? f.reason?.message : 'Unknown error').join(', ');
        throw new Error(`Some settings failed to save: ${errorMessages}`);
      }
      
      console.log('✓ All saves completed successfully!');
      setSaving(false);
      
      // Show success message immediately
      alert('Settings saved successfully to Firebase!');
      
      // Verify the save in the background (don't block UI)
      // Use a longer delay to avoid state conflicts
      setTimeout(async () => {
        try {
          // Add a small delay to let Firestore state settle
          await new Promise(resolve => setTimeout(resolve, 2000));
          const savedProfile = await getTasteProfile(userId);
          const savedSettings = await getUserSettings(userId);
          console.log('✓ Verified save - Data persisted:', { savedProfile, savedSettings });
        } catch (error: any) {
          // Don't show errors from verification - it's just a check
          console.warn('Could not verify save (this is non-critical):', error?.message || error);
        }
      }, 3000);
    } catch (error: any) {
      console.error('✗ Save error:', error);
      setSaving(false);
      
      const errorMessage = error?.message || 'Unknown error';
      console.error('Save error details:', error);
      
      if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
        alert('Save operation timed out. This might be a connection issue. Please check:\n1. Your internet connection\n2. Browser console for detailed errors\n3. Try again in a moment');
      } else if (errorMessage.includes('permission') || errorMessage.includes('PERMISSION_DENIED')) {
        alert('Permission denied. You must be logged in to save settings. Please sign out and sign in again.');
      } else if (errorMessage.includes('logged in') || errorMessage.includes('sign in')) {
        alert(errorMessage);
      } else {
        alert(`Failed to save: ${errorMessage}\n\nCheck the browser console (F12) for more details.`);
      }
    }
  }

  function handleCuisineToggle(cuisine: string) {
    setPreferences(prev => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter(c => c !== cuisine)
        : [...prev.cuisineTypes, cuisine],
    }));
  }

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-orange-50 to-white min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        <Button 
          onClick={handleSave} 
          size="sm" 
          className="bg-orange-500 hover:bg-orange-600 text-white"
          disabled={saving}
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Taste Preferences */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex items-center gap-2 mb-6">
              <Sliders className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-semibold">Taste Preferences</h2>
            </div>
            
            <div className="space-y-6">
              {/* Quietness */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Quietness</label>
                  <span className="text-sm text-gray-500">{preferences.quietness}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.quietness}
                  onChange={(e) => setPreferences(prev => ({ ...prev, quietness: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Service Quality */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Service Quality</label>
                  <span className="text-sm text-gray-500">{preferences.serviceQuality}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.serviceQuality}
                  onChange={(e) => setPreferences(prev => ({ ...prev, serviceQuality: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Healthiness */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Healthiness</label>
                  <span className="text-sm text-gray-500">{preferences.healthiness}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.healthiness}
                  onChange={(e) => setPreferences(prev => ({ ...prev, healthiness: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Value */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Value</label>
                  <span className="text-sm text-gray-500">{preferences.value}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.value}
                  onChange={(e) => setPreferences(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Atmosphere */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Atmosphere</label>
                  <span className="text-sm text-gray-500">{preferences.atmosphere}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={preferences.atmosphere}
                  onChange={(e) => setPreferences(prev => ({ ...prev, atmosphere: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Price Range */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Price Range</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum ($ per person)
                </label>
                <input
                  type="number"
                  min="0"
                  max={preferences.priceRange.max - 1}
                  value={preferences.priceRange.min}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum ($ per person)
                </label>
                <input
                  type="number"
                  min={preferences.priceRange.min + 1}
                  value={preferences.priceRange.max}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: parseInt(e.target.value) || 100 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Cuisine Types */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Preferred Cuisines</h2>
            <div className="flex flex-wrap gap-2">
              {CUISINE_OPTIONS.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineToggle(cuisine)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    preferences.cuisineTypes.includes(cuisine)
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Notifications */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-gray-700">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.emailNotifications}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    emailNotifications: e.target.checked
                  }))}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-gray-700">Push Notifications</p>
                  <p className="text-sm text-gray-500">Get notified on your device</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    pushNotifications: e.target.checked
                  }))}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-gray-700">Friend Recommendations</p>
                  <p className="text-sm text-gray-500">When friends recommend restaurants</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.friendRecommendations}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    friendRecommendations: e.target.checked
                  }))}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-medium text-gray-700">Meeting Reminders</p>
                  <p className="text-sm text-gray-500">Reminders for upcoming lunches</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationSettings.meetingReminders}
                  onChange={(e) => setNotificationSettings(prev => ({
                    ...prev,
                    meetingReminders: e.target.checked
                  }))}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                />
              </label>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Account Settings */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="shadow-md rounded-2xl p-4">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-semibold">Account</h2>
            </div>
            <div className="space-y-4">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button className="w-full justify-start bg-orange-500 hover:bg-orange-600 text-white">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
