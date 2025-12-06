/**
 * Script to clear all restaurants from Firestore
 * Run with: npx ts-node scripts/clear-restaurants.ts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearAllRestaurants() {
  console.log('🗑️  Starting restaurant cleanup...');
  
  try {
    const restaurantsRef = collection(db, 'restaurants');
    const snapshot = await getDocs(restaurantsRef);
    
    if (snapshot.empty) {
      console.log('✅ No restaurants found in database. Nothing to delete.');
      process.exit(0);
    }

    console.log(`Found ${snapshot.docs.length} restaurants to delete...`);
    
    // Use batch writes for efficiency (Firestore allows up to 500 operations per batch)
    const batchSize = 500;
    const docs = snapshot.docs;
    let deletedCount = 0;
    
    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = writeBatch(db);
      const batchDocs = docs.slice(i, i + batchSize);
      
      batchDocs.forEach((document) => {
        batch.delete(doc(db, 'restaurants', document.id));
      });
      
      await batch.commit();
      deletedCount += batchDocs.length;
      console.log(`✓ Deleted batch: ${deletedCount}/${docs.length} restaurants`);
    }

    console.log(`\n🎉 Successfully deleted all ${deletedCount} restaurants!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing restaurants:', error);
    process.exit(1);
  }
}

// Run the cleanup
clearAllRestaurants();





