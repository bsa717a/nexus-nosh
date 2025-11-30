import type { NextApiRequest, NextApiResponse } from 'next';
import { db, isFirebaseConfigured } from '@/lib/firebase/config';
import { collection, addDoc, getDocs, Timestamp, query, limit } from 'firebase/firestore';
import { Restaurant, MeetingType } from '@/lib/types';

const RESTAURANTS_COLLECTION = 'restaurants';

const sampleRestaurants: Omit<Restaurant, 'id'>[] = [
  // Business/Formal Options
  {
    name: 'The Gourmet Bistro',
    address: '123 Business District, San Francisco, CA 94102',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    cuisineType: ['French', 'American'],
    priceRange: { min: 40, max: 80 },
    attributes: {
      quietness: 85,
      serviceSpeed: 'medium',
      atmosphere: 'upscale',
      privateBooths: true,
      walkableDistance: true,
      idealMeetingTypes: ['investor-lunch', 'client-meeting', 'one-on-one'] as MeetingType[],
    },
    rating: { average: 4.6, count: 234 },
    website: 'https://example.com/gourmet-bistro',
    phone: '(415) 555-0101',
    createdAt: new Date(),
  },
  {
    name: 'Cliffside Restaurant',
    address: '456 Ocean View Dr, San Francisco, CA 94133',
    coordinates: { lat: 37.8024, lng: -122.4058 },
    cuisineType: ['Mediterranean', 'Seafood'],
    priceRange: { min: 35, max: 70 },
    attributes: {
      quietness: 75,
      serviceSpeed: 'medium',
      atmosphere: 'upscale',
      privateBooths: true,
      walkableDistance: false,
      idealMeetingTypes: ['investor-lunch', 'client-meeting', 'team-meeting'] as MeetingType[],
    },
    rating: { average: 4.5, count: 189 },
    website: 'https://example.com/cliffside',
    phone: '(415) 555-0102',
    createdAt: new Date(),
  },
  {
    name: 'Wood Ash Rye',
    address: '789 Market St, San Francisco, CA 94103',
    coordinates: { lat: 37.7849, lng: -122.4094 },
    cuisineType: ['American', 'BBQ'],
    priceRange: { min: 25, max: 55 },
    attributes: {
      quietness: 60,
      serviceSpeed: 'medium',
      atmosphere: 'casual',
      privateBooths: false,
      walkableDistance: true,
      idealMeetingTypes: ['casual-checkin', 'team-meeting', 'social-lunch'] as MeetingType[],
    },
    rating: { average: 4.3, count: 312 },
    website: 'https://example.com/wood-ash-rye',
    phone: '(415) 555-0103',
    createdAt: new Date(),
  },
  
  // Casual/Social Options
  {
    name: 'Painted Pony',
    address: '321 Mission St, San Francisco, CA 94105',
    coordinates: { lat: 37.7874, lng: -122.4082 },
    cuisineType: ['Mexican', 'American'],
    priceRange: { min: 15, max: 35 },
    attributes: {
      quietness: 50,
      serviceSpeed: 'fast',
      atmosphere: 'energetic',
      privateBooths: false,
      walkableDistance: true,
      idealMeetingTypes: ['casual-checkin', 'team-meeting', 'social-lunch', 'post-event-debrief'] as MeetingType[],
    },
    rating: { average: 4.2, count: 456 },
    website: 'https://example.com/painted-pony',
    phone: '(415) 555-0104',
    createdAt: new Date(),
  },
  {
    name: 'The Green Leaf',
    address: '654 Health Ave, San Francisco, CA 94110',
    coordinates: { lat: 37.7589, lng: -122.4189 },
    cuisineType: ['Vegetarian', 'Vegan', 'Mediterranean'],
    priceRange: { min: 12, max: 28 },
    attributes: {
      quietness: 70,
      serviceSpeed: 'fast',
      atmosphere: 'casual',
      privateBooths: false,
      walkableDistance: true,
      idealMeetingTypes: ['casual-checkin', 'team-meeting', 'one-on-one'] as MeetingType[],
    },
    rating: { average: 4.4, count: 278 },
    website: 'https://example.com/green-leaf',
    phone: '(415) 555-0105',
    createdAt: new Date(),
  },
  
  // Asian Cuisine
  {
    name: 'Sakura Sushi Bar',
    address: '987 Japan Town, San Francisco, CA 94115',
    coordinates: { lat: 37.7851, lng: -122.4326 },
    cuisineType: ['Japanese', 'Sushi'],
    priceRange: { min: 30, max: 65 },
    attributes: {
      quietness: 80,
      serviceSpeed: 'medium',
      atmosphere: 'intimate',
      privateBooths: true,
      walkableDistance: true,
      idealMeetingTypes: ['client-meeting', 'one-on-one', 'investor-lunch'] as MeetingType[],
    },
    rating: { average: 4.7, count: 521 },
    website: 'https://example.com/sakura',
    phone: '(415) 555-0106',
    createdAt: new Date(),
  },
  {
    name: 'Spice Garden',
    address: '147 Chinatown St, San Francisco, CA 94108',
    coordinates: { lat: 37.7941, lng: -122.4078 },
    cuisineType: ['Chinese', 'Asian'],
    priceRange: { min: 18, max: 40 },
    attributes: {
      quietness: 55,
      serviceSpeed: 'fast',
      atmosphere: 'energetic',
      privateBooths: false,
      walkableDistance: true,
      idealMeetingTypes: ['casual-checkin', 'team-meeting', 'social-lunch'] as MeetingType[],
    },
    rating: { average: 4.1, count: 389 },
    website: 'https://example.com/spice-garden',
    phone: '(415) 555-0107',
    createdAt: new Date(),
  },
  {
    name: 'Bangkok Express',
    address: '258 Thai Ave, San Francisco, CA 94102',
    coordinates: { lat: 37.7799, lng: -122.4140 },
    cuisineType: ['Thai', 'Asian'],
    priceRange: { min: 15, max: 32 },
    attributes: {
      quietness: 65,
      serviceSpeed: 'fast',
      atmosphere: 'casual',
      privateBooths: false,
      walkableDistance: true,
      idealMeetingTypes: ['casual-checkin', 'team-meeting', 'social-lunch'] as MeetingType[],
    },
    rating: { average: 4.3, count: 267 },
    website: 'https://example.com/bangkok-express',
    phone: '(415) 555-0108',
    createdAt: new Date(),
  },
  
  // Italian/European
  {
    name: 'Bella Italia',
    address: '369 North Beach, San Francisco, CA 94133',
    coordinates: { lat: 37.8006, lng: -122.4097 },
    cuisineType: ['Italian', 'Mediterranean'],
    priceRange: { min: 28, max: 60 },
    attributes: {
      quietness: 72,
      serviceSpeed: 'medium',
      atmosphere: 'casual',
      privateBooths: true,
      walkableDistance: true,
      idealMeetingTypes: ['client-meeting', 'team-meeting', 'one-on-one', 'social-lunch'] as MeetingType[],
    },
    rating: { average: 4.5, count: 412 },
    website: 'https://example.com/bella-italia',
    phone: '(415) 555-0109',
    createdAt: new Date(),
  },
  {
    name: 'Cafe Parisien',
    address: '741 Union Square, San Francisco, CA 94102',
    coordinates: { lat: 37.7879, lng: -122.4095 },
    cuisineType: ['French', 'European'],
    priceRange: { min: 35, max: 75 },
    attributes: {
      quietness: 78,
      serviceSpeed: 'slow',
      atmosphere: 'upscale',
      privateBooths: true,
      walkableDistance: true,
      idealMeetingTypes: ['investor-lunch', 'client-meeting', 'one-on-one'] as MeetingType[],
    },
    rating: { average: 4.6, count: 298 },
    website: 'https://example.com/cafe-parisien',
    phone: '(415) 555-0110',
    createdAt: new Date(),
  },
  
  // Fast Casual
  {
    name: 'Quick Bites',
    address: '852 SOMA, San Francisco, CA 94107',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    cuisineType: ['Fast Food', 'American'],
    priceRange: { min: 8, max: 20 },
    attributes: {
      quietness: 40,
      serviceSpeed: 'fast',
      atmosphere: 'energetic',
      privateBooths: false,
      walkableDistance: true,
      idealMeetingTypes: ['casual-checkin', 'post-event-debrief'] as MeetingType[],
    },
    rating: { average: 3.8, count: 623 },
    website: 'https://example.com/quick-bites',
    phone: '(415) 555-0111',
    createdAt: new Date(),
  },
  {
    name: 'The Healthy Bowl',
    address: '963 Mission Bay, San Francisco, CA 94158',
    coordinates: { lat: 37.7706, lng: -122.3898 },
    cuisineType: ['Vegetarian', 'Healthy', 'Mediterranean'],
    priceRange: { min: 10, max: 22 },
    attributes: {
      quietness: 65,
      serviceSpeed: 'fast',
      atmosphere: 'casual',
      privateBooths: false,
      walkableDistance: true,
      idealMeetingTypes: ['casual-checkin', 'team-meeting', 'one-on-one'] as MeetingType[],
    },
    rating: { average: 4.4, count: 334 },
    website: 'https://example.com/healthy-bowl',
    phone: '(415) 555-0112',
    createdAt: new Date(),
  },
  
  // Steakhouse/High-End
  {
    name: 'Prime Steakhouse',
    address: '159 Financial District, San Francisco, CA 94104',
    coordinates: { lat: 37.7955, lng: -122.4044 },
    cuisineType: ['American', 'Steakhouse'],
    priceRange: { min: 50, max: 120 },
    attributes: {
      quietness: 88,
      serviceSpeed: 'slow',
      atmosphere: 'upscale',
      privateBooths: true,
      walkableDistance: true,
      idealMeetingTypes: ['investor-lunch', 'client-meeting'] as MeetingType[],
    },
    rating: { average: 4.8, count: 445 },
    website: 'https://example.com/prime-steakhouse',
    phone: '(415) 555-0113',
    createdAt: new Date(),
  },
  {
    name: 'The Rooftop',
    address: '357 Downtown, San Francisco, CA 94111',
    coordinates: { lat: 37.7989, lng: -122.4017 },
    cuisineType: ['American', 'Fusion'],
    priceRange: { min: 45, max: 90 },
    attributes: {
      quietness: 70,
      serviceSpeed: 'medium',
      atmosphere: 'upscale',
      privateBooths: true,
      walkableDistance: true,
      idealMeetingTypes: ['investor-lunch', 'client-meeting', 'team-meeting', 'post-event-debrief'] as MeetingType[],
    },
    rating: { average: 4.5, count: 389 },
    website: 'https://example.com/rooftop',
    phone: '(415) 555-0114',
    createdAt: new Date(),
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isFirebaseConfigured || !db) {
    return res.status(500).json({ error: 'Firebase not configured' });
  }

  try {
    // Check if restaurants already exist
    const existingQuery = query(collection(db, RESTAURANTS_COLLECTION), limit(1));
    const existingSnapshot = await getDocs(existingQuery);
    const hasExisting = !existingSnapshot.empty;

    if (hasExisting && req.query.force !== 'true') {
      return res.status(400).json({ 
        error: 'Restaurants already exist. Use ?force=true to overwrite.' 
      });
    }

    // Add restaurants
    const restaurantsRef = collection(db, RESTAURANTS_COLLECTION);
    const added: string[] = [];

    for (const restaurant of sampleRestaurants) {
      const restaurantData = {
        ...restaurant,
        createdAt: Timestamp.fromDate(restaurant.createdAt ?? new Date()),
      };
      
      const docRef = await addDoc(restaurantsRef, restaurantData);
      added.push(docRef.id);
    }

    return res.status(200).json({ 
      success: true, 
      message: `Successfully seeded ${added.length} restaurants`,
      count: added.length,
      restaurantIds: added
    });
  } catch (error: any) {
    console.error('Error seeding restaurants:', error);
    return res.status(500).json({ 
      error: 'Failed to seed restaurants',
      message: error.message 
    });
  }
}

