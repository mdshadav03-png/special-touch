import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className, 
  loading = 'lazy',
  fallbackSrc = 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=1000',
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden bg-gray-100", className)}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <div className="w-8 h-8 border-4 border-brand-pink/30 border-t-brand-pink rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {!error ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
          {...props}
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-gray-400 p-4 text-center">
          <ImageIcon size={40} className="mb-2 opacity-50" />
          <span className="text-xs font-medium">Image unavailable</span>
          <img 
            src={fallbackSrc} 
            alt="Fallback" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />
        </div>
      )}
    </div>
  );
};
