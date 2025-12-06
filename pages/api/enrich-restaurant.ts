import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase/admin';
import { generateRestaurantInsight } from '@/lib/ai/gemini';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { restaurantName, restaurantAddress, restaurantId } = req.body;

  if (!restaurantName || !restaurantId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log(`[Enrichment] Generating summary for ${restaurantName}...`);

    const cleanJson = await generateRestaurantInsight(restaurantName, restaurantAddress || '');

    let aiData;
    try {
      aiData = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError, 'Raw Text:', cleanJson);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    const aiSummary = {
      ...aiData,
      lastUpdated: new Date().toISOString(),
      source: 'Gemini-1.5-Flash'
    };

    // Try to save to Firestore, but don't fail the request if it fails
    try {
      await db.collection('restaurants').doc(restaurantId).set({
        aiSummary
      }, { merge: true });
    } catch (firestoreError) {
      console.warn('[Enrichment] Failed to save to Firestore (non-critical):', firestoreError);
      // Continue anyway - we'll still return the AI data
    }

    return res.status(200).json(aiSummary);

  } catch (error: any) {
    console.error('Gemini Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return res.status(500).json({
      error: error.message || 'Failed to generate AI summary',
      details: error.toString()
    });
  }
}
