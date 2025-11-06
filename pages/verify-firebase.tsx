import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getTasteProfile } from '@/lib/services/taste-profile/tasteProfileService';
import { getUserSettings } from '@/lib/services/user-settings/userSettingsService';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function VerifyFirebase() {
  const [tasteProfile, setTasteProfile] = useState<any>(null);
  const [userSettings, setUserSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const userId = 'demo-user-123';
      
      // Load via services
      const [profile, settings] = await Promise.all([
        getTasteProfile(userId),
        getUserSettings(userId),
      ]);
      
      setTasteProfile(profile);
      setUserSettings(settings);
      
      // Also try direct Firestore read
      if (db) {
        try {
          const profileRef = doc(db, 'tasteProfiles', userId);
          const profileSnap = await getDoc(profileRef);
          console.log('Direct Firestore read - Taste Profile exists:', profileSnap.exists());
          if (profileSnap.exists()) {
            console.log('Direct Firestore data:', profileSnap.data());
          }
          
          const settingsRef = doc(db, 'userSettings', userId);
          const settingsSnap = await getDoc(settingsRef);
          console.log('Direct Firestore read - User Settings exists:', settingsSnap.exists());
          if (settingsSnap.exists()) {
            console.log('Direct Firestore data:', settingsSnap.data());
          }
        } catch (err: any) {
          console.error('Direct Firestore read error:', err);
        }
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Verify Firebase Data - Nexus Nosh</title>
      </Head>
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Firebase Data Verification</h1>
        
        <button
          onClick={loadData}
          className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Refresh Data
        </button>
        
        {loading && <p>Loading...</p>}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}
        
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Taste Profile</h2>
            {tasteProfile ? (
              <div>
                <p className="text-green-600 mb-2">✓ Data found</p>
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                  {JSON.stringify(tasteProfile, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-red-600">✗ No data found</p>
            )}
          </div>
          
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">User Settings</h2>
            {userSettings ? (
              <div>
                <p className="text-green-600 mb-2">✓ Data found</p>
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                  {JSON.stringify(userSettings, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-red-600">✗ No data found</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded">
          <p className="font-semibold mb-2">Check Browser Console:</p>
          <p className="text-sm">Open DevTools (F12) → Console tab to see direct Firestore read results</p>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p className="font-semibold mb-2">Firebase Console:</p>
          <a
            href="https://console.firebase.google.com/project/nexus-nosh/firestore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Open Firebase Console
          </a>
          <p className="text-sm mt-2">Look for collections: <code>tasteProfiles</code> and <code>userSettings</code></p>
          <p className="text-sm">Document ID: <code>demo-user-123</code></p>
        </div>
      </div>
    </>
  );
}

