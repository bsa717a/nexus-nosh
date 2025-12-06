#!/bin/bash
# Deploy to Google Cloud Run
# Run this from the project root: ./scripts/deploy-cloudrun.sh

set -e

echo "🚀 Starting Nexus Nosh Cloud Run deployment..."

# Configuration
PROJECT_ID="nexus-nosh"
SERVICE_NAME="nexus-nosh"
REGION="us-central1"

# 1. Build the Next.js app
echo "📦 Building Next.js app..."
npm run build

# 2. Create public directory if it doesn't exist (Docker COPY requires it)
mkdir -p public

# 3. Build and push Docker image
echo "🐳 Building Docker image..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME --project $PROJECT_ID

# 4. Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --set-env-vars "NODE_ENV=production" \
  --set-env-vars "NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBwDU2LlhEXIzB5iw4zhq_uepf2K4skPSc" \
  --set-env-vars "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=nexus-nosh.firebaseapp.com" \
  --set-env-vars "NEXT_PUBLIC_FIREBASE_PROJECT_ID=nexus-nosh" \
  --set-env-vars "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=nexus-nosh.firebasestorage.app" \
  --set-env-vars "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=251223233015" \
  --set-env-vars "NEXT_PUBLIC_FIREBASE_APP_ID=1:251223233015:web:26460b83dd6a21f5ce1ef2" \
  --set-env-vars "NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiYnNhNzE3IiwiYSI6ImNtaG13YnZvczIxcHIybXB1N2E0NnJpcHcifQ.Z-AeF3-pt2ihl2uz71Lvxg" \
  --set-env-vars "GEMINI_API_KEY=$GEMINI_API_KEY" \
  --project $PROJECT_ID

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at the URL shown above"
