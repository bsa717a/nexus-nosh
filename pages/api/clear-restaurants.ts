import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase/config';
import { collection, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isFirebaseConfigured) {
    return res.status(500).json({ error: 'Firebase not configured' });
  }

  const db = getFirebaseDb();
  if (!db) {
    return res.status(500).json({ error: 'Database not initialized' });
  }

  try {
    const restaurantsRef = collection(db, 'restaurants');
    const snapshot = await getDocs(restaurantsRef);
    
    if (snapshot.empty) {
      return res.status(200).json({ 
        success: true, 
        message: 'No restaurants found in database',
        count: 0
      });
    }

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
    }

    return res.status(200).json({ 
      success: true, 
      message: `Successfully deleted ${deletedCount} restaurants`,
      count: deletedCount
    });
  } catch (error: any) {
    console.error('Error clearing restaurants:', error);
    return res.status(500).json({ 
      error: 'Failed to clear restaurants',
      message: error.message 
    });
  }
}


