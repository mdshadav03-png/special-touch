import { X, User, Package, HelpCircle, Heart, Settings, LogOut, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Package, label: 'My Orders', path: '/orders' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: HelpCircle, label: 'Help Center', path: 'https://wa.me/917838657382' },
    { icon: Settings, label: 'Settings', path: '#' },
    { icon: HelpCircle, label: 'Contact Us', path: 'https://wa.me/917838657382' },
    { icon: ShieldCheck, label: 'Privacy Policy', path: '#' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60]"
          />
          
          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-brand-pink text-white flex items-center justify-between">
              <Link to="/profile" onClick={onClose} className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold">Hello, User!</p>
                  <p className="text-[10px] uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">View Profile</p>
                </div>
              </Link>
              <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const isExternal = item.path.startsWith('http');
                  const content = (
                    <>
                      <div className="flex items-center space-x-4">
                        <item.icon size={20} className="text-gray-500 group-hover:text-brand-pink" />
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                    </>
                  );

                  if (isExternal) {
                    return (
                      <a
                        key={item.label}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
              
              <div className="mt-8 px-6">
                <div className="h-px bg-gray-100 mb-6"></div>
                <button className="flex items-center space-x-4 text-gray-500 hover:text-red-500 transition-colors w-full">
                  <LogOut size={20} />
                  <span className="text-sm font-medium">Log Out</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100">
               <p className="text-2xl font-heading text-brand-pink tracking-tight mb-1">Special Touch Bag</p>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Version 1.0.4</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
