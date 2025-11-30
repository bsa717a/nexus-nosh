#!/bin/bash
# Script to clean up merged branches
# Usage: ./scripts/cleanup-merged-branches.sh [--force]

set -e

FORCE=false
if [ "$1" = "--force" ]; then
    FORCE=true
fi

echo "🧹 Cleaning up merged branches..."

# Ensure we're on main
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Error: You must be on the 'main' branch to clean up merged branches"
    echo "   Current branch: $CURRENT_BRANCH"
    exit 1
fi

# Fetch latest from remote
echo "📥 Fetching latest from remote..."
git fetch --prune origin

# Find merged local branches (excluding main and current branch)
echo "🔍 Finding merged local branches..."
LOCAL_MERGED=$(git branch --merged main | grep -v "^\*" | grep -v "main" | grep -v "master" | sed 's/^[[:space:]]*//')

# Find merged remote branches
echo "🔍 Finding merged remote branches..."
REMOTE_MERGED=$(git branch -r --merged main | grep -v "origin/main" | grep -v "origin/HEAD" | sed 's|origin/||' | sed 's/^[[:space:]]*//')

if [ -z "$LOCAL_MERGED" ] && [ -z "$REMOTE_MERGED" ]; then
    echo "✅ No merged branches to clean up"
    exit 0
fi

# Show what will be deleted
if [ -n "$LOCAL_MERGED" ]; then
    echo ""
    echo "📋 Local branches to delete:"
    echo "$LOCAL_MERGED" | sed 's/^/   - /'
fi

if [ -n "$REMOTE_MERGED" ]; then
    echo ""
    echo "📋 Remote branches to delete:"
    echo "$REMOTE_MERGED" | sed 's/^/   - /'
fi

# Confirm deletion
if [ "$FORCE" != "true" ]; then
    echo ""
    read -p "❓ Delete these branches? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Cancelled"
        exit 0
    fi
fi

# Delete local branches
if [ -n "$LOCAL_MERGED" ]; then
    echo ""
    echo "🗑️  Deleting local branches..."
    for branch in $LOCAL_MERGED; do
        if git branch -d "$branch" 2>/dev/null; then
            echo "   ✅ Deleted local: $branch"
        else
            echo "   ⚠️  Could not delete local: $branch (may have unmerged changes, use -D to force)"
        fi
    done
fi

# Delete remote branches
if [ -n "$REMOTE_MERGED" ]; then
    echo ""
    echo "🗑️  Deleting remote branches..."
    for branch in $REMOTE_MERGED; do
        if git push origin --delete "$branch" 2>/dev/null; then
            echo "   ✅ Deleted remote: $branch"
        else
            echo "   ⚠️  Could not delete remote: $branch"
        fi
    done
fi

echo ""
echo "✅ Cleanup complete!"

