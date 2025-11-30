#!/bin/bash
# Script to help remove console.log statements
# Usage: ./scripts/remove-console-logs.sh [--dry-run]

set -e

DRY_RUN=false
if [ "$1" = "--dry-run" ]; then
    DRY_RUN=true
    echo "🔍 DRY RUN MODE - No files will be modified"
    echo ""
fi

echo "🧹 Console.log Cleanup"
echo "======================"
echo ""

# Find all console.log statements
FILES_WITH_LOGS=$(grep -rl "console\.log" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
    components/ lib/ pages/ 2>/dev/null || true)

if [ -z "$FILES_WITH_LOGS" ]; then
    echo "✅ No console.log statements found"
    exit 0
fi

echo "📋 Files with console.log statements:"
echo "$FILES_WITH_LOGS" | sed 's/^/   - /'
echo ""

# Count total console.log statements
TOTAL_LOGS=$(grep -r "console\.log" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
    components/ lib/ pages/ 2>/dev/null | wc -l | tr -d ' ')

echo "📊 Total console.log statements: $TOTAL_LOGS"
echo ""

# Show some examples
echo "📝 Example console.log statements (first 5):"
grep -r "console\.log" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
    components/ lib/ pages/ 2>/dev/null | head -5 | sed 's/^/   /'
echo ""

if [ "$DRY_RUN" = "true" ]; then
    echo "💡 To remove console.log statements, review each file manually or use:"
    echo "   sed -i '' '/console\.log/d' <file>"
    echo ""
    echo "💡 Or use your editor's find/replace:"
    echo "   Find: console\.log.*"
    echo "   Replace: (empty)"
    exit 0
fi

echo "⚠️  This script will NOT automatically remove console.log statements"
echo "   (to prevent removing important error logging)"
echo ""
echo "💡 Manual cleanup steps:"
echo "   1. Review each file listed above"
echo "   2. Remove debug console.log statements"
echo "   3. Keep essential error logging (console.error)"
echo "   4. For debug logs, consider using a proper logging library"
echo ""
echo "💡 Quick find/replace in your editor:"
echo "   Find: ^[[:space:]]*console\.log\(.*\);?$
echo "   Replace: (empty)"
echo ""

