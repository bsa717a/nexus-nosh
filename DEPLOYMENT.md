# Nexus Nosh - Google Cloud Deployment Guide

## Prerequisites

1. Google Cloud account (separate from GitHub account)
2. Google Cloud CLI installed (`gcloud`)
3. Firebase project created
4. Node.js 20+ installed

## Setup Steps

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Firestore Database
4. Enable Authentication (Email/Password, Google, etc.)
5. Copy your Firebase config from Project Settings

### 2. Environment Variables

Create a `.env.local` file in the project root:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Map Configuration (Mapbox)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

### 3. Google Cloud Setup

#### Initialize Google Cloud

```bash
# Login to Google Cloud (different account from GitHub)
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

#### Deploy to App Engine

```bash
# Build the Next.js app
npm run build

# Deploy to App Engine
gcloud app deploy
```

#### Alternative: Using Cloud Build

Create a `cloudbuild.yaml` file (optional):

```yaml
steps:
  - name: 'node:20'
    entrypoint: npm
    args: ['install']
  - name: 'node:20'
    entrypoint: npm
    args: ['run', 'build']
  - name: 'gcr.io/google-appengine/exec-wrapper'
    args:
      - '-i'
      - 'gcr.io/$PROJECT_ID/appengine/default.${COMMIT_SHA}'
      - '-s'
      - '${PROJECT_ID}:appengine/default.${COMMIT_SHA}'
      - '--'
      - 'npm'
      - 'start'
```

Deploy:

```bash
gcloud builds submit --config cloudbuild.yaml
```

### 4. Environment Variables in Google Cloud

Set environment variables in App Engine:

```bash
gcloud app deploy --set-env-vars \
  NEXT_PUBLIC_FIREBASE_API_KEY=your_key,\
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

Or set them in `app.yaml`:

```yaml
env_variables:
  NEXT_PUBLIC_FIREBASE_API_KEY: "your_key"
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "your_project_id"
  # ... other variables
```

**Note:** Be careful with secrets. Consider using Google Secret Manager for sensitive values.

### 5. Firestore Security Rules

Set up Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Taste profiles
    match /tasteProfiles/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Restaurants are public read, admin write
    match /restaurants/{restaurantId} {
      allow read: if request.auth != null;
      allow write: if false; // Admin only
    }
    
    // Ratings
    match /ratings/{ratingId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
    
    // Friend connections
    match /friendConnections/{connectionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Friend recommendations
    match /friendRecommendations/{recId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.fromUserId == request.auth.uid;
    }
  }
}
```

## Deployment Commands

```bash
# Build locally
npm run build

# Test production build locally
npm start

# Deploy to Google Cloud App Engine
gcloud app deploy

# View logs
gcloud app logs tail -s default

# Open deployed app
gcloud app browse
```

## Troubleshooting

- **Build fails**: Check Node.js version (needs 20+)
- **Firebase errors**: Verify environment variables are set correctly
- **App Engine errors**: Check `app.yaml` configuration
- **Permission errors**: Ensure proper Google Cloud IAM roles

## Cost Considerations

- App Engine has a free tier
- Firestore free tier: 50K reads, 20K writes per day
- Monitor usage in Google Cloud Console
