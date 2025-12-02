import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth/useAuth';
import BottomNav from '@/components/BottomNav';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Friend } from '@/lib/types';
import { getFriends, inviteFriendByEmail, removeFriend, getInviteMessage } from '@/lib/services/friends/friendService';
import { UserPlus, Mail, Share2, Trash2, User as UserIcon, Search } from 'lucide-react';

export default function FriendsPage() {
  const { user } = useAuth();
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

  const handleInviteByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !inviteEmail) return;

    setIsInviting(true);
    setMessage(null);

    try {
      await inviteFriendByEmail(user.uid, inviteEmail);
      setMessage({ type: 'success', text: `Invitation sent to ${inviteEmail}!` });
      setInviteEmail('');
      setShowInviteForm(false);
      loadFriends();
      
      // Open mail client as a fallback/helper
      const { title, text, url } = getInviteMessage(user.displayName || 'a friend');
      const mailtoLink = `mailto:${inviteEmail}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}`;
      window.location.href = mailtoLink;
      
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to invite friend' });
    } finally {
      setIsInviting(false);
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
                      {isInviting ? 'Sending...' : 'Send Invite'}
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
          <div className="px-4 py-4">
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
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-gray-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                        {friend.photoURL ? (
                          <img src={friend.photoURL} alt={friend.displayName} className="w-10 h-10 rounded-full" />
                        ) : (
                          <span className="text-indigo-600 font-medium text-sm">
                            {(friend.displayName || friend.email || '?')[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{friend.displayName || friend.email}</p>
                        <p className="text-xs text-gray-500 capitalize">{friend.status}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveFriend(friend.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}

