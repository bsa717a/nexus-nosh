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
import { Friend, User } from '@/lib/types';

const USERS_COLLECTION = 'users';

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
 * Invite a friend by email (creates a pending record)
 */
export async function inviteFriendByEmail(currentUserId: string, friendEmail: string): Promise<void> {
  const db = getFirebaseDb();
  const friendsRef = collection(db, USERS_COLLECTION, currentUserId, 'friends');
  
  // Check if already invited/connected
  // Note: In a real app, we'd check if the user exists in a top-level users collection too
  const q = query(friendsRef, where('email', '==', friendEmail));
  const existing = await getDocs(q);
  
  if (!existing.empty) {
    throw new Error('Friend already invited or added');
  }

  // Create pending friend record
  const newFriendRef = doc(friendsRef);
  await setDoc(newFriendRef, {
    id: newFriendRef.id,
    email: friendEmail,
    displayName: friendEmail.split('@')[0], // Fallback name
    status: 'pending',
    invitedAt: serverTimestamp(),
  });
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

