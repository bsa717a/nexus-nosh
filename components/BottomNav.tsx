import { useRouter } from 'next/router';
import { Home, UtensilsCrossed, User, Settings, LogOut, Heart } from 'lucide-react';
import { useAuth } from '@/lib/auth/useAuth';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/restaurants', icon: UtensilsCrossed, label: 'Restaurants' },
  { href: '/my-list', icon: Heart, label: 'My List' },
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  const router = useRouter();
  const { signOut } = useAuth();
  const currentPath = router.pathname;

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50">
      <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-xl mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = currentPath === href;
              
              return (
                <button
                  key={href}
                  onClick={() => router.push(href)}
                  className="flex flex-col items-center py-2 px-3 group"
                >
                  <div
                    className={`p-2 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'text-gray-400 group-hover:text-orange-500 group-hover:bg-orange-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs font-medium mt-1 transition-colors ${
                      isActive
                        ? 'text-orange-600'
                        : 'text-gray-400 group-hover:text-orange-500'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center py-2 px-3 group"
            >
              <div className="p-2 rounded-2xl text-gray-400 group-hover:text-red-500 group-hover:bg-red-50 transition-all duration-200">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-400 group-hover:text-red-500 mt-1 transition-colors">
                Sign Out
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

