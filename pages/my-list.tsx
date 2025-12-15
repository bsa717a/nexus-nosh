import { useState, useEffect, Fragment, useRef } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/auth/useAuth';
import { Restaurant, UserRestaurantState, JournalEntry } from '@/lib/types';
import {
  getUserListRestaurants,
  removeRestaurantFromList,
} from '@/lib/services/restaurants/userListService';
import { getUserSettings, updateViewPreferences } from '@/lib/services/user-settings/userSettingsService';
import {
  getUserRestaurantStates,
  upsertUserRestaurantState,
} from '@/lib/services/restaurants/userRestaurantStateService';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heart, MapPin, Star, DollarSign, Clock, List, Grid, Trash2, Loader2, Camera, Plus, X, Calendar, Edit3, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AddToListButton from '@/components/AddToListButton';
import { storage } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL, uploadString } from 'firebase/storage';


function MyListPageContent() {
  const { user } = useAuth();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const [isListView, setIsListView] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [userRestaurantStates, setUserRestaurantStates] = useState<Record<string, UserRestaurantState>>({});
  const [expandedRestaurants, setExpandedRestaurants] = useState<Record<string, boolean>>({});
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});
  const [uploadingStates, setUploadingStates] = useState<Record<string, boolean>>({});
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // Journal state
  const [editingJournalEntry, setEditingJournalEntry] = useState<Record<string, Partial<JournalEntry> | null>>({});
  const [journalUploadStates, setJournalUploadStates] = useState<Record<string, boolean>>({});

  const noteSaveTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    return () => {
      Object.values(noteSaveTimeouts.current).forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  useEffect(() => {
    if (user) {
      loadRestaurants();
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    async function loadViewPreference() {
      if (!user) {
        setIsListView(false);
        setPreferencesLoaded(true);
        return;
      }

      try {
        const settings = await getUserSettings(user.uid);
        const listPreference = settings?.viewPreferences?.restaurantsListView ?? false;
        setIsListView(listPreference);
      } catch (error) {
        console.warn('Could not load view preferences, defaulting to cards view', error);
      } finally {
        setPreferencesLoaded(true);
      }
    }

    if (user) {
      loadViewPreference();
    }
  }, [user]);

  useEffect(() => {
    async function loadUserStates() {
      if (!user) {
        setUserRestaurantStates({});
        return;
      }

      const states = await getUserRestaurantStates(user.uid);
      setUserRestaurantStates(states);
    }

    if (user) {
      loadUserStates();
    }
  }, [user]);

  const loadRestaurants = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      const userRestaurants = await getUserListRestaurants(user.uid);
      setRestaurants(userRestaurants);
    } catch (error: any) {
      console.error('Error loading restaurants:', error);
      setError(error.message || 'Failed to load your list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (restaurantId: string) => {
    if (!user) return;

    setRemovingIds((prev) => new Set(prev).add(restaurantId));
    try {
      await removeRestaurantFromList(user.uid, restaurantId);
      setRestaurants((prev) => prev.filter((r) => r.id !== restaurantId));
    } catch (error) {
      console.error('Error removing restaurant:', error);
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(restaurantId);
        return next;
      });
    }
  };

  function getMapsLink(address: string) {
    const query = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  function openInMaps(address: string) {
    const url = getMapsLink(address);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  function createDefaultState(restaurantId: string): UserRestaurantState {
    if (!user) {
      throw new Error('User must be authenticated to use restaurant state');
    }
    return {
      userId: user.uid,
      restaurantId,
      wantToGo: false,
      hasBeen: false,
      personalRating: undefined,
      notes: '',
      userUploadedPhotos: [],
      updatedAt: new Date(),
    };
  }

  function getState(restaurantId: string): UserRestaurantState {
    return userRestaurantStates[restaurantId] || (user ? createDefaultState(restaurantId) : {
      userId: '',
      restaurantId,
      wantToGo: false,
      hasBeen: false,
      updatedAt: new Date(),
    } as UserRestaurantState);
  }

  function updateLocalState(restaurantId: string, updates: Partial<UserRestaurantState>) {
    setUserRestaurantStates((prev) => {
      const current = prev[restaurantId] || (user ? createDefaultState(restaurantId) : undefined);
      if (!current) return prev;
      return {
        ...prev,
        [restaurantId]: {
          ...current,
          ...updates,
          updatedAt: new Date(),
        },
      };
    });
  }

  async function persistStateChanges(
    restaurantId: string,
    updates: Partial<Omit<UserRestaurantState, 'userId' | 'restaurantId' | 'updatedAt'>>
  ) {
    if (!user) return;

    const previous = userRestaurantStates[restaurantId];
    updateLocalState(restaurantId, updates);
    setSavingStates((prev) => ({ ...prev, [restaurantId]: true }));

    try {
      await upsertUserRestaurantState(user.uid, restaurantId, updates);
    } catch (error) {
      console.error('[MyList] Failed to save restaurant state:', error);
      if (previous) {
        setUserRestaurantStates((prevStates) => ({
          ...prevStates,
          [restaurantId]: previous,
        }));
      }
    } finally {
      setSavingStates((prev) => ({ ...prev, [restaurantId]: false }));
    }
  }

  function toggleExpanded(restaurantId: string) {
    setExpandedRestaurants((prev) => ({
      ...prev,
      [restaurantId]: !prev[restaurantId],
    }));
  }

  function handleRatingClick(restaurantId: string, rating: number) {
    updateLocalState(restaurantId, { personalRating: rating });
    persistStateChanges(restaurantId, { personalRating: rating });
  }

  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});

  const handleImageUpload = async (restaurantId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setUploadErrors(prev => ({ ...prev, [restaurantId]: '' }));
    setUploadingStates(prev => ({ ...prev, [restaurantId]: true }));

    const resizeImage = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) { reject(new Error('Canvas context failed')); return; }
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
          };
          img.onerror = () => reject(new Error('Failed to load image for resizing'));
          img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    };

    try {
      const base64 = await resizeImage(file);

      // Safety check for Firestore size limit (1MB total doc size)
      if (base64.length > 700000) {
        throw new Error("Image is too large even after compression. Please try a smaller photo.");
      }

      const currentState = getState(restaurantId);
      const currentPhotos = currentState.userUploadedPhotos || [];
      const newPhotos = [base64, ...currentPhotos];

      persistStateChanges(restaurantId, { userUploadedPhotos: newPhotos });
      console.log('[ImageUpload] Saved base64 image directly to Firestore');
    } catch (error: any) {
      console.error("Error processing image: ", error);
      setUploadErrors(prev => ({ ...prev, [restaurantId]: error.message || "Failed to process image" }));
    } finally {
      setUploadingStates(prev => ({ ...prev, [restaurantId]: false }));
      event.target.value = '';
    }
  };

  const handleRemoveImage = (restaurantId: string, photoUrlToRemove: string) => {
    const currentState = getState(restaurantId);
    if (!currentState.userUploadedPhotos) return;

    const newPhotos = currentState.userUploadedPhotos.filter(url => url !== photoUrlToRemove);
    persistStateChanges(restaurantId, { userUploadedPhotos: newPhotos });
  };

  // Journal Functions
  const handleStartJournalEntry = (restaurantId: string) => {
    setEditingJournalEntry(prev => ({
      ...prev,
      [restaurantId]: {
        date: new Date(),
        notes: '',
        photos: [],
        rating: getState(restaurantId).personalRating || 0
      }
    }));
  };

  const handleCancelJournalEntry = (restaurantId: string) => {
    setEditingJournalEntry(prev => {
      const next = { ...prev };
      delete next[restaurantId];
      return next;
    });
  };

  const handleSaveJournalEntry = async (restaurantId: string) => {
    const draft = editingJournalEntry[restaurantId];
    if (!draft || !user) return;

    const entries = getState(restaurantId).journalEntries || [];

    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      date: draft.date || new Date(),
      notes: draft.notes || '',
      photos: draft.photos || [],
      rating: draft.rating,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newEntries = [newEntry, ...entries];

    await persistStateChanges(restaurantId, { journalEntries: newEntries });

    // Also update global rating if this is the newest rating
    if (draft.rating && (!getState(restaurantId).personalRating || newEntries.length === 1)) {
      await persistStateChanges(restaurantId, { personalRating: draft.rating });
    }

    handleCancelJournalEntry(restaurantId);
  };

  const handleDeleteJournalEntry = async (restaurantId: string, entryId: string) => {
    if (!confirm('Are you sure you want to delete this journal entry?')) return;

    const entries = getState(restaurantId).journalEntries || [];
    const newEntries = entries.filter(e => e.id !== entryId);
    await persistStateChanges(restaurantId, { journalEntries: newEntries });
  };

  const handleJournalImageUpload = async (restaurantId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setJournalUploadStates(prev => ({ ...prev, [restaurantId]: true }));

    try {
      const resizeImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              const MAX_WIDTH = 800;
              const MAX_HEIGHT = 800;
              if (width > height) {
                if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
              } else {
                if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              if (!ctx) { reject(new Error('Canvas context failed')); return; }
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        });
      };

      const base64 = await resizeImage(file);
      if (base64.length > 700000) throw new Error("Image too large");

      setEditingJournalEntry(prev => {
        const current = prev[restaurantId] || {};
        return {
          ...prev,
          [restaurantId]: {
            ...current,
            photos: [base64, ...(current.photos || [])]
          }
        };
      });
    } catch (err) {
      console.error("Journal upload error", err);
      alert("Failed to attach image");
    } finally {
      setJournalUploadStates(prev => ({ ...prev, [restaurantId]: false }));
    }
  };

  // Helper to safely convert Firestore timestamps or strings to Date
  const safeDate = (date: any): Date => {
    if (!date) return new Date();
    if (date instanceof Date) return date;
    // Check for Firestore Timestamp-like object (seconds/nanoseconds) or method
    if (typeof date.toDate === 'function') return date.toDate();
    if (date.seconds !== undefined) return new Date(date.seconds * 1000);
    return new Date(date);
  };

  function renderDetails(restaurant: Restaurant) {
    const state = getState(restaurant.id);
    const saving = savingStates[restaurant.id];
    const effectiveRating = state.personalRating;
    const isEditing = !!editingJournalEntry[restaurant.id];
    const currentDraft = editingJournalEntry[restaurant.id];

    return (
      <div className="mt-1 space-y-6 rounded-xl bg-orange-50/60 p-5 border border-orange-100">
        {/* Top Controls: Want to Go / Has Been / Global Rating */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 text-sm text-gray-700 pb-4 border-b border-orange-200/50">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={state.wantToGo}
                onChange={(event) =>
                  persistStateChanges(restaurant.id, { wantToGo: event.target.checked })
                }
                className="h-4 w-4 rounded border border-orange-300 bg-white text-orange-500 accent-orange-500 focus:ring-orange-500 focus:ring-offset-1 cursor-pointer"
              />
              <span className="group-hover:text-orange-700 transition-colors">I want to go</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={state.hasBeen}
                onChange={(event) =>
                  persistStateChanges(restaurant.id, { hasBeen: event.target.checked })
                }
                className="h-4 w-4 rounded border border-orange-300 bg-white text-orange-500 accent-orange-500 focus:ring-orange-500 focus:ring-offset-1 cursor-pointer"
              />
              <span className="group-hover:text-orange-700 transition-colors">I have been there</span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <label className="font-medium text-gray-800">Global Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleRatingClick(restaurant.id, value)}
                  className={`transition p-0.5 ${(effectiveRating ?? 0) >= value
                    ? 'text-yellow-500'
                    : 'text-gray-300 hover:text-yellow-400'
                    }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Journal Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="p-1.5 bg-orange-100 rounded-lg text-orange-600">
                <Edit3 className="w-4 h-4" />
              </span>
              My Journal
            </h3>
            {!isEditing && (
              <Button
                onClick={() => handleStartJournalEntry(restaurant.id)}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Entry
              </Button>
            )}
          </div>

          {/* New Entry Form - Compact Layout */}
          <AnimatePresence>
            {isEditing && currentDraft && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-xl border border-orange-300 p-3 shadow-sm mb-4 ring-1 ring-orange-100">
                  <div className="flex gap-4 items-start">
                    {/* Left: Date Picker (Styled as date square) */}
                    <div className="relative flex-shrink-0 group cursor-pointer">
                      <div className="p-2 bg-orange-50 group-hover:bg-orange-100 transition-colors rounded-lg text-orange-600 font-bold text-center w-[52px] leading-tight border border-transparent group-hover:border-orange-200">
                        <span className="block text-[10px] uppercase text-orange-400">
                          {safeDate(currentDraft.date).toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="text-lg">
                          {safeDate(currentDraft.date).getDate()}
                        </span>
                      </div>
                      <input
                        type="date"
                        value={safeDate(currentDraft.date).toISOString().split('T')[0]}
                        onChange={(e) => setEditingJournalEntry(prev => ({
                          ...prev,
                          [restaurant.id]: { ...(prev[restaurant.id] || {}), date: new Date(e.target.value) }
                        }))}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        title="Change Date"
                      />
                    </div>

                    {/* Middle: Notes Input */}
                    <div className="flex-1 min-w-0">
                      <textarea
                        value={currentDraft.notes || ''}
                        onChange={(e) => setEditingJournalEntry(prev => ({
                          ...prev,
                          [restaurant.id]: { ...(prev[restaurant.id] || {}), notes: e.target.value }
                        }))}
                        placeholder="Write your notes here..."
                        className="w-full text-sm text-gray-700 placeholder:text-gray-400 border-0 p-0 focus:ring-0 resize-none bg-transparent leading-relaxed h-[88px]"
                        autoFocus
                      />
                    </div>

                    {/* Right: Rating & Photos */}
                    <div className="flex-shrink-0 flex flex-col items-end gap-3 w-[140px]">
                      {/* Rating Input */}
                      <div className="flex text-gray-200 gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setEditingJournalEntry(prev => ({
                              ...prev,
                              [restaurant.id]: { ...(prev[restaurant.id] || {}), rating: star }
                            }))}
                            className={`focus:outline-none transition-transform active:scale-90 ${(currentDraft.rating || 0) >= star ? 'text-yellow-400' : 'hover:text-yellow-200'
                              }`}
                          >
                            <Star className={`w-3.5 h-3.5 ${(currentDraft.rating || 0) >= star ? 'fill-current' : ''}`} />
                          </button>
                        ))}
                      </div>

                      {/* Photos Input */}
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {currentDraft.photos?.map((photo, idx) => (
                          <div key={idx} className="relative w-10 h-10 rounded-md overflow-hidden group border border-gray-100">
                            <img src={photo} alt="Draft" className="w-full h-full object-cover" />
                            <button
                              onClick={() => setEditingJournalEntry(prev => {
                                const current = prev[restaurant.id];
                                if (!current) return prev;
                                return {
                                  ...prev,
                                  [restaurant.id]: {
                                    ...current,
                                    photos: current.photos?.filter((_, i) => i !== idx)
                                  }
                                };
                              })}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            >
                              <X className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        ))}
                        <label className={`flex items-center justify-center w-10 h-10 border border-dashed border-gray-300 rounded-md cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors ${journalUploadStates[restaurant.id] ? 'opacity-50 pointer-events-none' : ''}`}>
                          {journalUploadStates[restaurant.id] ? <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> : <Camera className="w-4 h-4 text-gray-400" />}
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleJournalImageUpload(restaurant.id, e)} />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Footer: Save/Cancel Actions */}
                  <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-100/50">
                    <button
                      onClick={() => handleCancelJournalEntry(restaurant.id)}
                      className="text-xs font-medium text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveJournalEntry(restaurant.id)}
                      className="text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-full shadow-sm transition-colors"
                    >
                      Save Entry
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Journal Entries List */}
          <div className="space-y-3">
            {state.journalEntries && state.journalEntries.length > 0 ? (
              state.journalEntries.map((entry) => (
                <div key={entry.id} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex gap-4 items-start">
                    {/* Left: Date */}
                    <div className="flex-shrink-0 p-2 bg-orange-50 rounded-lg text-orange-600 font-bold text-center w-[52px] leading-tight">
                      <span className="block text-[10px] uppercase text-orange-400">
                        {safeDate(entry.date).toLocaleString('default', { month: 'short' })}
                      </span>
                      <span className="text-lg">
                        {safeDate(entry.date).getDate()}
                      </span>
                    </div>

                    {/* Middle: Content */}
                    <div className="flex-1 min-w-0 py-0.5">
                      {/* Header: Rating (Right aligned) */}
                      {entry.rating && (
                        <div className="flex justify-end mb-1">
                          <div className="flex text-yellow-400 gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < entry.rating! ? 'fill-current' : 'text-gray-200'}`} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Main Content Row: Notes (Left) | Photos (Right) */}
                      <div className="flex gap-3 items-start">
                        {/* Notes */}
                        <div className="flex-1 min-w-0">
                          {entry.notes ? (
                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                              {entry.notes}
                            </p>
                          ) : (
                            <span className="text-gray-400 text-sm italic">No notes</span>
                          )}
                        </div>

                        {/* Photos */}
                        {entry.photos && entry.photos.length > 0 && (
                          <div className="flex-shrink-0 flex flex-wrap gap-2 max-w-[120px] justify-end">
                            {entry.photos.map((photo, idx) => (
                              <div key={idx} className="relative w-12 h-12 rounded-md overflow-hidden border border-gray-100 cursor-pointer hover:opacity-90 active:scale-95 transition-all" onClick={() => setSelectedImage(photo)}>
                                <img src={photo} alt={`Journal ${idx}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Right: Actions */}
                    <div className="flex-shrink-0 pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleDeleteJournalEntry(restaurant.id, entry.id)}
                        className="text-gray-300 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-gray-400">
                  <Edit3 className="w-6 h-6" />
                </div>
                <p className="text-gray-500 font-medium">No journal entries yet</p>
                <p className="text-gray-400 text-sm">Record your first visit experience!</p>
              </div>
            )}
          </div>

          {/* Legacy Notes Section (Only if exists and not converted) */}
          {(state.notes || (state.userUploadedPhotos && state.userUploadedPhotos.length > 0)) && (
            <div className="mt-8 pt-6 border-t border-orange-200/50">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Historical Notes
              </h4>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 opacity-75 hover:opacity-100 transition-opacity">
                {state.notes && <p className="text-sm text-gray-600 italic mb-3">"{state.notes}"</p>}
                {state.userUploadedPhotos && state.userUploadedPhotos.length > 0 && (
                  <div className="flex gap-2">
                    {state.userUploadedPhotos.map((photo, idx) => (
                      <img key={idx} src={photo} alt="Legacy" className="w-16 h-16 object-cover rounded-lg border border-gray-200" onClick={() => setSelectedImage(photo)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {saving && <p className="text-xs text-orange-500 text-right">Saving changes…</p>}
      </div>
    );
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          </div>
          <BottomNav />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500 rounded-2xl shadow-lg">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">My List</h1>
                  <p className="text-gray-600 mt-1">
                    {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} saved
                  </p>
                </div>
              </div>

              {restaurants.length > 0 && (
                <button
                  type="button"
                  onClick={async () => {
                    const nextValue = !isListView;
                    setIsListView(nextValue);

                    if (user) {
                      try {
                        await updateViewPreferences(user.uid, {
                          restaurantsListView: nextValue,
                        });
                      } catch (error) {
                        console.error('Failed to save view preference:', error);
                      }
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-orange-600 shadow-sm transition hover:border-orange-300 hover:bg-orange-50"
                  disabled={!preferencesLoaded}
                >
                  {isListView ? (
                    <>
                      <Grid className="w-4 h-4" />
                      Boxes view
                    </>
                  ) : (
                    <>
                      <List className="w-4 h-4" />
                      List view
                    </>
                  )}
                  <span
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${isListView ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${isListView ? 'translate-x-5' : 'translate-x-1'
                        }`}
                    />
                  </span>
                </button>
              )}
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-800 text-sm">{error}</p>
              <Button
                onClick={loadRestaurants}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm"
                size="sm"
              >
                Try Again
              </Button>
            </motion.div>
          )}

          {/* Restaurants List */}
          {restaurants.length === 0 && !error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16"
            >
              <div className="mb-4">
                <Heart className="w-16 h-16 text-gray-300 mx-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Your list is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Start adding restaurants to your list to save them for later
              </p>
              <Button
                onClick={() => router.push('/')}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Discover Restaurants
              </Button>
            </motion.div>
          ) : restaurants.length > 0 ? (
            <>
              {isListView ? (
                <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
                  <table className="min-w-full divide-y divide-orange-100">
                    <thead className="bg-orange-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          My Rating
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Address
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Quietness
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Atmosphere
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-orange-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-50">
                      {restaurants.map((restaurant) => (
                        <Fragment key={restaurant.id}>
                          <tr className="hover:bg-orange-50 transition">
                            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleExpanded(restaurant.id)}
                                  className="text-left text-orange-600 hover:underline"
                                >
                                  {restaurant.name}
                                </button>
                                <AddToListButton restaurantId={restaurant.id} restaurant={restaurant} size="sm" />
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              {(() => {
                                const state = getState(restaurant.id);
                                const rating = state.personalRating;
                                return (
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                      <button
                                        key={value}
                                        type="button"
                                        onClick={() => handleRatingClick(restaurant.id, value)}
                                        className={`transition-all ${(rating ?? 0) >= value
                                          ? 'text-yellow-400 scale-110'
                                          : 'text-gray-300 hover:text-yellow-300'
                                          }`}
                                      >
                                        <Star className={`w-4 h-4 ${(rating ?? 0) >= value ? 'fill-yellow-400' : ''}`} />
                                      </button>
                                    ))}
                                    {rating ? (
                                      <span className="ml-2 font-bold text-yellow-600">{rating}.0</span>
                                    ) : (
                                      <span className="ml-2 text-xs text-gray-400">—</span>
                                    )}
                                  </div>
                                );
                              })()}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <button
                                type="button"
                                onClick={() => openInMaps(restaurant.address)}
                                className="text-left text-orange-600 hover:underline"
                              >
                                {restaurant.address}
                              </button>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {restaurant.cuisineType?.slice(0, 3).join(', ') || '—'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {restaurant.attributes?.quietness ?? 'N/A'}/100
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                              {restaurant.attributes?.atmosphere ?? 'N/A'}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <button
                                onClick={() => handleRemove(restaurant.id)}
                                disabled={removingIds.has(restaurant.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                                title="Remove from list"
                              >
                                {removingIds.has(restaurant.id) ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                          {expandedRestaurants[restaurant.id] && (
                            <tr className="bg-orange-50/50">
                              <td colSpan={7} className="px-4 py-4">
                                {renderDetails(restaurant)}
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurants.map((restaurant, index) => (
                    <motion.div
                      key={restaurant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-0">
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <button
                                type="button"
                                onClick={() => toggleExpanded(restaurant.id)}
                                className="text-left text-xl font-semibold text-orange-600 hover:underline flex-1"
                              >
                                {restaurant.name}
                              </button>
                              <div className="flex items-center gap-2">
                                <AddToListButton restaurantId={restaurant.id} restaurant={restaurant} size="sm" />
                                <button
                                  onClick={() => handleRemove(restaurant.id)}
                                  disabled={removingIds.has(restaurant.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                                  title="Remove from list"
                                >
                                  {removingIds.has(restaurant.id) ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Personal Rating - always visible */}
                            {(() => {
                              const state = getState(restaurant.id);
                              const rating = state.personalRating;
                              return (
                                <div className="flex items-center gap-3 mb-3 p-2 rounded-lg bg-orange-50/50">
                                  <span className="text-sm font-medium text-gray-700">My Rating</span>
                                  <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                      <button
                                        key={value}
                                        type="button"
                                        onClick={() => handleRatingClick(restaurant.id, value)}
                                        className={`transition-all ${(rating ?? 0) >= value
                                          ? 'text-yellow-400 scale-110'
                                          : 'text-gray-300 hover:text-yellow-300'
                                          }`}
                                      >
                                        <Star className={`w-5 h-5 ${(rating ?? 0) >= value ? 'fill-yellow-400' : ''}`} />
                                      </button>
                                    ))}
                                  </div>
                                  {rating ? (
                                    <span className="text-lg font-bold text-yellow-600">{rating}.0</span>
                                  ) : (
                                    <span className="text-xs text-gray-400 italic">Tap to rate</span>
                                  )}
                                </div>
                              );
                            })()}

                            <div className="flex items-center text-gray-600 text-sm mb-3">
                              <MapPin className="w-4 h-4 mr-1" />
                              <button
                                type="button"
                                onClick={() => openInMaps(restaurant.address)}
                                className="truncate text-left text-orange-600 hover:underline"
                              >
                                {restaurant.address}
                              </button>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {restaurant.cuisineType?.slice(0, 3).map((cuisine) => (
                                <span
                                  key={cuisine}
                                  className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                                >
                                  {cuisine}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                <span>
                                  {restaurant.priceRange ? `$${restaurant.priceRange.min} - $${restaurant.priceRange.max}` : 'N/A'}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                <span className="capitalize">{restaurant.attributes?.serviceSpeed ?? 'N/A'}</span>
                              </div>
                            </div>

                            {restaurant.attributes && (
                              <div className="text-xs text-gray-500">
                                <p>Quietness: {restaurant.attributes.quietness ?? 'N/A'}/100</p>
                                <p className="capitalize">Atmosphere: {restaurant.attributes.atmosphere ?? 'N/A'}</p>
                                {restaurant.attributes.privateBooths && (
                                  <p className="text-green-600">✓ Private booths available</p>
                                )}
                              </div>
                            )}

                            {expandedRestaurants[restaurant.id] && renderDetails(restaurant)}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          ) : null}
        </div>
        <BottomNav />
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ProtectedRoute>
  );
}

export default function MyListPage() {
  return <MyListPageContent />;
}

