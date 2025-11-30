#!/bin/bash
# Script to check GitHub Actions setup and diagnose issues

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Checking GitHub Actions Setup${NC}\n"

# Check if workflow file exists
if [ -f ".github/workflows/deploy.yml" ]; then
    echo -e "${GREEN}✓ Workflow file exists${NC}"
else
    echo -e "${RED}✗ Workflow file missing: .github/workflows/deploy.yml${NC}"
fi

# Check workflow syntax
echo -e "\n${BLUE}Checking workflow file syntax...${NC}"
if command -v yamllint &> /dev/null; then
    yamllint .github/workflows/deploy.yml 2>&1 || echo "yamllint not installed (optional)"
else
    echo "yamllint not installed (optional check)"
fi

# Check if secrets are documented
echo -e "\n${BLUE}Required GitHub Secrets:${NC}"
echo "1. GCP_SA_KEY"
echo "2. FIREBASE_API_KEY"
echo "3. FIREBASE_AUTH_DOMAIN"
echo "4. FIREBASE_PROJECT_ID"
echo "5. FIREBASE_STORAGE_BUCKET"
echo "6. FIREBASE_MESSAGING_SENDER_ID"
echo "7. FIREBASE_APP_ID"
echo "8. MAPBOX_TOKEN"
echo ""
echo -e "${YELLOW}⚠️  Verify these are set at:${NC}"
echo "https://github.com/bsa717a/nexus-nosh/settings/secrets/actions"

# Check service account permissions
echo -e "\n${BLUE}Checking service account permissions...${NC}"
SA_EMAIL="github-actions-deploy@nexus-nosh.iam.gserviceaccount.com"
if gcloud iam service-accounts describe $SA_EMAIL --project=nexus-nosh &>/dev/null; then
    echo -e "${GREEN}✓ Service account exists${NC}"
    echo "Roles:"
    gcloud projects get-iam-policy nexus-nosh \
        --flatten="bindings[].members" \
        --filter="bindings.members:serviceAccount:$SA_EMAIL" \
        --format="value(bindings.role)" | while read role; do
        echo "  - $role"
    done
else
    echo -e "${RED}✗ Service account not found${NC}"
    echo "Run: ./scripts/setup-gcp-service-account.sh"
fi

# Check workflow trigger
echo -e "\n${BLUE}Workflow triggers:${NC}"
grep -A 5 "^on:" .github/workflows/deploy.yml | head -6

echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Check GitHub Actions: https://github.com/bsa717a/nexus-nosh/actions"
echo "2. Look for failed workflow runs"
echo "3. Check workflow logs for errors"
echo "4. Verify all secrets are configured"

