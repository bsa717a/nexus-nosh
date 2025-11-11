#!/bin/bash
# Workspace Setup Script for NexusNosh
# This script configures this workspace to use:
#   GitHub user: bsa717a (noreply email)
#   gcloud / Firebase: derek.fowler@gmail.com

set -e

echo "🔧 Setting up NexusNosh workspace..."
echo ""

# 1. Git Configuration (repository-specific)
echo "📝 Configuring Git..."
git config --local user.name "bsa717a"
git config --local user.email "bsa717a@users.noreply.github.com"
echo "✅ Git configured: $(git config --local user.email)"
echo ""

# 2. gcloud Configuration
echo "☁️  Configuring Google Cloud..."
if ! gcloud config configurations describe nexusnosh-workspace &>/dev/null; then
    echo "   Creating gcloud configuration..."
    gcloud config configurations create nexusnosh-workspace
fi
gcloud config configurations activate nexusnosh-workspace
gcloud config set account derek.fowler@gmail.com
gcloud config set project nexus-nosh
echo "✅ gcloud configured:"
echo "   Account: $(gcloud config get-value account)"
echo "   Project: $(gcloud config get-value project)"
echo ""

# 3. Firebase CLI
echo "🔥 Checking Firebase CLI..."
if command -v firebase &> /dev/null; then
    echo "   Firebase CLI is installed"
    echo "   To switch Firebase account, run: firebase login --no-localhost"
    echo "   Then select: derek.fowler@gmail.com"
else
    echo "   ⚠️  Firebase CLI not found. Install with: npm install -g firebase-tools"
fi
echo ""

# 4. Verify Configuration
echo "✅ Workspace Setup Complete!"
echo ""
echo "Summary:"
echo "  Git:        $(git config --local user.email)"
echo "  gcloud:     $(gcloud config get-value account)"
echo "  gcloud proj: $(gcloud config get-value project)"
echo ""
echo "⚠️  Note: You may need to authenticate:"
echo "   gcloud auth login derek.fowler@gmail.com"
echo "   firebase login --no-localhost (then select derek.fowler@gmail.com)"

