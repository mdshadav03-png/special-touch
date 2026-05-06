import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { toast } from 'sonner';

import { SafeImage } from './SafeImage';

import { useReviewStore } from '../store/useReviewStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const getAverageRating = useReviewStore((state) => state.getAverageRating);
  
  const isWishlisted = isInWishlist(product.id);
  const { rating, count } = getAverageRating(product.id, product.rating, product.reviews);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isBestSeller && (
            <div className="absolute top-3 left-3 bg-brand-teal text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              BESTSELLER
            </div>
          )}
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className={`p-1.5 rounded-full shadow-sm border transition-all ${
                isWishlisted 
                  ? 'bg-pink-50 border-brand-pink text-brand-pink' 
                  : 'bg-white/80 backdrop-blur-sm border-gray-100 text-gray-400 hover:text-brand-pink'
              }`}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-1 mb-1 group-hover:text-brand-pink transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-brand-teal text-white flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold">
              {rating} <Star size={8} className="ml-0.5 fill-white" />
            </div>
            <span className="text-gray-400 text-[10px] font-medium">({count})</span>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            <span className="text-xs font-bold text-green-600">{product.discount}% off</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-gray-50">
            <div className="flex flex-col">
               <span className="text-[10px] text-gray-500 font-medium">Free Delivery</span>
               {product.sku && <span className="text-[9px] text-gray-400 font-mono">SKU: {product.sku}</span>}
            </div>
            <div className="flex items-center gap-2">
              {product.color && (
                <span className="text-[9px] font-bold text-gray-500 uppercase bg-gray-100 px-1.5 py-0.5 rounded">
                  {product.color}
                </span>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddToCart}
                className="h-8 w-8 p-0 rounded-full border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white transition-colors"
              >
                <ShoppingCart size={14} />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
