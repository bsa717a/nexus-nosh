import { db, isFirebaseConfigured, auth } from '@/lib/firebase/config';
import { collection, addDoc, getDocs, Timestamp, query, limit } from 'firebase/firestore';
import { Restaurant, MeetingType } from '@/lib/types';

const RESTAURANTS_COLLECTION = 'restaurants';

// Saint George, Utah restaurants - coordinates centered around 37.0965° N, 113.5684° W
const sampleRestaurants: Omit<Restaurant, 'id'>[] = [
  // Business/Formal Options
  {
    name: 'The Painted Pony Restaurant',
    address: '2 W Saint George Blvd, St. George, UT 84770',
    coordinates: { lat: 37.0965, lng: -113.5684 },
    cuisineType: ['American', 'Steakhouse'],
    priceRange: { min: 35, max: 75 },
    attributes: {
      quietness: 80,
      serviceSpeed: 'medium',
      atmosphere: 'upscale',
      privateBooths: true,
      walkableDistance: true,
      idealMeetingTypes: ['investor-lunch', 'client-meeting', 'one-on-one'] as MeetingType[],
    },
    rating: { average: 4.6, count: 234 },
    website: 'https://example.com/painted-pony',
    phone: '(435) 628-7940',
    createdAt: new Date(),
  },
  {
    name: 'Cliffside Restaurant',
    address: '511 S Valley View Dr, St. George, UT 84770',
    coordinates: { lat: 37.1020, lng: -113.5650 },
    cuisineType: ['American', 'Contemporary'],
    priceRange: { min: 30, max: 65 },
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
    phone: '(435) 628-1234',
    createdAt: new Date(),
  },
  {
    name: 'Wood Ash Rye',
    address: '2 W Tabernacle St, St. George, UT 84770',
    coordinates: { lat: 37.0965, lng: -113.5684 },
    cuisineType: ['American', 'BBQ'],
    priceRange: { min: 20, max: 50 },
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
    phone: '(435) 628-5678',
    createdAt: new Date(),
  },
  
  // Mexican/Southwestern
  {
    name: 'Casa de Flores',
    address: '151 N Main St, St. George, UT 84770',
    coordinates: { lat: 37.0980, lng: -113.5680 },
    cuisineType: ['Mexican', 'Southwestern'],
    priceRange: { min: 12, max: 30 },
    attributes: {
      quietness: 55,
      serviceSpeed: 'fast',
      atmosphere: 'energetic',
      privateBooths: false,
      walkableDistance: true,
      idealMeetingTypes: ['casual-checkin', 'team-meeting', 'social-lunch', 'post-event-debrief'] as MeetingType[],
    },
    rating: { average: 4.2, count: 456 },
    website: 'https://example.com/casa-de-flores',
    phone: '(435) 628-9012',
    createdAt: new Date(),
  },
  {
    name: 'The Green Leaf Bistro',
    address: '264 W Tabernacle St, St. George, UT 84770',
    coordinates: { lat: 37.0965, lng: -113.5690 },
    cuisineType: ['Vegetarian', 'Healthy', 'Mediterranean'],
    priceRange: { min: 10, max: 25 },
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
    phone: '(435) 628-3456',
    createdAt: new Date(),
  },
  
  // Asian Cuisine
  {
    name: 'Sakura Japanese Restaurant',
    address: '91 E Tabernacle St, St. George, UT 84770',
    coordinates: { lat: 37.0965, lng: -113.5675 },
    cuisineType: ['Japanese', 'Sushi'],
    priceRange: { min: 25, max: 60 },
    attributes: {
      quietness: 75,
      serviceSpeed: 'medium',
      atmosphere: 'intimate',
      privateBooths: true,
      walkableDistance: true,
      idealMeetingTypes: ['client-meeting', 'one-on-one', 'investor-lunch'] as MeetingType[],
    },
    rating: { average: 4.7, count: 521 },
    website: 'https://example.com/sakura',
    phone: '(435) 628-7890',
    createdAt: new Date(),
  },
  {
    name: 'Spice Garden Chinese',
    address: '445 S Bluff St, St. George, UT 84770',
    coordinates: { lat: 37.0950, lng: -113.5670 },
    cuisineType: ['Chinese', 'Asian'],
    priceRange: { min: 15, max: 35 },
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
    phone: '(435) 628-2345',
    createdAt: new Date(),
  },
  {
    name: 'Bangkok Express',
    address: '280 E Tabernacle St, St. George, UT 84770',
    coordinates: { lat: 37.0965, lng: -113.5670 },
    cuisineType: ['Thai', 'Asian'],
    priceRange: { min: 12, max: 28 },
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
    phone: '(435) 628-6789',
    createdAt: new Date(),
  },
  
  // Italian/European
  {
    name: 'Bella Italia',
    address: '369 N Main St, St. George, UT 84770',
    coordinates: { lat: 37.0990, lng: -113.5680 },
    cuisineType: ['Italian', 'Mediterranean'],
    priceRange: { min: 25, max: 55 },
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
    phone: '(435) 628-1122',
    createdAt: new Date(),
  },
  {
    name: 'Cafe Parisien',
    address: '741 E Tabernacle St, St. George, UT 84770',
    coordinates: { lat: 37.0965, lng: -113.5665 },
    cuisineType: ['French', 'European'],
    priceRange: { min: 30, max: 70 },
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
    phone: '(435) 628-3344',
    createdAt: new Date(),
  },
  
  // Fast Casual
  {
    name: 'Quick Bites Cafe',
    address: '852 S Main St, St. George, UT 84770',
    coordinates: { lat: 37.0930, lng: -113.5680 },
    cuisineType: ['Fast Food', 'American'],
    priceRange: { min: 7, max: 18 },
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
    phone: '(435) 628-5566',
    createdAt: new Date(),
  },
  {
    name: 'The Healthy Bowl',
    address: '963 S Bluff St, St. George, UT 84770',
    coordinates: { lat: 37.0920, lng: -113.5670 },
    cuisineType: ['Vegetarian', 'Healthy', 'Mediterranean'],
    priceRange: { min: 9, max: 20 },
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
    phone: '(435) 628-7788',
    createdAt: new Date(),
  },
  
  // Steakhouse/High-End
  {
    name: 'Prime Steakhouse',
    address: '159 N 1000 E, St. George, UT 84770',
    coordinates: { lat: 37.1000, lng: -113.5660 },
    cuisineType: ['American', 'Steakhouse'],
    priceRange: { min: 45, max: 110 },
    attributes: {
      quietness: 88,
      serviceSpeed: 'slow',
      atmosphere: 'upscale',
      privateBooths: true,
      walkableDistance: false,
      idealMeetingTypes: ['investor-lunch', 'client-meeting'] as MeetingType[],
    },
    rating: { average: 4.8, count: 445 },
    website: 'https://example.com/prime-steakhouse',
    phone: '(435) 628-9900',
    createdAt: new Date(),
  },
  {
    name: 'The Rooftop Restaurant',
    address: '357 E Tabernacle St, St. George, UT 84770',
    coordinates: { lat: 37.0965, lng: -113.5675 },
    cuisineType: ['American', 'Fusion'],
    priceRange: { min: 40, max: 85 },
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
    phone: '(435) 628-2233',
    createdAt: new Date(),
  },
];

export async function seedRestaurants(force: boolean = false): Promise<{
  success: boolean;
  message: string;
  count?: number;
}> {
  if (!isFirebaseConfigured || !db) {
    return {
      success: false,
      message: 'Firebase not configured',
    };
  }

  if (!auth || !auth.currentUser) {
    return {
      success: false,
      message: 'You must be logged in to seed restaurants',
    };
  }

  try {
    // Check if restaurants already exist
    const existingQuery = query(collection(db, RESTAURANTS_COLLECTION), limit(1));
    const existingSnapshot = await getDocs(existingQuery);
    const hasExisting = !existingSnapshot.empty;

    if (hasExisting && !force) {
      return {
        success: false,
        message: 'Restaurants already exist. Use force=true to overwrite.',
      };
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

    return {
      success: true,
      message: `Successfully seeded ${added.length} restaurants`,
      count: added.length,
    };
  } catch (error: any) {
    console.error('Error seeding restaurants:', error);
    return {
      success: false,
      message: error.message || 'Failed to seed restaurants',
    };
  }
}
