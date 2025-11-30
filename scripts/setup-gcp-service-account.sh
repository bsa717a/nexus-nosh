#!/bin/bash
# Script to create a Google Cloud Service Account for GitHub Actions deployment

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Setting up Google Cloud Service Account for GitHub Actions${NC}\n"

if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI not found. Please install Google Cloud SDK.${NC}"
    exit 1
fi

PROJECT_ID="nexus-nosh"
SA_NAME="github-actions-deploy"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
KEY_FILE="github-actions-key.json"

gcloud config set project $PROJECT_ID

if ! gcloud projects describe $PROJECT_ID &>/dev/null; then
    echo -e "${RED}❌ Project ${PROJECT_ID} not found.${NC}"
    exit 1
fi

if ! gcloud iam service-accounts describe $SA_EMAIL &>/dev/null; then
    echo -e "${BLUE}Creating service account...${NC}"
    gcloud iam service-accounts create $SA_NAME \
        --display-name="GitHub Actions Deployment" \
        --description="Service account for GitHub Actions to deploy to App Engine"
fi

echo -e "${BLUE}Granting IAM roles...${NC}"
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/appengine.deployer" --quiet || true
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/storage.admin" --quiet || true
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:${SA_EMAIL}" \
    --role="roles/iam.serviceAccountUser" --quiet || true

echo -e "${BLUE}Creating service account key...${NC}"
gcloud iam service-accounts keys create $KEY_FILE \
    --iam-account=$SA_EMAIL \
    --key-file-type=json

echo -e "\n${GREEN}✅ Service account setup complete!${NC}\n"
echo -e "${YELLOW}📋 Next steps:${NC}"
echo -e "1. Copy the contents of ${KEY_FILE} to GitHub secret: GCP_SA_KEY"
echo -e "2. Add other secrets as documented in GITHUB_ACTIONS_SETUP.md"
echo -e "3. Delete ${KEY_FILE} after adding to GitHub secrets (security!)"
