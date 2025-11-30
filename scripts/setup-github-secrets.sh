#!/bin/bash
# Helper script to display GitHub secrets that need to be configured
# Usage: ./scripts/setup-github-secrets.sh

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📋 GitHub Secrets Configuration Guide${NC}\n"
echo -e "Go to: ${YELLOW}https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions${NC}\n"
echo -e "Add the following secrets:\n"

echo -e "${GREEN}1. GCP_SA_KEY${NC}"
echo -e "   Value: Contents of github-actions-key.json (from setup-gcp-service-account.sh)\n"

echo -e "${GREEN}2. FIREBASE_API_KEY${NC}"
echo -e "   Value: AIzaSyBwDU2LlhEXIzB5iw4zhq_uepf2K4skPSc\n"

echo -e "${GREEN}3. FIREBASE_AUTH_DOMAIN${NC}"
echo -e "   Value: nexus-nosh.firebaseapp.com\n"

echo -e "${GREEN}4. FIREBASE_PROJECT_ID${NC}"
echo -e "   Value: nexus-nosh\n"

echo -e "${GREEN}5. FIREBASE_STORAGE_BUCKET${NC}"
echo -e "   Value: nexus-nosh.firebasestorage.app\n"

echo -e "${GREEN}6. FIREBASE_MESSAGING_SENDER_ID${NC}"
echo -e "   Value: 251223233015\n"

echo -e "${GREEN}7. FIREBASE_APP_ID${NC}"
echo -e "   Value: 1:251223233015:web:26460b83dd6a21f5ce1ef2\n"

echo -e "${GREEN}8. MAPBOX_TOKEN${NC}"
echo -e "   Value: pk.eyJ1IjoiYnNhNzE3IiwiYSI6ImNtaG13YnZvczIxcHIybXB1N2E0NnJpcHcifQ.Z-AeF3-pt2ihl2uz71Lvxg\n"

echo -e "${YELLOW}💡 Tip: After adding GCP_SA_KEY, delete github-actions-key.json for security!${NC}\n"

