#!/bin/bash
# Pre-merge cleanup script
# Checks for diagnostic files and code before merging into main
# Usage: ./scripts/pre-merge-cleanup.sh [--fix]

set -e

FIX_MODE=false
if [ "$1" = "--fix" ]; then
    FIX_MODE=true
fi

echo "🧹 Pre-Merge Cleanup Check"
echo "=========================="
echo ""

ISSUES_FOUND=0
WARNINGS=0

# Check if we're on a feature branch (not main)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "⚠️  Warning: You're on the 'main' branch"
    echo "   This script should be run on a feature branch before merging"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
fi

echo "📋 Checking for diagnostic files and code..."
echo ""

# 1. Check for diagnostic markdown files
echo "1️⃣  Checking for diagnostic markdown files..."
DIAG_FILES=$(find . -type f -name "*FIXES*.md" -o -name "*DEBUG*.md" -o -name "*DIAGNOSTIC*.md" 2>/dev/null | grep -v node_modules | grep -v .next | grep -v .git)
if [ -n "$DIAG_FILES" ]; then
    echo "   ❌ Found diagnostic files:"
    echo "$DIAG_FILES" | sed 's/^/      - /'
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
    if [ "$FIX_MODE" = "true" ]; then
        echo "   🗑️  Removing diagnostic files..."
        echo "$DIAG_FILES" | xargs rm -f
        echo "   ✅ Removed"
    else
        echo "   💡 Run with --fix to remove these files"
    fi
else
    echo "   ✅ No diagnostic markdown files found"
fi
echo ""

# 2. Check for excessive console.log statements
echo "2️⃣  Checking for console.log statements..."
CONSOLE_LOGS=$(grep -r "console\.log" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
    components/ lib/ pages/ 2>/dev/null | wc -l | tr -d ' ')
if [ "$CONSOLE_LOGS" -gt 10 ]; then
    echo "   ⚠️  Found $CONSOLE_LOGS console.log statements (more than 10)"
    WARNINGS=$((WARNINGS + 1))
    echo "   💡 Consider removing debug console.log statements before merging"
    echo "   💡 Keep only essential error logging (console.error)"
    if [ "$FIX_MODE" = "true" ]; then
        echo "   💡 Run: grep -r 'console\.log' to review and remove manually"
    fi
else
    echo "   ✅ Reasonable number of console.log statements ($CONSOLE_LOGS)"
fi
echo ""

# 3. Check for console.debug statements
echo "3️⃣  Checking for console.debug statements..."
CONSOLE_DEBUG=$(grep -r "console\.debug" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
    components/ lib/ pages/ 2>/dev/null | wc -l | tr -d ' ')
if [ "$CONSOLE_DEBUG" -gt 0 ]; then
    echo "   ⚠️  Found $CONSOLE_DEBUG console.debug statements"
    WARNINGS=$((WARNINGS + 1))
    echo "   💡 Remove console.debug statements before merging"
    if [ "$FIX_MODE" = "true" ]; then
        echo "   💡 Run: grep -r 'console\.debug' to review and remove manually"
    fi
else
    echo "   ✅ No console.debug statements found"
fi
echo ""

# 4. Check for large commented-out code blocks
echo "4️⃣  Checking for large commented-out code blocks..."
COMMENTED_BLOCKS=$(find components/ lib/ pages/ -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) \
    -exec grep -l "/\*.*\*/" {} \; 2>/dev/null | head -5)
if [ -n "$COMMENTED_BLOCKS" ]; then
    echo "   ⚠️  Found files with commented code blocks:"
    echo "$COMMENTED_BLOCKS" | sed 's/^/      - /'
    WARNINGS=$((WARNINGS + 1))
    echo "   💡 Review and remove commented-out code before merging"
else
    echo "   ✅ No large commented code blocks detected"
fi
echo ""

# 5. Check for TODO/FIXME comments
echo "5️⃣  Checking for TODO/FIXME comments..."
TODO_COMMENTS=$(grep -r "TODO\|FIXME" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
    components/ lib/ pages/ 2>/dev/null | grep -v "node_modules" | wc -l | tr -d ' ')
if [ "$TODO_COMMENTS" -gt 5 ]; then
    echo "   ⚠️  Found $TODO_COMMENTS TODO/FIXME comments"
    WARNINGS=$((WARNINGS + 1))
    echo "   💡 Review TODOs - remove completed ones or move to issues"
    if [ "$FIX_MODE" = "true" ]; then
        echo "   💡 Run: grep -r 'TODO\|FIXME' to review"
    fi
else
    echo "   ✅ Reasonable number of TODO/FIXME comments ($TODO_COMMENTS)"
fi
echo ""

# 6. Check for test/temporary API routes
echo "6️⃣  Checking for test/temporary API routes..."
TEST_ROUTES=$(find pages/api -name "*test*" -o -name "*debug*" -o -name "*temp*" 2>/dev/null | grep -v node_modules)
if [ -n "$TEST_ROUTES" ]; then
    echo "   ⚠️  Found potential test/temporary API routes:"
    echo "$TEST_ROUTES" | sed 's/^/      - /'
    WARNINGS=$((WARNINGS + 1))
    echo "   💡 Remove test routes before merging"
    if [ "$FIX_MODE" = "true" ]; then
        echo "   💡 Review and remove manually if not needed"
    fi
else
    echo "   ✅ No test/temporary API routes found"
fi
echo ""

# 7. Check for .env.local files that might be committed
echo "7️⃣  Checking for environment files..."
ENV_FILES=$(git ls-files | grep "\.env" | grep -v ".env.production" || true)
if [ -n "$ENV_FILES" ]; then
    echo "   ⚠️  Found environment files tracked by git:"
    echo "$ENV_FILES" | sed 's/^/      - /'
    WARNINGS=$((WARNINGS + 1))
    echo "   💡 Ensure .env*.local files are in .gitignore"
else
    echo "   ✅ No environment files tracked by git"
fi
echo ""

# Summary
echo "=========================="
echo "📊 Summary"
echo "=========================="
if [ "$ISSUES_FOUND" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo "✅ All checks passed! Ready to merge."
    exit 0
else
    echo "⚠️  Found $ISSUES_FOUND issue(s) and $WARNINGS warning(s)"
    echo ""
    if [ "$FIX_MODE" = "true" ]; then
        echo "✅ Cleanup attempted. Please review changes before committing."
    else
        echo "💡 Run with --fix flag to automatically remove diagnostic files:"
        echo "   ./scripts/pre-merge-cleanup.sh --fix"
        echo ""
        echo "⚠️  Please address these issues before merging into main"
    fi
    exit 1
fi

