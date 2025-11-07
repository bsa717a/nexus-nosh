// User and Profile Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserViewPreferences {
  restaurantsListView: boolean;
}

export interface UserSettings {
  userId: string;
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    friendRecommendations: boolean;
    meetingReminders: boolean;
  };
  viewPreferences?: UserViewPreferences;
  updatedAt: Date;
}

export interface UserRestaurantState {
  userId: string;
  restaurantId: string;
  wantToGo: boolean;
  hasBeen: boolean;
  personalRating?: number; // 1-5
  notes?: string;
  zipCode?: string;
  updatedAt: Date;
}

export interface TasteProfile {
  userId: string;
  preferences: {
    quietness: number; // 0-100
    serviceQuality: number;
    healthiness: number;
    value: number;
    atmosphere: number;
    cuisineTypes: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
  learningData: {
    totalRatings: number;
    averageRating: number;
    lastUpdated: Date;
  };
}

// Restaurant Types
export interface Restaurant {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  cuisineType: string[];
  priceRange: {
    min: number;
    max: number;
  };
  attributes: {
    quietness: number;
    serviceSpeed: 'fast' | 'medium' | 'slow';
    atmosphere: 'casual' | 'upscale' | 'energetic' | 'intimate';
    privateBooths: boolean;
    walkableDistance: boolean;
    idealMeetingTypes: MeetingType[];
  };
  rating: {
    average: number;
    count: number;
  };
  imageUrl?: string;
  website?: string;
  phone?: string;
  createdAt: Date;
}

// Rating Types
export interface Rating {
  id: string;
  userId: string;
  restaurantId: string;
  rating: number; // 1-5
  notes?: string;
  visitDate: Date;
  meetingType?: MeetingType;
  tags: string[];
  createdAt: Date;
}

// Social Types
export interface FriendConnection {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
}

export interface FriendRecommendation {
  id: string;
  fromUserId: string;
  toUserId: string;
  restaurantId: string;
  message?: string;
  createdAt: Date;
}

export interface OverlapScore {
  userId: string;
  friendId: string;
  score: number; // 0-100
  commonRestaurants: string[];
  commonPreferences: string[];
}

// Meeting Types
export type MeetingType = 
  | 'casual-checkin'
  | 'investor-lunch'
  | 'team-meeting'
  | 'client-meeting'
  | 'post-event-debrief'
  | 'one-on-one'
  | 'social-lunch';

export interface Meeting {
  id: string;
  userId: string;
  title: string;
  meetingType: MeetingType;
  participants: string[]; // User IDs
  scheduledTime: Date;
  location?: {
    restaurantId?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  notes?: string;
  createdAt: Date;
}

// Recommendation Types
export interface RestaurantRecommendation {
  restaurant: Restaurant;
  score: number;
  reasons: string[];
  matchType: 'personal-favorite' | 'friend-recommendation' | 'smart-match' | 'trending';
  friendRecommendations?: {
    userId: string;
    userName: string;
  }[];
}

export interface MapPin {
  id: string;
  type: 'favorite' | 'recommended' | 'friend-recommendation' | 'smart-match';
  restaurant: Restaurant;
  color: string;
}

