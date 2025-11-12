import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/lib/auth/useAuth';
import { getFirebaseDb } from '@/lib/firebase/config';
import { collection, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';

export default function CleanRestaurantsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState<{ total: number; unique: number; duplicates: number } | null>(null);

  async function analyzeRestaurants() {
    setLoading(true);
    setMessage('');
    try {
      const db = getFirebaseDb();
      if (!db) {
        setMessage('Firebase not initialized');
        return;
      }

      const restaurantsRef = collection(db, 'restaurants');
      const snapshot = await getDocs(restaurantsRef);
      
      const restaurantsByName = new Map<string, string[]>();
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const name = data.name;
        if (!restaurantsByName.has(name)) {
          restaurantsByName.set(name, []);
        }
        restaurantsByName.get(name)!.push(doc.id);
      });

      const total = snapshot.docs.length;
      const unique = restaurantsByName.size;
      const duplicates = total - unique;

      setStats({ total, unique, duplicates });
      
      if (duplicates > 0) {
        setMessage(`Found ${duplicates} duplicate restaurants out of ${total} total.`);
      } else {
        setMessage(`No duplicates found! You have ${total} unique restaurants.`);
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function removeDuplicates() {
    if (!confirm('This will delete duplicate restaurants, keeping only one of each. Continue?')) {
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const db = getFirebaseDb();
      if (!db) {
        setMessage('Firebase not initialized');
        return;
      }

      const restaurantsRef = collection(db, 'restaurants');
      const snapshot = await getDocs(restaurantsRef);
      
      const restaurantsByName = new Map<string, string[]>();
      
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const name = data.name;
        if (!restaurantsByName.has(name)) {
          restaurantsByName.set(name, []);
        }
        restaurantsByName.get(name)!.push(doc.id);
      });

      let deletedCount = 0;
      const batch = writeBatch(db);
      
      // For each restaurant name, keep the first one and delete the rest
      restaurantsByName.forEach((ids, name) => {
        if (ids.length > 1) {
          console.log(`${name}: Found ${ids.length} copies, keeping first, deleting ${ids.length - 1}`);
          // Skip the first ID, delete the rest
          for (let i = 1; i < ids.length; i++) {
            batch.delete(doc(db, 'restaurants', ids[i]));
            deletedCount++;
          }
        }
      });

      await batch.commit();

      setMessage(`Successfully removed ${deletedCount} duplicate restaurants!`);
      setStats(null);
      
      // Re-analyze
      setTimeout(() => analyzeRestaurants(), 1000);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAllRestaurants() {
    if (!confirm('⚠️ This will DELETE ALL restaurants from the database! Are you absolutely sure?')) {
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const db = getFirebaseDb();
      if (!db) {
        setMessage('Firebase not initialized');
        return;
      }

      const restaurantsRef = collection(db, 'restaurants');
      const snapshot = await getDocs(restaurantsRef);
      
      const batch = writeBatch(db);
      snapshot.docs.forEach((document) => {
        batch.delete(doc(db, 'restaurants', document.id));
      });

      await batch.commit();

      setMessage(`Successfully deleted all ${snapshot.docs.length} restaurants!`);
      setStats(null);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <p className="text-gray-600">Please log in to access admin tools.</p>
            <Button onClick={() => router.push('/login')} className="mt-4">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-2">Clean Restaurant Database</h1>
            <p className="text-gray-600 mb-6">
              Remove duplicate restaurants from the database.
            </p>

            <div className="space-y-4">
              <Button
                onClick={analyzeRestaurants}
                disabled={loading}
                className="w-full"
                variant="outline"
              >
                {loading ? 'Analyzing...' : 'Analyze Database'}
              </Button>

              {stats && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Database Statistics:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>Total restaurants: {stats.total}</li>
                    <li>Unique restaurants: {stats.unique}</li>
                    <li className="text-red-600 font-semibold">Duplicates: {stats.duplicates}</li>
                  </ul>
                </div>
              )}

              {stats && stats.duplicates > 0 && (
                <Button
                  onClick={removeDuplicates}
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {loading ? 'Removing Duplicates...' : 'Remove Duplicates'}
                </Button>
              )}

              <div className="border-t pt-4 mt-6">
                <p className="text-sm text-gray-500 mb-2">
                  Danger Zone: Delete all restaurants (you'll need to re-seed after this)
                </p>
                <Button
                  onClick={deleteAllRestaurants}
                  disabled={loading}
                  className="w-full bg-red-500 hover:bg-red-600"
                  variant="outline"
                >
                  {loading ? 'Deleting All...' : 'Delete All Restaurants'}
                </Button>
              </div>

              {message && (
                <div className={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
                  {message}
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={() => router.push('/')} variant="outline" className="flex-1">
                  Back to Dashboard
                </Button>
                <Button onClick={() => router.push('/admin/seed-restaurants')} variant="outline" className="flex-1">
                  Go to Seed Page
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

