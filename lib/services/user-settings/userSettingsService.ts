import { getFirebaseDb, getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/config';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { UserSettings } from '@/lib/types';

const USER_SETTINGS_COLLECTION = 'userSettings';

/**
 * Get user settings (notifications, etc.)
 */
export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  if (!isFirebaseConfigured) {
    console.warn('Firebase not configured. Returning default settings.');
    return {
      userId,
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        friendRecommendations: true,
        meetingReminders: true,
      },
      viewPreferences: {
        restaurantsListView: false,
      },
      updatedAt: new Date(),
    };
  }

  try {
    const db = getFirebaseDb();
    const settingsRef = doc(db, USER_SETTINGS_COLLECTION, userId);
    const settingsSnap = await getDoc(settingsRef);
    
    if (settingsSnap.exists()) {
      return settingsSnap.data() as UserSettings;
    }
    
    // Create default settings if doesn't exist
    const defaultSettings: UserSettings = {
      userId,
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        friendRecommendations: true,
        meetingReminders: true,
      },
      viewPreferences: {
        restaurantsListView: false,
      },
      updatedAt: new Date(),
    };
    
    await setDoc(settingsRef, defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error('Error getting user settings:', error);
    return null;
  }
}

/**
 * Update user settings
 */
export async function updateUserSettings(
  userId: string,
  settings: Partial<UserSettings>
): Promise<void> {
  if (!isFirebaseConfigured) {
    console.warn('Firebase not configured. Cannot update user settings.');
    return;
  }

  try {
    const db = getFirebaseDb();
    const settingsRef = doc(db, USER_SETTINGS_COLLECTION, userId);
    const settingsSnap = await getDoc(settingsRef);
    
    if (!settingsSnap.exists()) {
      // Create settings if they don't exist
      const defaultSettings: UserSettings = {
        userId,
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          friendRecommendations: true,
          meetingReminders: true,
        },
        viewPreferences: {
          restaurantsListView: false,
        },
        updatedAt: new Date(),
        ...settings,
      };
      await setDoc(settingsRef, defaultSettings);
      return;
    }

    // Update existing settings
    await updateDoc(settingsRef, {
      ...settings,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
}

/**
 * Update notification settings
 */
export async function updateNotificationSettings(
  userId: string,
  notifications: Partial<UserSettings['notifications']>
): Promise<void> {
  console.log('[updateNotificationSettings] Starting...', { userId, notifications });
  
  if (!isFirebaseConfigured) {
    console.error('[updateNotificationSettings] Firebase not configured!');
    throw new Error('Firebase is not configured');
  }

  try {
    const db = getFirebaseDb();
    const auth = getFirebaseAuth();
    const settingsRef = doc(db, USER_SETTINGS_COLLECTION, userId);
    console.log('[updateNotificationSettings] Document reference created:', settingsRef.path);
    
    // Try to get existing settings (with quick timeout)
    let currentSettings: UserSettings | null = null;
    try {
      console.log('[updateNotificationSettings] Attempting to read existing settings...');
      const settingsSnap = await Promise.race([
        getDoc(settingsRef),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 2000)
        )
      ]) as any;
      
      if (settingsSnap && settingsSnap.exists()) {
        currentSettings = settingsSnap.data() as UserSettings;
        console.log('[updateNotificationSettings] Found existing settings:', currentSettings);
      } else {
        console.log('[updateNotificationSettings] No existing settings found');
      }
    } catch (error: any) {
      console.warn('[updateNotificationSettings] Could not read existing settings (may be offline):', error.message);
      // If timeout or offline, proceed without existing data
    }

    // Prepare update data - convert Date to Timestamp for Firestore
    const { Timestamp } = await import('firebase/firestore');
    
    const updateData: any = {
      userId,
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        friendRecommendations: true,
        meetingReminders: true,
        ...(currentSettings?.notifications || {}),
        ...notifications,
      },
      viewPreferences: {
        restaurantsListView: currentSettings?.viewPreferences?.restaurantsListView ?? false,
      },
      updatedAt: Timestamp.now(),
    };

    // Ensure user is authenticated before attempting write
    if (!auth || !auth.currentUser) {
      throw new Error('User must be authenticated to save settings');
    }
    
    console.log('[updateNotificationSettings] User authenticated:', auth.currentUser.uid);
    console.log('[updateNotificationSettings] Saving data:', updateData);
    
    // Use setDoc with merge: true - works offline and syncs automatically
    // Increase timeout to 30 seconds to allow for slower connections
    console.log('[updateNotificationSettings] Attempting setDoc with merge...');
    
    // Wait for the write to complete with a timeout
    await Promise.race([
      setDoc(settingsRef, updateData, { merge: true }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Write operation timed out after 30 seconds')), 30000)
      )
    ]);
    
    console.log('[updateNotificationSettings] ✓ Successfully saved to Firebase!');
  } catch (error: any) {
    // Log full error object for debugging
    console.error('[updateNotificationSettings] ✗ Full error object:', error);
    console.error('[updateNotificationSettings] ✗ Error as JSON:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error('[updateNotificationSettings] ✗ Error details:', {
      message: error.message,
      code: error.code,
      serverResponse: error.serverResponse,
      name: error.name,
      stack: error.stack?.substring(0, 500),
    });
    
    // Check for specific Firestore error codes
    if (error.code === 'permission-denied' || error.code === 'PERMISSION_DENIED') {
      throw new Error('Permission denied. Please ensure you are logged in and have permission to save this data.');
    } else if (error.code === 'unauthenticated' || error.code === 'UNAUTHENTICATED') {
      throw new Error('Authentication required. Please sign in and try again.');
    } else if (error.code === 'invalid-argument' || error.code === 'INVALID_ARGUMENT') {
      throw new Error('Invalid data format. Please check the data being saved.');
    } else if (error.code === 'unavailable' || error.code === 'UNAVAILABLE') {
      throw new Error('Firestore is currently unavailable. Please try again in a moment.');
    } else if (error.message && error.message.includes('timed out')) {
      console.warn('[updateNotificationSettings] Write timed out - may complete in background if online');
      throw new Error('Save operation timed out. Please check your connection and try again.');
    }
    
    throw new Error(`Failed to save: ${error.message || error.code || 'Unknown error'}`);
  }
}

