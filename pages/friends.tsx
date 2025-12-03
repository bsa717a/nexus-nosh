import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth/useAuth';
import BottomNav from '@/components/BottomNav';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Friend } from '@/lib/types';
import { getFriends, inviteFriendByEmail, removeFriend, getInviteMessage, acceptFriendRequest } from '@/lib/services/friends/friendService';
import { UserPlus, Mail, Share2, Trash2, User as UserIcon, ChevronRight, Check, X, Clock } from 'lucide-react';

export default function FriendsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user) {
      loadFriends();
    }
  }, [user]);

  const loadFriends = async () => {
    if (!user) return;
    try {
      const data = await getFriends(user.uid);
      setFriends(data);
    } catch (error) {
      console.error('Failed to load friends', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFriendClick = (friend: Friend) => {
    // Only navigate if the friend has a userId and is accepted
    if (friend.userId && friend.status === 'accepted') {
      router.push(`/friend/${friend.userId}`);
    }
  };

  const handleInviteByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !inviteEmail) return;

    setIsInviting(true);
    setMessage(null);

    try {
      const result = await inviteFriendByEmail(
        user.uid, 
        user.email || '', 
        user.displayName || user.email?.split('@')[0] || 'Someone',
        inviteEmail
      );
      
      if (result.found) {
        setMessage({ type: 'success', text: `Friend request sent to ${result.friendName || inviteEmail}!` });
      } else {
        setMessage({ type: 'success', text: `${inviteEmail} not found. Opening email to invite them...` });
        // Open mail client for users not in the system
        const { title, text, url } = getInviteMessage(user.displayName || 'a friend');
        const mailtoLink = `mailto:${inviteEmail}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}`;
        setTimeout(() => {
          window.location.href = mailtoLink;
        }, 1500);
      }
      
      setInviteEmail('');
      setShowInviteForm(false);
      loadFriends();
      
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to invite friend' });
    } finally {
      setIsInviting(false);
    }
  };

  const handleAcceptRequest = async (friendId: string) => {
    if (!user) return;
    try {
      await acceptFriendRequest(user.uid, friendId);
      setMessage({ type: 'success', text: 'Friend request accepted!' });
      loadFriends();
    } catch (error) {
      console.error('Failed to accept request', error);
      setMessage({ type: 'error', text: 'Failed to accept request' });
    }
  };

  const handleNativeShare = async () => {
    const { title, text, url } = getInviteMessage(user?.displayName || 'a friend');
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${text} ${url}`);
      setMessage({ type: 'success', text: 'Invite link copied to clipboard!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    if (!user || !confirm('Are you sure you want to remove this friend?')) return;
    try {
      await removeFriend(user.uid, friendId);
      setFriends(prev => prev.filter(f => f.id !== friendId));
    } catch (error) {
      console.error('Failed to remove friend', error);
    }
  };

  // Separate friends into categories
  const incomingRequests = friends.filter(f => f.status === 'requested_incoming');
  const acceptedFriends = friends.filter(f => f.status === 'accepted');
  const pendingOutgoing = friends.filter(f => f.status === 'requested_outgoing' || f.status === 'pending');

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Head>
          <title>Friends | Nexus Nosh</title>
        </Head>

        <main className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
          {/* Header */}
          <div className="bg-white px-6 pt-8 pb-4 border-b border-gray-100 sticky top-0 z-10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
              <button 
                onClick={handleNativeShare}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Share App"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Search/Invite Toggle */}
            <div className="relative">
              {!showInviteForm ? (
                 <button 
                  onClick={() => setShowInviteForm(true)}
                  className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl font-medium shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Add Friend
                </button>
              ) : (
                <form onSubmit={handleInviteByEmail} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter friend's email"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isInviting}
                      className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-50"
                    >
                      {isInviting ? 'Searching...' : 'Send Request'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowInviteForm(false)}
                      className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}
          </div>

          {/* Friends List */}
          <div className="px-4 py-4 space-y-6">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : friends.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No friends yet</h3>
                <p className="text-gray-500 mt-1">Invite friends to share your restaurant picks!</p>
              </div>
            ) : (
              <>
                {/* Incoming Requests */}
                {incomingRequests.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Friend Requests ({incomingRequests.length})
                    </h3>
                    <div className="space-y-3">
                      {incomingRequests.map((friend) => (
                        <div 
                          key={friend.id} 
                          className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-xl"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                              {friend.photoURL ? (
                                <img src={friend.photoURL} alt={friend.displayName} className="w-10 h-10 rounded-full" />
                              ) : (
                                <span className="text-indigo-600 font-medium text-sm">
                                  {(friend.displayName || friend.email || '?')[0].toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">{friend.displayName || friend.email}</p>
                              <p className="text-xs text-indigo-600">Wants to connect</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAcceptRequest(friend.id)}
                              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                              title="Accept"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveFriend(friend.id)}
                              className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-500 transition-colors"
                              title="Decline"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accepted Friends */}
                {acceptedFriends.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Friends ({acceptedFriends.length})
                    </h3>
                    <div className="space-y-3">
                      {acceptedFriends.map((friend) => (
                        <div 
                          key={friend.id} 
                          className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-indigo-200 hover:bg-indigo-50/30 cursor-pointer transition-colors"
                          onClick={() => handleFriendClick(friend)}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                              {friend.photoURL ? (
                                <img src={friend.photoURL} alt={friend.displayName} className="w-10 h-10 rounded-full" />
                              ) : (
                                <span className="text-green-600 font-medium text-sm">
                                  {(friend.displayName || friend.email || '?')[0].toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">{friend.displayName || friend.email}</p>
                              <p className="text-xs text-green-600">Connected</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFriend(friend.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pending / Outgoing */}
                {pendingOutgoing.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Pending ({pendingOutgoing.length})
                    </h3>
                    <div className="space-y-3">
                      {pendingOutgoing.map((friend) => (
                        <div 
                          key={friend.id} 
                          className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Clock className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-700 truncate">{friend.displayName || friend.email}</p>
                              <p className="text-xs text-gray-500">
                                {friend.status === 'requested_outgoing' ? 'Request sent' : 'Invite sent'}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleRemoveFriend(friend.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
