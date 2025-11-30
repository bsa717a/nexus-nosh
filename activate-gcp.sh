#!/bin/bash
# Quick script to activate nexus-nosh GCP project
# Usage: source activate-gcp.sh  or  . activate-gcp.sh

echo "🔧 Activating Nexus-Nosh GCP project..."

# Activate the nexusnosh-workspace configuration
if gcloud config configurations activate nexusnosh-workspace 2>/dev/null; then
    echo "✅ Activated nexusnosh-workspace configuration"
else
    echo "⚠️  Configuration not found. Creating nexusnosh-workspace..."
    gcloud config configurations create nexusnosh-workspace
    gcloud config set account derek.fowler@gmail.com
    gcloud config set project nexus-nosh
fi

# Ensure project is set correctly
CURRENT_PROJECT=$(gcloud config get-value project 2>/dev/null)
if [ "$CURRENT_PROJECT" != "nexus-nosh" ]; then
    echo "🔧 Setting project to nexus-nosh..."
    gcloud config set project nexus-nosh
fi

# Verify
echo ""
echo "Current GCP Configuration:"
echo "  Project: $(gcloud config get-value project)"
echo "  Account: $(gcloud config get-value account)"
echo "  Config:  $(gcloud config configurations list --filter='IS_ACTIVE:True' --format='value(name)')"
echo ""
echo "✅ Nexus-Nosh GCP project is active!"

