import { Home, Grid, User, Package, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function BottomNav() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Grid, label: 'Categories', path: '/categories' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: Package, label: 'Orders', path: '/orders' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around h-16 px-2 sm:hidden z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              isActive ? 'text-brand-pink' : 'text-gray-500'
            }`
          }
        >
          <item.icon size={20} />
          <span className="text-[10px] font-medium mt-1">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
