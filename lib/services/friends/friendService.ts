import { getFirebaseDb, getFirebaseAuth } from '@/lib/firebase/config';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  Timestamp
} from 'firebase/firestore';
import { Friend, UserRestaurantState, Restaurant } from '@/lib/types';

const USERS_COLLECTION = 'users';
const USER_LISTS_COLLECTION = 'userLists';
const USER_RESTAURANTS_COLLECTION = 'userRestaurants';

/**
 * Get a user's friends list
 */
export async function getFriends(userId: string): Promise<Friend[]> {
  try {
    const db = getFirebaseDb();
    // We store friends in a subcollection: users/{userId}/friends
    const friendsRef = collection(db, USERS_COLLECTION, userId, 'friends');
    const q = query(friendsRef, orderBy('invitedAt', 'desc'));
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      invitedAt: doc.data().invitedAt?.toDate(),
      connectedAt: doc.data().connectedAt?.toDate(),
    })) as Friend[];
  } catch (error) {
    console.error('Error getting friends:', error);
    return [];
  }
}

/**
 * Invite a friend by email - searches for user first, creates request if found
 */
export async function inviteFriendByEmail(
  currentUserId: string, 
  currentUserEmail: string,
  currentUserName: string,
  friendEmail: string
): Promise<{ found: boolean; friendName?: string }> {
  const db = getFirebaseDb();
  const friendsRef = collection(db, USERS_COLLECTION, currentUserId, 'friends');
  
  // Check if already invited/connected
  const existingQuery = query(friendsRef, where('email', '==', friendEmail));
  const existing = await getDocs(existingQuery);
  
  if (!existing.empty) {
    const existingStatus = existing.docs[0].data().status;
    if (existingStatus === 'accepted') throw new Error('Already friends!');
    if (existingStatus === 'requested_outgoing') throw new Error('Request already sent');
    if (existingStatus === 'requested_incoming') throw new Error('They already sent you a request! Check your list.');
    throw new Error('Friend already invited');
  }

  // Search for user in the system
  const usersRef = collection(db, USERS_COLLECTION);
  
  // Try exact email match
  console.log('[inviteFriendByEmail] Searching for:', friendEmail);
  let userQuery = query(usersRef, where('email', '==', friendEmail));
  let userSnapshot = await getDocs(userQuery);
  console.log('[inviteFriendByEmail] Exact match results:', userSnapshot.size);
  
  // Try lowercase match if not found
  if (userSnapshot.empty) {
    userQuery = query(usersRef, where('emailLowerCase', '==', friendEmail.toLowerCase()));
    userSnapshot = await getDocs(userQuery);
    console.log('[inviteFriendByEmail] Lowercase field match results:', userSnapshot.size);
  }
  
  // Try email field with lowercase value
  if (userSnapshot.empty) {
    userQuery = query(usersRef, where('email', '==', friendEmail.toLowerCase()));
    userSnapshot = await getDocs(userQuery);
    console.log('[inviteFriendByEmail] Email lowercase value match results:', userSnapshot.size);
  }
  
  // Debug: List all users
  if (userSnapshot.empty) {
    const allUsers = await getDocs(usersRef);
    console.log('[inviteFriendByEmail] All users in collection:');
    allUsers.forEach(doc => {
      const data = doc.data();
      console.log(`  - ${doc.id}: ${data.email}`);
    });
  }

  // USER FOUND - Create friend request on both sides
  if (!userSnapshot.empty) {
    const targetUserDoc = userSnapshot.docs[0];
    const targetUserId = targetUserDoc.id;
    const targetUserData = targetUserDoc.data();

    if (targetUserId === currentUserId) {
      throw new Error("You can't add yourself!");
    }

    // Create OUTGOING request (my side)
    const myFriendRef = doc(friendsRef, targetUserId);
    await setDoc(myFriendRef, {
      id: targetUserId,
      userId: targetUserId,
      email: friendEmail,
      displayName: targetUserData.displayName || friendEmail.split('@')[0],
      photoURL: targetUserData.photoURL || null,
      status: 'requested_outgoing',
      invitedAt: serverTimestamp(),
    });

    // Create INCOMING request (their side)
    const theirFriendRef = doc(db, USERS_COLLECTION, targetUserId, 'friends', currentUserId);
    await setDoc(theirFriendRef, {
      id: currentUserId,
      userId: currentUserId,
      email: currentUserEmail,
      displayName: currentUserName || currentUserEmail.split('@')[0],
      status: 'requested_incoming',
      invitedAt: serverTimestamp(),
    });

    return { found: true, friendName: targetUserData.displayName };
  }

  // USER NOT FOUND - Create pending email invite
  const newFriendRef = doc(friendsRef);
  await setDoc(newFriendRef, {
    id: newFriendRef.id,
    email: friendEmail,
    displayName: friendEmail.split('@')[0],
    status: 'pending',
    invitedAt: serverTimestamp(),
  });

  return { found: false };
}

