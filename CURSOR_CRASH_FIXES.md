# Cursor Crash Investigation & Fixes

## Issues Identified and Fixed

### 🔴 Critical Issues Fixed

#### 1. **Infinite Re-render Loop in MapView.tsx**
**Problem**: The `useEffect` hook was calling `handleMapMove()` which triggered `onBoundsChange()`, potentially causing `displayItems` to change and retriggering the effect infinitely.

**Fix**: 
- Wrapped `handleMapMove` in `useCallback` with proper dependencies
- Changed `onMove`/`onZoom` to `onMoveEnd`/`onZoomEnd` to only fire after movement completes
- Added `handleMapMove` to the useEffect dependency array

#### 2. **Excessive Console Logging**
**Problem**: 189 console.log statements across 22 files, including logging entire arrays/objects which could overwhelm Cursor's language server.

**Fix**: 
- Removed all debug console.log statements from MapView.tsx
- Removed excessive logging from Dashboard.tsx
- Kept only essential error logging

#### 3. **Missing Dependencies in useEffect**
**Problem**: `handleMapMove` function was not in the dependency array, causing stale closures and potential infinite loops.

**Fix**: 
- Added `handleMapMove` to useEffect dependencies
- Used `useCallback` to properly memoize the function

#### 4. **Performance Issues with Map Movement**
**Problem**: `onMove` and `onZoom` handlers fired on every pixel of map movement, causing expensive calculations on every frame.

**Fix**: 
- Changed to `onMoveEnd` and `onZoomEnd` to only fire when movement completes
- This reduces handler calls from hundreds per second to once per interaction

#### 5. **Large Object Logging**
**Problem**: Line 112 in MapView.tsx was logging the entire `displayItems` array, which could be huge and cause memory issues.

**Fix**: 
- Removed the console.log that logged the entire array
- Only log essential information when needed

### 🟡 Additional Improvements

#### 6. **Updated .cursorignore**
Added exclusions for:
- TypeScript build info files
- Cursor-specific cache directories
- Large data files (CSV, SQL dumps)
- Temporary files

This reduces the number of files Cursor needs to index.

## Files Modified

1. `components/MapView.tsx` - Fixed infinite loops, removed excessive logging, improved performance
2. `components/Dashboard.tsx` - Removed excessive console.log statements
3. `.cursorignore` - Added more exclusions to reduce indexing load

## Testing Recommendations

1. Test map interactions - ensure no infinite loops occur
2. Verify restaurant filtering still works correctly
3. Check that map markers update properly when restaurants change
4. Monitor Cursor's performance - it should be more stable now

## If Cursor Still Crashes

If issues persist, consider:

1. **Clear Cursor cache**: 
   - Close Cursor completely
   - Delete `.cursor/` directory if it exists
   - Restart Cursor

2. **Reduce project scope**:
   - Check if `node_modules` (679MB) is causing issues
   - Consider using `.cursorignore` to exclude more directories

3. **Check for other infinite loops**:
   - Look for useEffect hooks without proper dependencies
   - Check for recursive function calls
   - Monitor browser console for errors

4. **TypeScript compilation issues**:
   - Run `npm run build` to check for TypeScript errors
   - Fix any type errors that might be causing language server issues

## Performance Metrics

- **Before**: Map handlers firing 100+ times per second during drag
- **After**: Map handlers fire once per interaction (onMoveEnd/onZoomEnd)
- **Console logs removed**: ~50+ excessive logs from critical components
- **Memory impact**: Reduced by not logging large arrays/objects

