import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface StarRatingProps {
  rating: number;
  max?: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  max = 5, 
  onRatingChange, 
  interactive = false,
  size = 16,
  className
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(max)].map((_, i) => {
        const starValue = i + 1;
        const isActive = starValue <= rating;
        
        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(starValue)}
            className={cn(
              "transition-colors",
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default",
              isActive ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-transparent"
            )}
          >
            <Star size={size} strokeWidth={isActive ? 0 : 2} />
          </button>
        );
      })}
    </div>
  );
};
