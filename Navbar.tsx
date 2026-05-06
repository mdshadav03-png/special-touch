import { Search, ShoppingCart, User, Heart, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useState } from 'react';
import { Sidebar } from './Sidebar';

export function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.wishlist.length);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');
  const isCartPage = location.pathname.startsWith('/cart');
  const isCheckoutPage = location.pathname.startsWith('/checkout');
  const hideSearch = isProductPage || isCartPage || isCheckoutPage;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center pt-3 sm:pt-4 space-x-2 sm:space-x-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1 sm:p-2 text-gray-600 hover:text-brand-pink transition-colors"
                id="menu-toggle"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center">
                <span className="text-xl sm:text-3xl font-heading text-brand-pink tracking-tight leading-tight whitespace-nowrap overflow-hidden">Special Touch Bag</span>
              </Link>
            </div>

          {/* Search Bar - Desktop */}
          {!hideSearch && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8 pt-2">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-pink focus:border-brand-pink sm:text-sm transition-all"
                  placeholder="Search for purses, handbags..."
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center pt-3 sm:pt-4 space-x-1 sm:space-x-6">
            <Link to="/orders" className="hidden sm:flex flex-col items-center text-gray-600 hover:text-brand-pink transition-colors">
              <User size={22} />
              <span className="text-[10px] font-medium mt-1">Orders</span>
            </Link>
            <Link to="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-brand-pink transition-colors relative p-2">
              <div className="relative">
                <Heart size={22} />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                    {wishlistItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium mt-1">Wishlist</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-brand-pink transition-colors relative p-2">
              <div className="relative">
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium mt-1">Cart</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {!hideSearch && (
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-pink"
              placeholder="Search for purses..."
            />
          </div>
        </div>
      )}
    </nav>

    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
  </>
);
}