/**
 * Accept a friend request - updates both sides to 'accepted'
 */
export async function acceptFriendRequest(userId: string, friendId: string): Promise<void> {
  const db = getFirebaseDb();
  
  // Update my side to accepted
  const myFriendRef = doc(db, USERS_COLLECTION, userId, 'friends', friendId);
  await setDoc(myFriendRef, {
    status: 'accepted',
    connectedAt: serverTimestamp()
  }, { merge: true });

  // Update their side to accepted
  const theirFriendRef = doc(db, USERS_COLLECTION, friendId, 'friends', userId);
  await setDoc(theirFriendRef, {
    status: 'accepted',
    connectedAt: serverTimestamp()
  }, { merge: true });
}

/**
 * Remove a friend
 */
export async function removeFriend(userId: string, friendId: string): Promise<void> {
  const db = getFirebaseDb();
  const friendRef = doc(db, USERS_COLLECTION, userId, 'friends', friendId);
  await deleteDoc(friendRef);
}

/**
 * Generate shareable invite text
 */
export function getInviteMessage(userName: string): { title: string, text: string, url: string } {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/login?ref=${encodeURIComponent(userName)}` : 'https://nexusnosh.app';
  
  return {
    title: 'Join me on Nexus Nosh',
    text: `Hey! I've been using Nexus Nosh to find great places to eat. Check out my restaurant list:`,
    url
  };
}

/**
 * Get a friend's profile information
 */
export async function getFriendProfile(friendId: string): Promise<{
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
} | null> {
  try {
    const db = getFirebaseDb();
    const userRef = doc(db, USERS_COLLECTION, friendId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }
    
    const data = userSnap.data();
    return {
      id: userSnap.id,
      displayName: data.displayName || data.email?.split('@')[0] || 'Unknown',
      email: data.email || '',
      photoURL: data.photoURL,
    };
  } catch (error) {
    console.error('Error getting friend profile:', error);
    return null;
  }
}

/**
 * Get a friend's saved restaurants
 */
export async function getFriendRestaurants(friendId: string): Promise<Restaurant[]> {
  try {
    const db = getFirebaseDb();
    const listQuery = query(
      collection(db, USER_LISTS_COLLECTION),
      where('userId', '==', friendId)
    );
    const snapshot = await getDocs(listQuery);
    
    const restaurants: Restaurant[] = [];
    
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      
      // Only include entries with stored restaurant data
      if (data.restaurantName && data.restaurantAddress && data.restaurantCoordinates) {
        restaurants.push({
          id: data.restaurantId,
          name: data.restaurantName,
          address: data.restaurantAddress,
          coordinates: data.restaurantCoordinates,
          cuisineType: data.restaurantCuisineType || [],
          source: data.restaurantId.startsWith('mapbox-') ? 'mapbox' : 'database',
        });
      }
    }
    
    return restaurants;
  } catch (error) {
    console.error('Error getting friend restaurants:', error);
    return [];
  }
}

/**
 * Get a friend's restaurant states (ratings, notes, etc.)
 */
export async function getFriendRestaurantStates(friendId: string): Promise<Record<string, UserRestaurantState>> {
  try {
    const db = getFirebaseDb();
    const statesQuery = query(
      collection(db, USER_RESTAURANTS_COLLECTION),
      where('userId', '==', friendId)
    );
    const snapshot = await getDocs(statesQuery);
    
    const states: Record<string, UserRestaurantState> = {};
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as UserRestaurantState;
      states[data.restaurantId] = {
        userId: data.userId,
        restaurantId: data.restaurantId,
        wantToGo: data.wantToGo ?? false,
        hasBeen: data.hasBeen ?? false,
        personalRating: data.personalRating,
        notes: data.notes,
        zipCode: data.zipCode,
        updatedAt: data.updatedAt,
      };
    });
    
    return states;
  } catch (error) {
    console.error('Error getting friend restaurant states:', error);
    return {};
  }
}