export async function updateViewPreferences(
  userId: string,
  viewPreferences: Partial<UserSettings['viewPreferences']>
): Promise<void> {
  console.log('[updateViewPreferences] Starting...', { userId, viewPreferences });

  if (!isFirebaseConfigured) {
    console.error('[updateViewPreferences] Firebase not configured!');
    throw new Error('Firebase is not configured');
  }

  try {
    const db = getFirebaseDb();
    const auth = getFirebaseAuth();
    const settingsRef = doc(db, USER_SETTINGS_COLLECTION, userId);

    const settingsSnap = await getDoc(settingsRef);
    const currentSettings = settingsSnap.exists() ? (settingsSnap.data() as UserSettings) : null;

    const { Timestamp } = await import('firebase/firestore');

    const mergedViewPreferences = {
      restaurantsListView: currentSettings?.viewPreferences?.restaurantsListView ?? false,
      ...viewPreferences,
    };

    const updateData: any = {
      userId,
      notifications: currentSettings?.notifications ?? {
        emailNotifications: true,
        pushNotifications: true,
        friendRecommendations: true,
        meetingReminders: true,
      },
      viewPreferences: mergedViewPreferences,
      updatedAt: Timestamp.now(),
    };

    if (!auth || !auth.currentUser) {
      throw new Error('User must be authenticated to save view preferences');
    }

    await setDoc(settingsRef, updateData, { merge: true });
    console.log('[updateViewPreferences] ✓ Successfully saved view preferences!');
  } catch (error: any) {
    console.error('[updateViewPreferences] ✗ Failed to save view preferences:', error);
    throw error;
  }
}

