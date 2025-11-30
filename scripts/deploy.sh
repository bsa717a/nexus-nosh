#!/bin/bash

# Nexus Nosh Deployment Script
# Usage: ./scripts/deploy.sh

set -e  # Exit on error

echo "🚀 Starting Nexus Nosh Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI not found. Please install Google Cloud SDK.${NC}"
    exit 1
fi

# Check if logged in to gcloud
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}⚠️  Not logged in to gcloud. Running gcloud auth login...${NC}"
    gcloud auth login
fi

# Check if project is set
PROJECT=$(gcloud config get-value project 2>/dev/null)
if [ -z "$PROJECT" ]; then
    echo -e "${YELLOW}⚠️  No Google Cloud project set.${NC}"
    echo "Available projects:"
    gcloud projects list
    echo ""
    read -p "Enter project ID: " PROJECT
    gcloud config set project $PROJECT
fi

echo -e "${GREEN}✓ Using project: $PROJECT${NC}"

# Build the Next.js app
echo -e "\n📦 Building Next.js app..."
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build successful${NC}"

# Prepare standalone build for deployment
echo -e "\n📦 Preparing standalone build for deployment..."
if [ -d ".next/standalone" ]; then
    # Copy standalone build to root (App Engine expects files at root)
    # Save reference to original static directory before copying
    ORIGINAL_STATIC=".next/static"
    cp -r .next/standalone/* .
    # Copy static assets - Next.js standalone expects .next/static relative to server.js
    # Check if static was already copied from standalone, if not copy from original location
    if [ ! -d ".next/static" ]; then
        if [ -d "$ORIGINAL_STATIC" ]; then
            echo "Copying static assets from build directory..."
            mkdir -p .next
            cp -r "$ORIGINAL_STATIC" .next/static
        fi
    fi
    echo -e "${GREEN}✓ Standalone build prepared${NC}"
else
    echo -e "${YELLOW}⚠️  Standalone build not found, deploying from root${NC}"
fi

# Deploy to App Engine
echo -e "\n☁️  Deploying to Google Cloud App Engine..."
gcloud app deploy --quiet

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Deployment successful!${NC}"
    echo -e "\n🌐 Opening deployed app..."
    gcloud app browse
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    exit 1
fi

echo -e "\n${GREEN}🎉 Done!${NC}"
echo ""
echo "Useful commands:"
echo "  View logs:     gcloud app logs tail -s default"
echo "  View services: gcloud app services list"
echo "  Open app:      gcloud app browse"

