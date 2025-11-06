const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error.message);
    console.log('\nNote: This script requires Firebase Admin SDK. Using Firebase CLI instead...');
    process.exit(1);
  }
}

const db = admin.firestore();

async function checkData() {
  const userId = 'demo-user-123';
  
  console.log('Checking Firebase data for user:', userId);
  console.log('='.repeat(50));
  
  try {
    // Check taste profile
    const tasteProfileRef = db.collection('tasteProfiles').doc(userId);
    const tasteProfileDoc = await tasteProfileRef.get();
    
    if (tasteProfileDoc.exists) {
      console.log('\n✓ Taste Profile found:');
      const data = tasteProfileDoc.data();
      console.log('  Preferences:', JSON.stringify(data.preferences, null, 2));
      console.log('  Last Updated:', data.learningData?.lastUpdated?.toDate?.() || data.learningData?.lastUpdated);
    } else {
      console.log('\n✗ Taste Profile NOT found');
    }
    
    // Check user settings
    const userSettingsRef = db.collection('userSettings').doc(userId);
    const userSettingsDoc = await userSettingsRef.get();
    
    if (userSettingsDoc.exists) {
      console.log('\n✓ User Settings found:');
      const data = userSettingsDoc.data();
      console.log('  Notifications:', JSON.stringify(data.notifications, null, 2));
      console.log('  Updated At:', data.updatedAt?.toDate?.() || data.updatedAt);
    } else {
      console.log('\n✗ User Settings NOT found');
    }
    
  } catch (error) {
    console.error('Error checking data:', error);
  } finally {
    process.exit(0);
  }
}

checkData();

