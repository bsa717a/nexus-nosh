import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { image, restaurantId, filename, idToken } = req.body;

    if (!image || !restaurantId || !filename || !idToken) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // 1. Prepare file metadata
        // Remove header from base64 string
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const contentType = image.match(/^data:(.*);base64/)?.[1] || 'image/jpeg';

        // Parse JWT to get uid (simple decode, verification happens on upstream storage side roughly, 
        // but better to blindly trust the token belongs to the user for the path construction? 
        // Ideally we verify signature, but we are just proxying.
        // We can extract UID from the token payload safely.
        const tokenParts = idToken.split('.');
        const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
        const uid = payload.user_id;

        const filePath = `images/${uid}/${restaurantId}/${Date.now()}_${filename}`;
        const bucketName = 'nexus-nosh.appspot.com';

        // 2. Upload via Firebase Storage REST API
        // This allows us to use the User's ID Token (Auth) but bypass Browser CORS (since we are on server)

        const url = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o?name=${encodeURIComponent(filePath)}`;

        const uploadResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': contentType,
            },
            body: buffer
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            throw new Error(`Storage API Error: ${uploadResponse.status} ${errorText}`);
        }

        const data = await uploadResponse.json();

        // Construct the public download URL
        // Firebase Storage objects are accessible via this pattern if token is provided or rules allow public
        // The previous Client SDK returned a downloadURL which often includes a token.
        // The JSON API returns an object metadata.
        // It usually has "downloadTokens" in the response if a token was generated? 
        // Or we can construct a public URL if rules allow public read.

        // For now, let's construct the standard URL.
        // If the file is not public, this URL might return 403 without a token.
        // But the frontend 'getDownloadURL' does magic to append ?alt=media&token=...

        // The response `data` contains `downloadTokens` (comma separated) usually.
        const downloadToken = data.downloadTokens ? data.downloadTokens.split(',')[0] : null;

        let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
        if (downloadToken) {
            publicUrl += `&token=${downloadToken}`;
        }

        return res.status(200).json({ url: publicUrl });

    } catch (error: any) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: error.message });
    }
}
