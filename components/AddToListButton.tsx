'use client';

import { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/useAuth';
import {
  addRestaurantToList,
  removeRestaurantFromList,
  isRestaurantInList,
} from '@/lib/services/restaurants/userListService';
import { Restaurant } from '@/lib/types';

interface AddToListButtonProps {
  restaurantId: string;
  restaurant?: Restaurant; // Optional restaurant data to store when adding
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function AddToListButton({
  restaurantId,
  restaurant,
  className = '',
  size = 'md',
  showLabel = false,
}: AddToListButtonProps) {
  const { user } = useAuth();
  const [isInList, setIsInList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      checkListStatus();
    } else {
      setLoading(false);
    }
  }, [user, restaurantId]);

  const checkListStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const inList = await isRestaurantInList(user.uid, restaurantId);
      setIsInList(inList);
    } catch (error) {
      console.error('Error checking list status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault(); // Prevent any default behavior
    
    if (!user) {
      console.warn('[AddToListButton] User not authenticated');
      alert('Please log in to add restaurants to your list');
      return;
    }
    
    if (saving) {
      console.log('[AddToListButton] Already saving, ignoring click');
      return;
    }

    console.log('[AddToListButton] Toggling list status for restaurant:', restaurantId, 'currently in list:', isInList, 'user:', user.uid);
    setSaving(true);
    setError(null);
    
    try {
      if (isInList) {
        console.log('[AddToListButton] Removing from list...');
        await removeRestaurantFromList(user.uid, restaurantId);
        setIsInList(false);
        console.log('[AddToListButton] Successfully removed from list');
      } else {
        console.log('[AddToListButton] Adding to list...');
        // Pass restaurant data if available so we can store it
        const restaurantData = restaurant ? {
          name: restaurant.name,
          address: restaurant.address,
          coordinates: restaurant.coordinates,
          cuisineType: restaurant.cuisineType,
        } : undefined;
        await addRestaurantToList(user.uid, restaurantId, restaurantData);
        setIsInList(true);
        console.log('[AddToListButton] Successfully added to list');
      }
    } catch (error: any) {
      console.error('[AddToListButton] Error toggling list status:', error);
      const errorMessage = error?.message || 'Unknown error occurred';
      setError(errorMessage);
      // Show error to user
      alert(`Failed to ${isInList ? 'remove from' : 'add to'} list: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  if (loading) {
    return (
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <Loader2 className={`${iconSizes[size]} animate-spin text-gray-400`} />
      </div>
    );
  }

  if (!user) {
    return null; // Don't show button if user is not logged in
  }

  return (
    <button
      onClick={handleToggle}
      disabled={saving}
      type="button"
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        rounded-full transition-all duration-200
        ${isInList
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200'
        }
        ${saving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      title={isInList ? 'Remove from list' : 'Add to list'}
      style={{ zIndex: 10 }}
    >
      {saving ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        <Heart
          className={`${iconSizes[size]} ${isInList ? 'fill-current' : ''}`}
        />
      )}
      {showLabel && (
        <span className="ml-2 text-sm">
          {isInList ? 'In List' : 'Add to List'}
        </span>
      )}
    </button>
  );
}

