import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

export function Layout() {
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product/');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className={`pb-20 sm:pb-0 ${isProductPage ? '!pb-0' : ''}`}>
        <Outlet />
      </main>
      <footer className="hidden sm:block bg-gray-50 border-t border-gray-100 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl font-heading text-brand-pink mb-4">Special Touch Bag</p>
          <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
            The ultimate destination for premium quality purses and handbags. 
            Crafted for style, designed for you.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            {['About', 'Contact', 'Shipping', 'Terms', 'Privacy'].map(link => (
              <a key={link} href="#" className="text-xs font-semibold text-gray-600 hover:text-brand-pink underline-offset-4 hover:underline">
                {link}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
            © 2026 Special Touch Bag. All rights reserved.
          </p>
        </div>
      </footer>
      {!isProductPage && <BottomNav />}
      <Toaster position="bottom-right" />
    </div>
  );
}