export interface FriendRecommendedRestaurant {
  restaurant: Restaurant;
  friendName: string;
  friendId: string;
  rating: number;
}

/**
 * Get highly-rated restaurants (4+ stars) from all friends
 * Returns random selection of restaurants that friends have rated highly
 */
export async function getFriendsHighlyRatedRestaurants(userId: string, limit: number = 5): Promise<FriendRecommendedRestaurant[]> {
  try {
    const db = getFirebaseDb();
    
    // 1. Get all accepted friends
    const friendsRef = collection(db, USERS_COLLECTION, userId, 'friends');
    const friendsSnapshot = await getDocs(friendsRef);
    
    const acceptedFriends = friendsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((f: any) => f.status === 'accepted' && f.userId);
    
    if (acceptedFriends.length === 0) {
      return [];
    }
    
    const allHighlyRated: FriendRecommendedRestaurant[] = [];
    
    // 2. For each friend, get their restaurants with 4+ star ratings
    for (const friend of acceptedFriends) {
      const friendData = friend as any;
      const friendId = friendData.userId;
      const friendName = friendData.displayName || friendData.email?.split('@')[0] || 'A friend';
      
      // Get friend's restaurant states (ratings)
      const statesQuery = query(
        collection(db, USER_RESTAURANTS_COLLECTION),
        where('userId', '==', friendId)
      );
      const statesSnapshot = await getDocs(statesQuery);
      
      // Filter for 4+ star ratings
      const highRatedStates = statesSnapshot.docs
        .map(doc => doc.data() as UserRestaurantState)
        .filter(state => state.personalRating && state.personalRating >= 4);
      
      if (highRatedStates.length === 0) continue;
      
      // Get friend's restaurant list to get restaurant details
      const listQuery = query(
        collection(db, USER_LISTS_COLLECTION),
        where('userId', '==', friendId)
      );
      const listSnapshot = await getDocs(listQuery);
      
      // Create a map of restaurant data
      const restaurantMap = new Map<string, Restaurant>();
      listSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.restaurantName && data.restaurantAddress && data.restaurantCoordinates) {
          restaurantMap.set(data.restaurantId, {
            id: data.restaurantId,
            name: data.restaurantName,
            address: data.restaurantAddress,
            coordinates: data.restaurantCoordinates,
            cuisineType: data.restaurantCuisineType || [],
            source: data.restaurantId.startsWith('mapbox-') ? 'mapbox' : 'database',
          });
        }
      });
      
      // Match high ratings with restaurant details
      for (const state of highRatedStates) {
        const restaurant = restaurantMap.get(state.restaurantId);
        if (restaurant) {
          allHighlyRated.push({
            restaurant,
            friendName,
            friendId,
            rating: state.personalRating!,
          });
        }
      }
    }
    
    // 3. Shuffle and return limited results
    const shuffled = allHighlyRated.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
    
  } catch (error) {
    console.error('Error getting friends highly rated restaurants:', error);
    return [];
  }
}

/**
 * Get all restaurant IDs from all friends' lists
 * Used for coloring pins on the map
 */
export async function getAllFriendsRestaurantIds(userId: string): Promise<string[]> {
  try {
    const db = getFirebaseDb();
    
    // Get all accepted friends
    const friendsRef = collection(db, USERS_COLLECTION, userId, 'friends');
    const friendsSnapshot = await getDocs(friendsRef);
    
    const acceptedFriends = friendsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((f: any) => f.status === 'accepted' && f.userId);
    
    if (acceptedFriends.length === 0) {
      return [];
    }
    
    const allRestaurantIds: Set<string> = new Set();
    
    // For each friend, get their restaurant list
    for (const friend of acceptedFriends) {
      const friendData = friend as any;
      const friendId = friendData.userId;
      
      const listQuery = query(
        collection(db, USER_LISTS_COLLECTION),
        where('userId', '==', friendId)
      );
      const listSnapshot = await getDocs(listQuery);
      
      listSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.restaurantId) {
          allRestaurantIds.add(data.restaurantId);
        }
      });
    }
    
    return Array.from(allRestaurantIds);
    
  } catch (error) {
    console.error('Error getting friends restaurant IDs:', error);
    return [];
  }
}

