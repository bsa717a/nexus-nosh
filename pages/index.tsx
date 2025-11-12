import Head from 'next/head'
import { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '@/lib/auth/useAuth'

function HomeContent() {
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>();
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    // Request user's location when component mounts
    if (navigator.geolocation) {
      console.log('[Location] Requesting user location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log('[Location] User location obtained:', position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('[Location] Error getting location:', error.message);
          setLocationError(error.message);
          // Fallback to Saint George, Utah
          setUserLocation({ lat: 37.0965, lng: -113.5684 });
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 300000, // Cache for 5 minutes
        }
      );
    } else {
      console.warn('[Location] Geolocation not supported');
      setLocationError('Geolocation not supported');
      // Fallback to Saint George, Utah
      setUserLocation({ lat: 37.0965, lng: -113.5684 });
    }
  }, []);

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Nexus Nosh - Smart Dining for Business and Beyond</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Personalized lunch-pairing and restaurant-recommendation experience" />
      </Head>
      <main>
        <Dashboard 
          userId={user.uid} 
          userName={user.displayName || user.email?.split('@')[0] || 'User'}
          userLocation={userLocation}
        />
      </main>
    </>
  )
}

export default function Home() {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  )
}
