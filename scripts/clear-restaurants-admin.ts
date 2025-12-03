/**
 * Script to clear all restaurants from Firestore using Firebase Admin SDK
 * This is more reliable than the client SDK
 * Run with: npx ts-node scripts/clear-restaurants-admin.ts
 */

import * as admin from 'firebase-admin';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'nexus-nosh',
    });
  } catch (error: any) {
    console.error('❌ Firebase Admin initialization error:', error.message);
    console.log('\nNote: Make sure you have Firebase Admin SDK credentials set up.');
    console.log('You can use: gcloud auth application-default login');
    process.exit(1);
  }
}

const db = admin.firestore();

async function clearAllRestaurants() {
  console.log('🗑️  Starting restaurant cleanup...');
  console.log(`Project: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'nexus-nosh'}\n`);
  
  try {
    const restaurantsRef = db.collection('restaurants');
    const snapshot = await restaurantsRef.get();
    
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
      const batch = db.batch();
      const batchDocs = docs.slice(i, i + batchSize);
      
      batchDocs.forEach((document) => {
        batch.delete(document.ref);
      });
      
      await batch.commit();
      deletedCount += batchDocs.length;
      console.log(`✓ Deleted batch: ${deletedCount}/${docs.length} restaurants`);
    }

    console.log(`\n🎉 Successfully deleted all ${deletedCount} restaurants!`);
    console.log('💡 Refresh your browser to see the changes.');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error clearing restaurants:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run the cleanup
clearAllRestaurants();




