#!/bin/bash
# Manual deployment script for Nexus Nosh
# Run this from the project root: ./scripts/deploy.sh

set -e

echo "🚀 Starting Nexus Nosh deployment..."

# 1. Build the Next.js app
echo "📦 Building Next.js app..."
npm run build

# 2. Create clean deploy directory
echo "📁 Preparing deployment directory..."
rm -rf deploy
mkdir deploy

# 3. Copy standalone build
cp -r .next/standalone/* deploy/

# 4. Copy static assets
mkdir -p deploy/.next/static
cp -r .next/static/* deploy/.next/static/

# 5. Copy public folder if exists
if [ -d "public" ]; then
  cp -r public deploy/
fi

# 6. Copy app.yaml
cp app.yaml deploy/

# 7. Inject GEMINI_API_KEY (read from .env.local or environment)
if [ -n "$GEMINI_API_KEY" ]; then
  sed -i '' "s|GEMINI_API_KEY_PLACEHOLDER|$GEMINI_API_KEY|g" deploy/app.yaml
elif [ -f ".env.local" ]; then
  GEMINI_KEY=$(grep GEMINI_API_KEY .env.local | cut -d'=' -f2)
  if [ -n "$GEMINI_KEY" ]; then
    sed -i '' "s|GEMINI_API_KEY_PLACEHOLDER|$GEMINI_KEY|g" deploy/app.yaml
  fi
fi

# 8. Remove build script from package.json to prevent Cloud Build from rebuilding
echo "Modifying package.json for deployment..."
if command -v jq &> /dev/null; then
  jq 'del(.scripts.build)' deploy/package.json > deploy/package.json.tmp && mv deploy/package.json.tmp deploy/package.json
else
  # Fallback if jq is not available - use sed
  sed -i '' '/"build":/d' deploy/package.json
fi

# 9. Create .gcloudignore to ensure .next is uploaded
# By default, gcloud ignores dot-directories like .next
echo "Creating .gcloudignore..."
cat > deploy/.gcloudignore << 'EOF'
# Only ignore git metadata
.git
.gitignore
EOF

# 10. Deploy from the deploy directory
echo "🚀 Deploying to App Engine..."
cd deploy
gcloud app deploy --quiet --promote

echo "✅ Deployment complete!"
echo "🌐 Visit: https://nexus-nosh.uc.r.appspot.com"
