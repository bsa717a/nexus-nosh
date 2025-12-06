// Direct REST API implementation to bypass module resolution issues with the SDK
// API key should be set in .env.local as GEMINI_API_KEY
const API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function generateRestaurantInsight(name: string, address: string) {
  // Fallback mock data function
  const getMockData = () => {
    return JSON.stringify({
      vibeDescription: "A cozy, rustic spot with dim lighting and a relaxed atmosphere, perfect for intimate conversations.",
      quietness: 75,
      priceBucket: "$$",
      popularDishes: ["Signature Truffle Pasta", "Crispy Brussels Sprouts", "Wood-Fired Ribeye"],
      goodForGroups: true,
      goodForBusiness: false,
      goodForDates: true
    });
  };

  if (!API_KEY) {
    console.warn('Gemini API Key is missing, using mock data');
    return getMockData();
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const promptText = `
    Research the restaurant "${name}" located at "${address}".
    
    Based on your knowledge and typical reviews for this place, provide a summary in this EXACT JSON format:
    {
      "vibeDescription": "A short, evocative description of the atmosphere (max 20 words)",
      "quietness": 0-100 (where 100 is silent library, 0 is loud club),
      "priceBucket": "$", "$$", "$$$", or "$$$$",
      "popularDishes": ["Dish 1", "Dish 2", "Dish 3"],
      "goodForGroups": boolean,
      "goodForBusiness": boolean,
      "goodForDates": boolean,
      "menuUrl": "The URL to the restaurant's menu if known, or their main website",
      "websiteUrl": "The official website URL"
    }
    Do not include markdown formatting (like \`\`\`json), just return the raw JSON string.
  `;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: promptText
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API Error (falling back to mock): ${response.status} ${response.statusText} - ${errorText}`);
      return getMockData(); // Fail gracefully to mock data
    }

    const data = await response.json();

    // Extract text from the Gemini response structure
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('Empty response from Gemini API (falling back to mock)');
      return getMockData();
    }

    // Clean markdown if present
    return text.replace(/```json/g, '').replace(/```/g, '').trim();

  } catch (error) {
    console.error('Gemini REST API Error (falling back to mock):', error);
    return getMockData();
  }
}
